/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, BaseRequestOptions, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { SeriesHelperService } from './series-helper.service';
import { HelperService } from './helper.service';
import { AnalyzerService } from './analyzer.service';
import { UheroApiService } from './uhero-api.service';

// TO DO: Write unit test for series-helper.service
describe('Service: SeriesHelper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SeriesHelperService,
        HelperService,
        UheroApiService,
        AnalyzerService,
        { provide: 'rootCategory', useValue: 59 },
        {
          provide: 'portal',
          useValue: {
            universe: 'uhero',
            title: 'Data Portal',
            favicon: 'manoa.jpg',
            feedback: true,
            backgroundImg: false
          }
        }
      ]
    });
  });

  it('should ...', inject([SeriesHelperService], (service: SeriesHelperService) => {
    expect(service).toBeTruthy();
  }));
});
