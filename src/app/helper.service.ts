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

  dataTransform(seriesObs, dates, decimals) {
    const observations = seriesObs;
    const start = observations.observationStart;
    const end = observations.observationEnd;
    const level = observations.transformationResults.find(obs => obs.transformation === 'lvl');
    const yoy = observations.transformationResults.find(obs => obs.transformation === 'pc1');
    const ytd = observations.transformationResults.find(obs => obs.transformation === 'ytd');
    const c5ma = observations.transformationResults.find(obs => obs.transformation === 'c5ma');
    const pseudoZones = [];
    if (level.pseudoHistory) {
      level.pseudoHistory.forEach((obs, index) => {
        if (obs && !level.pseudoHistory[index + 1]) {
          pseudoZones.push({ value: Date.parse(level.dates[index]), dashStyle: 'dash', color: '#7CB5EC', className: 'pseudoHistory' });
        }
      });
    }
    const seriesTable = this.createSeriesTable(dates, observations, decimals);
    const chart = this.createSeriesChart(dates, observations);
    const chartData = { level: chart.level, pseudoZones: pseudoZones, yoy: chart.yoy, ytd: chart.ytd, c5ma: chart.c5ma };
    const results = { chartData: chartData, tableData: seriesTable, start: start, end: end };
    return results;
  }

  addToTable(valueArray, date, tableObj, value, formattedValue, decimals) {
    const tableEntry = valueArray.dates.findIndex(obs => obs === date.date || obs === date.tableDate);
    if (tableEntry > -1) {
      tableObj[value] = +valueArray.values[tableEntry];
      tableObj[formattedValue] = this.formattedValue(valueArray.values[tableEntry], decimals);
    }
  }

  formatHighchartData(dateRange, seriesData) {
    const dataArray = dateRange.map((date) => {
      const obj = [Date.parse(date.date)];
      const dateIndex = seriesData.dates.findIndex(obs => obs === date.date);
      obj[1] = dateIndex > -1 ? +seriesData.values[dateIndex] : null;
      return obj;
    });
    return dataArray;
  }

  createSeriesChart(dateRange, observations) {
    const level = observations.transformationResults.find(obs => obs.transformation === 'lvl');
    const yoy = observations.transformationResults.find(obs => obs.transformation === 'pc1');
    const ytd = observations.transformationResults.find(obs => obs.transformation === 'ytd');
    const c5ma = observations.transformationResults.find(obs => obs.transformation === 'c5ma');
    let levelValue, yoyValue, ytdValue, c5maValue;
    if (level && level.dates) {
      levelValue = this.formatHighchartData(dateRange, level);
    }
    if (yoy && yoy.dates) {
      yoyValue = this.formatHighchartData(dateRange, yoy);
    }
    if (ytd && ytd.dates) {
      ytdValue = this.formatHighchartData(dateRange, ytd);
    }
    if (c5ma && c5ma.dates) {
      c5maValue = this.formatHighchartData(dateRange, c5ma);
    }
    return { level: levelValue, yoy: yoyValue, ytd: ytdValue, c5ma: c5maValue };
  }

  createSeriesTable(dateRange: Array<any>, observations, decimals: number) {
    const level = observations.transformationResults.find(obs => obs.transformation === 'lvl');
    const yoy = observations.transformationResults.find(obs => obs.transformation === 'pc1');
    const ytd = observations.transformationResults.find(obs => obs.transformation === 'ytd');
    const c5ma = observations.transformationResults.find(obs => obs.transformation === 'c5ma');
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
      if (level && level.dates) {
        this.addToTable(level, date, tableObj, 'value', 'formattedValue', decimals);
      }
      if (yoy && yoy.dates) {
        this.addToTable(yoy, date, tableObj, 'yoyValue', 'formattedYoy', decimals);
      }
      if (ytd && ytd.dates) {
        this.addToTable(ytd, date, tableObj, 'ytdValue', 'formattedYtd', decimals);
      }
      if (c5ma && c5ma.dates) {
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

  setDefaultChartRange(freq, dataArray, defaults) {
    const defaultEnd = defaults.end ? defaults.end : new Date(dataArray[dataArray.length - 1][0]).toISOString().substr(0, 4);
    let counter = dataArray.length - 1;
    while (new Date(dataArray[counter][0]).toISOString().substr(0, 4) > defaultEnd) {
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

  setDefaultTableRange(freq, dateArray, defaults) {
    const defaultEnd = defaults.end ? defaults.end : new Date(dateArray[dateArray.length - 1].date).toISOString().substr(0, 4);
    let counter = dateArray.length - 1;
    while (new Date(dateArray[counter].date).toISOString().substr(0, 4) > defaultEnd) {
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
