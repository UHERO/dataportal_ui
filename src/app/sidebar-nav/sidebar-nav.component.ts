import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AnalyzerService } from '../analyzer.service';
import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit {
  public categories;
  private errorMessage: string;
  public expand: string = null;
  public reveal = false;
  public overlay = false;
  public selectedCategory: any;
  private id: number;
  private view: string;
  private yoy: string;
  private ytd: string;
  private loading;
  public headerLogo;
  analyzerSeries;
  private defaultCategory;

  constructor(
    @Inject('logo') private logo,
    private _uheroAPIService: UheroApiService,
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
      });
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.view = params['view'] ? params['view'] : 'chart';
      this.yoy = params['yoy'] ? params['yoy'] : 'false';
      this.ytd = params['ytd'] ? params['ytd'] : 'false';
      this.selectedCategory = this.findSelectedCategory(this.id);
    });
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const helpUrl = event.url === '/help';
        const analyzerUrl = event.url === '/analyzer';
        this.selectedCategory = this.checkRoute(this.id, helpUrl, analyzerUrl);
      }
    });
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

  navigate(catId) {
    // If a popover from the category tables is open, remove when navigating to another category
    const popover = $('.popover');
    if (popover) {
      popover.remove();
    }
    this.loading = true;
    this.selectedCategory = catId;
    setTimeout(() => {
      this._router.navigate(['/category'], { queryParams: { id: catId }, queryParamsHandling: 'merge' });
      this.loading = false;
    }, 15);
  }

  mobileMenuToggle(): void {
    this.reveal = this.reveal === false ? true : false;
    this.overlay = this.overlay === false ? true : false;
  }

  onSearch(event) {
    this._router.navigate(['/category'], { queryParams: { id: event }, queryParamsHandling: 'merge' });
  }

}
