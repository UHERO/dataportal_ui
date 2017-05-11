import { Component, OnInit, Input, ViewChildren, ViewEncapsulation, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { CategoryHelperService } from '../category-helper.service';
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

  // Check if seasonally adjusted data is displayed, default to true
  private userEvent = false;
  private errorMessage: string;
  private categoryData;
  private tooltipInfo;
  private loading = false;
  private previousHeight;

  constructor(
    private _uheroAPIService: UheroApiService,
    private _catHelper: CategoryHelperService,
    private _helper: HelperService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
  }

  ngAfterViewChecked() {
    // Check height of content and scroll tables to the right
    // If true, height is changing, i.e. content still loading
    if (this.checkContainerHeight()) {
      this.tableScroll();
    }
  }

  checkContainerHeight() {
    const contianer = $('.multi-series-container');
    const heightDiff = (this.previousHeight !== contianer.height());
    this.previousHeight = contianer.height();
    return heightDiff;
  }

  showTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  hideInfo() {
    $('[data-toggle="tooltip"]').tooltip('hide');
    $('.popover').popover('dispose');
  }

  showPopover(seriesInfo) {
    $('[data-toggle="tooltip"]').tooltip('hide');
    // Prevent multiple popovers from being open at once
    const activePopover = $('.popover').not('#' + seriesInfo.id);
    activePopover.popover('toggle');
    const popover = $('#' + seriesInfo.id).popover({
      trigger: 'manual',
      placement: 'top',
      html: true,
      title: seriesInfo.title +
        '<i class="material-icons close-info" onclick="$(this.parentElement.parentElement).popover(' + "'dispose'" + ')">&#xE14C;</i>',
      content: function() {
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

  userMouse(): void {
    this.userEvent = true;
  }
}
