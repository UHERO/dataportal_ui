import { Component, OnInit, Input, ViewChildren, ViewEncapsulation, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { CategoryHelperService } from '../category-helper.service';
import { HelperService } from '../helper.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';
import 'jquery';
declare var $: any;
//import { error } from 'util';


@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryTableComponent implements OnInit, AfterViewInit {
  @ViewChildren('tableScroll') private tableEl;
  @Input() data;
  @Input() dates;
  @Input() noSeries;
  @Input() nsaActive;
  @Input() yoyActive;
  @Input() ytdActive;

  // Check if seasonally adjusted data is displayed, default to true
  private userEvent: boolean = false;
  private errorMessage: string;
  private categoryData;
  private tooltipInfo;
  private loading: boolean = false;

  constructor(private _uheroAPIService: UheroApiService, private _catHelper: CategoryHelperService, private _helper: HelperService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
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

  ngOnDestroy() {
    //this.arSub.unsubscribe();
  }

  showTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  hideTooltip() {
    $('[data-toggle="tooltip"]').tooltip('hide');
  }

  scrollTo(): void {
    this.route.fragment.subscribe(frag => {
      const el = <HTMLElement>document.querySelector('#id_' + frag);
      if (el) {
        el.scrollIntoView(el);
        let scrolledY = window.scrollY;
        if(scrolledY){
          window.scroll(0, scrolledY - 75);
        }
      }
      if (frag === 'top') {el.scrollTop};
    });
  }

  // On load, table scrollbars should start at the right -- showing most recent data
  tableScroll(): void {
    try {
      this.tableEl._results.forEach((el, index) => {
        this.tableEl._results[index].nativeElement.scrollLeft = this.tableEl._results[index].nativeElement.scrollWidth;
      });
    } catch(err) {
      console.log(err) 
    }
  }

  userMouse(): void {
    this.userEvent = true;
  }
}