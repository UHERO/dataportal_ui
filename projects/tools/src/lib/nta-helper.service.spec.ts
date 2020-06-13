import { TestBed } from '@angular/core/testing';

import { NtaHelperService } from './nta-helper.service';

describe('NtaHelperService', () => {
  let service: NtaHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NtaHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
