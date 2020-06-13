import { of as observableOf, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string;
  private headers: HttpHeaders;
  private httpOptions;
  private cachedCategories;
  private cachedCategoryGeos = [];
  private cachedCategoryFreqs = [];
  private cachedExpanded = [];
  private cachedPackageSeries = [];
  private cachedCatMeasures = [];
  private cachedMeasureSeries = [];
  private cachedSearch = [];
  private cachedSearchExpand = [];
  private cachedPackageSearch = [];
  private cachedPackageAnalyzer = [];
  private cachedObservations = [];

  constructor(@Inject('environment') private environment, @Inject('rootCategory') private rootCategory, @Inject('portal') private portal, private http: HttpClient) {
    this.baseUrl = this.environment.apiUrl;
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
      let categories$ = this.http.get(`${this.baseUrl}/category?u=${this.portal.universe}`, this.httpOptions).pipe(
        map(mapCategories, this),
        tap(val => {
          this.cachedCategories = val;
          categories$ = null;
        }), );
      return categories$;
    }
  }

  fetchCategoryGeos(id: number): Observable<any> {
    if (this.cachedCategoryGeos[id]) {
      return observableOf(this.cachedCategoryGeos[id]);
    } else {
      let categoryGeos$ = this.http.get(`${this.baseUrl}/category/geo?id=${id}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedCategoryGeos[id] = val;
          categoryGeos$ = null;
        }), );
      return categoryGeos$;
    }
  }

  fetchCategoryFreqs(id: number): Observable<any> {
    if (this.cachedCategoryFreqs[id]) {
      return observableOf(this.cachedCategoryFreqs[id]);
    } else {
      let categoryFreqs$ = this.http.get(`${this.baseUrl}/category/freq?id=${id}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedCategoryFreqs[id] = val;
          categoryFreqs$ = null;
        }), );
      return categoryFreqs$;
    }
  }

  // Gets observations for series in a (sub) category
  fetchExpanded(id: number, geo: string, freq: string, noCache: boolean): Observable<any> {
    if (this.cachedExpanded[id + geo + freq]) {
      return observableOf(this.cachedExpanded[id + geo + freq]);
    } else {
      const caching = noCache ? '&nocache' : ''
      let expanded$ = this.http.get(`${this.baseUrl}/category/series?id=${id}&geo=${geo}&freq=${freq}&expand=true${caching}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedExpanded[id + geo + freq] = val;
          expanded$ = null;
        }), );
      return expanded$;
    }
  }

  fetchPackageSeries(id: number, noCache: boolean, catId?: number) {
    if (this.cachedPackageSeries[id]) {
      return observableOf(this.cachedPackageSeries[id]);
    } else {
      const caching = noCache ? '&nocache' : '';
      let series$ = this.http.get(`${this.baseUrl}/package/series?id=${id}&u=${this.portal.universe}&cat=${catId}${caching}`, this.httpOptions).pipe(map(mapData),
        tap(val => {
          this.cachedPackageSeries[id] = val;
          series$ = null;
        }), );
      return series$;
    }
  }

  fetchCategoryMeasurements(id: number, noCache: boolean) {
    if (this.cachedCatMeasures[id]) {
      return observableOf(this.cachedCatMeasures[id]);
    } else {
      const caching = noCache ? '&nocache' : '';
      let catMeasures$ = this.http.get(`${this.baseUrl}/category/measurements?id=${id}${caching}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedCatMeasures[id] = val;
          catMeasures$ = null;
        }), );
      return catMeasures$;
    }
  }

  fetchMeasurementSeries(id: number, noCache: boolean) {
    if (this.cachedMeasureSeries[id]) {
      return observableOf(this.cachedMeasureSeries[id]);
    } else {
      const caching = noCache ? '&nocache' : '';
      let measureSeries$ = this.http.get(`${this.baseUrl}/measurement/series?id=${id}&expand=true${caching}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedMeasureSeries[id] = val;
          measureSeries$ = null;
        }), );
      return measureSeries$;
    }
  }

  fetchSearch(search: string, noCache: boolean) {
    if (this.cachedSearch[search]) {
      return observableOf(this.cachedSearch[search]);
    } else {
      const caching = noCache ? '&nocache' : '';
      let filters$ = this.http.get(`${this.baseUrl}/search?q=${search}&u=${this.portal.universe}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSearch[search] = val;
          filters$ = null;
        }), );
      return filters$;
    }
  }

  fetchSearchSeries(search: string, noCache: boolean): Observable<any> {
    if (this.cachedSearchExpand[search]) {
      return observableOf(this.cachedSearchExpand[search]);
    } else {
      const caching = noCache ? '&nocache' : '';
      let search$ = this.http.get(`${this.baseUrl}/search/series?q=${search}&u=${this.portal.universe}${caching}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSearchExpand[search] = val;
          search$ = null;
        }), );
      return search$;
    }
  }

  fetchPackageSearch(search: string, geo: string, freq: string, noCache: boolean) {
    if (this.cachedPackageSearch[search + geo + freq]) {
      return observableOf(this.cachedPackageSearch[search + geo + freq]);
    } else {
      const caching = noCache ? '&nocache' : '';
      let search$ = this.http.get(`${this.baseUrl}/package/search?q=${search}&u=${this.portal.universe}&geo=${geo}&freq=${freq}${caching}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSearchExpand[search + geo + freq] = val;
          search$ = null;
        }), );
      return search$;
    }
  }

  fetchPackageAnalyzer(ids: string, noCache: boolean) {
    if (this.cachedPackageAnalyzer[ids]) {
      return observableOf(this.cachedPackageAnalyzer[ids]);
    } else {
      const caching = noCache ? '&nocache' : '';
      let analyzer$ = this.http.get(`${this.baseUrl}/package/analyzer?ids=${ids}&u=${this.portal.universe}${caching}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedPackageAnalyzer[ids] = val;
          analyzer$ = null;
        }), );
      return analyzer$;
    }
  }

  // Gets observation data for a series
  fetchObservations(id: number, noCache: boolean) {
    if (this.cachedObservations[id]) {
      return observableOf(this.cachedObservations[id]);
    } else {
      const caching = noCache ? '&nocache' : ''
      let observations$ = this.http.get(`${this.baseUrl}/series/observations?id=${id}${caching}`, this.httpOptions).pipe(
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