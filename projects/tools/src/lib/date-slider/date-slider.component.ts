import { Component, Input, Inject, OnInit, EventEmitter, Output, ViewEncapsulation, ViewChild } from '@angular/core';
import { min } from 'rxjs/operators';
import { HelperService } from '../helper.service';

@Component({
  selector: 'lib-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateSliderComponent implements OnInit {
  @ViewChild('calendar') datePicker;
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
  defaultDate: Date;
  minDateValue;
  maxDateValue;
  value;
  calendarDateFormat: string;
  calendarView: string;
  calendarYearRange: string;
  calendarStartDate: Date;
  invalidDates;
  displayMonthNavigator: boolean;

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
      this.displayMonthNavigator = this.freq === 'W' || this.freq === 'D';
      /* Date picker inputs */
      this.calendarView = this.setCalendarView(this.freq);
      this.calendarYearRange = this.setCalendarYearRange(this.sliderDates);
      this.calendarStartDate = new Date(this.dates[this.start].date.replace(/-/g, '/'));
      this.calendarDateFormat = this.setCalendarDateFormat(this.freq, this.calendarStartDate);
      this.invalidDates = this.setInvalidDates(this.calendarStartDate.getFullYear(), this.freq, this.calendarStartDate.getMonth() + 1);
      this.setMinMaxDates();
    }
  }

  setInvalidDates = (year: number, freq: string, month?: number) => {
    const datesToDisable = {
      'A': [],
      'S': this.getInvalidMonths(year, freq),
      'Q': this.getInvalidMonths(year, freq),
      'M': [],
      'W': this.getInvalidWeeklyDates(year, month)
    };
    return datesToDisable[freq] || [];
  }

  getInvalidMonths = (year: number, freq: string) => {
    // For quarterly and semi-annual series
    // Months not evenly divisible by 3 should be invalidated for quarterly series
    // Month not evenly divisible by 6 should be invalidated for semi-annual series
    const invalidDates = [];
    const m = freq === 'Q' ? 3 : 6;
    for (let month = 0; month < 12; month++) {
      if ((month % m)) {
        invalidDates.push(new Date(year, month, 1));
      }
    }
    return invalidDates;
  }

  getInvalidWeeklyDates = (year: number, month: number) => {
    const invalidDates = [];
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const paddedDay = day.toString().length === 1 ? `0${day}` : day;
      const paddedMonth = (month).toString().length === 1 ? `0${month}` : month;
      if (!this.sliderDates.find(date => date === `${year}-${paddedMonth}-${paddedDay}`)) {
        invalidDates.push(new Date(year, month - 1, day));
      }
    }
    return invalidDates;
  }

  setCalendarYearRange = (sliderDates: Array<any>) => `${sliderDates[0].substr(0, 4)}:${sliderDates[sliderDates.length - 1].substr(0, 4)}`;

  setCalendarView = (freq: string) => (freq === 'W' || freq === 'D') ? 'date' : 'month';

  setCalendarDateFormat = (freq: string, value: Date) => {
    const quarters = { 0: 'Q1', 3: 'Q2', 6: 'Q3', 9: 'Q4' };
    const format = {
      'A': 'yy',
      'S': 'yy-mm',
      'Q': `yy ${quarters[value.getMonth()]}`,
      'M': 'yy-mm',
      'W': 'yy-mm-dd',
      'D': 'yy-mm-dd'
    }
    return format[freq] || 'yy-mm-dd';
  }

  onCalendarInput(e: any, freq: string) {
    const isValidInput = this.checkValidCalendarInput(e.target.value.toUpperCase(), freq);
    if (isValidInput) {
      this.updateCalendarDate(e.target.value.toUpperCase(), freq);
    }
  }

  checkValidCalendarInput = (value: string, freq: string) => {
    const valueLength = {
      'A': 4,
      'S': 7,
      'Q': 7,
      'M': 7,
      'W': 10,
      'D': 10
    };
    return valueLength[freq] === value.length && this.sliderDates.indexOf(value) > -1;
  }

  onCalendarBlur(e: any, selectedDate) {
    // in case user deletes part of date from input and input is no longer valid
    if (!selectedDate) {
      this.calendarStartDate = new Date(this.dates[this.start].date.replace(/-/g, '/'));
    }
  }

  updateCalendarDate(value: string, freq: string) {
    const qMonths = { 'Q1': '01', 'Q2': '04', 'Q3': '07', 'Q4': '10' };
    const quarter = value[value.search(/(q|Q)[1-4]/)];
    const newDate = {
      'A': new Date(`${value}/01/01`),
      'S': new Date(`${value}/01`),
      'Q': new Date(`${value.slice(0, 4)}/${qMonths[value.slice(5, 7)]}/01`),
      'M': new Date(`${value}/01`),
      'W': new Date(value.replace(/-/g, '/')),
      'D': new Date(value.replace(/-/g, '/'))
    };
    this.calendarStartDate = newDate[this.freq];
    this.calendarDateFormat = this.setCalendarDateFormat(freq, this.calendarStartDate);
    this.start = this.sliderDates.indexOf(value);
    this.sliderSelectedRange = [this.start, this.end];
    this.updateChartsAndTables(this.sliderDates[this.start], this.sliderDates[this.end], this.freq);
    const year = this.calendarStartDate.getUTCFullYear();
    const month = this.calendarStartDate.getMonth() + 1;
    this.invalidDates = freq === 'A' ? this.setInvalidDates(year, this.freq, 0) : this.setInvalidDates(year, this.freq, month);
  }

  updateAnnualCalendarDate(year) {
    this.calendarStartDate = new Date(`${year}/01/01`);
    this.start = this.sliderDates.indexOf(year);
    this.sliderSelectedRange = [this.start, this.end];
    this.updateChartsAndTables(this.sliderDates[this.start], this.sliderDates[this.end], this.freq);
    this.invalidDates = this.setInvalidDates(year, this.freq, 0);
  }

  onCalendarSelect(e: any) {
    const dateIndex = this.dates.map(d => d.date).indexOf(e.toISOString().substr(0, 10));
    this.calendarStartDate = new Date(e.toISOString().substr(0, 10).replace(/-/g, '/'));
    this.calendarDateFormat = this.setCalendarDateFormat(this.freq, this.calendarStartDate);
    this.start = dateIndex;
    this.sliderSelectedRange = [this.start, this.end];
    this.updateChartsAndTables(this.sliderDates[this.start], this.sliderDates[this.end], this.freq);
    this.invalidDates = this.setInvalidDates(e.getFullYear(), this.freq, e.getMonth());
  }

  onCalendarClose(e: any, selectedDate) {
    this.calendarStartDate = selectedDate ? new Date(selectedDate) : new Date(this.dates[this.start].date.replace(/-/g, '/'));
    this.invalidDates = this.setInvalidDates(this.calendarStartDate.getFullYear(), this.freq, this.calendarStartDate.getMonth() + 1);
  }

  onMonthChange(e:any, freq: string) {
    this.invalidDates = this.setInvalidDates(e.year, freq, e.month);
    this.setMinMaxDates();
  }

  onYearChange(e: any, freq: string) {
    if (freq === 'A') {
      this.updateCalendarDate(e.year.toString(), freq);
      this.datePicker.overlayVisible = false;
    }
    this.invalidDates = this.setInvalidDates(e.year, this.freq, e.month);
    this.setMinMaxDates();
  }

  setMinMaxDates() {
    this.maxDateValue = new Date(this.dates[this.dates.length - 1].date.replace(/-/g, '/'));
    this.minDateValue = new Date(this.dates[0].date.replace(/-/g, '/'));
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
    // workaround for onSlideEnd not firing when not using the slide handles
    this.sliderSelectedRange = [this.start, this.end];
    this.defaultDate = new Date(this.sliderDates[this.start].replace(/-/g, '/')+'/01/01');
    this.updateChartsAndTables(this.sliderDates[this.start], this.sliderDates[this.end], this.freq);
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
    // Annual: YYYY
    // Quarterly: YYYY Q#, YYYYQ#, YYYY q#, YYYYq#
    // Monthly/Semiannual: YYYY-MM, YYYYMM
    // Weekly: YYYY-MM-DD
    if (freq === 'A') {
      return /^\d{4}$/.test(value);
    }
    if (freq === 'Q') {
      return /^\d{4}( |)[Q]\d{1}$/.test(value);
    }
    if (freq === 'M' || freq === 'S') {
      return /^\d{4}(|-)\d{2}$/.test(value);
    }
    if (freq === 'W') {
      return /^\d{4}(|-)\d{2}(|-)\d{2}$/.test(value);
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
    if (freq === 'W' || freq === 'D') {
      return value;
    }
  }
}
