import { Component, Inject, Input, ViewChildren, ViewEncapsulation, OnInit, OnChanges, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyzerService } from '../analyzer.service';
import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';
import { TableHelperService } from '../table-helper.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTableComponent implements OnInit, AfterViewChecked, OnChanges {
  @ViewChildren('tableScroll') private tableEl;
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

  private tableHeader;
  private previousHeight;
  private tableWidths = [];

  constructor(
    @Inject('defaultRange') private defaultRange,
    private _uheroAPIService: UheroApiService,
    private _table: TableHelperService,
    private _helper: HelperService,
    private route: ActivatedRoute,
    private _router: Router,
    private _analyzer: AnalyzerService
  ) { }

  ngOnInit() {
    this.data.forEach((chartSeries) => {
      if (chartSeries.seriesInfo !== 'No data available') {
        chartSeries.seriesInfo.analyze = this._analyzer.checkAnalyzer(chartSeries.seriesInfo);
      }
    });
  }

  ngOnChanges() {
    if (this.dates) {
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
      this.tableHeader = this.dates.slice(start, end + 1);
      if (this.data) {
        this.data.forEach((series) => {
          if (series.seriesInfo !== 'No data available' && this.dates) {
            const decimal = series.seriesInfo.decimals;
            series.categoryTable = this.createSeriesTable(series.seriesInfo.seriesObservations.transformationResults, this.dates, start, end, decimal);
          }
        });
      }
    }
  }

  ngAfterViewChecked() {
    // Check height of content and scroll tables to the right
    // If true, height is changing, i.e. content still loading
    const container = this._table.checkContainerHeight(this.previousHeight);
    this.previousHeight = container.previousHeight;
    if (container.scroll) {
      // On load, table scrollbars should start at the right -- showing most recent data
      this._table.tableScroll(this.tableEl);
    }

    // Scroll tables to the right when table widths changes, i.e. changing frequency from A to Q | M
    return this._table.checkTableWidth(this.tableWidths);
  }

  createSeriesTable = (transformations, categoryDates, start, end, decimal) => {
    const categoryTable = {};
    transformations.forEach((t) => {
      const { transformation, dates, values, pseudoHistory } = t;
      if (dates && values) {
        const transformationValues = [];
        const dateDiff = categoryDates.filter(date => !dates.includes(date.date));
        if (!dateDiff.length) {
          //categoryTable[`${transformation}DownloadTable`] = this.formatValues(values, decimal);
          categoryTable[`${transformation}CategoryTable`] = this.formatValues(values.slice(start, end + 1), decimal);
        }
        if (dateDiff.length) {
          categoryDates.forEach((sDate) => {
            const dateExists = this._helper.binarySearch(dates, sDate.date);
            dateExists > -1 ? transformationValues.push(values[dateExists]) : transformationValues.push('');
          });
          //categoryTable[`${transformation}DownloadTable`] = this.formatValues(transformationValues, decimal);
          categoryTable[`${transformation}CategoryTable`] = this.formatValues(transformationValues.slice(start, end + 1), decimal);
        }  
      }
    });
    return categoryTable;
  }

  formatValues = (values, decimal) => values.map(i => i === '' ? '' : +i).map(i => i.toLocaleString('en-US', { minimumFractionDigits: decimal, maximumFractionDigits: decimal }));

  showTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  hideInfo(seriesId) {
    return this._table.hideInfo(seriesId);
  }

  showPopover(seriesInfo, subcatIndex) {
    return this._table.showPopover(seriesInfo, subcatIndex);
  }

  updateAnalyze(seriesInfo, tableData, chartData) {
    this._analyzer.updateAnalyzer(seriesInfo.id, tableData, chartData);
    seriesInfo.analyze = this._analyzer.checkAnalyzer(seriesInfo);
  }

  trackBySeries(index, item) {
    return item.seriesInfo.id;
  }
}
