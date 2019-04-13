import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AnalyzerService } from '../analyzer.service';
import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-primeng-menu-nav',
  templateUrl: './primeng-menu-nav.component.html',
  styleUrls: ['./primeng-menu-nav.component.scss']
})
export class PrimengMenuNavComponent implements OnInit {
  public categories;
  private errorMessage: string;
  public reveal = false;
  public overlay = false;
  public selectedCategory: any;
  private id: string;
  private view: string;
  private yoy: string;
  private ytd: string;
  private loading;
  public headerLogo;
  analyzerSeries;
  private defaultCategory;
  private packageCatData;
  private expand = true;

  navMenuItems: MenuItem[];

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
      this.navMenuItems = [];
      categories.forEach((category) => {
        let subMenu = this.createSubmenuItems(category.children, category.id);
        this.navMenuItems.push({
          id: '' + category.id,
          label: category.name,
          icon: 'pi pi-pw',
          items: subMenu,
          command: (event) => {
            this.navToFirstDataList(event.item, category.id)
          }
        });
      });
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
          this.selectedCategory = this.id ? this.findSelectedCategory(this.id) : this.checkRoute(this.id, this._router.url);
          this.navMenuItems.forEach((item) => {
            if (this.id) {
              item.expanded = item.id === this.id ? true : false;
            }
            if (!this.id && this.selectedCategory !== 'analyzer' && this.selectedCategory !== 'help') {
              item.expanded = +item.id === this.defaultCategory ? true : false; 
            }
          });
        });
      });
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectedCategory = this.checkRoute(this.id, event.url);
      }
    });
    this.analyzerSeries = this._analyzerService.analyzerSeries;
    this.headerLogo = this.logo;
  }

  // navigate to Summary or first data list when clicking on a category
  navToFirstDataList(menuItem, categoryId) {
    if (!menuItem.items) {
      this.navigate(categoryId, menuItem.id);
    }
    if (menuItem.items) {
      return this.navToFirstDataList(menuItem.items[0], categoryId);
    }
  }

  createSubmenuItems(subcategories, categoryId) {
    let subMenu = [];
    subcategories.forEach((sub) => {
      let subMenuItem: MenuItem = {};
      subMenuItem.label = sub.name;
      subMenuItem.icon = sub.children ? 'pi pi-pw' : '';
      subMenuItem.id = sub.id;
      if (sub.children) {
        subMenuItem.items = this.createSubmenuItems(sub.children, categoryId);
      }
      if (!sub.children) {
        subMenuItem.command = (event) => {
          this.navigate(categoryId, sub.id)
        }
      }
      subMenu.push(subMenuItem)
    });
    return subMenu;
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

  checkRoute(id, url) {
    if (url.includes('/help')) {
      return 'help';
    }
    if (url.includes('/analyzer')) {
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
        data_list_id: subId,
        start: null,
        end: null,
        analyzerSeries: null,
        chartSeries: null,
        name: null,
        units: null,
        geography: null
      };
      if (subId) {
        this._router.navigate(['/category'], { queryParams: catQParams, queryParamsHandling: 'merge' });
      }
      if (!subId) {
        this._router.navigate(['/category'], { queryParams: catQParams, queryParamsHandling: 'merge' });
      }
      this.loading = false;
    }, 15);
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

  mobileMenuToggle(): void {
    this.reveal = this.reveal === false ? true : false;
    this.overlay = this.overlay === false ? true : false;
  }
}
