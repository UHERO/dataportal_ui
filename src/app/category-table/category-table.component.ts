import { Component, Inject, Input, ViewChildren, ViewEncapsulation, OnInit, OnChanges, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyzerService } from '../analyzer.service';
import { UheroApiService } from '../uhero-api.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';
import { HelperService } from '../helper.service';
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
    private _helper: HelperService,
    private route: ActivatedRoute,
    private _router: Router,
    private _analyzer: AnalyzerService,
    private googleAES: GoogleAnalyticsEventsService
  ) { }

  ngOnInit() {
    this.data.forEach((chartSeries) => {
      chartSeries.seriesInfo.analyze = this._analyzer.checkAnalyzer(chartSeries.seriesInfo);
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
    if (this.checkContainerHeight()) {
      this.tableScroll();
    }

    // Scroll tables to the right when table widths changes, i.e. changing frequency from A to Q | M
    this.checkTableWidth();
  }

  checkContainerHeight() {
    const contianer = $('.multi-series-container');
    const heightDiff = (this.previousHeight !== contianer.height());
    this.previousHeight = contianer.height();
    return heightDiff;
  }

  checkTableWidth() {
    const tables = $('.table');
    const tableWidths = this.tableWidths;
    if (tables) {
      tables.each(function (index) {
        const widthDiff = (tableWidths[index] !== tables[index].scrollWidth);
        if (widthDiff) {
          tables[index].scrollLeft = tables[index].scrollWidth;
        }
        tableWidths[index] = tables[index].scrollWidth;
      });
    }
  }

  showTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  hideInfo(seriesId) {
    $('[data-toggle="tooltip"]').tooltip('hide');
    $('.popover').popover('dispose');
    this.submitGAEvent(seriesId);
  }

  showPopover(subcatIndex, seriesInfo) {
    $('[data-toggle="tooltip"]').tooltip('hide');
    const popover = $('#' + subcatIndex + seriesInfo.id).popover({
      trigger: 'manual',
      placement: function (popoverEl, el) {
        // popoverEl = popover DOM element
        // el = DOM element that triggers popover
        let position = 'top';
        const elOffset = $(el).offset().top;
        if (elOffset <= 150) {
          position = 'bottom';
        }
        return position;
      },
      html: true,
      title: function () {
        let title = seriesInfo.title;
        title += seriesInfo.unitsLabel ? ' (' + seriesInfo.unitsLabel + ')' : ' (' + seriesInfo.unitsLabelShort + ')';
        return title;
      },
      content: function () {
        let info = '';
        if (seriesInfo.seasonalAdjustment === 'seasonally_adjusted') {
          info += 'Seasonally Adjusted<br>';
        }
        if (seriesInfo.sourceDescription) {
          info += 'Source: ' + seriesInfo.sourceDescription + '<br>';
        }
        if (seriesInfo.sourceLink) {
          info += '<a target="_blank" href="' + seriesInfo.sourceLink + '">' + seriesInfo.sourceLink + '</a><br>';
        }
        if (seriesInfo.sourceDetails) {
          info += seriesInfo.sourceDetails;
        }
        return info;
      }
    }).on('show.bs.popover', function (e) {
      // Display only one popover at a time
      $('.popover').not(e.target).popover('dispose');
      setTimeout(() => {
        // Close popover on next click (source link in popover is still clickable)
        $('body').one('click', function () {
          popover.popover('dispose');
        });
      }, 1);
    });
    popover.popover('toggle');
  }

  updateAnalyze(seriesInfo, tableData, chartData) {
    this._analyzer.updateAnalyzer(seriesInfo, tableData, chartData);
  }

  // On load, table scrollbars should start at the right -- showing most recent data
  tableScroll(): void {
    try {
      this.tableEl._results.forEach((el) => {
        el.nativeElement.scrollLeft = el.nativeElement.scrollWidth;
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Google Analytics: Track clicking on series
  submitGAEvent(seriesId) {
    const id = seriesId.toString();
    this.googleAES.emitEvent('series', 'click', id);
  }
}
