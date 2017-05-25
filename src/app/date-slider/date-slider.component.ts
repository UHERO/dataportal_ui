import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss']
})
export class DateSliderComponent implements OnInit {
  private someRange;
  private sliderConfig;
  private start;
  private end;
  @Input() dateWrapper;
  @Input() freq;
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    console.log('dates', this.dateWrapper);
    console.log('freq', this.freq);
    if (this.dateWrapper && this.freq) {
      const step = this.calculateStep(this.freq);
      const range = this.dateRangeValues(this.dateWrapper);
      this.createSliderConfig(range, step);
    }
  }

  createSliderConfig(range, step) {
    this.sliderConfig = {
      behavior: 'drag',
      keyboard: true,
      connect: true,
      range: {
        min: this.timestamp(range.startYear, range.startMonth),
        max: this.timestamp(range.endYear, range.endMonth)
      },
      // tooltips: [true, true],
      step: step,
      start: [this.timestamp(range.startYear, range.startMonth), this.timestamp(range.endYear, range.endMonth)],
      format: {
        to: function(value) {
          return value;
        },
        from: function(value) {
          return value;
        }
      }
    }
  }

  calculateStep(freq) {
    if (freq === 'A') {
      return 52 * 7 * 24 * 60 * 60 * 1000; // One Year
    }
    if (freq === 'Q') {
      return 12 * 7 * 24 * 60 * 60 * 1000; // One Quarter
    }
    if (freq === 'M') {
      return 4 * 7 * 24 * 60 * 60 * 1000; // One Month
    }
  }

  dateRangeValues(dateWrapper) {
    const startYear = +dateWrapper.firstDate.substr(0, 4);
    const startMonth = +dateWrapper.firstDate.substr(5, 2) - 1;
    const endYear = +dateWrapper.endDate.substr(0, 4);
    const endMonth = +dateWrapper.endDate.substr(5, 2) - 1;
    return { startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth };
  }

  // Create a new date from a string, return as a timestamp.
  timestamp(year: number, month: number) {
    return new Date(year, month).getTime();
  }

  onChange(event, freq) {
    console.log(new Date(event[0]).toISOString())
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    const first = new Date(event[0]);
    const last = new Date(event[1]);
    const formattedDates = this.formatDisplayDates(first, last, freq);
    this.start = formattedDates.startDate;
    this.end = formattedDates.endDate
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

}
