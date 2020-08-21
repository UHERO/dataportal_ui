import { Component, Inject, OnInit, OnChanges, Input, Output, OnDestroy, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { SeriesHelperService } from '../series-helper.service';
import { HelperService } from '../helper.service';
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { AnalyzerTableRendererComponent } from '../analyzer-table-renderer/analyzer-table-renderer.component';
import { AnalyzerStatsRendererComponent } from '../analyzer-stats-renderer/analyzer-stats-renderer.component';
import { AnalyzerInteractionsEditorComponent } from '../analyzer-interactions-editor/analyzer-interactions-editor.component';
import { AnalyzerInteractionsRendererComponent } from '../analyzer-interactions-renderer/analyzer-interactions-renderer.component';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'lib-analyzer-table',
  templateUrl: './analyzer-table.component.html',
  styleUrls: ['./analyzer-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyzerTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() series;
  @Input() minDate;
  @Input() maxDate;
  @Input() allTableDates;
  @Output() tableTransform = new EventEmitter();
  @Input() yoyChecked;
  @Input() ytdChecked;
  @Input() c5maChecked;
  @Input() indexChecked;
  portalSettings;
  missingSummaryStat = false;
  tableDates;
  toggleSeries;
  private gridApi;
  columnDefs;
  rows;
  frameworkComponents;
  summaryColumns;
  summaryRows;
  public gridOptions: GridOptions;
  public statGridOptions: GridOptions;

  constructor(
    @Inject('portal') private portal,
    private dataPortalSettingsServ: DataPortalSettingsService,
    private analyzerService: AnalyzerService,
    private seriesHelper: SeriesHelperService,
    private helperService: HelperService,
  ) {
    this.frameworkComponents = {
      analyzerTableRenderer: AnalyzerTableRendererComponent,
      analyzerStatsRenderer: AnalyzerStatsRendererComponent,
      analyzerInteractionsEditor: AnalyzerInteractionsEditorComponent,
      analyzerInteractionsRenderer: AnalyzerInteractionsRendererComponent
    };
    this.gridOptions = {
      context: {
        componentParent: this
      } as GridOptions
    };
    this.statGridOptions = {
      context: {
        componentParent: this
      } as GridOptions
    };
    this.toggleSeries = this.analyzerService.toggleSeriesInChart.subscribe((data: any) => {
      const chartSeries = this.series.filter(s => s.showInChart);
      const toggleDisplay = this.analyzerService.checkSeriesUnits(chartSeries, data.seriesInfo.unitsLabelShort);
      if (toggleDisplay) {
        const matchingValueSeries = this.rows.find(r => r.interactionSettings.seriesInfo.id === data.seriesInfo.id);
        const matchingStatSeries = this.summaryRows.find(r => r.seriesInfo.id === data.seriesInfo.id);
        matchingValueSeries.interactionSettings.showInChart = !matchingValueSeries.interactionSettings.showInChart;
        const seriesInChart = $('.highcharts-series.' + data.seriesInfo.id);
        matchingValueSeries.interactionSettings.color = seriesInChart.css('stroke');
        matchingStatSeries.interactionSettings.showInChart = !matchingStatSeries.interactionSettings.showInChart;
        matchingStatSeries.interactionSettings.color = seriesInChart.css('stroke');
      }
    });
  }

  ngOnInit() {
    this.portalSettings = this.dataPortalSettingsServ.dataPortalSettings[this.portal.universe];
  }

  ngOnChanges() {
    if (this.minDate && this.maxDate) {
      const newTableDates = this.analyzerService.createAnalyzerTableDates(this.series, this.minDate, this.maxDate);
      this.columnDefs = this.setTableColumns(newTableDates);
    }
    this.rows = [];
    this.summaryColumns = this.setSummaryStatColumns();
    if (this.minDate && this.maxDate) {
      this.summaryRows = this.seriesHelper.calculateAnalyzerSummaryStats(this.series, this.minDate, this.maxDate, this.indexChecked);
      this.summaryRows.forEach((statRow) => {
        const seriesInChart = $('.highcharts-series.' + statRow.seriesInfo.id);
        statRow.interactionSettings.color = seriesInChart.length ? seriesInChart.css('stroke') : '#000000';
      });
      // Check if the summary statistics for a series has NA values
      this.missingSummaryStat = this.isSummaryStatMissing(this.summaryRows);
    }
    // Display values in the range of dates selected
    this.series.forEach((series) => {
      const transformations = this.helperService.getTransformations(series.observations);
      const { level, yoy, ytd, c5ma } = transformations;
      const seriesData = this.formatLvlData(series, level, this.minDate);
      this.rows.push(seriesData);
      if (this.yoyChecked && yoy) {
        const yoyData = this.formatTransformationData(series, yoy);
        this.rows.push(yoyData);
      }
      if (this.ytdChecked && ytd) {
        const ytdData = this.formatTransformationData(series, ytd);
        this.rows.push(ytdData);
      }
      if (this.c5maChecked && c5ma) {
        const c5maData = this.formatTransformationData(series, c5ma);
        this.rows.push(c5maData);
      }
    });
  }

  ngOnDestroy() {
    this.toggleSeries.unsubscribe();
  }

  setSummaryStatColumns = () => {
    return [{
      field: 'interactionSettings',
      headerName: 'Actions',
      pinned: 'left',
      width: 25,
      editable: true,
      cellRenderer: 'analyzerInteractionsRenderer',
      cellEditor: 'analyzerInteractionsEditor',
      cellClass: 'action-column',
    }, {
      field: 'series',
      headerName: 'Series',
      pinned: 'left',
      width: 250,
      cellRenderer: 'analyzerStatsRenderer',
      tooltipValueGetter(params) {
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

  setTableColumns = (dates) => {
    const columns: Array<any> = [];
    columns.push({
      field: 'series',
      headerName: 'Series',
      pinned: 'left',
      width: 250,
      cellRenderer: 'analyzerTableRenderer',
      tooltipValueGetter(params) {
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
    const tableDates = dates;
    // Reverse dates for right-to-left scrolling on tables
    for (let i = tableDates.length - 1; i >= 0; i--) {
      columns.push({ field: tableDates[i].tableDate, headerName: tableDates[i].tableDate, width: 125 });
    }
    return columns;
  }

  formatLvlData = (series, level, minDate) => {
    const seriesInChart = $('.highcharts-series.' + series.seriesDetail.id);
    const { dates, values } = level;
    const formattedDates = dates.map(d => this.helperService.formatDate(d, series.seriesDetail.frequencyShort));
    const indexedValues = this.getIndexedValues(values, dates, minDate);
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
    };
    formattedDates.forEach((d, index) => {
      seriesData[d] = this.indexChecked ? this.helperService.formatNum(indexedValues[index], series.seriesDetail.decimals) : this.helperService.formatNum(+values[index], series.seriesDetail.decimals);
    });
    return seriesData;
  }

  getIndexedValues(values, dates, start) {
    return values.map((curr, ind, arr) => {
      const dateIndex = dates.findIndex(date => date === start);
      return dateIndex > -1 ? curr / arr[dateIndex] * 100 : curr / arr[0] * 100;
    });
  }

  formatTransformationData = (series, transformation) => {
    const { dates, values } = transformation;
    const formattedDates = dates.map(d => this.helperService.formatDate(d, series.seriesDetail.frequencyShort));
    const displayName = this.formatTransformationName(transformation.transformation, series.seriesDetail.percent);
    const data = {
      series: displayName,
      seriesInfo: series.seriesDetail,
      lvlData: false
    };
    formattedDates.forEach((d, index) => {
      data[d] = this.helperService.formatNum(+values[index], series.seriesDetail.decimals);
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
    for (let i = allColumns.length - 2; i >= 0; i--) {
      exportColumns.push(allColumns[i]);
    }
    const params = {
      columnKeys: exportColumns,
      fileName: 'analyzer',
      customHeader: this.portalSettings.catTable.portalSource + '\n\n'
    };
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

  switchChartYAxes(series) {
    this.analyzerService.switchYAxes.emit(series);
  }

  toggleSeriesInChart(series) {
    this.analyzerService.toggleSeriesInChart.emit(series);
    this.analyzerService.createAnalyzerTableDates(this.analyzerService.analyzerData.analyzerSeries);
  }

  removeFromAnalyzer(series) {
    this.analyzerService.updateAnalyzer(series.seriesInfo.id);
  }
}
