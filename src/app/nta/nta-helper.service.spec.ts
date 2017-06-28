import { TestBed, inject } from '@angular/core/testing';

import { NtaHelperService } from './nta-helper.service';

describe('NtaHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NtaHelperService]
    });
  });

  it('should be created', inject([NtaHelperService], (service: NtaHelperService) => {
    expect(service).toBeTruthy();
  }));
});
