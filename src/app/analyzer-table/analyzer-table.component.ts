import { Component, Inject, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { SeriesHelperService } from '../series-helper.service';
import { TableHelperService } from '../table-helper.service';
import { HelperService } from '../helper.service';
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { AnalyzerTableRendererComponent } from '../analyzer-table-renderer/analyzer-table-renderer.component';
import { AnalyzerStatsRendererComponent } from '../analyzer-stats-renderer/analyzer-stats-renderer.component';
import { AnalyzerInteractionsEditorComponent } from '../analyzer-interactions-editor/analyzer-interactions-editor.component';
import { AnalyzerInteractionsRendererComponent } from '../analyzer-interactions-renderer/analyzer-interactions-renderer.component';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-analyzer-table',
  templateUrl: './analyzer-table.component.html',
  styleUrls: ['./analyzer-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AnalyzerTableComponent implements OnInit, OnChanges {
  @Input() series;
  @Input() minDate;
  @Input() maxDate;
  @Input() allTableDates;
  @Output() updateChartSeries = new EventEmitter();
  @Output() tableTransform = new EventEmitter();
  @Input() yoyChecked;
  @Input() ytdChecked;
  @Input() c5maChecked;
  portalSettings;
  missingSummaryStat = false;
  tableDates;
  private gridApi;
  private columnDefs;
  private rows;
  private frameworkComponents;
  private summaryColumns;
  private summaryRows;
  public gridOptions: GridOptions;
  public statGridOptions: GridOptions;

  constructor(
    @Inject('portal') private portal,
    private _dataPortalSettings: DataPortalSettingsService,
    private _analyzer: AnalyzerService,
    private _series: SeriesHelperService,
    private _helper: HelperService,
  ) {
    this.frameworkComponents = {
      analyzerTableRenderer: AnalyzerTableRendererComponent,
      analyzerStatsRenderer: AnalyzerStatsRendererComponent,
      analyzerInteractionsEditor: AnalyzerInteractionsEditorComponent,
      analyzerInteractionsRenderer: AnalyzerInteractionsRendererComponent
    };
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
    this.statGridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    }
  }

  ngOnInit() {
    this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal.universe];
  }

  ngOnChanges() {
    // Update table as minDate & maxDate change
    let tableEnd;
    for (let i = this.allTableDates.length - 1; i > 0; i--) {
      if (this.maxDate === this.allTableDates[i].date) {
        tableEnd = i;
        break;
      }
    }
    const tableStart = this.allTableDates.findIndex(item => item.date === this.minDate);
    this.columnDefs = this.setTableColumns(this.allTableDates, tableStart, tableEnd);
    this.rows = [];
    this.summaryColumns = this.setSummaryStatColumns();
    if (this.minDate && this.maxDate) {
      this.summaryRows = this._series.calculateAnalyzerSummaryStats(this.series, this.minDate, this.maxDate);
      this.summaryRows.forEach((statRow) => {
        const seriesInChart = $('.highcharts-series.' + statRow.seriesInfo.id);
        statRow.color = seriesInChart.length ? seriesInChart.css('stroke') : '#000000';
      });
      // Check if the summary statistics for a series has NA values
      this.missingSummaryStat = this.isSummaryStatMissing(this.summaryRows);
    }
    // Display values in the range of dates selected
    this.series.forEach((series) => {
      const transformations = this._helper.getTransformations(series.observations);
      const { level, yoy, ytd, c5ma } = transformations;
      const seriesData = this.formatLvlData(series, level);
      this.rows.push(seriesData);
      if (this.yoyChecked) {
        const yoyData = this.formatTransformationData(series, yoy);
        this.rows.push(yoyData)
      }
      if (this.ytdChecked) {
        const ytdData = this.formatTransformationData(series, ytd);
        this.rows.push(ytdData)
      }
      if (this.c5maChecked) {
        const c5maData = this.formatTransformationData(series, c5ma);
        this.rows.push(c5maData)
      }
    });
    console.log('rows', this.rows)
  }

  setSummaryStatColumns = () => {
    return [{
      field: 'series',
      headerName: 'Series',
      pinned: 'left',
      width: 275,
      cellRenderer: 'analyzerStatsRenderer',
      tooltip: function (params) {
        return params.value;
      }
    }, {
      field: 'range',
      headerName: 'Date Range'
    }, {
      field: 'minValue',
      headerName: 'Minimum Value'
    }, {
      field: 'maxValue',
      headerName: 'Maximum Value'
    }, {
      field: 'percChange',
      headerName: '% Change'
    }, {
      field: 'levelChange',
      headerName: 'Change'
    }, {
      field: 'total',
      headerName: 'Total'
    }, {
      field: 'avg',
      headerName: 'Avg'
    }, {
      field: 'cagr',
      headerName: 'CAGR'
    }];
  }

  setTableColumns = (dates, tableStart, tableEnd) => {
    const columns: Array<any> = [];
    columns.push({
      field: 'series',
      headerName: 'Series',
      pinned: 'left',
      width: 250,
      cellRenderer: 'analyzerTableRenderer',
      tooltip: function (params) {
        return params.value;
      }
    });
    columns.push({
      field: 'interactionSettings',
      headerName: 'Actions',
      pinned: 'left',
      width: 25,
      editable: true,
      cellRenderer: 'analyzerInteractionsRenderer',
      cellEditor: 'analyzerInteractionsEditor',
      cellClass: 'action-column',
    });
    const tableDates = dates.slice(tableStart, tableEnd + 1);
    // Reverse dates for right-to-left scrolling on tables
    for (let i = tableDates.length - 1; i >= 0; i--) {
      columns.push({ field: tableDates[i].tableDate, headerName: tableDates[i].tableDate, width: 125 });
    }
    return columns;
  }

  formatLvlData = (series, level) => {
    console.log('series', series)
    const seriesInChart = $('.highcharts-series.' + series.seriesDetail.id);
    const { dates, values } = level;
    const formattedDates = dates.map(d => this._helper.formatDate(d, series.seriesDetail.frequencyShort));
    const seriesData = {
      series: series.displayName,
      lockPosition: true,
      saParam: series.saParam,
      seriesInfo: series.seriesDetail,
      interactionSettings: {
        showInChart: series.showInChart,
        color: seriesInChart.length ? seriesInChart.css('stroke') : '#000000',
        seriesInfo: series.seriesDetail
      },
      lvlData: true,
    }
    formattedDates.forEach((d, index) => {
      seriesData[d] = this._helper.formatNum(+values[index], series.seriesDetail.decimals);
    });
    return seriesData;
  }

  formatTransformationData = (series, transformation) => {
    const { dates, values } = transformation;
    const formattedDates = dates.map(d => this._helper.formatDate(d, series.seriesDetail.frequencyShort));
    const displayName = this.formatTransformationName(transformation.transformation, series.seriesDetail.percent);
    const data = {
      series: displayName,
      seriesInfo: series.seriesDetail,
      lvlData: false
    }
    formattedDates.forEach((d, index) => {
      data[d] = this._helper.formatNum(+values[index], series.seriesDetail.decimals);
    });
    return data;
  }

  formatTransformationName = (transformation, percent) => {
    if (transformation === 'pc1') {
      return percent ? 'YOY (ch.)' : 'YOY (%)';
    }
    if (transformation === 'ytd') {
      return percent ? 'YTD (ch.)' : 'YTD (%)';
    }
    if (transformation === 'c5ma') {
      return percent ? 'Annual (ch.)' : 'Annual (%)';
    }
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
  }

  onExport = () => {
    const allColumns = this.gridApi.csvCreator.columnController.allDisplayedColumns;
    const exportColumns = [];
    for (let i = allColumns.length - 1; i >= 0; i--) {
      exportColumns.push(allColumns[i]);
    }
    const params = {
      columnKeys: exportColumns,
      fileName: 'analyzer',
      customHeader: this.portalSettings.catTable.portalSource + '\n\n'

    }
    this.gridApi.exportDataAsCsv(params);
  }


  isSummaryStatMissing = (series) => {
    return series.some((s) => s ? s.missing : null);
  }

  yoyActive(e) {
    this.yoyChecked = e.target.checked;
    this.tableTransform.emit({ value: e.target.checked, label: 'yoy' });
  }

  ytdActive(e) {
    this.ytdChecked = e.target.checked;
    this.tableTransform.emit({ value: e.target.checked, label: 'ytd' });
  }

  c5maActive(e) {
    this.c5maChecked = e.target.checked;
    this.tableTransform.emit({ value: e.target.checked, label: 'c5ma' });
  }


  updateAnalyzer = (series) =>{
    this._analyzer.updateAnalyzer(series.seriesInfo.id);
    this.updateChartSeries.emit(series);
  }

  updateChart = (series) => {
    this.updateChartSeries.emit(series);
  }

  switchChartYAxes(series) {
    this._analyzer.switchYAxes.emit(series);
  }
}
