import { Component, Inject, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { HelperService } from '../helper.service';
import { CategoryTableRendererComponent } from '../category-table-renderer/category-table-renderer.component';

@Component({
  selector: 'app-category-table-view',
  templateUrl: './category-table-view.component.html',
  styleUrls: ['./category-table-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryTableViewComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() sublist;
  @Input() freq;
  @Input() dates;
  @Input() noSeries;
  @Input() yoyActive;
  @Input() ytdActive;
  @Input() c5maActive;
  @Input() params;
  @Input() subcatIndex;
  @Input() tableStart;
  @Input() tableEnd;
  @Input() portalSettings;
  /* private frozenColumns;
  private scrollableColumns;
  private categoryTableData; */
  private gridApi;
  private columnDefs;
  private rows;
  private frameworkComponents;

  constructor(
    @Inject('defaultRange') private defaultRange,
    private _helper: HelperService,
  ) {
    this.frameworkComponents = {
      categoryTableRenderer: CategoryTableRendererComponent
    }
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.columnDefs = this.setTableColumns(this.dates, this.freq, this.defaultRange, this.tableStart, this.tableEnd);
    this.rows = [];
    if (this.data) {
      this.data.forEach((series) => {
        if (series.seriesInfo !== 'No data available' && this.dates) {
          const transformations = this._helper.getTransformations(series.seriesInfo.seriesObservations);
          const { level, yoy, ytd, c5ma } = transformations;
          const seriesData = this.formatLvlData(series, level);
          this.rows.push(seriesData);
          if (this.yoyActive) {
            const yoyData = this.formatTransformationData(series, yoy);
            this.rows.push(yoyData)
          }
          if (this.ytdActive && this.freq !== 'A') {
            const ytdData = this.formatTransformationData(series, ytd);
            this.rows.push(ytdData)
          }
          if (this.c5maActive) {
            const c5maData = this.formatTransformationData(series, c5ma);
            this.rows.push(c5maData)
          }
        }
      });
    }
  }

  setTableColumns = (dates, freq, defaultRange, tableStart, tableEnd) => {
    const columns = [{
      field: 'series',
      headerName: 'Series',
      pinned: 'left',
      cellRenderer: "categoryTableRenderer",
      tooltip: function (params) {
        return params.value;
      }
    }];
    const defaultRanges = this._helper.setDefaultCategoryRange(this.freq, this.dates, this.defaultRange);
    let { startIndex, endIndex } = defaultRanges;
    this.dates.forEach((date, index) => {
      // Range slider is converting annual year strings to numbers
      if (date.tableDate == this.tableStart) {
        startIndex = index;
      }
      if (date.tableDate == this.tableEnd) {
        endIndex = index;
      }
    });
    const start = startIndex;
    const end = endIndex;
    const tableDates = this.dates.slice(start, end + 1);
    // Reverse dates for right-to-left scrolling on tables
    for (let i = tableDates.length - 1; i >= 0; i--) {
      columns.push({ field: tableDates[i].date, headerName: tableDates[i].tableDate, width: 125 });
    }
    return columns;
  }

  formatLvlData = (series, level) => {
    const { dates, values } = level;
    const seriesData = {
      series: series.seriesInfo.displayName,
      saParam: series.seriesInfo.saParam,
      seriesInfo: series.seriesInfo,
      lvlData: true
    }
    dates.forEach((d, index) => {
      seriesData[d] = values[index];
    });
    return seriesData;
  }

  formatTransformationData = (series, transformation) => {
    const { dates, values } = transformation;
    const displayName = this.formatTransformationName(transformation.transformation, series.seriesInfo.percent);
    const data = {
      series: displayName,
      seriesInfo: series.seriesInfo,
      lvlData: false
    }
    dates.forEach((d, index) => {
      data[d] = values[index];
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

  onExport = () => {
    const allColumns = this.gridApi.csvCreator.columnController.allDisplayedColumns;
    const exportColumns = [];
    for (let i = allColumns.length - 1; i >= 0; i--) {
      exportColumns.push(allColumns[i]);
    }
    const params = {
      columnKeys: exportColumns
    }
    this.gridApi.exportDataAsCsv(params);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
  }

}
