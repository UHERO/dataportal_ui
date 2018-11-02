import { Component, Input, Inject, OnInit, ChangeDetectorRef, AfterViewInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
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
export class DateSliderComponent implements OnInit, AfterViewInit {
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
  private inputPattern;

  constructor(
    @Inject('defaultRange') private defaultRange,
    private _helper: HelperService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.dates && this.dates.length) {
      const defaultRanges = this.findDefaultRange(this.dates, this.freq, this.defaultRange, this.dateFrom, this.dateTo);
      // Start and end used for 'from' and 'to' inputs in slider
      // If start/end exist in values array, position handles at start/end; otherwise, use default range
      this.start = defaultRanges.start;
      this.end = defaultRanges.end;
      this.sliderDates = defaultRanges.sliderDates;

      this.inputPattern = this.setInputPattern(this.freq);
      console.log(this.inputPattern)
    }
  }

  ngAfterViewInit() {
    const $fromInput = $('.js-from');
    const $toInput = $('.js-to');
    this.initRangeSlider(this.sliderDates, this.start, this.end, this.freq, this.portalSettings);
    const $range = $('#slider_' + this.subCat.id).data('ionRangeSlider');
    // Set change functions for 'from' and 'to' date inputs
    this.setInputChangeFunction($fromInput, this.sliderDates, $range, 'from', this.portalSettings, this.freq);
    this.setInputChangeFunction($toInput, this.sliderDates, $range, 'to', this.portalSettings, this.freq);
    this.cd.detectChanges();
  }

  setInputPattern(freq: string) {
    if (freq === 'A') {
      return '/\d{4}/';
    }
    if (freq === 'Q') {
      return '/\d{4}( |)[(Q|q)]\d{1}/';
    }
    if (freq === 'M' || freq === 'S') {
      return '/\d{4}(|-)\d{2}/';
    }
  }

  updateOtherSliders(sublist, subcatId, from, to) {
    sublist.forEach((sub) => {
      const slider = sub.id !== subcatId ? $('#slider_' + sub.id).data('ionRangeSlider') : null;
      if (slider) {
        slider.update({
          from: from,
          to: to
        });
      }
    });
  }

  initRangeSlider(sliderDates: Array<any>, start: number, end: number, freq: string, portalSettings) {
    const updateOtherSliders = (sublist, subCatId, from, to) => this.updateOtherSliders(sublist, subCatId, from, to);
    const updateChartsAndTables = (from, to, freq) => this.updateChartsAndTables(from, to, freq);
    const sublist = this.sublist;
    const subCatId = this.subCat.id;
    const $fromInput = $('.js-from');
    const $toInput = $('.js-to');
    $('#slider_' + this.subCat.id).ionRangeSlider({
      min: 0,
      from: start,
      to: end,
      values: sliderDates,
      prettify_enabled: false,
      hide_min_max: true,
      keyboard: true,
      keyboard_step: 1,
      type: 'double',
      onChange: function (data) {
        if (portalSettings.sliderInteraction) {
          updateOtherSliders(sublist, subCatId, data.from, data.to);
        }
        $fromInput.prop('value', data.from_value);
        $toInput.prop('value', data.to_value);
      },
      onFinish: function (data) {
        updateChartsAndTables(data.from_value, data.to_value, freq);
      }
    });
  }

  updateChartsAndTables(from, to, freq: string) {
    const chartStart = this.formatChartDate(from, freq);
    const chartEnd = this.formatChartDate(to, freq);
    const tableStart = from.toString();
    const tableEnd = to.toString();
    this.updateRange.emit({ chartStart: chartStart, chartEnd: chartEnd, tableStart: tableStart, tableEnd: tableEnd });
  }

  updateRanges(portalSettings, fromIndex: number, toIndex: number, from, to, freq: string) {
    if (portalSettings.sliderInteraction) {
      this.updateOtherSliders(this.sublist, this.subCat.id, fromIndex, toIndex);
    }
    this.updateChartsAndTables(from, to, freq);
  }

  updateRangeSlider(rangeSlider, key, valueIndex) {
    rangeSlider.update({
      [key]: valueIndex
    });
  }

  checkValidInputs = (value, siblingValue, key: string) => {
    if (key === 'from') {
      return value <= siblingValue ? true : false;
    }
    if (key === 'to') {
      return value >= siblingValue ? true : false;
    }
  }

  setInputChangeFunction(input, sliderDates: Array<any>, rangeSlider, key: string, portalSettings, freq: string) {
    const updateRanges = (portalSettings, fromIndex, toIndex, from, to, freq) => this.updateRanges(portalSettings, fromIndex, toIndex, from, to, freq);
    const updateRangeSlider = (rangeSlider, key, valueIndex) => this.updateRangeSlider(rangeSlider, key, valueIndex);
    const checkValidInputs = (value, siblingValue, key) => this.checkValidInputs(value, siblingValue, key);
    input.on('change', function () {
      let value = $(this).prop('value');
      console.log('value', value);
      console.log('typsof Value', typeof value)
      let valueIndex = sliderDates.findIndex(date => date == value);
      const siblingValue = $(this).siblings().prop('value');
      const siblingValueIndex = sliderDates.findIndex(date => date == siblingValue);
      const validInputs = checkValidInputs(value, siblingValue, key);
      if (valueIndex >= 0 && validInputs) {
        input.prop('value', value);
        updateRangeSlider(rangeSlider, key, valueIndex);
        if (key === 'from') {
          updateRanges(portalSettings, valueIndex, siblingValueIndex, value, siblingValue, freq);
        }
        if (key === 'to') {
          updateRanges(portalSettings, siblingValueIndex, valueIndex, siblingValue, value, freq);
        }
      }
    });
  }

  findDefaultRange = (dates: Array<any>, freq: string, defaultRange, dateFrom, dateTo) => {
    const sliderDates = dates.map(date => date.tableDate);
    const defaultRanges = this._helper.setDefaultSliderRange(freq, sliderDates, defaultRange);
    let { startIndex, endIndex } = defaultRanges;
    // Range slider is converting annual year strings to numbers
    const dateFromExists = dates.findIndex(date => date == dateFrom);
    const dateToExists = dates.findIndex(date => date == dateTo);
    if (dateFromExists > -1 && dateToExists > -1) {
      startIndex = dateFromExists;
      endIndex = dateToExists;
    }
    return { start: startIndex, end: endIndex, sliderDates: sliderDates };
  }

  formatChartDate = (value, freq) => {
    const quarters = { Q1: '01', Q2: '04', Q3: '07', Q4: '10' };
    if (freq === 'A') {
      return `${value.toString()}-01-01`;
    }
    if (freq === 'Q') {
      const q = value.substr(5, 2);
      return `${value.substr(0, 4)}-${quarters[q]}-01`;
    }
    if (freq === 'M') {
      return `${value}-01`;
    }
  }
}
