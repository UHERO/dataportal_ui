import { Component, Inject, OnChanges, Input } from '@angular/core';
import { HelperService } from '../helper.service';
import { CategoryTableRendererComponent } from '../category-table-renderer/category-table-renderer.component';
import { AnalyzerService } from '../analyzer.service';

@Component({
  selector: 'app-category-table-view',
  templateUrl: './category-table-view.component.html',
  styleUrls: ['./category-table-view.component.scss']
})
export class CategoryTableViewComponent implements OnChanges {
  @Input() data;
  @Input() sublist;
  @Input() selectedCategory;
  @Input() selectedDataList;
  @Input() freq;
  @Input() geo;
  @Input() tableId;
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
  @Input() seriesInAnalyzer;
  private gridApi;
  private columnDefs;
  private rows;
  private frameworkComponents;
  paginationSizeOptions: number[] = [];
  selectedPaginationSize;
  totalPages: number;
  totalRows: number;
  paginationSize: number;
  disablePrevious: boolean;
  disableNext: boolean;

  constructor(
    @Inject('defaultRange') private defaultRange,
    private _analyzer: AnalyzerService,
    private _helper: HelperService,
  ) {
    this.frameworkComponents = {
      categoryTableRenderer: CategoryTableRendererComponent
    }
  }

  ngOnChanges() {
    this.columnDefs = this.setTableColumns(this.dates, this.freq, this.defaultRange, this.tableStart, this.tableEnd);
    this.rows = [];
    if (this.data) {
      this.data.forEach((series) => {
        if (series.seriesInfo !== 'No data available' && this.dates) {
          series.seriesInfo.analyze = this._analyzer.checkAnalyzer(series.seriesInfo);
          const transformations = this._helper.getTransformations(series.seriesInfo.seriesObservations);
          const { level, yoy, ytd, c5ma } = transformations;
          const seriesData = this.selectedDataList ? this.formatLvlData(series, level, this.subcatIndex, this.selectedDataList.id) : this.formatLvlData(series, level, this.subcatIndex, null);
          this.rows.push(seriesData);
          if (this.yoyActive) {
            const yoyData = this.formatTransformationData(series, yoy, 'pc1');
            this.rows.push(yoyData)
          }
          if (this.ytdActive && this.freq !== 'A') {
            const ytdData = this.formatTransformationData(series, ytd, 'ytd');
            this.rows.push(ytdData)
          }
          if (this.c5maActive) {
            const c5maData = this.formatTransformationData(series, c5ma, 'c5ma');
            this.rows.push(c5maData)
          }
        }
      });
    }
  }

  setTableColumns = (dates, freq, defaultRange, tableStart, tableEnd) => {
    const columns: Array<any> = [];
    columns.push({
      field: 'series',
      headerName: 'Series',
      pinned: 'left',
      width: 275,
      cellRenderer: "categoryTableRenderer",
      tooltipValueGetter: function (params) {
        return params.value;
      }
    });
    const defaultRanges = this._helper.setDefaultCategoryRange(freq, dates, defaultRange);
    let { startIndex, endIndex } = defaultRanges;
    dates.forEach((date, index) => {
      // Range slider is converting annual year strings to numbers
      if (date.date == tableStart) {
        startIndex = index;
      }
      if (date.date == tableEnd) {
        endIndex = index;
      }
    });
    let start = startIndex;
    let end = endIndex;
    if (startIndex > endIndex) {
      start = defaultRanges.startIndex;
      end = defaultRanges.endIndex;
    }
    const tableDates = dates.slice(start, end + 1);
    // Reverse dates for right-to-left scrolling on tables
    for (let i = tableDates.length - 1; i >= 0; i--) {
      columns.push({ field: tableDates[i].date, headerName: tableDates[i].tableDate, width: 125 });
    }
    return columns;
  }

  formatLvlData = (series, level, subcatIndex, parentId) => {
    const { dates, values } = level;
    const seriesData = {
      series: `${series.seriesInfo.tablePrefix} ${series.seriesInfo.displayName} ${series.seriesInfo.tablePostfix}`,
      saParam: series.seriesInfo.saParam,
      seriesInfo: series.seriesInfo,
      lvlData: true,
      categoryId: parentId
    }
    dates.forEach((d, index) => {
      seriesData[d] = this._helper.formatNum(+values[index], series.seriesInfo.decimals);
    });
    return seriesData;
  }

  formatTransformationData = (series, transformation, transformationName) => {
    const data = {
      series: '',
      seriesInfo: series.seriesInfo,
      lvlData: false
    };
    if (transformation) {
      const { dates, values } = transformation;
      const displayName = this.formatTransformationName(transformation.transformation, series.seriesInfo.percent);
      data.series = displayName;
      dates.forEach((d, index) => {
        data[d] = values[index];
      });
      return data;
    }
    const displayName = this.formatTransformationName(transformationName, series.seriesInfo.percent);
    data.series = displayName;
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
    const parentName = this.selectedCategory ? this.selectedCategory.name + ' - ' : '';
    const sublistName = this.selectedDataList ? this.selectedDataList.name : '';
    const geoName = this.geo ? this.geo.name + ' - ' : '';
    const catId = this.selectedCategory ? this.selectedCategory.id : '';
    const dataListId = this.selectedDataList ? `&data_list_id=${this.selectedDataList.id}` : '';
    for (let i = allColumns.length - 1; i >= 0; i--) {
      exportColumns.push(allColumns[i]);
    }
    const params = {
      columnKeys: exportColumns,
      fileName: sublistName,
      customHeader: this.portalSettings.catTable.portalSource +
        parentName + sublistName + ' (' + geoName + this.freq + ')' +
        ': ' + this.portalSettings.catTable.portalLink + catId + dataListId + '&view=table' +
        '\n\n'
    }
    this.gridApi.exportDataAsCsv(params);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
  }
}
