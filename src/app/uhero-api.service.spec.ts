/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, BaseRequestOptions, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { UheroApiService } from './uhero-api.service';
import { CategoryTree } from './category-tree';

let backend: MockBackend;
let service: UheroApiService;
let response: Response;

const mockCategoryData = () => [{
  id: 4,
  name: 'Test Category',
  }, {
  id: 8,
  name: 'Test Subcategory',
  parentId: 4
}];

const mockSeriesData = () => [{
  id: 140000,
  name: 'T@ES.T',
  title: 'Test Series Title',
  frequency: 'year',
  unitsLabel: '',
  unitsLabelShort: '%'
}];

const mockObservationData = () => [{
  'chart data': {
    level: [283996800000, 3729.411],
    perc: [283996800000, 211660.5557]
  },
  'table data': {
    date: '1979-01-01',
    level: 3729.411,
    perc: 211660.5557
  }
}];

describe('Service: UheroApi', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UheroApiService,
        { provide: XHRBackend, useClass: MockBackend}
      ]
    })
    .compileComponents();
  }));

  it('can instantiate service when injected', inject([UheroApiService], (_service: UheroApiService) => {
    expect(_service instanceof UheroApiService).toBe(true);
  }));

  describe('fetchCategories', () => {
    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new UheroApiService(http);
      let mockCategories = mockCategoryData();
      let options = new ResponseOptions({status: 200, body: { data: mockCategories}});
      response = new Response(options);
    }));

    it('should have expected fake categories', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.fetchCategories()
        .do(categories => {
          expect(categories.length).toBeGreaterThan(0);
        });
    })));

    it('should be OK returning no categories', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.fetchCategories()
        .do(categories => {
          expect(categories.length).toBe(0, 'should have no categories');
        });
    })));
  });

  describe('fetchSeries', () => {
    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new UheroApiService(http);
      let mockSeries = mockSeriesData();
      let options = new ResponseOptions({status: 200, body: { data: mockSeries}});
      response = new Response(options);
    }));

    it('should have expected fake series data', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.fetchSeries(1, 'HI', 'A')
        .do(series => {
          expect(series.length).toBeGreaterThan(0);
        });
    })));
  });

  describe('fetchObservations', () => {
    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new UheroApiService(http);
      let mockObservations = mockObservationData();
      let options = new ResponseOptions({status: 200, body: { data: mockObservations}});
      response = new Response(options);
    }));

    it('should have expected fake observation data', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.fetchObservations(1)
        .do(observations => {
          expect(observations).toBe(true);
        });
    })));
  });

});
