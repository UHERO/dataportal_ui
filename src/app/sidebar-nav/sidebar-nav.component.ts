import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit, Input {
  public categories;
  private errorMessage: string;
  public expand: string = null;
  public reveal = false;
  public overlay = false;
  private selectedCategory: number;
  private id: number;
  private view: string;
  private yoy: string;
  private ytd: string;
  private loading;

  constructor(private _uheroAPIService: UheroApiService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._uheroAPIService.fetchCategories().subscribe(
      categories => this.categories = categories,
      error => this.errorMessage = error);

    this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];
      this.view = params['view'] ? params['view'] : 'chart';
      this.yoy = params['yoy'] ? params['yoy'] : 'false';
      this.ytd = params['ytd'] ? params['ytd'] : 'false';
      const search = params['search'];
      if (this.id) {
        this.selectedCategory = this.id;
      } else if (isNaN(this.id)) {
        this.selectedCategory = null;
      } else {
        this.selectedCategory = 42;
      }
    });
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
    this._router.navigate(['/category'], { queryParams: { id: event }, queryParamsHandling: 'merge' } );
  }

}
