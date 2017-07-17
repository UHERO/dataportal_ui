import { TestBed, inject } from '@angular/core/testing';

import { DataPortalSettingsService } from './data-portal-settings.service';

describe('DataPortalSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataPortalSettingsService]
    });
  });

  it('should be created', inject([DataPortalSettingsService], (service: DataPortalSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
