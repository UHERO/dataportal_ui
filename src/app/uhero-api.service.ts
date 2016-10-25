import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/Rx';

import { CategoryTree } from './category-tree';
import { SelectedSeries } from './selected-series';
import { Series } from './series';
import { ObservationResults } from './observation-results';

@Injectable()
export class UheroApiService {
  private baseUrl: string;
  private requestOptionsArgs: RequestOptionsArgs;
  private headers: Headers;
  private obsResults$ = new ReplaySubject(1);
  /* private geoResults$ = new ReplaySubject(1);
  private seriesDetail$ = new ReplaySubject(1);
  private series$ = new ReplaySubject(1);
  private category$ = new ReplaySubject(1); */


  constructor(private http: Http) {
     // this.baseUrl = 'http://localhost:8080/v1';
     this.baseUrl = 'http://api.uhero.hawaii.edu/v1';
     this.headers = new Headers();
     this.headers.append('Authorization', 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M=');
     this.requestOptionsArgs = {headers: this.headers};
  }

  //  Get data from API
  /* fetchCategories(): Observable<CategoryTree> {
    let categories$ = this.http.get(`${this.baseUrl}/category`, this.requestOptionsArgs)
      .map(mapCategories);
    return categories$;
  }

  fetchCategories(): Observable<CategoryTree> {
    let catData, catObservable;
    if(catData) {
      return Observable.of(catData);
    } else if(catObservable) {
      return catObservable;
    } else {
      catObservable = this.http.get(`${this.baseUrl}/category`, this.requestOptionsArgs)
        .map(mapCategories)
        .do(val => {
          catData = val;
          catObservable = null;
        })
        .share();
      return catObservable;
    }
  } */

  fetchCategories(forceRefresh?: boolean): Observable<any> {
    let category$ = new ReplaySubject(1);
    if(!category$.observers.length || forceRefresh) {
      this.http.get(`${this.baseUrl}/category`, this.requestOptionsArgs)
        .map(mapCategories)
        .subscribe(data => category$.next(data),
        error => category$.error(error));
    }
    return category$;
  }
  

  /* fetchSeries(id: number): Observable<SelectedSeries> {
    let series$ = this.http.get(`${this.baseUrl}/category/series?id=` + id, this.requestOptionsArgs)
      .map(mapSeries);
    return series$;
  }

  fetchSeries(id: number): Observable<SelectedSeries> {
    let seriesData = [], seriesObservable = [];
    if(seriesData[id]) {
      return Observable.of(seriesData[id]);
    } else if(seriesObservable[id]) {
      return seriesObservable[id];
    } else {
      seriesObservable[id] = this.http.get(`${this.baseUrl}/category/series?id=` + id, this.requestOptionsArgs)
        .map(mapSeries)
        .do(val => {
          seriesData[id] = val;
          seriesObservable[id] = null;
        })
        .share();
      return seriesObservable[id];
    }
  } */

  fetchSeries(id: number, forceRefresh?: boolean): Observable<any> {
    let series$ = new ReplaySubject(1);
    if(!series$.observers.length || forceRefresh) {
      this.http.get(`${this.baseUrl}/category/series?id=` + id, this.requestOptionsArgs)
        .map(mapSeries)
        .subscribe(data => series$.next(data),
        error => series$.error(error));
    }
    return series$;
  }


  /* fetchSeriesDetail(id: number): Observable<Series> {
    let seriesDetail$ = this.http.get(`${this.baseUrl}/series?id=` + id, this.requestOptionsArgs)
      .map(mapSeriesDetail);
    return seriesDetail$;
  }

  fetchSeriesDetail(id: number): Observable<Series> {
    let seriesDetailData = [], seriesDetailObservable = [];
    if(seriesDetailData[id]) {
      return Observable.of(seriesDetailData[id]);
    } else if(seriesDetailObservable[id]) {
      return seriesDetailObservable[id];
    } else {
      seriesDetailObservable[id] = this.http.get(`${this.baseUrl}/series?id=` + id, this.requestOptionsArgs)
        .map(mapSeriesDetail)
        .do(val => {
          seriesDetailData[id] = val;
          seriesDetailObservable[id] = null;
        })
        .share();
      return seriesDetailObservable[id];
    }
  } */

  fetchSeriesDetail(id: number, forceRefresh?: boolean): Observable<any> {
    let seriesDetail$ = new ReplaySubject(1);
    if(!seriesDetail$.observers.length || forceRefresh) {
      this.http.get(`${this.baseUrl}/series?id=` + id, this.requestOptionsArgs)
        .map(mapSeriesDetail)
        .subscribe(data => seriesDetail$.next(data),
        error => seriesDetail$.error(error));
    }
    return seriesDetail$;
  }

  /* fetchGeographies(): Observable<any> {
     return this.http.get(`${this.baseUrl}/geo`, this.requestOptionsArgs)
         .map(response => response.json());
  }

  fetchGeographies(): Observable<any> {
    let geoData, geoObservable;
    if(geoData) {
      return Observable.of(geoData);
    } else if(geoObservable) {
      return geoObservable;
    } else {
      geoObservable = this.http.get(`${this.baseUrl}/geo`, this.requestOptionsArgs)
        .map(response => response.json())
        .do(val => {
          geoData = val;
          geoObservable = null;
        })
        .share();
      return geoObservable;
    }
  } */
  fetchGeographies(forceRefresh?: boolean): Observable<any> {
    let geoResults$ = new ReplaySubject(1);
    if(!geoResults$.observers.length || forceRefresh) {
      this.http.get(`${this.baseUrl}/geo`, this.requestOptionsArgs)
        .map(response => response.json())
        .subscribe(data => geoResults$.next(data),
        error => geoResults$.error(error));
    }
    return geoResults$;
  }


  /* fetchObservations(id: number): Observable<ObservationResults> {
    let observations$ = this.http.get(`${this.baseUrl}/series/observations?id=` + id, this.requestOptionsArgs)
      .map(mapObservations);
    return observations$;
  } */

  fetchObservations(id: number, forceRefresh?: boolean): Observable<any> {
    let obsResults$ = new ReplaySubject(1);
    if(!obsResults$.observers.length || forceRefresh) {
      this.http.get(`${this.baseUrl}/series/observations?id=` + id, this.requestOptionsArgs)
        .map(mapObservations)
        .subscribe(data => obsResults$.next(data),
        error => obsResults$.error(error));
    }
    console.log('obsResults$', obsResults$);
    return obsResults$;
  }

  /* fetchObservations(id: number): Observable<ObservationResults> {
    let obsData = [], obsObservable = [];
    console.log(obsData);
    if(obsData[id]) {
      console.log('obs', Observable.of(obsData[id]));
      return Observable.of(obsData[id]);
    } else if(obsObservable[id]) {
      return obsObservable[id];
    } else {
      obsObservable[id] = this.http.get(`${this.baseUrl}/series/observations?id=` + id, this.requestOptionsArgs)
        .map(mapObservations)
        .do(val => {
          obsData[id] = val;
          obsObservable[id] = null;
        })
        .share();
      return obsObservable[id];
    }
  } */


  // End get data from API
}

// Create a nested JSON of parent and child categories
// Used for landing-page.component
// And side bar navigation on single-series & table views
function mapCategories(response: Response): CategoryTree {
  let categories = response.json().data;
  let dataMap = categories.reduce((map, value) => (map[value.id] = value, map), {});
  let categoryTree = [];
  categories.forEach((value) => {
    let parent = dataMap[value.parentId];
    if (parent) {
      (parent.children || (parent.children = [])).push(value);
    } else {
      categoryTree.push(value);
    }
  });
  return categoryTree;
}

function mapSeries(response: Response): SelectedSeries {
  let series = response.json().data;
  // console.log(series);
  return series;
}

function mapSeriesDetail(response: Response): Series {
  let seriesDetail = response.json().data;
  return seriesDetail;
}

function mapObservations(response: Response): ObservationResults {
  let observations = response.json().data.transformationResults;
  let level = observations[0].observations;
  let perc = observations[1].observations;

  let levelValue = [];
  let percValue = [];

  if(level) {
    level.forEach((entry, index) => {
      // Create [date, value] level pairs for charts
      levelValue.push([Date.parse(level[index].date), +level[index].value]);
    });
  }

  if(perc) {
    perc.forEach((entry, index) => {
      // Create [date, value] percent pairs for charts
      percValue.push([Date.parse(perc[index].date), +perc[index].value]);
    });
  }
  
  let tableData = combineObsData(level, perc);
  let chartData = {level: levelValue, perc: percValue};
  let data = {'chart data': chartData, 'table data': tableData};
  return data;
}

// Combine level and percent arrays from Observation data
// Used to construct table data for single series view
function combineObsData(level, perc) {
  // Check that level and perc arrays are not null
  if(level && perc) {
    var table = level;
    for(let i = 0; i < level.length; i++) {
      table[i].percValue = "NA";
      for(let j = 0; j < perc.length; j++) {
        if(level[i].date === perc[j].date) {
          table[i].percValue = perc[j].value;
          break;
        }
      }
    }
  }
  return table;
}
