/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HelperService } from './helper.service';

describe('Service: Helper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelperService]
    });
  });

  it('should ...', inject([HelperService], (service: HelperService) => {
    expect(service).toBeTruthy();
  }));

  it('formatNum should round and convert number to string', inject([HelperService], (service: HelperService) => {
    let actual = [-2540.2545, -150.3498, -0.2786, 0.3586, 157.5867, 2587693.7586];
    let decimal = [2, 2, 2, 1, 3, 2]
    let expected = ['-2,540.25', '-150.35', '-0.28', '0.4', '157.587', '2,587,693.76'];
    actual.forEach((item, index) => {
      expect(service.formatNum(item, decimal[index])).toEqual(expected[index]);
    });
  }));
});
