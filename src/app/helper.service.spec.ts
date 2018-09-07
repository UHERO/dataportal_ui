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

  it('createDateArray should create an array of dates', inject([HelperService], (service: HelperService) => {
    const dateArray = [];
    const freq = 'A';
    const startDate = '2000-01-01';
    const endDate = '2005-01-01';
    const expected = [
      { date: '2000-01-01', tableDate: '2000' },
      { date: '2001-01-01', tableDate: '2001' },
      { date: '2002-01-01', tableDate: '2002' },
      { date: '2003-01-01', tableDate: '2003' },
      { date: '2004-01-01', tableDate: '2004' },
      { date: '2005-01-01', tableDate: '2005' }
    ];
    expect(service.createDateArray(startDate, endDate, freq, dateArray)).toEqual(expected);
  }));

  it('formatDate should return a formatted date string', inject([HelperService], (service: HelperService) => {
    const freqs = ['A', 'Q', 'M', 'S'];
    const date = '2000-01-01';
    const expected = ['2000', '2000 Q1', '2000-01', '2000-01'];
    freqs.forEach((freq, index) => {
      expect(service.formatDate(date, freq)).toEqual(expected[index]);
    });
  }));

  it('formatNum should round and convert number to string', inject([HelperService], (service: HelperService) => {
    const actual = [-2540.2545, -150.3498, -0.2786, 0.3586, 157.5867, 2587693.7586];
    const decimal = [2, 2, 2, 1, 3, 2];
    const expected = ['-2,540.25', '-150.35', '-0.28', '0.4', '157.587', '2,587,693.76'];
    actual.forEach((item, index) => {
      expect(service.formatNum(item, decimal[index])).toEqual(expected[index]);
    });
  }));
});
