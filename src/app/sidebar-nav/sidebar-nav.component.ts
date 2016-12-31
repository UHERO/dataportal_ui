import { Component, OnInit, Input } from '@angular/core';

import { UheroApiService } from '../uhero-api.service';
import { CategoryTree } from '../category-tree';
import { SelectedSeries } from '../selected-series';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit, Input {
  // @Input() categories: CategoryTree;
  // private series: SelectedSeries;
  private categories: CategoryTree;
  private errorMessage: string;
  public expand: string = null;
  // private subcat: string = null;
  private reveal: boolean = false;
  private overlay: boolean = false;
  // private selectedSublist: number;
  private selectedCategory: number;

  constructor(private _uheroAPIService: UheroApiService) { }

  ngOnInit() {
    this._uheroAPIService.fetchCategories().subscribe(
      categories => this.categories = categories,
      error => this.errorMessage = error);
  }

  mobileMenuToggle(): void {
    this.reveal = this.reveal === false ? true : false;
    this.overlay = this.overlay === false ? true : false;
  }

  expandItem(sublist: Array<any>, expand: string, cat): void {
    // Adds class of selected to a category on click
    this.selectedCategory = cat;

    // Expands top level category
    this.expand = this.expand === expand ? null : expand;
  }
}
