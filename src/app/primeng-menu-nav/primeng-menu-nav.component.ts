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

  items: MenuItem[];
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
      console.log(categories)
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
    this._helperService.getCatData().subscribe((data) => {
      this.packageCatData = data;
      console.log('packageCatData', data)
    });
    this.route.fragment.subscribe((frag) => {
      this.fragment = frag;
    })
    this.analyzerSeries = this._analyzerService.analyzerSeries;
    this.headerLogo = this.logo;
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-pw',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'User', icon: 'pi pi-fw pi-user-plus' },
            { label: 'Filter', icon: 'pi pi-fw pi-filter' }
          ]
        },
        { label: 'Open', icon: 'pi pi-fw pi-external-link' },
        { separator: true },
        { label: 'Quit', icon: 'pi pi-fw pi-times' }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Help',
        icon: 'pi pi-fw',
        items: [
          {
            label: 'Contents',
            icon: 'pi pi-pi pi-bars'
          },
          {
            label: 'Search',
            icon: 'pi pi-pi pi-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'User',
                icon: 'pi pi-fw pi-file',
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              { label: 'Save', icon: 'pi pi-fw pi-save' },
              { label: 'Update', icon: 'pi pi-fw pi-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              { label: 'Delete', icon: 'pi pi-fw pi-minus' }
            ]
          }
        ]
      }
    ];
  }

}
