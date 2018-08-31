import { Component, Inject, OnInit, OnChanges, Input, Output, ViewChildren, EventEmitter, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { SeriesHelperService } from '../series-helper.service';
import { TableHelperService } from '../table-helper.service';
import { HelperService } from '../helper.service';
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { CategoryTableRendererComponent } from '../category-table-renderer/category-table-renderer.component';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-analyzer-table',
  templateUrl: './analyzer-table.component.html',
  styleUrls: ['./analyzer-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyzerTableComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChildren('tableScroll') private tableEl;
  @Input() series;
  @Input() minDate;
  @Input() maxDate;
  @Input() allTableDates;
  @Input() chartSeries;
  @Output() updateChartSeries = new EventEmitter();
  @Output() tableTransform = new EventEmitter();
  @Input() yoyChecked;
  @Input() ytdChecked;
  @Input() c5maChecked;
  portalSettings;
  private previousHeight;
  private tableWidths = [];
  missingSummaryStat = false;
  tableDates;

  private gridApi;
  private columnDefs;
  private rows;
  private frameworkComponents;

  constructor(
    @Inject('portal') private portal,
    private _dataPortalSettings: DataPortalSettingsService,
    private _analyzer: AnalyzerService,
    private _series: SeriesHelperService,
    private _table: TableHelperService,
    private _helper: HelperService,
  ) {
    this.frameworkComponents = {
      categoryTableRenderer: CategoryTableRendererComponent
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
    // Display values in the range of dates selected
    this.series.forEach((series) => {
      console.log('series', series);
      const transformations = this._helper.getTransformations(series.observations);
      const { level, yoy, ytd, c5ma } = transformations;
      const seriesData = this.formatLvlData(series, level);
      this.rows.push(seriesData);
      const decimal = series.seriesDetail.decimals;
      // series.analyzerTableDisplay =  series.analyzerTableData ? series.analyzerTableData.slice(tableStart, tableEnd + 1) : [];
      series.analyzerTableDisplay = this.createSeriesTable(series.seriesTableData, this.allTableDates, tableStart, tableEnd, decimal)
      const seriesFreq = { freq: series.seriesDetail.frequencyShort, label: series.seriesDetail.frequency };
      //series.summaryStats = this._series.summaryStats(series.analyzerTableDisplay, seriesFreq, series.seriesDetail.decimals, this.minDate, this.maxDate);
      series.summaryStats = this._series.newSummaryStats(series.analyzerTableDisplay.lvlCategoryTable, seriesFreq, series.seriesDetail.decimals, this.minDate, this.maxDate)
      const seriesInChart = $('.highcharts-series.' + series.seriesDetail.id);
      if (seriesInChart) {
        // Match color of show_chart icon for a series with its respective color in the graph
        $('.color' + series.seriesDetail.id).css('color', seriesInChart.css('stroke'));
      }
      if (!seriesInChart.length) {
        // If series is not selected for the chart, reset color of show_chart icon
        $('.color' + series.seriesDetail.id).css('color', '#000');
      }
    });
    // Check if the summary statistics for a series has NA values
    this.missingSummaryStat = this.isSummaryStatMissing();
    this.tableDates = this.allTableDates.slice(tableStart, tableEnd + 1);
  }

  setTableColumns = (dates, tableStart, tableEnd) => {
    const columns: Array<any> = [];
    columns.push({
      field: 'series',
      headerName: 'Series',
      pinned: 'left',
      cellRenderer: "categoryTableRenderer",
      tooltip: function (params) {
        return params.value;
      }
    });
    const tableDates = dates.slice(tableStart, tableEnd + 1);
    // Reverse dates for right-to-left scrolling on tables
    for (let i = tableDates.length - 1; i >= 0; i--) {
      columns.push({ field: tableDates[i].date, headerName: tableDates[i].tableDate, width: 125 });
    }
    return columns;
  }

  formatLvlData = (series, level) => {
    const { dates, values } = level;
    const seriesData = {
      series: series.displayName,
      saParam: series.saParam,
      seriesInfo: series.seriesDetail,
      lvlData: true,
    }
    dates.forEach((d, index) => {
      seriesData[d] = this._helper.formatNum(+values[index], series.seriesDetail.decimals);
    });
    return seriesData;
  }


  createSeriesTable = (transformations, categoryDates, start, end, decimal) => {
    const categoryTable = {};
    Object.keys(transformations).forEach((transform) => {
      const transformationValues = [];
      categoryDates.forEach((catDate) => {
        const dateExists = this.binarySearch(transformations[transform], catDate.tableDate);
        dateExists > -1 ? transformationValues.push(transformations[transform][dateExists]) : transformationValues.push({ date: catDate.date, tableDate: catDate.tableDate, value: '', formattedValue: '' });
      });
      categoryTable[`${transform}DownloadTable`] = transformationValues.map((i) => {
        return (i.value === Infinity || i.value === '') ? { date: i.date, tableDate: i.tableDate, value: Infinity, formattedValue: '' } : { date: i.date, tableDate: i.tableDate, value: +i.value, formattedValue: (+i.value).toLocaleString('en-US', { minimumFractionDigits: decimal, maximumFractionDigits: decimal }) }
      });
      categoryTable[`${transform}CategoryTable`] = categoryTable[`${transform}DownloadTable`].slice(start, end + 1);
    });
    return categoryTable;
  }

  binarySearch = (valueList, date) => {
    let start = 0;
    let end = valueList.length - 1;
    let middle = Math.floor((start + end) / 2);
    while (valueList[middle] && valueList[middle].tableDate !== date && start < end) {
      if (date < valueList[middle].tableDate) {
        end = middle - 1;
      } else {
        start = middle + 1;
      }
      middle = Math.floor((start + end) / 2);
    }
    return (!valueList[middle] || valueList[middle].tableDate !== date) ? -1 : middle;
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
  }

  ngAfterViewChecked() {
    // Check height of content and scroll tables to the right
    // If true, height is changing, i.e. content still loading
    const container = this._table.checkContainerHeight(this.previousHeight);
    this.previousHeight = container.previousHeight;
    if (container.scroll) {
      // On load, table scrollbars should start at the right -- showing most recent data
      return this._table.tableScroll(this.tableEl);
    }

    // Scroll tables to the right when table widths changes, i.e. changing frequency from A to Q | M
    return this._table.checkTableWidth(this.tableWidths);
  }

  isSummaryStatMissing() {
    return this.series.some((s) => s.summaryStats ? s.summaryStats.missing : null);
  }

  showPopover(seriesInfo) {
    return this._table.showPopover(seriesInfo);
  }

  hideInfo(seriesId) {
    return this._table.hideInfo(seriesId);
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


  updateAnalyze(series) {
    this._analyzer.updateAnalyzer(series.seriesDetail.id);
    this.updateChartSeries.emit(series);
  }

  updateChart(series) {
    this.updateChartSeries.emit(series);
  }
}
