/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UheroApiService } from './uhero-api.service';

describe('Service: UheroApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UheroApiService]
    });
  });

  it('should ...', inject([UheroApiService], (service: UheroApiService) => {
    expect(service).toBeTruthy();
  }));
});
