import { Component, OnInit, Input, OnChanges, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateSliderComponent implements OnInit, OnChanges {
  @Input() dates;
  @Input() freq;
  @Input() dateFrom;
  @Input() dateTo;
  @Output() updateRange = new EventEmitter(true);
  private start;
  private end;

  constructor(private _helper: HelperService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.dates) {
      let startIndex = null, endIndex = null;
      this.dates.forEach((date, index) => {
        // Range slider is converting annual year strings to numbers
        if (date == this.dateFrom) {
          startIndex = index;
        }
        if (date == this.dateTo) {
          endIndex = index;
        }
      });
      const defaultRanges = this._helper.setDefaultRange(this.freq, this.dates);
      this.start = startIndex ? startIndex : defaultRanges.start;
      this.end = endIndex ? endIndex : defaultRanges.end;
      console.log(this.end)
    }
  }

  sliderFinish(event, freq) {
    const chartStart = this.formatChartDate(event.from_value, freq);
    const chartEnd = this.formatChartDate(event.to_value, freq);
    const tableStart = event.from_value.toString();
    const tableEnd = event.to_value.toString();
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
