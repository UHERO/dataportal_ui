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
  private routeYoy;
  private routeYtd;
  private queryParams: any = {};

  // Variables for geo and freq selectors
  public currentGeo: Geography;
  public currentFreq: Frequency;
  private categoryData;
  private loading = false;

  constructor(
    private _uheroAPIService: UheroApiService,
    private _catHelper: CategoryHelperService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

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
      this.routeYoy = params['yoy'];
      this.routeYtd = params['ytd'];
      if (this.id) {
        this.queryParams.id = this.id;
      };
      if (this.routeSearch) { this.queryParams.search = this.routeSearch; delete this.queryParams.id; };
      if (this.routeGeo) { this.queryParams.geo = this.routeGeo; };
      if (this.routeFreq) { this.queryParams.freq = this.routeFreq; };
      if (this.routeView) { this.queryParams.view = this.routeView; };
      if (this.routeYoy) {this.queryParams.yoy = this.routeYoy; } else { delete this.queryParams.yoy; }
      if (this.routeYtd) {this.queryParams.ytd = this.routeYtd; } else { delete this.queryParams.ytd; }

      if (this.routeSearch) {
        if (this.routeGeo && this.routeFreq) {
          this.categoryData = this._catHelper.initSearch(this.routeSearch, this.routeGeo, this.routeFreq);
        } else {
          this.categoryData = this._catHelper.initSearch(this.routeSearch);
        }
      } else {
        if (this.routeGeo && this.routeFreq) {
          this.categoryData = this._catHelper.initContent(this.id, this.routeGeo, this.routeFreq);
        } else {
          this.categoryData = this._catHelper.initContent(this.id);
          console.log(this.categoryData)
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Redraw series when a new region is selected
  redrawSeriesGeo(event, currentFreq) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.freq = currentFreq.freq;
      this.queryParams.geo = event.handle;
      if (this.routeSearch) {
        delete this.queryParams.id;
      } else {
        delete this.queryParams.search;
      }
      if (this.routeSearch) {
        this._router.navigate(['/category'], { queryParams: this.queryParams });
      } else {
        this._router.navigate(['/category'], { queryParams: this.queryParams });
      }
      this.loading = false;
    }, 10);
  }

  redrawSeriesFreq(event, currentGeo) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.geo = currentGeo.handle;
      this.queryParams.freq = event.freq;
      if (this.routeSearch) {
        delete this.queryParams.id;
      } else {
        delete this.queryParams.search;
      }
      this._router.navigate(['/category'], { queryParams: this.queryParams });
      this.loading = false;
    }, 10);
  }

  switchView() {
    if (this.routeSearch) {
      delete this.queryParams.id;
    } else {
      delete this.queryParams.search;
    }
    if (this.routeView === 'table') {
      this.queryParams.view = 'chart';
      this._router.navigate(['/category'], { queryParams: this.queryParams });
    } else {
      this.queryParams.view = 'table';
      this._router.navigate(['/category'], { queryParams: this.queryParams });
    }
  }

  yoyActive(e) {
    this.loading = true;
    setTimeout(() => {
      this.routeYoy = e.target.checked;
      this.queryParams.yoy = e.target.checked;
      this._router.navigate(['/category'], { queryParams: this.queryParams });
      this.loading = false;
    }, 10);
  }

  ytdActive(e) {
    this.loading = true;
    setTimeout(() => {
      this.routeYtd = e.target.checked;
      this.queryParams.ytd = e.target.checked;
      this._router.navigate(['/category'], { queryParams: this.queryParams });
      this.loading = false;
    }, 10);
  }

  scrollTo(): void {
    this.route.fragment.subscribe(frag => {
      console.log(frag)
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
