import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AnalyzerService } from '../analyzer.service';
import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit {
  public categories;
  private errorMessage: string;
  public reveal = false;
  public overlay = false;
  public selectedCategory: any;
  private id: number;
  private view: string;
  private yoy: string;
  private ytd: string;
  private fragment;
  private loading;
  public headerLogo;
  analyzerSeries;
  private defaultCategory;
  private packageCatData;
  private expand = true;

  constructor(
    @Inject('logo') private logo,
    @Inject('navigation') private navSettings,
    private _uheroAPIService: UheroApiService,
    private _helperService: HelperService,
    private _analyzerService: AnalyzerService,
    private route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._uheroAPIService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    },
      (error) => {
        console.log('error', error);
      },
      () => {
        this.defaultCategory = this.categories[0].id;
        this.route.queryParams.subscribe((params) => {
          this.id = params['id'];
          this.view = params['view'] ? params['view'] : 'chart';
          this.yoy = params['yoy'] ? params['yoy'] : 'false';
          this.ytd = params['ytd'] ? params['ytd'] : 'false';
          this.selectedCategory = this.findSelectedCategory(this.id);
        });    
      });
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const helpUrl = event.url === '/help';
        const analyzerUrl = event.url.substr(0, 9) === '/analyzer';
        this.selectedCategory = this.checkRoute(this.id, helpUrl, analyzerUrl);
      }
    });
    this._helperService.getCatData().subscribe(data => {
      this.packageCatData = data;
    });
    this.route.fragment.subscribe((frag) => {
      this.fragment = frag;
    })
    this.analyzerSeries = this._analyzerService.analyzerSeries;
    this.headerLogo = this.logo;
  }

  findSelectedCategory(id) {
    if (id === undefined) {
      return this.defaultCategory;
    }
    if (id && isNaN(id)) {
      return null;
    }
    if (id && +id) {
      return +id;
    }
  }

  checkRoute(id, help, analyzer) {
    if (help) {
      return 'help';
    }
    if (analyzer) {
      return 'analyzer';
    }
    return this.findSelectedCategory(id);
  }

  navigate(catId, subId?) {
    // If a popover from the category tables is open, remove when navigating to another category
    const popover = $('.popover');
    if (popover) {
      popover.remove();
    }
    this.loading = true;
    this.selectedCategory = catId;
    setTimeout(() => {
      const catQParams = {
        id: catId,
        subId: subId,
        start: null,
        end: null,
        analyzerSeries: null,
        chartSeries: null,
        name: null,
        units: null,
        geography: null
      };
      if (subId) {
        this._router.navigate(['/category'], { queryParams: catQParams, queryParamsHandling: 'merge', fragment: 'id_' + subId });
      }
      if (!subId) {
        this._router.navigate(['/category'], { queryParams: catQParams, queryParamsHandling: 'merge' });
      }
      this.loading = false;
    }, 15);
  }

  mobileMenuToggle(): void {
    this.reveal = this.reveal === false ? true : false;
    this.overlay = this.overlay === false ? true : false;
  }

  toggleExpand(event) {
    this.expand = this.expand ? false : true;
    event.stopImmediatePropagation();
  }

  onSearch(event) {
    const searchQParams = {
      id: event,
      start: null,
      end: null,
      analyzerSeries: null,
      chartSeries: null,
      name: null,
      units: null,
      geography: null
    };
    this._router.navigate(['/search'], { queryParams: searchQParams, queryParamsHandling: 'merge' });
  }

}
