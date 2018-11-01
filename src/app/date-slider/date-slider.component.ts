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

  constructor(
    @Inject('defaultRange') private defaultRange,
    private _helper: HelperService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.dates && this.dates.length) {
      const defaultRanges = this.findDefaultRange();
      // Start and end used for 'from' and 'to' inputs in slider
      // If start/end exist in values array, position handles at start/end; otherwise, use default range
      this.start = defaultRanges.start;
      this.end = defaultRanges.end;
      this.sliderDates = this.dates.map(date => date.tableDate);
    }
  }

  ngAfterViewInit() {
    //this.sliderDates = this.dates.map(date => date.tableDate)
    const $fromInput = $('.js-from');
    const $toInput = $('.js-to');
    this.initRangeSlider(this.sliderDates, this.start, this.end, this.freq, this.portalSettings);
    const $range = $('#slider_' + this.subCat.id).data('ionRangeSlider');
    this.setFromInputChangeFunction($fromInput, this.sliderDates, $range, this.portalSettings, this.freq);
    this.setToInputChangeFunction($toInput, this.sliderDates, $range);
    this.cd.detectChanges();
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
    const formatChartDate = (value, freq) => this.formatChartDate(value, freq);
    const updateRange = this.updateRange;
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
        console.log('data', data)
        if (portalSettings.sliderInteraction) {
          updateOtherSliders(sublist, subCatId, data.from, data.to);
        }
        $fromInput.prop('value', data.from_value);
        console.log('from input', $fromInput)
        $toInput.prop('value', data.to_value);
      },
      onFinish: function (data) {
        const chartStart = formatChartDate(data.from_value, freq);
        const chartEnd = formatChartDate(data.to_value, freq);
        const tableStart = data.from_value.toString();
        const tableEnd = data.to_value.toString();
        updateRange.emit({ chartStart: chartStart, chartEnd: chartEnd, tableStart: tableStart, tableEnd: tableEnd });
      }
    });
  }

  setFromInputChangeFunction(fromInput, sliderDates, rangeSlider, portalSettings, freq) {
    const updateOtherSliders = (sublist, subCatId, from, to) => this.updateOtherSliders(sublist, subCatId, from, to);
    const formatChartDate = (value, freq) => this.formatChartDate(value, freq);
    const updateRange = this.updateRange;
    const sublist = this.sublist;
    const subCatId = this.subCat.id;
    fromInput.on('change', function () {
      let from = $(this).prop('value');
      let fromIndex = sliderDates.findIndex(date => date == from);
      if (fromIndex >= 0) {
        fromInput.prop('value', from);
        rangeSlider.update({
          from: fromIndex
        });
        const to = $('.js-to').prop('value');
        console.log('to', to)
        const toIndex = sliderDates.findIndex(date => date == to);
        if (portalSettings.sliderInteraction) {
          updateOtherSliders(sublist, subCatId, fromIndex, toIndex);
        }
        const chartStart = formatChartDate(from, freq);
        const chartEnd = formatChartDate(to, freq);
        const tableStart = from.toString();
        const tableEnd = to.toString();
        updateRange.emit({ chartStart: chartStart, chartEnd: chartEnd, tableStart: tableStart, tableEnd: tableEnd });
      }
    });
  }

  setToInputChangeFunction(toInput, sliderDates, rangeSlider) {
    toInput.on('change', function () {
      let to = $(this).prop('value');
      let toIndex = sliderDates.findIndex(date => date == to);
      if (toIndex >= 0) {
        toInput.prop('value', to);
        rangeSlider.update({
          to: toIndex
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
