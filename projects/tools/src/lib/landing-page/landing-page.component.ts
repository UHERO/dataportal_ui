// Component for multi-chart view
import { Inject, Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { AnalyzerService } from '../analyzer.service';
import { CategoryHelperService } from '../category-helper.service';
import { HelperService } from '../helper.service';
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { Frequency } from '../tools.models';
import { Geography } from '../tools.models';
import 'jquery';
declare var $: any;

@Component({
  selector: 'lib-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private sub;
  private defaultCategory;
  private id: number;
  private dataListId: number;
  private routeGeo: string;
  private routeFreq: string;
  routeView: string;
  private routeYoy;
  private routeYtd;
  private routeSa;
  private noCache: boolean;
  routeStart;
  routeEnd;
  search = false;
  queryParams: any = {};
  private tableStart;
  private tableEnd;
  seriesStart = null;
  seriesEnd = null;
  portalSettings;
  private displaySeries;
  seriesInAnalyzer;
  private toggleSeriesInAnalyzer;

  // Variables for geo and freq selectors
  public currentGeo: Geography;
  public currentFreq: Frequency;
  public categoryData;
  private loading = false;
  private userEvent;
  constructor(
    @Inject('portal') public portal,
    private analyzerService: AnalyzerService,
    private dataPortalSettingsServ: DataPortalSettingsService,
    private catHelper: CategoryHelperService,
    private helperService: HelperService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.toggleSeriesInAnalyzer = this.analyzerService.updateAnalyzerCount.subscribe((data: any) => {
      this.seriesInAnalyzer = { id: data.id, analyze: data.analyze };
    });
  }

  ngOnInit(): void {
    this.currentGeo = { fips: null, name: null, shortName: null, handle: null };
    this.currentFreq = { freq: null, label: null };
    this.portalSettings = this.dataPortalSettingsServ.dataPortalSettings[this.portal.universe];
  }

  ngAfterViewInit() {
    this.sub = this.activatedRoute.queryParams.subscribe((params) => {
      this.id = this.getIdParam(params[`id`]);
      this.dataListId = this.getIdParam(params[`data_list_id`]);
      this.search = typeof this.id === 'string' ? true : false;
      this.routeGeo = params[`geo`];
      this.routeFreq = params[`freq`];
      this.routeView = params[`view`];
      this.routeYoy = params[`yoy`];
      this.routeYtd = params[`ytd`];
      this.routeSa = params[`sa`];
      this.routeStart = params[`start`];
      this.routeEnd = params[`end`];
      this.noCache = params[`nocache`] === 'true';
      if (this.id) { this.queryParams.id = this.id; }
      if (this.dataListId) { this.queryParams.data_list_id = this.dataListId; }
      if (this.routeGeo) { this.queryParams.geo = this.routeGeo; }
      if (this.routeFreq) { this.queryParams.freq = this.routeFreq; }
      if (this.routeView) { this.queryParams.view = this.routeView; }
      if (this.routeSa) { this.queryParams.sa = this.routeSa; } else { this.queryParams.sa = 'true'; }
      if (this.routeYoy) { this.queryParams.yoy = this.routeYoy; } else { delete this.queryParams.yoy; }
      if (this.routeYtd) { this.queryParams.ytd = this.routeYtd; } else { delete this.queryParams.ytd; }
      if (this.noCache) { this.queryParams.noCache = this.noCache; } else { delete this.queryParams.noCache; }
      this.categoryData = this.getData(this.id, this.noCache, this.dataListId, this.routeGeo, this.routeFreq);
      this.helperService.updateCatData(this.categoryData);
      // Run change detection explicitly after the change:
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.toggleSeriesInAnalyzer.unsubscribe();
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

  getData(id, noCache, dataListId, geo, freq) {
    if (geo && freq) {
      return (typeof id === 'number' || id === null) ?
        this.catHelper.initContent(id, noCache, dataListId, geo, freq) :
        this.catHelper.initSearch(id, noCache, geo, freq);
    }
    if (!geo && !freq) {
      return (typeof id === 'number' || id === null) ?
        this.catHelper.initContent(id, noCache, dataListId) :
        this.catHelper.initSearch(id, noCache);
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
    this.routeStart = e.seriesStart;
    this.routeEnd = e.endOfSample ? null : e.seriesEnd;
    this.displaySeries = true;
    this.queryParams.start = this.routeStart;
    this.queryParams.end = this.routeEnd;
    this.updateRoute();
  }

  updateRoute() {
    this.queryParams.id = this.queryParams.id ? this.queryParams.id : this.id;
    this.queryParams.data_list_id = this.queryParams.data_list_id ? this.queryParams.data_list_id : this.dataListId;
    const urlPath = typeof this.queryParams.id === 'string' ? '/search' : '/category';
    this.router.navigate([urlPath], { queryParams: this.queryParams, queryParamsHandling: 'merge' });
    this.loading = false;
    this.displaySeries = true;
  }

  toggleSASeries(e) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.sa = e.target.checked;
      this.updateRoute();
    }, 10);
  }
}
