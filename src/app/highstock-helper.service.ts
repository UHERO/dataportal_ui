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
    if (frequency === 'A') {
      return '';
    }
    if (frequency === 'Q') {
      if (Highcharts.dateFormat('%b', date) === 'Jan') {
        return 'Q1 ';
      }
      if (Highcharts.dateFormat('%b', date) === 'Apr') {
        return 'Q2 ';
      }
      if (Highcharts.dateFormat('%b', date) === 'Jul') {
        return 'Q3 ';
      }
      if (Highcharts.dateFormat('%b', date) === 'Oct') {
        return 'Q4 ';
      }
    }
    if (frequency === 'M' || frequency === 'S') {
      return Highcharts.dateFormat('%b', date) + ' ';
    }
  };

  xAxisLabelFormatter = (chart, freq) => {
    let s = '';
    const month = Highcharts.dateFormat('%b', chart.value);
    const first = Highcharts.dateFormat('%Y', chart.axis.userMin);
    const last = Highcharts.dateFormat('%Y', chart.axis.userMax);
    s = ((last - first) <= 5) && freq === 'Q' ? s + this.getQuarterLabel(month) : '';
    s = s + Highcharts.dateFormat('%Y', chart.value);
    return freq === 'Q' ? s : chart.axis.defaultLabelFormatter.call(chart);
  };

  getQuarterLabel = (month) => {
    if (month === 'Jan') {
      return 'Q1 ';
    }
    if (month === 'Apr') {
      return 'Q2 ';
    }
    if (month === 'Jul') {
      return 'Q3 ';
    }
    if (month === 'Oct') {
      return 'Q4 ';
    }
  };
}
