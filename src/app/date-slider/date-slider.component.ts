import { Component, OnInit, Input, OnChanges, AfterViewInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { HelperService } from '../helper.service';
import 'jquery';
declare var $: any;
import 'ion-rangeslider';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateSliderComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() portalSettings;
  @Input() subCat;
  @Input() dates;
  @Input() freq;
  @Input() dateFrom;
  @Input() dateTo;
  @Input() sublist;
  @Output() updateRange = new EventEmitter(true);
  private start;
  private end;

  constructor(private _helper: HelperService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const that = this;
    const freq = this.freq;
    $('#' + this.subCat.id).ionRangeSlider({
      min: 0,
      from: this.start,
      to: this.end,
      values: this.dates,
      prettify_enabled: false,
      hide_min_max: true,
      keyboard: true,
      keyboard_step: 1,
      type: 'double',
      onFinish: function (data) {
        const chartStart = that.formatChartDate(data.from_value, freq);
        const chartEnd = that.formatChartDate(data.to_value, freq);
        const tableStart = data.from_value.toString();
        const tableEnd = data.to_value.toString();
        that.updateRange.emit({ chartStart: chartStart, chartEnd: chartEnd, tableStart: tableStart, tableEnd: tableEnd });
      }
    });
  }

  ngOnChanges() {
    if (this.portalSettings.sliderInteraction && this.dates && this.dates.length) {
      const defaultRanges = this.findDefaultRange();
      // Start and end used for 'from' and 'to' inputs in slider
      // If start/end exist in values array, position handles at start/end; otherwise, use default range
      this.start = defaultRanges.start;
      this.end = defaultRanges.end;
      this.sublist.forEach((sub) => {
        const slider = $('#' + sub.id).data('ionRangeSlider');
        this.updateSlider(slider);
      });
    }
    if (!this.portalSettings.sliderInteraction && this.dates && this.dates.length) {
      const defaultRanges = this.findDefaultRange();
      // Start and end used for 'from' and 'to' inputs in slider
      // If start/end exist in values array, position handles at start/end; otherwise, use default range
      this.start = defaultRanges.start;
      this.end = defaultRanges.end;
      const slider = $('#' + this.subCat.id).data('ionRangeSlider');
      this.updateSlider(slider);
    }
  }

  findDefaultRange() {
    const defaultRanges = this._helper.setDefaultRange(this.freq, this.dates);
    let startIndex = defaultRanges.start, endIndex = defaultRanges.end;
    this.dates.forEach((date, index) => {
      // Range slider is converting annual year strings to numbers
      if (date == this.dateFrom) {
        startIndex = index;
      }
      if (date == this.dateTo) {
        endIndex = index;
      }
    });
    return { start: startIndex, end: endIndex };
  }

  updateSlider(slider) {
    if (slider) {
      slider.update({
        from: this.start,
        to: this.end
      });
    }
  }

  formatChartDate(value, freq) {
    const quarters = { Q1: '01', Q2: '04', Q3: '07', Q4: '10' };
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
