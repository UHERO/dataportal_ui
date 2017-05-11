// Component for multi-chart view
import { Component, OnInit, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

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
  private routeView: string;
  private routeYoy;
  private routeYtd;
  private search = false;
  private queryParams: any = {};

  // Variables for geo and freq selectors
  public currentGeo: Geography;
  public currentFreq: Frequency;
  public categoryData;
  private loading = false;
  private fragment;
  private userEvent;

  constructor(
    private _uheroAPIService: UheroApiService,
    private _catHelper: CategoryHelperService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.currentGeo = { fips: null, name: null, handle: null };
    this.currentFreq = { freq: null, label: null };
  }

  ngAfterViewInit() {
    this.sub = this.route.queryParams.subscribe((params) => {
      if (!params['id'] || params['id'] === undefined) {
        this.id = 42;
      } else {
        if (isNaN(+params['id'])) {
          this.id = params['id'];
          this.search = true;
        }
        if (+params['id']) {
          this.id = +params['id'];
          this.search = false;
        }
      }
      this.routeGeo = params['geo'];
      this.routeFreq = params['freq'];
      this.routeView = params['view'];
      this.routeYoy = params['yoy'];
      this.routeYtd = params['ytd'];
      if (this.id) { this.queryParams.id = this.id; };
      if (this.routeGeo) { this.queryParams.geo = this.routeGeo; };
      if (this.routeFreq) { this.queryParams.freq = this.routeFreq; };
      if (this.routeView) { this.queryParams.view = this.routeView; };
      if (this.routeYoy) { this.queryParams.yoy = this.routeYoy; } else { delete this.queryParams.yoy; }
      if (this.routeYtd) { this.queryParams.ytd = this.routeYtd; } else { delete this.queryParams.ytd; }

      if (typeof this.id === 'string') {
        if (this.routeGeo && this.routeFreq) {
          this.categoryData = this._catHelper.initSearch(this.id, this.routeGeo, this.routeFreq);
        } else {
          this.categoryData = this._catHelper.initSearch(this.id);
        }
      } else {
        if (this.routeGeo && this.routeFreq) {
          this.categoryData = this._catHelper.initContent(this.id, this.routeGeo, this.routeFreq);
        } else {
          this.categoryData = this._catHelper.initContent(this.id);
        }
      }
    });
  }

  ngAfterViewChecked() {
    // When directly navigating to a link containing a fragment, scroll to element
    // prevent scrolling user interacts with mouse
    if (!this.userEvent) {
      this.scrollTo();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Redraw series when a new region is selected
  redrawSeriesGeo(event, currentFreq, subId) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.geo = event.handle;
      this.queryParams.freq = currentFreq.freq;
      this.fragment = subId;
      this.updateRoute();
    }, 10);
    this.scrollToFragment();
  }

  redrawSeriesFreq(event, currentGeo, subId) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.geo = currentGeo.handle;
      this.queryParams.freq = event.freq;
      this.fragment = subId;
      this.updateRoute();
    }, 10);
    this.scrollToFragment();
  }

  switchView(subId) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.view = this.routeView === 'table' ? 'chart' : 'table';
      this.fragment = subId;
      this.updateRoute();
    });
    this.scrollToFragment();
  }

  yoyActive(e, subId) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.yoy = e.target.checked;
      this.fragment = subId;
      this.updateRoute();
    }, 10);
    this.scrollToFragment();
  }

  ytdActive(e, subId) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.ytd = e.target.checked;
      this.fragment = subId;
      this.updateRoute();
    }, 10);
    this.scrollToFragment();
  }

  // Work around for srolling to page anchor
  scrollToFragment() {
    setTimeout(() => {
      this.scrollTo();
    }, 10);
  }

  userMouse() {
    console.log('true')
    this.userEvent = true;
  }

  updateRoute() {
    this.queryParams.id = this.queryParams.id ? this.queryParams.id : this.id;
    this._router.navigate(['/category'], { queryParams: this.queryParams, queryParamsHandling: 'merge', fragment: this.fragment });
    this.loading = false;
  }

  scrollTo(): void {
    this.route.fragment.subscribe(frag => {
      const el = <HTMLElement>document.querySelector('#id_' + frag);
      if (el) {
        el.scrollIntoView(el);
        const scrolledY = window.scrollY;
        if (scrolledY) {
          window.scroll(0, scrolledY - 75);
        }
      }
      if (frag === 'top') { el.scrollTop; };
    });
  }
}
