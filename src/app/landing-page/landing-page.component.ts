// Component for multi-chart view
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { CategoryHelperService } from '../category-helper.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private sub;
  private id: number;
  private routeGeo: string;
  private routeFreq: string;
  private routeSearch: string;
  private routeView: string;
  private queryParams: any = {};

  // Variables for geo and freq selectors
  public currentGeo: Geography;
  public currentFreq: Frequency;
  private categoryData;
  private yoyIsActive: boolean = false;
  private ytdIsActive: boolean = false;
  private nsaIsActive: boolean = false;
  private loading: boolean = false;

  constructor(private _uheroAPIService: UheroApiService, private _catHelper: CategoryHelperService, private route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {
    this.currentGeo = {fips: null, name: null, handle: null};
    this.currentFreq = {freq: null, label: null};
  }

  ngAfterViewInit() {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.id = +params['id'] || 42;
      this.routeGeo = params['geo'];
      this.routeFreq = params['freq'];
      this.routeSearch = params['search'];
      this.routeView = params['view'];
      if (this.id) { this.queryParams.id = this.id };
      if (this.routeSearch) { this.queryParams.search = this.routeSearch; delete this.queryParams.id };
      if (this.routeGeo) { this.queryParams.geo = this.routeGeo };
      if (this.routeFreq) { this.queryParams.freq = this.routeFreq };
      if (this.routeView) { this.queryParams.view = this.routeView };

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCategoryData(id: number, routeGeo?: string, routeFreq?: string) {
    this.categoryData = this._catHelper.initContent(id, routeGeo, routeFreq);
  }

  getSearchData(search: string, routeGeo?: string, routeFreq?: string) {
    this.categoryData = this._catHelper.initSearch(search, routeGeo, routeFreq);
  }

  nsaActive(e) {
    this.loading = true;
    setTimeout(() => {
      this.nsaIsActive = e.target.checked;
      this.loading = false;
    }, 10);
  }

  // Redraw series when a new region is selected
  redrawSeriesGeo(event, currentFreq) {
    let freq = currentFreq.freq;
    let geoHandle = event.handle;
    if (this.routeSearch) {
      this._router.navigate(['/category'], {queryParams: {search: this.routeSearch, view: this.routeView, geo: geoHandle, freq: freq} });
    } else {
      this._router.navigate(['/category'], {queryParams: {id: this.id, view: this.routeView, geo: geoHandle, freq: freq} });
    }
  }

  redrawSeriesFreq(event, currentGeo) {
    let geoHandle = currentGeo.handle;
    let freq = event.freq;
    if (this.routeSearch) {
      this._router.navigate(['/category'], {queryParams: {search: this.routeSearch, view: this.routeView, geo: geoHandle, freq: freq} });
    } else {
      this._router.navigate(['/category'], {queryParams: {id: this.id, view: this.routeView, geo: geoHandle, freq: freq} });
    }
  }

  switchView() {
    if (this.routeView === 'table') {
      this._router.navigate(['/category'], {queryParams: {id: this.id, view: 'chart', geo: this.routeGeo, freq: this.routeFreq} });
    } else {
      this._router.navigate(['/category'], {queryParams: {id: this.id, view: 'table', geo: this.routeGeo, freq: this.routeFreq} });
    }
  }

  yoyActive(e) {
    this.loading = true;
    setTimeout(() => {
      this.yoyIsActive = e.target.checked;
      this.loading = false;
    }, 10);
  }

  ytdActive(e) {
    this.loading = true;
    setTimeout(() => {
      this.ytdIsActive = e.target.checked;
      this.loading = false;
    }, 10);
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
}
