import { TestBed, inject } from '@angular/core/testing';
import { XHRBackend, BaseRequestOptions, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AnalyzerService } from './analyzer.service';
import { UheroApiService } from './uhero-api.service';
import { HelperService } from './helper.service';

describe('AnalyzerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalyzerService,
        UheroApiService,
        HelperService,
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
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([AnalyzerService], (service: AnalyzerService) => {
    expect(service).toBeTruthy();
  }));
});
