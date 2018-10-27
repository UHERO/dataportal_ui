import { Injectable } from '@angular/core';

declare var require: any;
const Highcharts = require('highcharts/js/highstock');

@Injectable()
export class HighstockHelperService {

  constructor() { }

  getChartExtremes = (chartObject) => {
    // Gets range of x values to emit
    // Used to redraw table in the single series view
    let selectedRange = null;
    if (!chartObject.series[0].points) {
      return { min: null, max: null };
    }
    if (chartObject.series[0].points) {
      selectedRange = chartObject.series[0].points;
    }
    if (selectedRange.length && chartObject._selectedMin && chartObject._selectedMax) {
      return this.findVisibleMinMax(selectedRange, chartObject);
    }
  };

  getAnalyzerChartExtremes = (chartObject) => {
    let selectedRange = null;
    if (chartObject) {
      selectedRange = chartObject.series.find(s => s.name === 'Navigator');
    }
    if (selectedRange) {
      return this.findVisibleMinMax(selectedRange.points, chartObject);
    }
  };

  findVisibleMinMax = (selectedRange, chartObject) => {
    let maxCounter = selectedRange.length - 1;
    let minCounter = 0;
    let xMin, xMax;
    while (!xMax || xMax > chartObject._selectedMax) {
      xMax = new Date(selectedRange[maxCounter].x).toISOString().split('T')[0];
      maxCounter--;
    }
    while (!xMin || xMin < chartObject._selectedMin) {
      xMin = new Date(selectedRange[minCounter].x).toISOString().split('T')[0];
      minCounter++;
    }
    return { min: xMin, max: xMax };
  };

  getTooltipFreqLabel = (frequency, date) => {
    const year = Highcharts.dateFormat('%Y', date);
    const month = Highcharts.dateFormat('%b', date);
    if (frequency === 'A') {
      return year;
    }
    if (frequency === 'Q') {
      return year + this.getQuarterLabel(month);
    }
    if (frequency === 'M' || frequency === 'S') {
      return Highcharts.dateFormat('%b', date) + year;
    }
  };

  xAxisLabelFormatter = (chart, freq) => {
    let s = '';
    const month = Highcharts.dateFormat('%b', chart.value);
    const year = Highcharts.dateFormat('%Y', chart.value);
    const first = Highcharts.dateFormat('%Y', chart.axis.userMin);
    const last = Highcharts.dateFormat('%Y', chart.axis.userMax);
    s = ((last - first) <= 5) && freq === 'Q' ? year + this.getQuarterLabel(month) : year;
    return freq === 'Q' ? s : chart.axis.defaultLabelFormatter.call(chart);
  };

  getQuarterLabel = (month: string) => {
    if (month === 'Jan') {
      return ' Q1';
    }
    if (month === 'Apr') {
      return ' Q2';
    }
    if (month === 'Jul') {
      return ' Q3';
    }
    if (month === 'Oct') {
      return ' Q4';
    }
  };

  inputDateFormatter = (freq: string) => {
    if (freq === 'A') {
      return '%Y';
    }
    if (freq === 'Q') {
      return '%Y %Q';
    }
    return '%b %Y';
  };

  inputEditDateFormatter = (freq: string) => {
    if (freq === 'A') {
      return '%Y';
    }
    if (freq === 'Q') {
      return '%Y %Q';
    }
    return '%Y-%m';
  };

  inputDateParserFormatter = (value: string) => {
    const year = value.substr(0, 4);
    if (value.includes('Q1')) {
      return Date.parse(year + '-01-01');
    }
    if (value.includes('Q2')) {
      return Date.parse(year + '-04-01');
    }
    if (value.includes('Q3')) {
      return Date.parse(year + '-07-01');
    }
    if (value.includes('Q4')) {
      return Date.parse(year + '-10-01');
    }
    if (value.length === 4) { // i.e. year only
      return Date.parse(value + '-01-01');
    }
    return Date.parse(value + '-01');
  };
}
