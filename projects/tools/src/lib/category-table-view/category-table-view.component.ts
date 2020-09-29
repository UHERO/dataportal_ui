import { Component, Inject, OnChanges, Input } from '@angular/core';
import { HelperService } from '../helper.service';
import { CategoryTableRenderComponent } from '../category-table-render/category-table-render.component';
import { AnalyzerService } from '../analyzer.service';

@Component({
  selector: 'lib-category-table-view',
  templateUrl: './category-table-view.component.html',
  styleUrls: ['./category-table-view.component.scss']
})
export class CategoryTableViewComponent implements OnChanges {
  @Input() data;
  @Input() sublist;
  @Input() selectedCategory;
  @Input() selectedDataList;
  @Input() freq;
  @Input() freqLabel;
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
  @Input() showSeasonal: boolean;
  @Input() hasNonSeasonal: boolean;
  @Input() hasSeasonal;
  private gridApi;
  columnDefs;
  rows;
  frameworkComponents;
  paginationSizeOptions: number[] = [];
  selectedPaginationSize;
  totalPages: number;
  totalRows: number;
  paginationSize: number;
  disablePrevious: boolean;
  disableNext: boolean;
  noSeriesToDisplay;
  gridOptions;

  constructor(
    @Inject('defaultRange') private defaultRange,
    private analyzerService: AnalyzerService,
    private helperService: HelperService,
  ) {
    this.frameworkComponents = {
      categoryTableRender: CategoryTableRenderComponent
    };
  }

  ngOnChanges() {
    this.rows = [];
    this.gridOptions = {
      localeText: {
        noRowsToShow: 'Current selections do not return any data, please try a different combination'
      }
    };
    if (this.data) {
      this.columnDefs = this.setTableColumns(this.dates, this.freq, this.defaultRange, this.tableStart, this.tableEnd);
      this.data.forEach((series) => {
        if (series.seriesInfo !== 'No data available' && this.dates) {
          series.display = this.helperService.toggleSeriesForSeasonalDisplay(series, this.showSeasonal, this.hasSeasonal);
          series.seriesInfo.analyze = this.analyzerService.checkAnalyzer(series.seriesInfo);
          const transformations = this.helperService.getTransformations(series.seriesInfo.seriesObservations);
          const { level, yoy, ytd, c5ma } = transformations;
          const seriesData = this.selectedDataList ?
            this.formatLvlData(series, level, this.selectedDataList.id) :
            this.formatLvlData(series, level, null);
          if (series.display) { this.rows.push(seriesData); }
          if (this.yoyActive) {
            const yoyData = this.formatTransformationData(series, yoy, 'pc1');
            if (series.display) { this.rows.push(yoyData); }
          }
          if (this.ytdActive && this.freq !== 'A') {
            const ytdData = this.formatTransformationData(series, ytd, 'ytd');
            if (series.display) { this.rows.push(ytdData); }
          }
          if (this.c5maActive) {
            const c5maData = this.formatTransformationData(series, c5ma, 'c5ma');
            if (series.display) { this.rows.push(c5maData); }
          }
        }
      });
    }
    this.noSeriesToDisplay = this.helperService.checkIfSeriesAvailable(this.noSeries, this.data);
  }

  setTableColumns = (dates, freq, defaultRange, tableStart, tableEnd) => {
    const columns: Array<any> = [];
    columns.push({
      field: 'series',
      headerName: 'Series',
      colId: 'series',
      pinned: 'left',
      width: 275,
      cellRenderer: 'categoryTableRender',
      tooltipValueGetter(params) {
        return params.value;
      }
    });
    const defaultRanges = this.helperService.setDefaultCategoryRange(freq, dates, defaultRange);
    let { startIndex, endIndex } = defaultRanges;
    dates.forEach((date, index) => {
      if (date.date === tableStart) {
        startIndex = index;
      }
      if (date.date === tableEnd) {
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
      columns.push({ field: tableDates[i].date, headerName: tableDates[i].tableDate, width: 125, colId: i });
    }
    return columns;
  }

  formatLvlData = (series, level, parentId) => {
    const { dates, values } = level;
    const units = series.seriesInfo.unitsLabelShort ? series.seriesInfo.unitsLabelShort : series.seriesInfo.unitsLabel;
    const seriesData = {
      series: `${series.seriesInfo.tablePrefix || ''} ${series.seriesInfo.displayName} ${series.seriesInfo.tablePostfix || ''} (${units})`,
      saParam: series.seriesInfo.saParam,
      seriesInfo: series.seriesInfo,
      lvlData: true,
      categoryId: parentId
    };
    dates.forEach((d, index) => {
      seriesData[d] = this.helperService.formatNum(+values[index], series.seriesInfo.decimals);
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
      const disName = this.formatTransformationName(transformation.transformation, series.seriesInfo.percent);
      data.series = disName;
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
    const transformationLabels = {
      'pc1': 'YOY',
      'ytd': 'YTD',
      'c5ma': 'Annual'
    }
    return percent ? `${transformationLabels[transformation]} (ch.)` : `${transformationLabels[transformation]} (%)`;
  }

  onExport = () => {
    const allColumns = this.gridApi.csvCreator.columnController.allDisplayedColumns;
    const exportColumns = [];
    const parentName = this.selectedCategory ? this.selectedCategory.name + ': ' : '';
    const sublistName = this.selectedDataList ? this.selectedDataList.name : '';
    let geoAndFreq = '';
    if (this.geo) {
      geoAndFreq += `${this.geo.name}`;
    }
    if (this.freqLabel) {
      geoAndFreq += `-${this.freqLabel}`;
    }
    const fileName = geoAndFreq ? `${sublistName}_${geoAndFreq}` : sublistName;
    const catId = this.selectedCategory ? this.selectedCategory.id : '';
    const dataListId = this.selectedDataList ? `&data_list_id=${this.selectedDataList.id}` : '';
    for (let i = allColumns.length - 1; i >= 0; i--) {
      exportColumns.push(allColumns[i]);
    }
    const params = {
      columnKeys: exportColumns,
      suppressQuotes: false,
      fileName,
      customFooter: `\n\n ${parentName}${sublistName} Table \n ${geoAndFreq} \n ${this.portalSettings.catTable.portalLink + catId + dataListId}&view=table`
    };
    this.gridApi.exportDataAsCsv(params);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
  }
}
