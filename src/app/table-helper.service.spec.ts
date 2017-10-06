import { TestBed, inject } from '@angular/core/testing';

import { TableHelperService } from './table-helper.service';

describe('TableHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableHelperService]
    });
  });

  it('should be created', inject([TableHelperService], (service: TableHelperService) => {
    expect(service).toBeTruthy();
  }));
});
