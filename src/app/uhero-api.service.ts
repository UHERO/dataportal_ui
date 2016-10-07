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

  fetchObservations(id: number): Promise<any> {
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

/* function mapObservations(response: Response): ObservationResults {
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
  return {'dates': dates.reverse(), 'levelValues': levelValues.reverse(), 'percValues': percValues.reverse()};
} */

function mapObservations(response: Response): Array<any> {
  let observations = response.json().transformationResults;
  let level = observations[0].observations;
  let perc = observations[1].observations;

  let chartData = [];
  let tableData = [];

  let levelValue = [];
  let percValue = [];
  let date = [];

  level.forEach((entry, index) => {
    //Create [date, value] pairs for charts
    levelValue.push([Date.parse(level[index].date), +level[index].value]);
    percValue.push([Date.parse(level[index].date), +perc[index].value]);

    tableData.push({
      date: level[index].date,
      level: +level[index].value,
      perc: +perc[index].value
    });
  });

  // sort data from earliest to most recent, needed for HighStock Chart
  levelValue.reverse();
  percValue.reverse();

  chartData.push({
    level: levelValue,
    perc: percValue
  })

  return [chartData, tableData];
}
