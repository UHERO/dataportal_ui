import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

import { Category } from './category';
import { CategoryTree } from './category-tree';
import { SelectedSeries } from './selected-series';
import { Series } from './series';
import { Frequency } from './frequency';
import { Geography } from './geography';
import { ObservationResults } from './observation-results';
import { dateWrapper } from './date-wrapper';

@Injectable()
export class UheroApiService {
  private baseUrl: string;
  private requestOptionsArgs: RequestOptionsArgs;
  private headers: Headers;
  private cachedCategories;
  private cachedExpanded = [];
  private cachedSelectedCategory = [];
  // private cachedChartData = [];
  private cachedMultiChartData = [];
  private cachedFrequencies = [];
  private cachedGeographies = [];
  private cachedGeoSeries = [];
  private cachedObservations = [];
  private cachedSeries = [];
  private cachedSeriesDetail = [];
  private cachedSiblings = [];
  private cachedSiblingFreqs = [];
  private cachedSiblingGeos = [];
  private errorMessage: string;

  constructor(private http: Http) {
     // this.baseUrl = 'http://localhost:8080/v1';
     this.baseUrl = 'http://api.uhero.hawaii.edu/v1';
     this.headers = new Headers();
     this.headers.append('Authorization', 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M=');
     this.requestOptionsArgs = {headers: this.headers};
  }

  //  Get data from API

  // Gets all available categories. Used for navigation & displaying sublists 
  fetchCategories(): Observable<CategoryTree> {
    if (this.cachedCategories) {
      return Observable.of(this.cachedCategories);
    } else {
      let categories$ = this.http.get(`${this.baseUrl}/category`, this.requestOptionsArgs)
        .map(mapCategories)
        .do(val => {
          this.cachedCategories = val;
          categories$ = null;
        });
      return categories$;
    }
  }

  // Gets observations for series in a (sub) category
  fetchExpanded(id: number, geo: string, freq:string): Observable<any> {
    if (this.cachedExpanded[id + geo + freq]) {
      return Observable.of(this.cachedExpanded[id + geo + freq]);
    } else {
      let expanded$ = this.http.get(`${this.baseUrl}/category/series?id=` + id + `&geo=` + geo + `&freq=` + freq + `&expand=true`, this.requestOptionsArgs)
        .map(mapData)
        .do(val => {
          this.cachedExpanded[id + geo + freq] = val;
          expanded$ = null;
        });
      return expanded$;
    }
  }

  // Gets a particular category. Used to identify a category's date ranges
  fetchSelectedCategory(id: number): Observable<Category> {
    if (this.cachedSelectedCategory[id]) {
      return Observable.of(this.cachedSelectedCategory[id]);
    } else {
      let selectedCat$ = this.http.get(`${this.baseUrl}/category?id=` + id, this.requestOptionsArgs)
        .map(mapData)
        .do(val => {
          this.cachedSelectedCategory[id] = val;
          selectedCat$ = null;
        });
      return selectedCat$;
    }
  }

  fetchSeries(id: number, geo: string, freq: string): Observable<Series[]> {
    if (this.cachedSeries[id + geo + freq]) {
      return Observable.of(this.cachedSeries[id + geo + freq]);
    } else {
      let series$ = this.http.get(`${this.baseUrl}/category/series?id=` + id + `&geo=` + geo + `&freq=` + freq, this.requestOptionsArgs)
        .map(mapData)
        .do(val => {
          this.cachedSeries[id + geo + freq] = val;
          series$ = null;
        });
      return series$;
    }
  }

  // Gets data for a particular series. Used for single series view.
  fetchSeriesDetail(id: number): Observable<Series> {
    if (this.cachedSeriesDetail[id]) {
      return Observable.of(this.cachedSeriesDetail[id]);
    } else {
      let seriesDetail$ = this.http.get(`${this.baseUrl}/series?id=` + id, this.requestOptionsArgs)
        .map(mapData)
        .do(val => {
          this.cachedSeriesDetail[id] = val;
          seriesDetail$ = null;
        });
      return seriesDetail$;
    }
  }

  // Get list of siblings for a particular series
  fetchSeriesSiblings(seriesId: number): Observable<Series[]> {
    if (this.cachedSiblings[seriesId]) {
      return Observable.of(this.cachedSiblings[seriesId]);
    } else {
      let seriesSiblings$ = this.http.get(`${this.baseUrl}/series/siblings?id=` + seriesId, this.requestOptionsArgs)
        .map(mapData)
        .do(val => {
          this.cachedSiblings[seriesId] = val;
          seriesSiblings$ = null;
        });
      return seriesSiblings$;
    }
  }

  // Get available frequencies for a series' siblings
  fetchSiblingFreqs(seriesId: number): Observable<Frequency[]> {
    if (this.cachedSiblingFreqs[seriesId]) {
      return Observable.of(this.cachedSiblingFreqs[seriesId]);
    } else {
      let siblingFreqs$ = this.http.get(`${this.baseUrl}/series/siblings/freq?id=` + seriesId, this.requestOptionsArgs)
        .map(mapData)
        .do(val => {
          this.cachedSiblingFreqs[seriesId] = val;
          siblingFreqs$ = null;
        });
      return siblingFreqs$;
    }
  }

  fetchFrequencies(id: number): Observable<Frequency[]> {
    if(this.cachedFrequencies[id]) {
      return Observable.of(this.cachedFrequencies[id]);
    } else {
      let frequencies$ = this.http.get(`${this.baseUrl}/category/freq?id=` + id, this.requestOptionsArgs)
        .map(mapData)
        .do(val => {
          this.cachedFrequencies[id] = val;
          frequencies$ = null;
        });
      return frequencies$;
    }
  }

  // Get available geographies for a series' siblings
  fetchSiblingGeos(seriesId: number): Observable<Geography[]> {
    if (this.cachedSiblingGeos[seriesId]) {
      return Observable.of(this.cachedSiblingGeos[seriesId]);
    } else {
      let siblingGeos$ = this.http.get(`${this.baseUrl}/series/siblings/geo?id=` + seriesId, this.requestOptionsArgs)
        .map(mapData)
        .do(val => {
          this.cachedSiblingGeos[seriesId] = val;
          siblingGeos$ = null;
        });
      return siblingGeos$;
    }
  }

  // Gets available geographies for a particular category
  fetchGeographies(id: number): Observable<Geography[]> {
    if (this.cachedGeographies[id]) {
      return Observable.of(this.cachedGeographies[id]);
    } else {
      let geographies$ = this.http.get(`${this.baseUrl}/category/geo?id=` + id, this.requestOptionsArgs)
        .map(mapData)
        .do(val => {
          this.cachedGeographies[id] = val;
          geographies$ = null;
        });
      return geographies$;
    }
  }

  fetchGeoSeries(id: number, handle: string): Observable<Series[]> {
    if (this.cachedGeoSeries[id + handle]) {
      return Observable.of(this.cachedGeoSeries[id + handle]);
    } else {
    let geoSeries$ = this.http.get(`${this.baseUrl}/category/series?id=` + id + `&geo=` + handle, this.requestOptionsArgs)
      .map(mapData)
      .do(val => {
        this.cachedGeoSeries[id + handle] = val;
        geoSeries$ = null;
      });
    return geoSeries$;
    }
  }

  // Gets observation data for a series
  fetchObservations(id: number) {
    if (this.cachedObservations[id]) {
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
}

// Create a nested JSON of parent and child categories
// Used for landing-page.component
// And side bar navigation on single-series & table views
function mapCategories(response: Response): CategoryTree {
  let categories = response.json().data;
  // console.log('categories', categories);
  let dataMap = categories.reduce((map, value) => (map[value.id] = value, map), {});
  let categoryTree = [];
  categories.forEach((value) => {
    let parent = dataMap[value.parentId];
    // let defaults = dataMap[value.defaults];
    if (parent) {
      (parent.children || (parent.children = [])).push(value);
      // (parent.defaults || (parent.defaults = [])).push(value);
    } else {
      categoryTree.push(value);
    }
  });
  return categoryTree;
}

function mapData(response: Response): any {
  let data = response.json().data;
  return data;
}

function mapObservations(response: Response): ObservationResults {
  let observations = response.json().data;
  let start = observations.observationStart;
  let end = observations.observationEnd;
  let level = observations.transformationResults[0].observations;
  let yoy = observations.transformationResults[1].observations;
  let ytd = observations.transformationResults[2].observations;

  let levelValue = [];
  let yoyValue = [];
  let ytdValue = [];

  if (level) {
    level.forEach((entry, index) => {
      // Create [date, value] level pairs for charts
      levelValue.push([Date.parse(level[index].date), +level[index].value]);
    });
  }

  if (yoy) {
    yoy.forEach((entry, index) => {
      // Create [date, value] percent pairs for charts
      yoyValue.push([Date.parse(yoy[index].date), +yoy[index].value]);
    });
  }

  if (ytd) {
    ytd.forEach((entry, index) => {
      // Create [date, value] YTD pairs
      ytdValue.push([Date.parse(ytd[index].date), +ytd[index].value]);
    });
  }

  let tableData = combineObsData(level, yoy, ytd);
  let chartData = {level: levelValue, yoy: yoyValue, ytd: ytdValue};
  let data = {'chart data': chartData, 'table data': tableData, 'start': start, 'end': end};
  return data;
}

// Combine level and percent arrays from Observation data
// Used to construct table data for single series view
function combineObsData(level, yoy, ytd) {
  // Check that level and perc arrays are not null
  if (level && yoy && ytd) {
    let table = level;
    for (let i = 0; i < level.length; i++) {
      table[i].yoyValue = ' ';
      table[i].ytdValue = ' ';
      // table[i].value = parseFloat((+level[i].value).toFixed(2));
      table[i].value = formatNum(+level[i].value, 2);
      for (let j = 0; j < yoy.length; j++) {
        if (level[i].date === yoy[j].date) {
          // table[i].yoyValue = parseFloat((+yoy[j].value).toFixed(2));
          table[i].yoyValue = formatNum(+yoy[j].value, 2);
          table[i].ytdValue = formatNum(+ytd[j].value, 2)
          break;
        }
      }
    }
    return table;
  } else if (level && (!yoy || !ytd)) {
    let table = level;
    for (let i = 0; i < level.length; i++) {
      table[i].yoyValue = ' ';
      table[i].ytdValue = ' ';
      table[i].value = formatNum(+level[i].value, 2);
    }
    return table;
  }
}

function formatNum(num: number, decimal: number) {
  //return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let fixedNum: any;
  let formattedNum: string;
  fixedNum = num.toFixed(decimal);
  // remove decimals 
  let int = fixedNum|0;
  let signCheck = num < 0 ? 1 : 0;
  // store deicmal value
  let remainder = Math.abs(fixedNum - int);
  let decimalString= ('' + remainder.toFixed(decimal)).substr(2, decimal);
  let intString = '' + int, i = intString.length;
  let r = '';
  while ( (i -= 3) > signCheck ) { r = ',' + intString.substr(i, 3) + r; }
  return intString.substr(0, i + 3) + r + (decimalString ? '.'+decimalString: '');
  // return +formattedNum;
}