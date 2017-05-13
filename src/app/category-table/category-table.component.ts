import { Component, OnInit, Input, ViewChildren, ViewEncapsulation, OnChanges, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { CategoryHelperService } from '../category-helper.service';
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
export class CategoryTableComponent implements OnInit, AfterViewChecked {
  @ViewChildren('tableScroll') private tableEl;
  @Input() data;
  @Input() dates;
  @Input() noSeries;
  @Input() yoyActive;
  @Input() ytdActive;
  @Input() params;
  @Input() subcatIndex;

  private previousHeight;
  private tableWidths = [];
  private tableHeaders = [];

  constructor(
    private _uheroAPIService: UheroApiService,
    private _catHelper: CategoryHelperService,
    private _helper: HelperService,
    private route: ActivatedRoute,
    private _router: Router,
    private googleAES: GoogleAnalyticsEventsService
  ) { }

  ngOnInit() {
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
      tables.each(function(index) {
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
      placement: 'top',
      html: true,
      title: function () {
        let title = '';
        if (seriesInfo.seasonalAdjustment === 'seasonally_adjusted') {
          title = seriesInfo.title + ' (SA)';
        } else {
          title = seriesInfo.title;
        }
        return title; /* + '<i class="material-icons close-info" onclick="$(this.parentElement.parentElement).popover(' + "'dispose'" + ')">&#xE14C;</i>'; */
      },
      content: function () {
        let info = '';
        if (seriesInfo.unitsLabelShort) {
          info += 'Units: ' + seriesInfo.unitsLabelShort;
        }
        if (seriesInfo.sourceDescription) {
          info += '<br> Source Description: ' + seriesInfo.sourceDescription;
        }
        if (seriesInfo.sourceLink) {
          info += '<br> Source Link: <a target="_blank" href="' + seriesInfo.sourceLink + '">' + seriesInfo.sourceLink + '</a>';
        }
        return info;
      }
    }).on('show.bs.popover', function (e) {
      $('.popover').not(e.target).popover('dispose');
    });
    popover.popover('toggle');
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
