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
      console.log(categories);
      this.navMenuItems = [];
      categories.forEach((category) => {
        let subMenu = this.createSubmenuItems(category.children, category.id);
        this.navMenuItems.push({
          label: category.name,
          icon: 'pi pi-pw',
          items: subMenu,
        })
      })
      console.log(this.navMenuItems)
      /* console.log('category', categories);

      this.navMenuItems = categories.map((category) => {
        let subMenuChildren = [];
        category.children.forEach((subcat) => {
          if (!subcat.isHeader) {

          }
        })
        let subMenuItems = category.children.map((subcat) => {
          const subItem = {
            label: subcat.name
          }
          return subItem;
        });
        const menuItem = {
          label: category.name,
          icon: 'pi pi-pw',
          items: subMenuItems
        }
        return menuItem;
      }); */
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
          //this.selectedCategory = this.findSelectedCategory(this.id);
        });
      });
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const helpUrl = event.url === '/help';
        const analyzerUrl = event.url.substr(0, 9) === '/analyzer';
        //this.selectedCategory = this.checkRoute(this.id, helpUrl, analyzerUrl);
      }
    });
    /* this._helperService.getCatData().subscribe((data) => {
      this.packageCatData = data;
      console.log('packageCatData', data)
    }); */
    this.route.fragment.subscribe((frag) => {
      this.fragment = frag;
    })
    this.analyzerSeries = this._analyzerService.analyzerSeries;
    this.headerLogo = this.logo;
  }

  createSubmenuItems(subcategories, categoryId) {
    let subMenu = [];
    subcategories.forEach((sub) => {
      let subMenuItem: MenuItem = {};
      subMenuItem.label = sub.name;
      subMenuItem.icon = sub.children ? 'pi pi-pw' : '';
      if (sub.children) {
        subMenuItem.items = this.createSubmenuItems(sub.children, categoryId);
      }
      if (!sub.children) {
        subMenuItem.command = (event) => {
          console.log('event', event);
          this.navigate(categoryId, sub.id)
        }
      }
      subMenu.push(subMenuItem)
    });
    return subMenu;
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
        this._router.navigate(['/category'], { queryParams: catQParams, queryParamsHandling: 'merge', fragment: 'id_' + catId });
      }
      this.loading = false;
    }, 15);
  }

}
