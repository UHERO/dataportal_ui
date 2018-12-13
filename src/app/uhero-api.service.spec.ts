/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UheroApiService } from './uhero-api.service';

describe('UHEROApiService testing', () => {
  let service: UheroApiService;
  let httpMock: HttpTestingController;
  let portalObj = {
    universe: 'uhero',
    title: 'Data Portal',
    favicon: 'manoa.jpg',
    feedback: true,
    backgroundImg: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UheroApiService,
        { provide: 'rootCategory', useValue: 59 },
        {
          provide: 'portal',
          useValue: portalObj
        }
      ],
      imports: [HttpClientTestingModule]
    });
    // Inject the http service and test controller for each test
    service = TestBed.get(UheroApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should get categories', () => {
    const mockCategoryData = [{
      id: 4,
      name: 'Test Category',
      children: [{
        id: 8,
        name: 'Test Subcategory',
        parentId: 4
      }]
    }]
    service.fetchCategories().subscribe((data: Array<any>) => {
      expect(data).toEqual(mockCategoryData);
    });
    const req = httpMock.expectOne(`https://api.uhero.hawaii.edu/v1/category?u=uhero`, 'call to category endpoint');
    expect(req.request.method).toBe('GET');
    req.flush({
      data: [{
        id: 4,
        name: 'Test Category',
      }, {
        id: 8,
        name: 'Test Subcategory',
        parentId: 4
      }]
    });
    httpMock.verify();
  });

  it('should get series', () => {
    const mockSeriesData = {
      id: 140000,
      name: 'T@ES.T',
      title: 'Test Series Title',
      frequency: 'year',
      unitsLabel: '',
      unitsLabelShort: '%'
    };
    service.fetchSeries(18, 'JP', 'A').subscribe((data: any) => {
      expect(data).toBeTruthy();
    });
    const req = httpMock.expectOne(`https://api.uhero.hawaii.edu/v1/category/series?id=18&geo=JP&freq=A`, 'call to series endpoint');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockSeriesData });
    httpMock.verify();
  });

  it('should get observations', () => {
    const mockObservationData = {
      observationStart: '1950-01-01',
      observationEnd: '2000-01-01',
      transformationResults: [
        {
          transformation: 'lvl',
          dates: ['1950-01-01', '2000-01-01'],
          values: [2000, 5000],
          pseudoHistory: [false, false]
        },
        {
          transformation: 'pc1',
          values: [],
          pseudoHistory: [false, false]
        },
        {
          transformation: 'ytd',
          values: [],
          pseudoHistory: [false, false]
        }
      ]
    };
    service.fetchObservations(151338).subscribe((data: any) => {
      expect(data).toEqual(mockObservationData)
    });
    const req = httpMock.expectOne(`https://api.uhero.hawaii.edu/v1/series/observations?id=151338`, 'call to observation endpoint');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockObservationData });
    httpMock.verify();
  });
});
