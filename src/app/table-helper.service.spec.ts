import { TestBed, inject } from '@angular/core/testing';
import { GoogleAnalyticsEventsService } from './google-analytics-events.service';
import { TableHelperService } from './table-helper.service';

describe('TableHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAnalyticsEventsService, TableHelperService]
    });
  });

  it('should be created', inject([TableHelperService], (service: TableHelperService) => {
    expect(service).toBeTruthy();
  }));
});
