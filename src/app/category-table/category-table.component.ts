import { Component, OnInit, ViewChild, ViewChildren, ViewEncapsulation, AfterViewInit, QueryList, AfterViewChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { CategoryHelperService } from '../category-helper.service';
import { HelperService } from '../helper.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';

import { error } from 'util';


@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryTableComponent implements OnInit, AfterViewInit {
  @ViewChildren('tableScroll') private tableEl;

  private arSub;
  private id: number;
  private routeGeo: string;
  private routeFreq: string;
  private routeSearch: string;
  private queryParams: any = {};

  // Check if seasonally adjusted data is displayed, default to true
  private yoyIsActive: boolean = false;
  private ytdIsActive: boolean = false;
  private userEvent: boolean = false;
  private errorMessage: string;
  private categoryData;

  // Variables for geo and freq selectors
  public currentGeo: Geography;
  public currentFreq: Frequency;

  constructor(private _uheroAPIService: UheroApiService, private _catHelper: CategoryHelperService, private _helper: HelperService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.currentGeo = {fips: null, name: null, handle: null};
    this.currentFreq = {freq: null, label: null};
  }

  ngAfterViewInit() {
    // Get (optional) query parameters from URL
    this.arSub = this.route.queryParams.subscribe((params) => {
      this.id = +params['id'] || 42;
      this.routeGeo = params['geo'];
      this.routeFreq = params['freq'];
      this.routeSearch = params['search'];
      if (this.id) this.queryParams.id = this.id;
      if (this.routeSearch) {this.queryParams.search = this.routeSearch; delete this.queryParams.id};
      if (this.routeGeo) this.queryParams.geo = this.routeGeo;
      if (this.routeFreq) this.queryParams.freq = this.routeFreq;

      if (this.routeSearch) {
        if (this.routeGeo && this.routeFreq) {
          this.getSearchData(this.routeSearch, this.routeGeo, this.routeFreq);
        } else {
          this.getSearchData(this.routeSearch);
        }
      } else {
        if (this.routeGeo && this.routeFreq) {
          this.getCategoryData(this.id, this.routeGeo, this.routeFreq);
        } else {
          this.getCategoryData(this.id);
        }
      }
    });
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
    this.arSub.unsubscribe();
  }

  getCategoryData(id: number, routeGeo?: string, routeFreq?: string) {
    this.categoryData = this._catHelper.initContent(id, routeGeo, routeFreq);
    console.log('table data', this.categoryData);
  }

  getSearchData(search: string, routeGeo?: string, routeFreq?: string) {
    this.categoryData = this._catHelper.initSearch(search, routeGeo, routeFreq);
  }

  // Update table data when a new region/frequency is selected
  redrawTableGeo(event, currentFreq) {
    // Reset table scrollbar position to the right when new region is selected
    this.userEvent = false;
    let freq = currentFreq.freq;
    let geoHandle = event.handle;  
    if (this.routeSearch) {
      this._router.navigate(['/category/table'], {queryParams: {search: this.routeSearch, geo: geoHandle, freq: freq} });
    } else {
      this._router.navigate(['/category/table'], {queryParams: {id: this.id, geo: geoHandle, freq: freq} });
    }
  }

  redrawTableFreq(event, currentGeo) {
    // Reset table scrollbar position to the right when new frequency is selected
    this.userEvent = false;
    let geoHandle = currentGeo.handle;
    let freq = event.freq;
    if (this.routeSearch) {
      this._router.navigate(['/category/table'], {queryParams: {search: this.routeSearch, geo: geoHandle, freq: freq} });
    } else {
      this._router.navigate(['/category/table'], {queryParams: {id: this.id, geo: geoHandle, freq} });
    }
  }

  onSearch(event) {
    this._router.navigate(['/category/search'], {queryParams: {search: event} })
  }

  yoyActive(e) {
    this.yoyIsActive = e.target.checked;
  }

  ytdActive(e) {
    this.ytdIsActive = e.target.checked;
  }

  scrollTo(): void {
    this.route.fragment.subscribe(frag => {
      const el = <HTMLElement>document.querySelector('#id_' + frag);
      if (el) el.scrollIntoView(el);
      if (frag === 'top') el.scrollTop;
    });
  }

  // On load, table scrollbars should start at the right -- showing most recent data
  tableScroll(): void {
    try {
      this.tableEl._results.forEach((el, index) => {
        this.tableEl._results[index].nativeElement.scrollLeft = this.tableEl._results[index].nativeElement.scrollWidth;
      })
    } catch(err) {
      console.log(err) 
    } 
  }

  userMouse(): void {
    this.userEvent = true;
  }
}