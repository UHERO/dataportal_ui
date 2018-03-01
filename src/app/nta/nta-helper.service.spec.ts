import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, BaseRequestOptions, ConnectionBackend, Response, ResponseOptions } from '@angular/http';

import { NtaHelperService } from './nta-helper.service';
import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';

describe('NtaHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        NtaHelperService,
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
      ]
    });
  });

  it('should be created', inject([NtaHelperService], (service: NtaHelperService) => {
    expect(service).toBeTruthy();
  }));
});
