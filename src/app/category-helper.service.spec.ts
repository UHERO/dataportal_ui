/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryHelperService } from './category-helper.service';

describe('Service: CategoryHelper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryHelperService]
    });
  });

  it('should ...', inject([CategoryHelperService], (service: CategoryHelperService) => {
    expect(service).toBeTruthy();
  }));
});
