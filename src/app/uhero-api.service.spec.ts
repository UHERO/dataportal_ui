/* tslint:disable:no-unused-variable */

import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { Http, BaseRequestOptions, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { UheroApiService } from './uhero-api.service';
import { CategoryTree } from './category-tree';

describe('Service: UheroApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        {provide: UheroApiService, useClass: UheroApiService},
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions}
      ]
    });
  });

  /* it('should ...', inject([UheroApiService], (service: UheroApiService) => {
    expect(service).toBeTruthy();
  }));*/


  /* it('should retrieve all categories',
  inject([UheroApiService, MockBackend], fakeAsync((uheroApiService: UheroApiService, mockBackend: MockBackend) => {
    let res: Response;
    mockBackend.connections.subscribe(c => {
      expect(c.request.url).toBe('http://api.uhero.hawaii.edu/v1/category');
      let response = new ResponseOptions({
        body: [
          {
            children: {
              id: 8,
              name: 'Test Subcategory',
              parentId: 4
            },
            id: 4,
            name: 'Test Category'
          }
        ]
      });

      c.mockRespond(new Response(response));
    });
    uheroApiService.fetchCategories().subscribe((response) => {
      res = response;
    });
    tick();
    expect(res).toBeTruthy();
  }))); */

});
