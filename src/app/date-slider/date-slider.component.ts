import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss']
})
export class DateSliderComponent implements OnInit, OnChanges {
  @Input() dates;
  @Input() freq;
  @Input() dateFrom;
  @Input() dateTo;
  @Output() updateRange = new EventEmitter(true);
  private start;
  private end;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.dates) {
      console.log('dates', this.dates);
      console.log('dateFrom', this.dateFrom);
      const startIndex = this.dates.indexOf(this.dateFrom);
      const endIndex = this.dates.indexOf(this.dateTo);
      this.start = startIndex === -1 ? 0 : startIndex;
      this.end = endIndex === -1 ? this.dates.length - 1 : endIndex;
      if (this.dateFrom === null) {
        this.start = 0;
      }
      if (this.dateTo === null) {
        this.end = this.dates.length - 1;
      }
    }
  }

  slideChange(event, freq) {
    const chartStart = this.formatChartDate(event.from_value, freq);
    const chartEnd = this.formatChartDate(event.to_value, freq);
    const tableStart = event.from_value.toString();
    const tableEnd = event.to_value.toString();
    console.log(event);
    this.dates.map(String);
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
}
