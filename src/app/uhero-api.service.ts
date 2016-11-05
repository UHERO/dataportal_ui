import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

import { CategoryTree } from './category-tree';
import { SelectedSeries } from './selected-series';
import { Series } from './series';
import { Frequency } from './frequency';
import { Geography } from './geography';
import { ObservationResults } from './observation-results';

@Injectable()
export class UheroApiService {
  private baseUrl: string;
  private requestOptionsArgs: RequestOptionsArgs;
  private headers: Headers;
  private cachedCategories;
  // private cachedChartData = [];
  private cachedMultiChartData = {};
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
          // categories$ = null;
        });
      return categories$;
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
      console.log(this.cachedSeriesDetail[id])
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
  fetchSiblingFreqs(seriesId: number): Observable<Frequency> {
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
      console.log(this.cachedGeographies[id]);
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

  // Get series and observation data for landing page component charts
  /* fetchChartData(id: number) {
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
  } */

  // Get series and observation data for landing page component charts; filtered by region
  fetchMultiChartData(id: number, geo: string, freq: string) {
    if (this.cachedMultiChartData[id + geo + freq]) {
      console.log('cached', this.cachedMultiChartData[id + geo + freq])
      return this.cachedMultiChartData[id + geo + freq];
    } else {
      let multiChartData = [];
      this.fetchSeries(id, geo, freq).subscribe((series) => {
        let seriesData = series;
        console.log('series', seriesData);
        if (seriesData !== null) {
          seriesData.forEach((serie, index) => {
            this.fetchObservations(+seriesData[index]['id']).subscribe((obs) => {
              let seriesObservations = obs;
              multiChartData.push({'serie': seriesData[index], 'observations': seriesObservations});
            });
          });
        } else {
          multiChartData.push({'serie': 'No data available'});
        }
      },
      error => this.errorMessage = error);
      this.cachedMultiChartData[id + geo + freq] = (Observable.forkJoin(Observable.of(multiChartData)));
      console.log(this.cachedMultiChartData[id + geo + freq]);
      return this.cachedMultiChartData[id + geo + freq];
    }
  }



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

function mapData(response: Response): any {
  let data = response.json().data;
  return data;
}

function mapObservations(response: Response): ObservationResults {
  let observations = response.json().data.transformationResults;
  let level = observations[0].observations;
  let perc = observations[1].observations;

  let levelValue = [];
  let percValue = [];

  if (level) {
    level.forEach((entry, index) => {
      // Create [date, value] level pairs for charts
      levelValue.push([Date.parse(level[index].date), +level[index].value]);
    });
  }

  if (perc) {
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
  if (level && perc) {
    let table = level;
    for (let i = 0; i < level.length; i++) {
      table[i].percValue = 'NA';
      for (let j = 0; j < perc.length; j++) {
        if (level[i].date === perc[j].date) {
          table[i].percValue = perc[j].value;
          break;
        }
      }
    }
    return table;
  }
}
