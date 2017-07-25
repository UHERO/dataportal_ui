import { TestBed, inject } from '@angular/core/testing';

import { HelpDocService } from './help-doc.service';

describe('HelpDocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpDocService]
    });
  });

  it('should be created', inject([HelpDocService], (service: HelpDocService) => {
    expect(service).toBeTruthy();
  }));
});
