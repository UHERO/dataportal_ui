import { Injectable } from '@angular/core';

declare var require: any;
const Highcharts = require('highcharts/highstock');

Highcharts.dateFormats = {
  Q: function (timestamp) {
    const month = +new Date(timestamp).toISOString().split('T')[0].substr(5, 2);
    if (1 <= month && month <= 3) {
      return 'Q1';
    }
    if (4 <= month && month <= 6) {
      return 'Q2';
    }
    if (7 <= month && month <= 9) {
      return 'Q3';
    }
    if (10 <= month && month <= 12) {
      return 'Q4';
    }
  }
};

@Injectable({
  providedIn: 'root'
})
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
      return { min: new Date(chartObject._selectedMin).toISOString().split('T')[0], max: new Date(chartObject._selectedMax).toISOString().split('T')[0] }
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

  setDateToFirstOfMonth = (freq, date) => {
    const month = +date.substr(5, 2);
    const year = +date.substr(0, 4);
    if (freq === 'A') {
      return `${year}-01-01`;
    }
    if (freq === 'Q') {
      return `${year}-${this.getQuarterMonths(month)}-01`;
    }
    if (freq === 'M' || freq === 'S') {
      return `${date.substr(0, 7)}-01`;
    }
    if (freq === 'W') {
      return date;
    }
  }

  getQuarterMonths = (month) => {
    if (month >= 1 && month <= 3) {
      return '01';
    }
    if (month >= 4 && month <= 6) {
      return '04';
    }
    if (month >= 7 && month <= 9) {
      return '07';
    }
    if (month >= 10 && month <= 12) {
      return '10';
    }
  }

  getTooltipFreqLabel = (frequency, date) => {
    const year = Highcharts.dateFormat('%Y', date);
    const month = Highcharts.dateFormat('%b', date);
    const day = Highcharts.dateFormat('%d', date);
    if (frequency === 'A') {
      return year;
    }
    if (frequency === 'Q') {
      return year + this.getQuarterLabel(month);
    }
    if (frequency === 'M' || frequency === 'S') {
      return `${Highcharts.dateFormat('%b', date)} ${year}`;
    }
    if (frequency === 'W') {
      return `${month} ${day}, ${year}`;
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
    return '';
  };

  inputDateFormatter = (freq: string) => {
    if (freq === 'A') {
      return '%Y';
    }
    if (freq === 'Q') {
      return '%Y %Q';
    }
    if (freq === 'W') {
      return '%b %d %Y';
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
    if (freq === 'W') {
      return '%Y-%m-%d';
    }
    return '%Y-%m';
  };

  inputDateParserFormatter = (value: string, freq: string) => {
    const year = value.substr(0, 4);
    if (freq === 'Q') {
      if (value.toUpperCase().includes('Q1')) {
        return Date.parse(`${year}-01-01`);
      }
      if (value.toUpperCase().includes('Q2')) {
        return Date.parse(`${year}-04-01`);
      }
      if (value.toUpperCase().includes('Q3')) {
        return Date.parse(`${year}-07-01`);
      }
      if (value.toUpperCase().includes('Q4')) {
        return Date.parse(`${year}-10-01`);
      }
    }
    if (freq === 'A') {
      return Date.parse(`${year}-01-01`);
    }
    if (freq === 'M' || freq === 'S') {
      if (!value.includes('-')) { // i.e. monthly frequency where user removes '-'
        const month = value.substr(4, 2);
        return Date.parse(`${year}-${month}-01`)
      }
      return Date.parse(`${value}-01`);
    }
    if (freq === 'W') {
      return Date.parse(`${value}`);
    }
  };
}
