import { Component, Input, Inject, OnInit, ChangeDetectorRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { HelperService } from '../helper.service';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss']
})
export class DateSliderComponent implements OnInit, AfterViewInit {
  @Input() portalSettings;
  //@Input() subCat;
  @Input() dates;
  @Input() freq;
  @Input() dateFrom;
  @Input() dateTo;
  @Input() sublist;
  @Output() updateRange = new EventEmitter(true);
  start;
  end;
  sliderDates;

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
    }
  }

  ngAfterViewInit() {
    const $fromInput = $(`#dateFrom`);
    const $toInput = $(`#dateTo`);
    this.initRangeSlider(this.sliderDates, this.start, this.end, this.freq, this.portalSettings);
    const $range = $(`#slider`).data('ionRangeSlider');
    // Set change functions for 'from' and 'to' date inputs
    this.setInputChangeFunction($fromInput, this.sliderDates, $range, 'from', this.portalSettings, this.freq);
    this.setInputChangeFunction($toInput, this.sliderDates, $range, 'to', this.portalSettings, this.freq);
    this.updateChartsAndTables($fromInput.prop('value'), $toInput.prop('value'), this.freq)
    this.cd.detectChanges();
  }

  updateOtherSliders(sublist, from, to, fromValue, toValue) {
    sublist.forEach((sub) => {
      const slider = $(`#slider`).data('ionRangeSlider');
      const $fromInput = $(`#dateFrom`);
      const $toInput = $(`#dateTo`);
      if (slider) {
        slider.update({
          from: from,
          to: to
        });
      }
      if ($fromInput) {
        $fromInput.prop('value', fromValue);
      }
      if ($toInput) {
        $toInput.prop('value', toValue);
      }
    });
  }

  initRangeSlider(sliderDates: Array<any>, start: number, end: number, freq: string, portalSettings) {
    const updateOtherSliders = (sublist, from, to, fromValue, toValue) => this.updateOtherSliders(sublist, from, to, fromValue, toValue);
    const updateChartsAndTables = (from, to, freq) => this.updateChartsAndTables(from, to, freq);
    const sublist = this.sublist;
    // const subCatId = this.subCat.id;
    const $fromInput = $(`#dateFrom`);
    const $toInput = $(`#dateTo`);
    $(`#slider`).ionRangeSlider({
      min: 0,
      from: start,
      to: end,
      values: sliderDates,
      prettify_enabled: false,
      hide_min_max: true,
      hide_from_to: true,
      keyboard: true,
      keyboard_step: 1,
      skin: 'round',
      type: 'double',
      onChange: function (data) {
        if (portalSettings.sliderInteraction) {
          updateOtherSliders(sublist, data.from, data.to, data.from_value, data.to_value);
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
    const seriesStart = this.formatChartDate(from, freq);
    const seriesEnd = this.formatChartDate(to, freq);
    this.updateRange.emit({ seriesStart: seriesStart, seriesEnd: seriesEnd });
  }

  updateRanges(portalSettings, fromIndex: number, toIndex: number, from, to, freq: string) {
    if (portalSettings.sliderInteraction) {
      this.updateOtherSliders(this.sublist, fromIndex, toIndex, from, to);
    }
    this.updateChartsAndTables(from, to, freq);
  }

  updateRangeSlider(rangeSlider, key, valueIndex) {
    rangeSlider.update({
      [key]: valueIndex
    });
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

  setInputChangeFunction(input, sliderDates: Array<any>, rangeSlider, key: string, portalSettings, freq: string) {
    const updateRanges = (portalSettings, fromIndex, toIndex, from, to, freq) => this.updateRanges(portalSettings, fromIndex, toIndex, from, to, freq);
    const updateRangeSlider = (rangeSlider, key, valueIndex) => this.updateRangeSlider(rangeSlider, key, valueIndex);
    const checkValidInputs = (value, siblingValue, key, freq) => this.checkValidInputs(value, siblingValue, key, freq);
    const formatInput = (value, freq) => this.formatInput(value, freq);
    input.on('change', function () {
      let value = formatInput($(this).prop('value').toUpperCase(), freq);
      let valueIndex = sliderDates.findIndex(date => date == value);
      const siblingValue = $(this).siblings('.date-input').prop('value');
      const siblingValueIndex = sliderDates.findIndex(date => date == siblingValue);
      const validInputs = checkValidInputs(value, siblingValue, key, freq);
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
    if (dateFrom && dateTo) {
      const dateFromExists = dates.findIndex(date => date.date == dateFrom);
      const dateToExists = dates.findIndex(date => date.date == dateTo);
      if (dateFromExists > -1 && dateToExists > -1) {
        return { start: dateFromExists, end: dateToExists, sliderDates: sliderDates };
      }
      if (dateFrom < dates[0].tableDate && dateToExists > -1) {
        return { start: 0, end: dateToExists, sliderDates: sliderDates };
      }
      if (dateFromExists > -1 && dateTo > dates[dates.length - 1].tableDate) {
        return { start: dateFromExists, end: dates.length - 1, sliderDates: sliderDates };
      }
    }
    const defaultRanges = this._helper.setDefaultSliderRange(freq, sliderDates, defaultRange);
    let { startIndex, endIndex } = defaultRanges;
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
