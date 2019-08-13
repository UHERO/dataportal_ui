// Component for multi-chart view
import { Inject, Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { AnalyzerService } from '../analyzer.service';
import { CategoryHelperService } from '../category-helper.service';
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';
import 'jquery';
import { HelperService } from '../helper.service';
declare var $: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private sub;
  private defaultCategory;
  private id: number;
  private dataListId: number;
  private routeGeo: string;
  private routeFreq: string;
  private routeView: string;
  private routeYoy;
  private routeYtd;
  private routeStart;
  private routeEnd;
  private search = false;
  private queryParams: any = {};
  private tableStart;
  private tableEnd;
  private seriesStart = null;
  private seriesEnd = null;
  private portalSettings;
  private displaySeries;
  private seriesInAnalyzer;
  private toggleSeriesInAnalyzer;

  // Variables for geo and freq selectors
  public currentGeo: Geography;
  public currentFreq: Frequency;
  public categoryData;
  private loading = false;
  private userEvent;

  constructor(
    @Inject('portal') private portal,
    private _analyzer: AnalyzerService,
    private _dataPortalSettings: DataPortalSettingsService,
    private _catHelper: CategoryHelperService,
    private _helperService: HelperService,
    private route: ActivatedRoute,
    private _router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.toggleSeriesInAnalyzer = this._analyzer.updateAnalyzerCount.subscribe((data: any) => {
      this.seriesInAnalyzer = { id: data.id, analyze: data.analyze };
    });
  }

  ngOnInit() {
    this.currentGeo = { fips: null, name: null, shortName: null, handle: null };
    this.currentFreq = { freq: null, label: null };
    this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal.universe];
  }

  ngAfterViewInit() {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.id = this.getIdParam(params['id']);
      this.dataListId = this.getIdParam(params['data_list_id']);
      this.search = typeof this.id === 'string' ? true : false;
      this.routeGeo = params['geo'];
      this.routeFreq = params['freq'];
      this.routeView = params['view'];
      this.routeYoy = params['yoy'];
      this.routeYtd = params['ytd'];
      this.routeStart = params['start'];
      this.routeEnd = params['end'];
      if (this.id) { this.queryParams.id = this.id; };
      if (this.dataListId) { this.queryParams.data_list_id = this.dataListId; };
      if (this.routeGeo) { this.queryParams.geo = this.routeGeo; };
      if (this.routeFreq) { this.queryParams.freq = this.routeFreq; };
      if (this.routeView) { this.queryParams.view = this.routeView; };
      if (this.routeYoy) { this.queryParams.yoy = this.routeYoy; } else { delete this.queryParams.yoy; }
      if (this.routeYtd) { this.queryParams.ytd = this.routeYtd; } else { delete this.queryParams.ytd; }
      this.categoryData = this.getData(this.id, this.dataListId, this.routeGeo, this.routeFreq);
      this._helperService.updateCatData(this.categoryData);
      // Run change detection explicitly after the change:
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getIdParam(id) {
    if (id === undefined) {
      return null;
    }
    if (id && isNaN(+id)) {
      // id param is a string, display search results
      return id;
    }
    if (id && +id) {
      // id of category selected in sidebar
      return +id;
    }
  }

  getData(id, dataListId, geo, freq) {
    if (geo && freq) {
      return (typeof id === 'number' || id === null) ?
        this._catHelper.initContent(id, dataListId, geo, freq) :
        this._catHelper.initSearch(id, geo, freq);
    }
    if (!geo && !freq) {
      /* return (typeof id === 'number' || id === null) ?
        this._catHelper.initContent(id, dataListId) :
        this._catHelper.initSearch(id); */
      if (typeof id === 'number') {
        console.log('NUMBER')
        return this._catHelper.initContent(id, dataListId);
      }
      if (id === null) {
        console.log('NULL')
        return this._catHelper.initContent(id, dataListId);
      }
      console.log('SEARCH')
      return this._catHelper.initSearch(id);
    }
  }

  // Redraw series when a new region is selected
  redrawSeriesGeo(event, currentFreq) {
    this.displaySeries = false;
    this.loading = true;
    setTimeout(() => {
      this.queryParams.geo = event.handle;
      this.queryParams.freq = currentFreq.freq;
      this.updateRoute();
    }, 20);
  }

  redrawSeriesFreq(event, currentGeo) {
    this.displaySeries = false;
    this.loading = true;
    setTimeout(() => {
      this.queryParams.geo = currentGeo.handle;
      this.queryParams.freq = event.freq;
      this.updateRoute();
    }, 10);
  }

  switchView() {
    this.loading = true;
    this.displaySeries = false;
    setTimeout(() => {
      this.queryParams.view = this.routeView === 'table' ? 'chart' : 'table';
      this.updateRoute();
    });
  }

  yoyActive(e) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.yoy = e.target.checked;
      this.updateRoute();
    }, 10);
  }

  ytdActive(e) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.ytd = e.target.checked;
      this.updateRoute();
    }, 10);
  }

  changeRange(e) {
    this.seriesStart = e.seriesStart;
    this.seriesEnd = e.endOfSample ? null : e.seriesEnd;
    this.displaySeries = true;
  }

  updateRoute() {
    this.queryParams.id = this.queryParams.id ? this.queryParams.id : this.id;
    this.queryParams.data_list_id = this.queryParams.data_list_id ? this.queryParams.data_list_id : this.dataListId;
    const urlPath = typeof this.queryParams.id === 'string' ? '/search' : '/category';
    this._router.navigate([urlPath], { queryParams: this.queryParams, queryParamsHandling: 'merge' });
    this.loading = false;
    this.displaySeries = true;
  }
}
