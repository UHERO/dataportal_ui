import { Component, OnInit, Input, Output } from '@angular/core';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-category-tree',
  inputs: ['categoryTree'],
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit {

  private categories;
  private categoryTree;

  constructor(private _uheroAPIService: UheroApiService) {
  }

  ngOnInit() {
     this._uheroAPIService.fetchCategories()
         .subscribe(
            (categories) => {
               var categories = categories.categories;
               var dataMap = categories.reduce((map, value) => (map[value.id] = value, map), {});
               var categoryTree = [];
               categories.forEach((value) => {
                  var parent = dataMap[value.parent];
                  if (parent) {
                     (parent.children || (parent.children = []))
                     .push(value);
                  } else {
                     categoryTree.push(value);
                  }
               });
               console.log(categories);
               console.log(categoryTree);
               this.categories = categoryTree;
            },
            error => console.log('Error fetching categories'));
  }
}
