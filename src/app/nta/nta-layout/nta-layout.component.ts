// Component for multi-chart view
import { Inject, Component, OnInit, AfterViewInit, AfterViewChecked, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { UheroApiService } from '../../uhero-api.service';
import { NtaHelperService } from '../nta-helper.service';
import { DataPortalSettingsService } from '../../data-portal-settings.service';
import { Frequency } from '../../frequency';
import { Geography } from '../../geography';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-nta-layout',
  templateUrl: './nta-layout.component.html',
  styleUrls: ['./nta-layout.component.scss']
})
export class NtaLayoutComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  private sub;
  private id: number;
  private routeView: string;
  private routeC5ma;
  private search = false;
  private queryParams: any = {};
  private chartRange;
  private seriesStart;
  private seriesEnd;
  private displaySeries;

  // Variables for geo and freq selectors
  public categoryData;
  private selectedMeasure;
  private loading = false;
  private fragment;
  private userEvent;
  private previousHeight;
  private portalSettings;

  constructor(
    @Inject('portal') private portal,
    private _uheroAPIService: UheroApiService,
    private _ntaHelper: NtaHelperService,
    private _dataPortalSettings: DataPortalSettingsService,
    private route: ActivatedRoute,
    private _router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal.universe];
  }

  ngAfterViewInit() {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.id = this.getIdParam(params['id']);
      this.search = typeof this.id === 'string' ? true : false;
      this.routeView = params['view'];
      this.routeC5ma = params['c5ma'];
      this.selectedMeasure = params['m'];
      if (this.id) { this.queryParams.id = this.id; };
      if (this.selectedMeasure) { this.queryParams.m = this.selectedMeasure; };
      if (this.routeView) { this.queryParams.view = this.routeView; };
      if (this.routeC5ma) { this.queryParams.c5ma = this.routeC5ma; } else { delete this.queryParams.c5ma; }
      this.categoryData = this._ntaHelper.initContent(this.id, this.selectedMeasure);
      // Run change detection explicitly after the change:
      this.cdRef.detectChanges();
    });
  }

  ngAfterViewChecked() {
    // Check height of content and scroll to anchor if fragment is in URL
    // If true, height is changing, i.e. content still loading
    if (this.checkContainerHeight()) {
      this.scrollTo();
    }
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

  checkContainerHeight() {
    const contianer = $('.multi-series-container');
    const heightDiff = (this.previousHeight !== contianer.height());
    this.previousHeight = contianer.height();
    return heightDiff;
  }

  // Redraw series when a new measurement is selected
  redrawSeries(event, subId) {
    this.displaySeries = false;
    this.loading = true;
    setTimeout(() => {
      this.queryParams.m = event.name;
      this.updateRoute(subId);
    }, 10);
    this.scrollToFragment();
  }

  updatePageCounter(event, subcategory) {
    subcategory.scrollIndex = event;
  }

  switchView(subId) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.view = this.routeView === 'table' ? 'chart' : 'table';
      this.updateRoute(subId);
    });
    this.scrollToFragment();
  }

  c5maActive(e, subId) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.c5ma = e.target.checked;
      this.updateRoute(subId);
    }, 10);
    this.scrollToFragment();
  }

  changeRange(e, measurement) {
    measurement.seriesStart = e.seriesStart;
    measurement.seriesEnd = e.seriesEnd;
    this.seriesStart = e.seriesStart;
    this.seriesEnd = e.seriesEnd;
    this.displaySeries = true;
  }

  // Work around for srolling to page anchor
  scrollToFragment() {
    setTimeout(() => {
      this.scrollTo();
    }, 10);
  }

  updateRoute(subId) {
    this.queryParams.id = this.queryParams.id ? this.queryParams.id : this.id;
    this.fragment = subId === 'search' ? null : 'id_' + subId;
    const urlPath = typeof this.queryParams.id === 'string' ? '/search' : '/category';
    this._router.navigate(['/category'], { queryParams: this.queryParams, queryParamsHandling: 'merge', fragment: this.fragment });
    this.loading = false;
  }

  scrollTo(): void {
    this.route.fragment.subscribe((frag) => {
      const el = document.querySelector('#' + frag);
      if (el) {
        el.scrollIntoView();
        const scrolledY = window.scrollY;
        if (scrolledY) {
          window.scroll(0, scrolledY - 75);
        }
      }
      if (frag === 'top') { el.scrollTop; };
    });
  }
}
