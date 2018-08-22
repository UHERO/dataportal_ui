import { Component, Input, Inject, OnChanges, AfterViewInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { HelperService } from '../helper.service';
import 'jquery';
declare var $: any;
// import 'ion-rangeslider';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateSliderComponent implements OnChanges, AfterViewInit {
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
  private sliderDates;

  constructor(@Inject('defaultRange') private defaultRange, private _helper: HelperService) { }

  ngAfterViewInit() {
    this.sliderDates = this.dates.map(date => date.tableDate);
    const that = this;
    const freq = this.freq;
    $('#' + this.subCat.id).ionRangeSlider({
      min: 0,
      from: this.start,
      to: this.end,
      values: this.sliderDates,
      prettify_enabled: false,
      hide_min_max: true,
      keyboard: true,
      keyboard_step: 1,
      type: 'double',
      onChange: function (data) {
        if (that.portalSettings.sliderInteraction) {
          that.updateOtherSliders(that.sublist, that.subCat.id, data.from, data.to);
        }
      },
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
    if (this.dates && this.dates.length) {
      const defaultRanges = this.findDefaultRange();
      // Start and end used for 'from' and 'to' inputs in slider
      // If start/end exist in values array, position handles at start/end; otherwise, use default range
      this.start = defaultRanges.start;
      this.end = defaultRanges.end;
    }
  }

  updateOtherSliders(sublist, subcatId, from, to) {
    sublist.forEach((sub) => {
      const slider = sub.id !== subcatId ? $('#' + sub.id).data('ionRangeSlider') : null;
      if (slider) {
        slider.update({
          from: from,
          to: to
        });
      }
    });
  }

  findDefaultRange() {
    this.sliderDates = this.dates.map(date => date.tableDate);
    const defaultRanges = this._helper.setDefaultSliderRange(this.freq, this.sliderDates, this.defaultRange);
    let { startIndex, endIndex } = defaultRanges;
    // Range slider is converting annual year strings to numbers
    const dateFromExists = this.dates.findIndex(date => date == this.dateFrom);
    const dateToExists = this.dates.findIndex(date => date == this.dateTo);
    if (dateFromExists > -1 && dateToExists > -1) {
      startIndex = dateFromExists;
      endIndex = dateToExists;
    }
    return { start: startIndex, end: endIndex };
  }

  formatChartDate(value, freq) {
    const quarters = { Q1: '01', Q2: '04', Q3: '07', Q4: '10' };
    let date;
    if (freq === 'A') {
      date = value.toString() + '-01-01';
      return date;
    }
    if (freq === 'Q') {
      const year = value.substr(0, 4);
      const q = value.substr(5, 2);
      date = value.substr(0, 4) + '-' + quarters[q] + '-01';
      return date;
    }
    if (freq === 'M') {
      date = value + '-01';
      return date;
    }
  }
}
