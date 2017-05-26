import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss']
})
export class DateSliderComponent implements OnInit, OnChanges {
  @Input() dates;
  @Input() freq;
  @Output() updateRange = new EventEmitter(true);

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  dateRangeValues(dateWrapper) {
    const start = Date.parse(dateWrapper.firstDate);
    const end = Date.parse(dateWrapper.endDate);
    return { start: start, end: end };
  }

  // Create a new date from a string, return as a timestamp.
  timestamp(year: number, month: number) {
    return new Date(year, month, 1).getTime();
  }

  calculateStep(freq) {
    if (freq === 'A') {
      return 365 * 24 * 60 * 60 * 1000; // One Year
    }
    if (freq === 'Q') {
      return 12 * 7 * 24 * 60 * 60 * 1000; // One Quarter
    }
    if (freq === 'M') {
      return 4 * 7 * 24 * 60 * 60 * 1000; // One Month
    }
  }

  slideChange(event, freq) {
    console.log('change event', event);
    const chartStart = this.formatChartDate(event.from_value, freq);
    const chartEnd = this.formatChartDate(event.to_value, freq);
    const tableStart = event.from_value;
    const tableEnd = event.to_value;
    this.updateRange.emit({ chartStart: chartStart, chartEnd: chartEnd, tableStart: tableStart, tableEnd: tableEnd });
  }

  formatChartDate(value, freq) {
    const quarters = {Q1: '01', Q2: '04', Q3: '07', Q4: '10'};
    let date;
    if (freq === 'A') {
      date = value.toString() + '-01-01';
      return Date.parse(date);
    }
    if (freq === 'Q') {
      const year = value.substr(0, 4);
      const q = value.substr(5, 2);
      date = value.substr(0, 4) + '-' + quarters[q] + '-01';
      return Date.parse(date);
    }
    if (freq === 'M') {
      date = value + '-01';
      return Date.parse(date);
    }
  }

  formatDisplayDates(start, end, freq) {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    if (freq === 'A') {
      return { startDate: start.getFullYear(), endDate: end.getFullYear() }
    }
    if (freq === 'Q') {
      return {
        startDate: start.getFullYear() + ' ' + this.getQuarter(start.getMonth()),
        endDate: end.getFullYear() + ' ' + this.getQuarter(end.getMonth())
      }
    }
    if (freq === 'M') {
      return {
        startDate: start.getFullYear() + '-' + months[start.getMonth()],
        endDate: end.getFullYear() + '-' + months[end.getMonth()]
      }
    }
  }

  getQuarter(month) {
    if (0 <= month && month <= 2) {
      return 'Q1';
    }
    if (3 <= month && month <= 5) {
      return 'Q2';
    }
    if (6 <= month && month <= 8) {
      return 'Q3';
    }
    if (9 <= month && month <= 11) {
      return 'Q4';
    }
  }


  /* // Create a new date from a string, return as a timestamp.
  timestamp(year: number, month: number) {
    return new Date(year, month, 1).getTime();
  }

  formatDisplayDates(start, end, freq) {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    if (freq === 'A') {
      return { startDate: start.getFullYear(), endDate: end.getFullYear() }
    }
    if (freq === 'Q') {
      return {
        startDate: start.getFullYear() + ' ' + this.getQuarter(start.getMonth()),
        endDate: end.getFullYear() + ' ' + this.getQuarter(end.getMonth())
      }
    }
    if (freq === 'M') {
      return {
        startDate: start.getFullYear() + '-' + months[start.getMonth()],
        endDate: end.getFullYear() + '-' + months[end.getMonth()]
      }
    }
  }

  getQuarter(month) {
    if (0 <= month && month <= 2) {
      return 'Q1';
    }
    if (3 <= month && month <= 5) {
      return 'Q2';
    }
    if (6 <= month && month <= 8) {
      return 'Q3';
    }
    if (9 <= month && month <= 11) {
      return 'Q4';
    }
  } */

}
