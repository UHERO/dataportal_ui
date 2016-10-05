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

  constructor(private http: Http) {
     this.baseUrl = 'http://localhost:8080/v1';
  }

  //  Get data from API
  fetchCategories(): Observable<CategoryTree> {
    let categories$ = this.http.get(`${this.baseUrl}/category`)
      .map(mapCategories);
    return categories$;
  }

  fetchSeries(id: number): Promise<Series> {
    let series$ = this.http.get(`${this.baseUrl}/category/series?id=` + id)
      .map(mapSeries).toPromise();
    return series$;
  }

  fetchGeographies(): Observable<any> {
     return this.http.get(`${this.baseUrl}/geo`)
         .map(response => response.json());
  }

  fetchObservations(id: number): Promise<ObservationResults> {
    let observations$ = this.http.get(`${this.baseUrl}/series/observations?id=` + id)
      .map(mapObservations).toPromise();
    return observations$;
  }

  // End get data from API
}

// Create a nested JSON of parent and child categories
// Used for landing-page.component
// And side bar navigation on single-series & table views
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
  let level = observations[0].observations;
  let perc = observations[1].observations;

  let levelValues = [];
  let percValues = [];
  let dates = [];

  level.forEach((entry, index) => {
    levelValues.push(+level[index].value);
    percValues.push(+perc[index].value);
    dates.push(level[index].date);
  });
  return {'levelValues': levelValues.reverse(), 'percValues': percValues.reverse(), 'dates': dates.reverse()};
}
