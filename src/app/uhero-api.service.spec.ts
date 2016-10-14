/* tslint:disable:no-unused-variable */

import { TestBed, getTestBed, async, inject, tick } from '@angular/core/testing';
import { Http, BaseRequestOptions, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { UheroApiService } from './uhero-api.service';
import { CategoryTree } from './category-tree';

/* describe('Service: UheroApi', () => {
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

  it('should ...', inject([UheroApiService], (service: UheroApiService) => {
    expect(service).toBeTruthy();
  }));
}); */

describe('Service: UheroApi', () => {
  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        {provide: UheroApiService, useClass: UheroApiService},
        {provide: MockBackend, useClass: BaseRequestOptions},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions}
      ]
    });
    // TestBed.compileComponents();
    mockBackend = getTestBed().get(MockBackend);
  }));

  // API Service Tests
  /* it('should fetch categories', async(() => {
    let uheroApiService: UheroApiService //= getTestBed().get(UheroApiService);
    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: [
                {
                  id: 26,
                  name: 'Test Category'
                }
              ]
            })
          ));
        });

        uheroApiService = getTestBed().get(UheroApiService);
        expect(uheroApiService).toBeDefined();

        uheroApiService.fetchCategories().subscribe((categories: CategoryTree) => {
          expect(categories.length).toBeDefined();
        })
    });
  })); */
});
