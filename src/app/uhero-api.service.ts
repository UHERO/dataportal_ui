import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

import { CategoryTree } from './category-tree';
import { SelectedSeries } from './selected-series';
import { Series } from './series';
// import { Geography } from './geography';
import { Regions } from './regions';
import { ObservationResults } from './observation-results';

@Injectable()
export class UheroApiService {
  private baseUrl: string;
  private requestOptionsArgs: RequestOptionsArgs;
  private headers: Headers;
  private cachedCategories;
  private cachedChartData = [];
  private cachedMultiChartData = {};
  private cachedGeographies = [];
  private cachedGeoSeries = [];
  private cachedObservations = [];
  private cachedSeries = [];
  private cachedSeriesDetail = [];
  private errorMessage: string;

  constructor(private http: Http) {
     // this.baseUrl = 'http://localhost:8080/v1';
     this.baseUrl = 'http://api.uhero.hawaii.edu/v1';
     this.headers = new Headers();
     this.headers.append('Authorization', 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M=');
     this.requestOptionsArgs = {headers: this.headers};
  }

  //  Get data from API
  fetchCategories() {
    if(this.cachedCategories) {
      return Observable.of(this.cachedCategories);
    } else {
      let categories$ = this.http.get(`${this.baseUrl}/category`, this.requestOptionsArgs)
        .map(mapCategories)
        .do(val => {
          this.cachedCategories = val;
          // categories$ = null;
        });
      return categories$;
    }
  }

  fetchSeries(id: number) {
    if(this.cachedSeries[id]) {
      return Observable.of(this.cachedSeries[id]);
    } else {
      let series$ = this.http.get(`${this.baseUrl}/category/series?id=` + id, this.requestOptionsArgs)
        .map(mapSeries)
        .do(val => {
          this.cachedSeries[id] = val;
          series$ = null;
        });
      return series$;
    }
  }

  fetchSeriesDetail(id: number) {
    if(this.cachedSeriesDetail[id]) {
      return Observable.of(this.cachedSeriesDetail[id]);
    } else {
      let seriesDetail$ = this.http.get(`${this.baseUrl}/series?id=` + id, this.requestOptionsArgs)
        .map(mapSeriesDetail)
        .do(val => {
          this.cachedSeriesDetail[id] = val;
          seriesDetail$ = null;
        });
      return seriesDetail$;
    }
  }

  /* fetchGeographies(): Observable<any> {
     return this.http.get(`${this.baseUrl}/geo`, this.requestOptionsArgs)
         .map(response => response.json());
  } */

  fetchGeographies(id: number): Observable<Regions> {
    /* if(this.cachedGeographies) {
      return Observable.of(this.cachedGeographies);
    } else { */
      let geographies$ = this.http.get(`${this.baseUrl}/category/geo?id=` + id, this.requestOptionsArgs)
        .map(mapGeographies)
        /* .do(val => {
          this.cachedGeographies = val;
          geographies$ = null;
        }); */
      return geographies$;
    //}
  }

  fetchGeoSeries(id: number, handle: string) {
    let geoSeries$ = this.http.get(`${this.baseUrl}/category/series?id=` + id + `&geo=` + handle)
      .map(mapGeoSeries);
    return geoSeries$;
  }

  fetchObservations(id: number) {
    if(this.cachedObservations[id]) {
      return Observable.of(this.cachedObservations[id]);
    } else {
      let observations$ = this.http.get(`${this.baseUrl}/series/observations?id=` + id, this.requestOptionsArgs)
        .map(mapObservations)
        .do(val => {
          this.cachedObservations[id] = val;
          observations$ = null;
        });
      return observations$;
    }

  }

  // Get series and observation data for landing page component charts
  fetchChartData(id: number) {
    if(this.cachedChartData[id]) {
      return this.cachedChartData[id];
    } else {
      let chartData = [];
      this.fetchSeries(id).subscribe((series) => {
        let seriesData = series;
        console.log('service', seriesData);
        seriesData.forEach((serie, index) => {
          this.fetchObservations(+seriesData[index]['id']).subscribe((obs) => {
            let seriesObservations = obs;
            chartData.push({'serie': seriesData[index], 'observations': seriesObservations});
          });
        });
      },
      error => this.errorMessage = error);
      this.cachedChartData[id] = (Observable.forkJoin(Observable.of(chartData)));
      return this.cachedChartData[id];
    }
  }

  /* fetchMultiChartData(id: number, handle: string) {
    if(this.cachedMultiChartData[id + handle]) {
      return this.cachedMultiChartData[id];
    } else {
      let multiChartData = [];
      this.fetchGeoSeries(id, handle).subscribe((series) => {
        let seriesData = series;
        seriesData.forEach((serie, index) => {
          this.fetchObservations(+seriesData[index]['id']).subscribe((obs) => {
            let seriesObservations = obs;
            multiChartData.push({'serie': seriesData[index], 'observations': seriesObservations});
          });
        });
      },
      error => this.errorMessage = error);
      this.cachedMultiChartData[id + handle] = (Observable.forkJoin(Observable.of(multiChartData)));
      console.log(this.cachedMultiChartData[id + handle]);
      return this.cachedMultiChartData[id + handle];
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

function mapGeographies(response: Response): Regions {
  let geos = response.json().data;
  console.log('geos', geos);
  return geos;
}

function mapGeoSeries(response: Response): SelectedSeries {
  let geoSeries = response.json().data;
  console.log('geo series', geoSeries);
  return geoSeries;
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
