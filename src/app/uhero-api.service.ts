import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UheroApiService {
   baseUrl: string;

  constructor(private http: Http) {
     this.baseUrl = 'http://localhost:8080/v1';
  }

  fetchCategories(): Observable<any> {
     return this.http.get(`${this.baseUrl}/category`)
         .map(response => response.json());
  }

  fetchSeries(id: number): Observable<any> {
     return this.http.get(`${this.baseUrl}/category/series?id=` + id)
         .map(response => response.json());
  }

  fetchGeographies(): Observable<any> {
     return this.http.get(`${this.baseUrl}/geo`)
         .map(response => response.json());
 }

}
