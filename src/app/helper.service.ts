// Common function used for category multi-chart and table displays

import { Injectable } from '@angular/core';
import { DateWrapper } from './date-wrapper';
import { Subject } from 'rxjs';

@Injectable()
export class HelperService {
  private categoryData = new Subject();

  constructor() { }

  getCatData() {
    return this.categoryData;
  }

  updateCatData(data) {
    this.categoryData.next(data)
  }

  createDateArray(dateStart: string, dateEnd: string, currentFreq: string, dateArray: Array<any>) {
    const start = new Date(dateStart.replace(/-/g, '\/'));
    const end = new Date(dateEnd.replace(/-/g, '\/'))
    if (currentFreq === 'A') {
      return this.addToDateArray(start, end, dateArray, currentFreq);
    }
    if (currentFreq === 'S') {
      return this.addToDateArray(start, end, dateArray, currentFreq, 6);
    }
    if (currentFreq === 'Q') {
      return this.addToDateArray(start, end, dateArray, currentFreq, 3);
    }
    if (currentFreq === 'M') {
      return this.addToDateArray(start, end, dateArray, currentFreq, 1);
    }
    return dateArray;
  }

  addToDateArray(start: Date, end: Date, dateArray: Array<any>, currentFreq: string, monthIncrease?: number) {
    while (start <= end) {
      const month = start.toISOString().substr(5, 2);
      const q = month === '01' ? 'Q1' : month === '04' ? 'Q2' : month === '07' ? 'Q3' : 'Q4';
      const tableDate = currentFreq === 'A' ?
        start.toISOString().substr(0, 4) :
        (currentFreq === 'S' || currentFreq === 'M') ?
        start.toISOString().substr(0, 7) :
        start.toISOString().substr(0, 4) + ' ' + q;
      dateArray.push({ date: start.toISOString().substr(0, 10), tableDate: tableDate });
      if (currentFreq === 'A') {
        start.setFullYear(start.getFullYear() + 1);
      }
      if (currentFreq !== 'A') {
        start.setMonth(start.getMonth() + monthIncrease);
      }
    }
    return dateArray;
  }

  getTransformations(observations) {
    const level = [];
    const yoy = [];
    const ytd = [];
    const c5ma = [];
    observations.transformationResults.forEach((obj) => {
      if (obj.transformation === 'lvl') {
        level.push(obj);
      }
      if (obj.transformation === 'pc1') {
        yoy.push(obj);
      }
      if (obj.transformation === 'ytd') {
        ytd.push(obj);
      }
      if (obj.transformation === 'c5ma') {
        c5ma.push(obj);
      }
    });
    return { level: level, yoy: yoy, ytd: ytd, c5ma: c5ma };
  }

  dataTransform(seriesObs, dates, decimals) {
    const observations = seriesObs;
    const start = observations.observationStart;
    const end = observations.observationEnd;
    const transformations = this.getTransformations(observations);
    const level = transformations.level;
    const yoy = transformations.yoy;
    const ytd = transformations.ytd;
    const c5ma = transformations.c5ma;
    const pseudoZones = [];
    if (level[0].pseudoHistory) {
      level[0].pseudoHistory.forEach((obs, index) => {
        if (obs && !level[0].pseudoHistory[index + 1]) {
          pseudoZones.push({ value: Date.parse(level[0].dates[index]), dashStyle: 'dash', color: '#7CB5EC', className: 'pseudoHistory' });
        }
      });
    }
    const seriesTable = this.createSeriesTable(dates, transformations, decimals);
    const chart = this.createSeriesChart(dates, transformations);
    const chartData = { level: chart.level, pseudoZones: pseudoZones, yoy: chart.yoy, ytd: chart.ytd, c5ma: chart.c5ma, dates: dates };
    const results = { chartData: chartData, tableData: seriesTable, start: start, end: end };
    return results;
  }

  addToTable(valueArray, date, tableObj, value, formattedValue, decimals) {
    const tableEntry = valueArray[0].dates.findIndex(obs => obs === date.date || obs === date.tableDate);
    if (tableEntry > -1) {
      tableObj[value] = +valueArray[0].values[tableEntry];
      tableObj[formattedValue] = this.formattedValue(valueArray[0].values[tableEntry], decimals);
    }
  }

  addChartData(valueArray: Array<any>, series: Array<any>, date) {
    const dateIndex = series[0].dates.findIndex(obs => obs === date.date);
    if (dateIndex > -1) {
      valueArray.push(+series[0].values[dateIndex]);
    }
    if (dateIndex === -1) {
      valueArray.push(null);
    }
  }

  createSeriesChart(dateRange, transformations) {
    const level = transformations.level;
    const yoy = transformations.yoy;
    const ytd = transformations.ytd;
    const c5ma = transformations.c5ma;
    const levelValue = [];
    const yoyValue = [];
    const ytdValue = [];
    const c5maValue = [];
    dateRange.forEach((date) => {
      if (level.length) {
        this.addChartData(levelValue, level, date);
      }
      if (yoy.length) {
        this.addChartData(yoyValue, yoy, date);
      }
      if (ytd.length) {
        this.addChartData(ytdValue, ytd, date);
      }
      if (c5ma.length) {
        this.addChartData(c5maValue, c5ma, date);
      }
    });
    return { level: levelValue, yoy: yoyValue, ytd: ytdValue, c5ma: c5maValue };
  }

  createSeriesTable(dateRange: Array<any>, transformations, decimals: number) {
    const level = transformations.level;
    const yoy = transformations.yoy;
    const ytd = transformations.ytd;
    const c5ma = transformations.c5ma;
    const table = dateRange.map((date) => {
      const tableObj = {
        date: date.date,
        tableDate: date.tableDate,
        value: Infinity,
        formattedValue: '',
        yoyValue: Infinity,
        formattedYoy: '',
        ytdValue: Infinity,
        formattedYtd: '',
        c5maValue: Infinity,
        formattedC5ma: ''
      };
      if (level.length) {
        this.addToTable(level, date, tableObj, 'value', 'formattedValue', decimals);
      }
      if (yoy.length) {
        this.addToTable(yoy, date, tableObj, 'yoyValue', 'formattedYoy', decimals);
      }
      if (ytd.length) {
        this.addToTable(ytd, date, tableObj, 'ytdValue', 'formattedYtd', decimals);
      }
      if (c5ma.length) {
        this.addToTable(c5ma, date, tableObj, 'c5maValue', 'formattedC5ma', decimals);
      }
      return tableObj;
    });
    return table;
  }

  formattedValue = (value, decimals) => (value === null || value === Infinity) ? '' : this.formatNum(+value, decimals);

  setDateWrapper(displaySeries: Array<any>, dateWrapper: DateWrapper) {
    dateWrapper.firstDate = '';
    dateWrapper.endDate = '';
    displaySeries.forEach((series) => {
      if (dateWrapper.firstDate === '' || series.seriesInfo.seriesObservations.observationStart < dateWrapper.firstDate) {
        dateWrapper.firstDate = series.seriesInfo.seriesObservations.observationStart;
      }
      if (dateWrapper.endDate === '' || series.seriesInfo.seriesObservations.observationEnd > dateWrapper.endDate) {
        dateWrapper.endDate = series.seriesInfo.seriesObservations.observationEnd;
      }
    });
  }

  formatDate(date: string, freq: string) {
    const year = date.substr(0, 4);
    const month = date.substr(5, 2);
    const quarter = ['Q1', 'Q2', 'Q3', 'Q4'];
    const qMonth = ['01', '04', '07', '10'];
    if (freq === 'A') {
      return year;
    }
    if (freq === 'Q') {
      const monthIndex = qMonth.indexOf(month);
      return quarter[monthIndex] + ' ' + year;
    }
    if (freq === 'M' || freq === 'S') {
      return month + '-' + year;
    }
  }

  formatNum(num: number, decimal: number) {
    return num === Infinity ? ' ' : num.toLocaleString('en-US', {minimumFractionDigits: decimal, maximumFractionDigits: decimal});
  }

  setDefaultCategoryRange(freq, dateArray, defaults) {
    const defaultEnd = defaults.end ? defaults.end : new Date(dateArray[dateArray.length - 1].date).toISOString().substr(0, 4);
    let counter = dateArray.length - 1;
    while (new Date(dateArray[counter].date).toISOString().substr(0, 4) > defaultEnd) {
      counter--;
    }
    return this.getRanges(freq, counter, defaults.range);
  }

  setDefaultSliderRange(freq, dateArray, defaults) {
    const defaultEnd = defaults.end ? defaults.end : new Date(dateArray[dateArray.length - 1].toString().substr(0, 4)).toISOString().substr(0, 4);
    let counter = dateArray.length - 1;
    // https://github.com/IonDen/ion.rangeSlider/issues/298
    // Slider values being converted from strings to numbers for annual dates
    while (new Date(dateArray[counter].toString().substr(0, 4)).toISOString().substr(0, 4) > defaultEnd) {
      counter--;
    }
    return this.getRanges(freq, counter, defaults.range);
  }

  getRanges(freq, counter, range) {
    // Range = default amount of years to display
    if (freq === 'A') {
      return { start: counter - 1 * range, end: counter };
    }
    if (freq === 'Q') {
      return { start: counter - 4 * range, end: counter };
    }
    if (freq === 'S') {
      return { start: counter - 2 * range, end: counter };
    }
    if (freq === 'M') {
      return { start: counter - 12 * range, end: counter };
    }
  }

  getTableDates(dateArray: Array<any>) {
    const tableDates = dateArray.map(date => date.tableDate);
    return tableDates;
  }
}
