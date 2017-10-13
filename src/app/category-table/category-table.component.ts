import { Component, Inject, Input, ViewChildren, ViewEncapsulation, OnInit, OnChanges, AfterViewChecked } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None
})
export class CategoryTableComponent implements AfterViewChecked, OnChanges {
  @ViewChildren('tableScroll') private tableEl;
  @Input() data;
  @Input() subCats;
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
      const defaultRanges = this._helper.setDefaultTableRange(this.freq, this.dates, this.defaultRange);
      let startIndex = defaultRanges.start, endIndex = defaultRanges.end;
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
          if (series.seriesInfo !== 'No data available') {
            series.trimCatTable = series.categoryTable.slice(start, end + 1);
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

  showTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  hideInfo(seriesId) {
    // this.submitGAEvent(seriesId);
    return this._table.hideInfo(seriesId);
  }

  showPopover(seriesInfo, subcatIndex) {
    return this._table.showPopover(seriesInfo, subcatIndex);
  }

  updateAnalyze(seriesInfo, tableData, chartData) {
    this._analyzer.updateAnalyzer(seriesInfo, tableData, chartData);
  }
}
