import { TestBed, inject } from '@angular/core/testing';

import { AnalyzerService } from './analyzer.service';

describe('AnalyzerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyzerService]
    });
  });

  it('should be created', inject([AnalyzerService], (service: AnalyzerService) => {
    expect(service).toBeTruthy();
  }));
});
