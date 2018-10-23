import { TestBed, inject } from '@angular/core/testing';

import { HighstockHelperService } from './highstock-helper.service';

describe('HighstockHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighstockHelperService]
    });
  });

  it('should be created', inject([HighstockHelperService], (service: HighstockHelperService) => {
    expect(service).toBeTruthy();
  }));
});
