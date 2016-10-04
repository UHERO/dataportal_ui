import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { CategoryTree } from './category-tree';
import { Series } from './series';
import { Observations } from './observations';
import { ObservationResults } from './observation-results';

@Injectable()
export class UheroApiService {
  private baseUrl: string;
  private categories;
  private series;
  private observations;

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
    let series$ = this.http.get(`${this.baseUrl}/category/series?id=` + id)
      .map(mapSeries);
    return series$;
     //return this.http.get(`${this.baseUrl}/category/series?id=` + id)
     //    .map(response => response.json());
  }

  fetchGeographies(): Observable<any> {
     return this.http.get(`${this.baseUrl}/geo`)
         .map(response => response.json());
  }

  fetchObservations(id: number): Observable<ObservationResults> {
    let observations$ = this.http.get(`${this.baseUrl}/series/observations?id=` + id)
      .map(mapObservations);
    return observations$;
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

function mapSeries(response: Response): Series {
  let series = response.json().series;
  return series;
}

function mapObservations(response: Response): ObservationResults {
  let observations = response.json().transformationResults;
  return observations;
}

// Create array of Observations to use for draw-multi-chart.component
/* function mapObservations(response: Response): ObservationResults {
  console.log(response.json().transformationResults);
  return response;
} */
