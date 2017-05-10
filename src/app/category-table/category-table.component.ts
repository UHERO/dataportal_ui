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
    // Do not force scroll to the right if mouseover event occurs
    // Prevents scrollbar from resetting to the right afer manually scrolling
    if (!this.userEvent) {
      this.tableScroll();
      /* this.route.fragment.subscribe(frag => {
        const el = <HTMLElement>document.querySelector('#id_' + frag);
        if (el) el.scrollIntoView(el);
      });*/
    }
  }

  showTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  hideInfo() {
    $('[data-toggle="tooltip"]').tooltip('hide');
    $('.popover').remove();
  }

  showPopover(seriesInfo) {
    $('[data-toggle="tooltip"]').tooltip('hide');
    const popover = $('#' + seriesInfo.id).popover({
      trigger: 'manual',
      placement: 'top',
      html: true,
      title: seriesInfo.title + "<i class='material-icons close-info' onclick='$(this.parentElement.parentElement).popover(" + '"hide"' + ")'>&#xE14C;</i>",
      content: 'Units: ' + seriesInfo.unitsLabelShort + 
        '<br> Source Description: ' + seriesInfo.sourceDescription +
        "<br> Source Link:  <a target='_blank' href='"+ seriesInfo.sourceLink + "'>" + seriesInfo.sourceLink
    });
    popover.popover('toggle')
  }

  // On load, table scrollbars should start at the right -- showing most recent data
  tableScroll(): void {
    try {
      this.tableEl._results.forEach((el, index) => {
        this.tableEl._results[index].nativeElement.scrollLeft = this.tableEl._results[index].nativeElement.scrollWidth;
      });
    } catch (err) {
      console.log(err);
    }
  }

  userMouse(): void {
    this.userEvent = true;
  }
}
