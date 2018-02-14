// Common function used for category multi-chart and table displays

import { Injectable } from '@angular/core';
import { DateWrapper } from './date-wrapper';

@Injectable()
export class HelperService {

  constructor() { }

  createDateArray(dateStart: string, dateEnd: string, currentFreq: string, dateArray: Array<any>) {
    let startYear = +dateStart.substr(0, 4);
    const endYear = +dateEnd.substr(0, 4);
    let startMonth = +dateStart.substr(5, 2);
    const endMonth = +dateEnd.substr(5, 2);
    const m = { 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09', 10: '10', 11: '11', 12: '12' };
    const q = { 1: 'Q1', 4: 'Q2', 7: 'Q3', 10: 'Q4' };
    while (startYear + '-' + m[startMonth] + '-01' <= endYear + '-' + m[endMonth] + '-01') {
      if (currentFreq === 'A') {
        dateArray.push({ date: startYear.toString() + '-01-01', tableDate: startYear.toString() });
        startYear += 1;
      }
      if (currentFreq === 'S') {
        dateArray.push({ date: startYear.toString() + '-' + m[startMonth] + '-01', tableDate: startYear.toString() + '-' + m[startMonth] });
        startYear = startMonth === 7 ? startYear += 1 : startYear;
        startMonth = startMonth === 1 ? 7 : 1;
      }
      if (currentFreq === 'M') {
        dateArray.push({ date: startYear.toString() + '-' + m[startMonth] + '-01', tableDate: startYear.toString() + '-' + m[startMonth] });
        startYear = startMonth === 12 ? startYear += 1 : startYear;
        startMonth = startMonth === 12 ? 1 : startMonth += 1;
      }
      if (currentFreq === 'Q') {
        dateArray.push({ date: startYear.toString() + '-' + m[startMonth] + '-01', tableDate: startYear.toString() + ' ' + q[startMonth] });
        startYear = startMonth === 10 ? startYear += 1 : startYear;
        startMonth = startMonth === 10 ? startMonth = 1 : startMonth += 3;
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
    let formattedObservations;
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
        value: null,
        formattedValue: ' ',
        yoyValue: null,
        formattedYoy: ' ',
        ytdValue: null,
        formattedYtd: ' ',
        c5maValue: null,
        formattedC5ma: ' '
      }
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

  formattedValue = (value, decimals) => (value === null || value === Infinity) ? ' ' : this.formatNum(+value, decimals);

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
    return num.toLocaleString('en-US', {minimumFractionDigits: decimal, maximumFractionDigits: decimal});
  }

  setDefaultChartRange(freq, dataArray, defaults) {
    const defaultEnd = defaults.end;
    let counter = dataArray.length - 1;
    while (new Date(dataArray[counter][0]).toISOString().substr(0, 4) > defaultEnd) {
      counter--;
    }
    return this.getRanges(freq, counter, defaults.range);
  }

  setDefaultSliderRange(freq, dateArray, defaults) {
    const defaultEnd = defaults.end;
    let counter = dateArray.length - 1;
    // https://github.com/IonDen/ion.rangeSlider/issues/298
    // Slider values being converted from strings to numbers for annual dates
    while (new Date(dateArray[counter].toString().substr(0, 4)).toISOString().substr(0, 4) > defaultEnd) {
      counter--;
    }
    return this.getRanges(freq, counter, defaults.range);
  }

  setDefaultTableRange(freq, dateArray, defaults) {
    const defaultEnd = defaults.end;
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
