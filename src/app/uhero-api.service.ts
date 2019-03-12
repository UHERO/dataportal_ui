import { of as observableOf, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Category } from './category';
import { Series } from './series';
import { Frequency } from './frequency';
import { Geography } from './geography';
import { ObservationResults } from './observation-results';

@Injectable()
export class UheroApiService {
  private baseUrl: string;
  private headers: HttpHeaders;
  private cachedCategories;
  private cachedGeos;
  private cachedExpanded = [];
  private cachedSelectedCategory = [];
  private cachedSelectedCategoryGeoFreq = [];
  private cachedGeoSeries = [];
  private cachedObservations = [];
  private cachedSeries = [];
  private cachedSeriesDetail = [];
  private cachedSiblings = [];
  private cachedSearchExpand = [];
  private cachedSearch = [];
  private cachedCatMeasures = [];
  private cachedMeasureSeries = [];
  private cachedPackageSeries = [];
  private cachedPackageCategory = [];
  private cachedPackageSearch = [];
  private cachedPackageAnalyzer = [];
  private httpOptions;

  constructor(@Inject('rootCategory') private rootCategory, @Inject('portal') private portal, private http: HttpClient) {
    this.baseUrl = environment['apiUrl'];
    this.headers = new HttpHeaders({});
    this.headers.append('Authorization', 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M=');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M='
      })
    };
  }

  // Get data from API
  // Gets all available categories. Used for navigation & displaying sublists
  fetchCategories(): Observable<Category[]> {
    if (this.cachedCategories) {
      return observableOf(this.cachedCategories);
    } else {
      let categories$ = this.http.get(`${this.baseUrl}/category?u=` + this.portal.universe, this.httpOptions).pipe(
        map(mapCategories, this),
        tap(val => {
          this.cachedCategories = val;
          categories$ = null;
        }), );
      return categories$;
    }
  }

  fetchGeographies(): Observable<any> {
    if (this.cachedGeos) {
      return observableOf(this.cachedGeos);
    } else {
      let geos$ = this.http.get(`${this.baseUrl}/geo`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedGeos = val;
          geos$ = null;
        }), );
      return geos$;
    }
  }

  // Gets observations for series in a (sub) category
  fetchExpanded(id: number, geo: string, freq: string): Observable<any> {
    if (this.cachedExpanded[id + geo + freq]) {
      return observableOf(this.cachedExpanded[id + geo + freq]);
    } else {
      let expanded$ = this.http.get(`${this.baseUrl}/category/series?id=` +
        id + `&geo=` + geo + `&freq=` + freq + `&expand=true`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedExpanded[id + geo + freq] = val;
          expanded$ = null;
        }), );
      return expanded$;
    }
  }

  // Gets a particular category. Used to identify a category's date ranges
  fetchSelectedCategory(id: number): Observable<any> {
    if (this.cachedSelectedCategory[id]) {
      return observableOf(this.cachedSelectedCategory[id]);
    } else {
      let selectedCat$ = this.http.get(`${this.baseUrl}/category?id=` + id, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSelectedCategory[id] = val;
          selectedCat$ = null;
        }), );
      return selectedCat$;
    }
  }

  // Gets a particular category. Used to identify a category's date ranges
  fetchSelectedCategoryWithGeoFreq(id: number, geo: string, freq: string): Observable<any> {
    if (this.cachedSelectedCategoryGeoFreq[id + geo + freq]) {
      return observableOf(this.cachedSelectedCategoryGeoFreq[id + geo + freq]);
    } else {
      let selectedCat$ = this.http.get(`${this.baseUrl}/category?id=` +
        id + `&geo=` + geo + `&freq=` + freq, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSelectedCategoryGeoFreq[id + geo + freq] = val;
          selectedCat$ = null;
        }), );
      return selectedCat$;
    }
  }

  fetchPackageSeries(id: number, catId?: number) {
    if (this.cachedPackageSeries[id]) {
      return observableOf(this.cachedPackageSeries[id]);
    } else {
      let series$ = this.http.get(`${this.baseUrl}/package/series?id=` + id + `&u=` + this.portal.universe + `&cat=` + catId, this.httpOptions).pipe(map(mapData),
        tap(val => {
          this.cachedPackageSeries[id] = val;
          series$ = null;
        }), );
      return series$;
    }
  }

  fetchPackageCategory(id: number, geo: string, freq: string): Observable<any> {
    if (this.cachedPackageCategory[id + geo + freq]) {
      return observableOf(this.cachedPackageCategory[id + geo + freq]);
    } else {
      let selectedCat$ = this.http.get(`${this.baseUrl}/package/category?id=` +
        id + `&geo=` + geo + `&freq=` + freq, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedPackageCategory[id + geo + freq] = val;
          selectedCat$ = null;
        }), );
      return selectedCat$;
    }
  }

  fetchSeries(id: number, geo: string, freq: string): Observable<any> {
    if (this.cachedSeries[id + geo + freq]) {
      return observableOf(this.cachedSeries[id + geo + freq]);
    } else {
      let series$ = this.http.get(`${this.baseUrl}/category/series?id=` + id + `&geo=` + geo + `&freq=` + freq, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSeries[id + geo + freq] = val;
          series$ = null;
        }), );
      return series$;
    }
  }

  // Gets data for a particular series. Used for single series view.
  fetchSeriesDetail(id: number): Observable<any> {
    if (this.cachedSeriesDetail[id]) {
      return observableOf(this.cachedSeriesDetail[id]);
    } else {
      let seriesDetail$ = this.http.get(`${this.baseUrl}/series?id=` + id, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSeriesDetail[id] = val;
          seriesDetail$ = null;
        }), );
      return seriesDetail$;
    }
  }

  // Get list of siblings for a particular series
  fetchSeriesSiblings(seriesId: number): Observable<any> {
    if (this.cachedSiblings[seriesId]) {
      return observableOf(this.cachedSiblings[seriesId]);
    } else {
      let seriesSiblings$ = this.http.get(`${this.baseUrl}/series/siblings?id=` + seriesId, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSiblings[seriesId] = val;
          seriesSiblings$ = null;
        }), );
      return seriesSiblings$;
    }
  }

  fetchGeoSeries(id: number, handle: string): Observable<any> {
    if (this.cachedGeoSeries[id + handle]) {
      return observableOf(this.cachedGeoSeries[id + handle]);
    } else {
      let geoSeries$ = this.http.get(`${this.baseUrl}/category/series?id=` + id + `&geo=` + handle, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedGeoSeries[id + handle] = val;
          geoSeries$ = null;
        }), );
      return geoSeries$;
    }
  }

  fetchCategoryMeasurements(id: number) {
    if (this.cachedCatMeasures[id]) {
      return observableOf(this.cachedCatMeasures[id]);
    } else {
      let catMeasures$ = this.http.get(`${this.baseUrl}/category/measurements?id=` + id, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedCatMeasures[id] = val;
          catMeasures$ = null;
        }), );
      return catMeasures$;
    }
  }

  fetchMeasurementSeries(id: number) {
    if (this.cachedMeasureSeries[id]) {
      return observableOf(this.cachedMeasureSeries[id]);
    } else {
      let measureSeries$ = this.http.get(`${this.baseUrl}/measurement/series?id=` + id + `&expand=true`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedMeasureSeries[id] = val;
          measureSeries$ = null;
        }), );
      return measureSeries$;
    }
  }

  fetchSearch(search: string) {
    if (this.cachedSearch[search]) {
      return observableOf(this.cachedSearch[search]);
    } else {
      let filters$ = this.http.get(`${this.baseUrl}/search?q=` + search + `&u=` + this.portal.universe, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSearch[search] = val;
          filters$ = null;
        }), );
      return filters$;
    }
  }

  fetchSearchSeries(search: string): Observable<any> {
    if (this.cachedSearchExpand[search]) {
      return observableOf(this.cachedSearchExpand[search]);
    } else {
      let search$ = this.http.get(`${this.baseUrl}/search/series?q=` + search + `&u=` + this.portal.universe, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSearchExpand[search] = val;
          search$ = null;
        }), );
      return search$;
    }
  }

  fetchSearchSeriesExpand(search: string, geo: string, freq: string): Observable<any> {
    if (this.cachedSearchExpand[search + geo + freq]) {
      return observableOf(this.cachedSearchExpand[search + geo + freq]);
    } else {
      let search$ = this.http.get(`${this.baseUrl}/search/series?q=` +
        search + `&geo=` + geo + `&freq=` + freq + `&u=` + this.portal.universe + `&expand=true`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSearchExpand[search + geo + freq] = val;
          search$ = null;
        }), );
      return search$;
    }
  }

  fetchPackageSearch(search: string, geo: string, freq: string) {
    if (this.cachedPackageSearch[search + geo + freq]) {
      return observableOf(this.cachedPackageSearch[search + geo + freq]);
    } else {
      let search$ = this.http.get(`${this.baseUrl}/package/search?q=` +
        search + `&u=` + this.portal.universe + `&geo=` + geo + `&freq=` + freq, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSearchExpand[search + geo + freq] = val;
          search$ = null;
        }), );
      return search$;
    }
  }

  fetchPackageAnalyzer(ids: string) {
    if (this.cachedPackageAnalyzer[ids]) {
      return observableOf(this.cachedPackageAnalyzer[ids]);
    } else {
      let analyzer$ = this.http.get(`${this.baseUrl}/package/analyzer?ids=` + ids + `&u=` + this.portal.universe, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedPackageAnalyzer[ids] = val;
          analyzer$ = null;
        }), );
      return analyzer$;
    }
  }

  // Gets observation data for a series
  fetchObservations(id: number) {
    if (this.cachedObservations[id]) {
      return observableOf(this.cachedObservations[id]);
    } else {
      let observations$ = this.http.get(`${this.baseUrl}/series/observations?id=` + id, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedObservations[id] = val;
          observations$ = null;
        }), );
      return observations$;
    }
  }
}

// Create a nested JSON of parent and child categories
// Used for landing-page.component
// And side bar navigation on single-series & table views
function mapCategories(response): Array<Category> {
  const categories = response.data;
  const dataMap = categories.reduce((map, value) => (map[value.id] = value, map), {});
  const categoryTree = [];
  categories.forEach((value) => {
    value.label = value.name;
    const parent = dataMap[value.parentId];
    if (parent) {
      (parent.children || (parent.children = [])).push(value);
    } else {
      categoryTree.push(value);
    }
  });
  let result = categoryTree;
  categoryTree.forEach((category) => {
    if (category.id === this.rootCategory) {
      result = category.children;
    }
  });
  return result;
}

function mapData(response): any {
  return response.data;
}