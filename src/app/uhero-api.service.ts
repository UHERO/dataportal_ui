import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CategoryTree } from './category-tree';
import { Series } from './series';
import { Observations } from './observations';

@Injectable()
export class UheroApiService {
   private baseUrl: string;
   private categories;
   private categoryTree;

  constructor(private http: Http) {
     this.baseUrl = 'http://localhost:8080/v1';
  }

  //  Get data from API
  fetchCategories(): Observable<CategoryTree> {
    let categories$ = this.http.get(`${this.baseUrl}/category`)
      .map(mapCategories);
    return categories$;
     //return this.http.get(`${this.baseUrl}/category`)
    //   .map(response => response.json());
  }

  fetchSeries(id: number): Observable<Series> {
     return this.http.get(`${this.baseUrl}/category/series?id=` + id)
         .map(response => response.json());
  }

  fetchGeographies(): Observable<any> {
     return this.http.get(`${this.baseUrl}/geo`)
         .map(response => response.json());
  }

  fetchObservations(id: number): Observable<Observations> {
     return this.http.get(`${this.baseUrl}/series/observations?id=` + id)
         .map(response => response.json());
  }

  // End get data from API
}

// Create a nested JSON of parent and child categories
// Used for category-tree.component
function mapCategories(response: Response): CategoryTree {
  let categories = response.json().categories;
  let dataMap = categories.reduce((map, value) => (map[value.id] = value, map), {});
  let categoryTree = [];
  categories.forEach((value) => {
    let parent = dataMap[value.parent];
    if(parent) {
      (parent.children || (parent.children = [])).push(value);
    } else {
      categoryTree.push(value);
    }
  });
  return categoryTree;
}
