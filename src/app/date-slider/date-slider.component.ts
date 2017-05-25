import { Component, OnInit, Input, OnChanges, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss']
})
export class DateSliderComponent implements OnInit, OnChanges {
  private someRange;
  private sliderConfig;
  private start;
  private end;
  @Input() dateWrapper;
  @Input() freq;
  @Input() routeStart;
  @Input() routeEnd;
  @Output() updateRange = new EventEmitter(true);
  @ViewChild('nouislider') nouislider;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.dateWrapper && this.freq) {
      const step = this.calculateStep(this.freq);
      const range = this.dateRangeValues(this.dateWrapper);
      const sliderStart = (this.routeStart && this.routeEnd) ? this.configSliderStart(this.routeStart, this.routeEnd) : this.dateRangeValues(this.dateWrapper);
      const startDate = new Date(this.timestamp(range.startYear, range.startMonth));
      const endDate = new Date(this.timestamp(range.endYear, range.endMonth));
      const formattedRange = this.formatDisplayDates(startDate, endDate, this.freq);
      this.start = formattedRange.startDate;
      this.end = formattedRange.endDate;
      this.createSliderConfig(range, sliderStart, step);
      console.log(this.sliderConfig)
    }
    if (this.nouislider) {
      // Call updateOptions to update the slider's range limits
      this.nouislider.slider.updateOptions(this.sliderConfig)
    }
  }

  createSliderConfig(range, sliderStart, step) {
    this.sliderConfig = {
      behavior: 'drag',
      keyboard: true,
      connect: true,
      range: {
        min: this.timestamp(range.startYear, range.startMonth),
        max: this.timestamp(range.endYear, range.endMonth)
      },
      step: step,
      start: [this.timestamp(sliderStart.startYear, sliderStart.startMonth), this.timestamp(sliderStart.endYear, sliderStart.endMonth)],
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

  configSliderStart(routeStart, routeEnd) {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    let startMonth, endMonth;
    const startYear = +this.routeStart.substr(0, 4);
    const endYear = +this.routeEnd.substr(0, 4);
    if (this.freq === 'A') {
      startMonth = 0;
      endMonth = 0;
    }
    if (this.freq === 'Q') {
      startMonth = quarters.indexOf(this.routeStart.substr(4, 2));
      endMonth = quarters.indexOf(this.routeEnd.subtr(4, 2));
    }
    if (this.freq === 'M') {
      startMonth = +this.routeStart.subtr(4, 2);
      endMonth = +this.routeEnd.substr(4, 2);
    }
    return { startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth };
  }

  // Create a new date from a string, return as a timestamp.
  timestamp(year: number, month: number) {
    return new Date(year, month, 1).getTime();
  }

  onChange(event, freq) {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    const first = new Date(event[0]);
    const last = new Date(event[1]);
    const formattedDates = this.formatDisplayDates(first, last, freq);
    this.start = formattedDates.startDate;
    this.end = formattedDates.endDate;
    this.updateRange.emit({ start: this.start.toString(), end: this.end.toString() });
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
