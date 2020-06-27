import { Component, Input, Inject, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'lib-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateSliderComponent implements OnInit {
  @Input() portalSettings;
  @Input() dates;
  @Input() freq;
  @Input() dateFrom;
  @Input() dateTo;
  @Output() updateRange = new EventEmitter(true);
  start;
  end;
  sliderDates;
  sliderSelectedRange;

  constructor(
    @Inject('defaultRange') private defaultRange,
    private helperService: HelperService,
  ) { }

  ngOnInit() {
    if (this.dates && this.dates.length) {
      const defaultRanges = this.findDefaultRange(this.dates, this.freq, this.defaultRange, this.dateFrom, this.dateTo);
      // Start and end used for 'from' and 'to' inputs in slider
      // If start/end exist in values array, position handles at start/end; otherwise, use default range
      this.start = defaultRanges.start;
      this.end = defaultRanges.end;
      this.sliderDates = defaultRanges.sliderDates;
      this.sliderSelectedRange = [this.start, this.end];
    }
  }

  inputChange(e, input: string) {
    const newValue = e.target.value.toUpperCase();
    const formattedValue = this.formatInput(newValue, this.freq);
    this.sliderDates = this.dates.map(d => d.tableDate); // Changing inputs seems to alter original array?
    const validInputs = input === 'from' ?
      this.checkValidInputs(formattedValue, this.sliderDates[this.end], input, this.freq) :
      this.checkValidInputs(formattedValue, this.sliderDates[this.start], input, this.freq);
    const valueIndex = this.sliderDates.indexOf(formattedValue);
    if (valueIndex >= 0 && validInputs) {
      this.start = input === 'from' ? this.sliderDates.indexOf(formattedValue) : this.start;
      this.end = input === 'to' ? this.sliderDates.indexOf(formattedValue) : this.end;
      this.sliderSelectedRange = [this.start, this.end];
      this.updateChartsAndTables(this.sliderDates[this.start], this.sliderDates[this.end], this.freq);
    }
  }

  slideChange(e) {
    this.start = e.values[0];
    this.end = e.values[1];
  }

  slideEnd(e) {
    this.start = e.values[0];
    this.end = e.values[1];
    this.sliderSelectedRange = [this.start, this.end];
    this.updateChartsAndTables(this.sliderDates[this.start], this.sliderDates[this.end], this.freq);
  }

  updateChartsAndTables(from, to, freq: string) {
    const seriesStart = this.formatChartDate(from, freq);
    const seriesEnd = this.formatChartDate(to, freq);
    const endOfSample = this.dates[this.dates.length - 1].date === seriesEnd;
    this.updateRange.emit({ seriesStart, seriesEnd, endOfSample });
  }

  updateRanges(from, to, freq: string) {
    this.updateChartsAndTables(from, to, freq);
  }

  checkValidInputString = (value, freq: string) => {
    // Accepted input formats:
    // Annual: YYYY; Quarterly: YYYY Q#, YYYYQ#, YYYY q#, YYYYq#; Monthly/Semiannual: YYYY-MM, YYYYMM
    if (freq === 'A') {
      return /^\d{4}$/.test(value);
    }
    if (freq === 'Q') {
      return /^\d{4}( |)[Q]\d{1}$/.test(value);
    }
    if (freq === 'M' || freq === 'S') {
      return /^\d{4}(|-)\d{2}$/.test(value);
    }
  }

  checkValidInputs = (value, siblingValue, key: string, freq: string) => {
    const validString = this.checkValidInputString(value.toUpperCase(), freq);
    if (!validString) {
      return false;
    }
    if (key === 'from') {
      return value <= siblingValue ? true : false;
    }
    if (key === 'to') {
      return value >= siblingValue ? true : false;
    }
  }

  formatInput = (value: string, freq: string) => {
    if (freq === 'Q') {
      return value.includes(' ') ? value : value.slice(0, 4) + ' ' + value.slice(4);
    }
    if (freq === 'M' || freq === 'S') {
      return value.includes('-') ? value : value.slice(0, 4) + '-' + value.slice(4);
    }
    return value;
  }

  findDefaultRange = (dates: Array<any>, freq: string, defaultRange, dateFrom, dateTo) => {
    const sliderDates = dates.map(date => date.tableDate);
    const defaultRanges = this.helperService.setDefaultSliderRange(freq, sliderDates, defaultRange);
    let { startIndex, endIndex } = defaultRanges;
    if (dateFrom) {
      const dateFromExists = this.checkDateExists(dateFrom, dates, freq);
      if (dateFromExists > -1) {
        startIndex = dateFromExists;
      }
      if (dateFrom < dates[0].date) {
        startIndex = 0;
      }
    }
    if (dateTo) {
      const dateToExists = this.checkDateExists(dateTo, dates, freq);
      if (dateToExists > -1) {
        endIndex = dateToExists;
      }
      if (dateTo > dates[dates.length - 1].date) {
        endIndex = dates.length - 1;
      }
    }
    return { start: startIndex, end: endIndex, sliderDates };
  }

  checkDateExists = (date: string, dates: Array<any>, freq: string) => {
    let dateToCheck = date;
    const year = date.substring(0, 4);
    if (freq === 'A') {
      dateToCheck = `${year}-01-01`;
    }
    if (freq === 'Q') {
      const month = +date.substring(5, 7);
      if (month >= 1 && month <= 3) {
        dateToCheck = `${year}-01-01`;
      }
      if (month >= 4 && month <= 6) {
        dateToCheck = `${year}-04-01`;
      }
      if (month >= 7 && month <= 9) {
        dateToCheck = `${year}-07-01`;
      }
      if (month >= 10 && month <= 12) {
        dateToCheck = `${year}-10-01`;
      }
    }
    return dates.findIndex(d => d.date === dateToCheck);
  }

  formatChartDate = (value, freq) => {
    const quarters = { Q1: '01', Q2: '04', Q3: '07', Q4: '10' };
    if (freq === 'A') {
      return `${value.toString()}-01-01`;
    }
    if (freq === 'Q') {
      const q = value.substring(5, 7);
      return `${value.substring(0, 4)}-${quarters[q]}-01`;
    }
    if (freq === 'M' || freq === 'S') {
      return `${value}-01`;
    }
    if (freq === 'W') {
      return value;
    }
  }
}
