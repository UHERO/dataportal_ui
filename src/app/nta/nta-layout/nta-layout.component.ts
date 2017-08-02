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
  private routeFreq: string;
  private routeView: string;
  private routeC5ma;
  private routeStart;
  private routeEnd;
  private search = false;
  private queryParams: any = {};
  private tableStart;
  private tableEnd;
  private chartStart;
  private chartEnd;

  // Variables for geo and freq selectors
  public currentGeo: Geography;
  public currentFreq: Frequency;
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
    this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal];
  }

  ngAfterViewInit() {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.id = this.getIdParam(params['id']);
      this.search = typeof this.id === 'string' ? true : false;
      this.routeView = params['view'];
      this.routeC5ma = params['c5ma'];
      this.selectedMeasure = params['m'];
      console.log(this.selectedMeasure)
      if (this.id) { this.queryParams.id = this.id; };
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
      return 2488;
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
  redrawSeries(event) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.m = event.name;
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

  c5maActive(e, subId) {
    this.loading = true;
    setTimeout(() => {
      this.queryParams.c5ma = e.target.checked;
      this.fragment = subId;
      this.updateRoute();
    }, 10);
    this.scrollToFragment();
  }

  changeRange(e, measurement) {
    measurement.tableStart = e.tableStart;
    measurement.tableEnd = e.tableEnd;
    measurement.chartStart = e.chartStart;
    measurement.chartEnd = e.chartEnd;
    this.tableStart = e.tableStart;
    this.tableEnd = e.tableEnd;
    this.chartStart = e.chartStart;
    this.chartEnd = e.chartEnd;
    // this.queryParams.start = e.start.replace(/\s|-/g, '');
    // this.queryParams.end = e.end.replace(/\s|-/g, '');
    // this._router.navigate(['/category'], { queryParams: this.queryParams, queryParamsHandling: 'merge', fragment: this.fragment });
  }

  // Work around for srolling to page anchor
  scrollToFragment() {
    setTimeout(() => {
      this.scrollTo();
    }, 10);
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
