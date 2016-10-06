import { Component, OnInit } from '@angular/core';

import { UheroApiService } from '../uhero-api.service';
import {CategoryTree} from '../category-tree';

@Component({
  selector: 'app-sidebar-nav',
  inputs: ['categoryTree'],
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit {
  private categories: CategoryTree;
  private errorMessage: string;
  private expand: string = null;
  private collapse: string = null;

  constructor(private _uheroAPIService: UheroApiService) { }

  ngOnInit() {
    this._uheroAPIService.fetchCategories().subscribe(
      categories => this.categories = categories,
      error => this.errorMessage = error);
  }

  expandItem(expand: string): void {
    this.expand = this.expand === expand ? null : expand;
  }

}
