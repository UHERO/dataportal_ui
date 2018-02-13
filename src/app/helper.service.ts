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
    let results = null;
    const observations = seriesObs;
    const start = observations.observationStart;
    const end = observations.observationEnd;
    const level = observations.transformationResults.find(obs => obs.transformation === 'lvl');
    const yoy = observations.transformationResults.find(obs => obs.transformation === 'pc1');
    const ytd = observations.transformationResults.find(obs => obs.transformation === 'ytd');
    const c5ma = observations.transformationResults.find(obs => obs.transformation === 'c5ma');
    const pseudoZones = [];
    let formattedObservations;
    if (level.dates) {
      formattedObservations = level.dates.map((date, index) => {
        const obj = { date: '', value: null, yoyValue: null, ytdValue: null, c5maValue: null, pseudoHistory: false };
        const yoyDateIndex = yoy && yoy.dates ? yoy.dates.indexOf(date) : -1;        
        const ytdDateIndex = ytd && ytd.dates ? ytd.dates.indexOf(date) : -1;
        const c5maDateIndex = c5ma && c5ma.dates ? c5ma.dates.indexOf(date) : -1;
        // const yoyDateIndex = yoy && yoy.dates ? yoy.dates.findIndex(yoyDate => yoyDate === date) : -1;
        // const ytdDateIndex = ytd && ytd.dates ? ytd.dates.findIndex(ytdDate => ytdDate === date) : -1;
        // const c5maDateIndex = c5ma && c5ma.dates ? c5ma.dates.findIndex(c5maDate => c5maDate === date) : -1;
        obj.date = date;
        obj.value = +level.values[index];
        obj.yoyValue = yoyDateIndex > -1 ? +yoy.values[yoyDateIndex] : null;
        obj.ytdValue = ytdDateIndex > -1 ? +ytd.values[ytdDateIndex] : null;
        obj.c5maValue = c5maDateIndex > -1 ? +c5ma.values[c5maDateIndex] : null;
        obj.pseudoHistory = level.pseudoHistory[index];
        return obj;
      });
      formattedObservations.forEach((obs, index) => {
        if (obs.pseudoHistory && !formattedObservations[index + 1].pseudoHistory) {
          pseudoZones.push({ value: Date.parse(obs.date), dashStyle: 'dash', color: '#7CB5EC', className: 'pseudoHistory' });
        }
      });
    }
    const tableData = this.seriesTable(formattedObservations, dates, decimals);
    const chart = this.seriesChart(formattedObservations, dates);
    const chartData = { level: chart.level, pseudoZones: pseudoZones, yoy: chart.yoy, ytd: chart.ytd, c5ma: chart.c5ma };
    results = { chartData: chartData, tableData: tableData, start: start, end: end };
    return results;
  }

  seriesTable(seriesData, dateRange, decimals) {
    let table;
    table = dateRange.map((date) => {
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
      }
      const tableEntry = seriesData.findIndex(obs => obs.date === date.date || obs.date === date.tableDate);
      if (tableEntry > -1) {
        tableObj.value = seriesData[tableEntry].value;
        tableObj.formattedValue = this.formattedValue(seriesData[tableEntry].value, decimals);
        tableObj.yoyValue = seriesData[tableEntry].yoyValue;
        tableObj.formattedYoy = this.formattedValue(seriesData[tableEntry].yoyValue, decimals);
        tableObj.ytdValue = seriesData[tableEntry].ytdValue;
        tableObj.formattedYtd = this.formattedValue(seriesData[tableEntry].ytdValue, decimals);
        tableObj.c5maValue = seriesData[tableEntry].c5maValue;
        tableObj.formattedC5ma = this.formattedValue(seriesData[tableEntry].c5maValue, decimals);
      }
      return tableObj;
    });
    return table;
  }

  formattedValue = (value, decimals) => (value === null || value === Infinity) ? ' ' : this.formatNum(+value, decimals);

  seriesChart(seriesData, dateRange) {
    let levelValue, yoyValue, ytdValue, c5maValue;
    levelValue = this.formatHighchartData(dateRange, seriesData, 'value');
    yoyValue = this.formatHighchartData(dateRange, seriesData, 'yoyValue');
    ytdValue = this.formatHighchartData(dateRange, seriesData, 'ytdValue');
    c5maValue = this.formatHighchartData(dateRange, seriesData, 'c5maValue');
    return { level: levelValue, yoy: yoyValue, ytd: ytdValue, c5ma: c5maValue };
  }

  formatHighchartData(dateRange, seriesData, value) {
    const dataArray = dateRange.map((date) => {
      const obj = [Date.parse(date.date)];
      const data = seriesData.find(obs => obs.date === date.date);
      obj[1] = data ? data[value] : null;
      return obj;
    });
    return dataArray;
  }

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
    let fixedNum: any;
    fixedNum = num.toFixed(decimal);
    // remove decimals
    const int = fixedNum | 0;
    const signCheck = num < 0 ? 1 : 0;
    // store deicmal value
    const remainder = Math.abs(fixedNum - int);
    const decimalString = ('' + remainder.toFixed(decimal)).substr(2, decimal);
    const intString = '' + int;
    let i = intString.length;
    let r = '';
    while ((i -= 3) > signCheck) { r = ',' + intString.substr(i, 3) + r; }
    const returnValue = intString.substr(0, i + 3) + r + (decimalString ? '.' + decimalString : '');
    // If int == 0, converting int to string drops minus sign
    if (int === 0 && num < 0) {
      // Check if decimal string contains only 0's (i.e. return value === 0.00)
      return /^0*$/.test(decimalString) ? returnValue : '-' + returnValue;
    }
    return returnValue;
  }

  // Get a unique array of available regions for a category
  uniqueGeos(geo, geoList) {
    const existGeo = geoList.find(region => region.handle === geo.handle);
    if (existGeo) {
      const freqs = geo.freqs;
      // If region already exists, check it's list of frequencies
      // Add frequency if it doesn't exist
      this.addFreq(freqs, existGeo);
    }
    if (!existGeo) {
      geoList.push(geo);
    }
  }

  // Check if freq exists in freqArray
  freqExist(freqArray, freq) {
    const exist = freqArray.find(frequency => frequency.freq === freq);
    return exist ? true : false;
  }

  addFreq(freqList, geo) {
    freqList.forEach((freq) => {
      if (!this.freqExist(geo.freqs, freq.freq)) {
        geo.freqs.push(freq);
      }
    });
  }

  // Get a unique array of available frequencies for a category
  uniqueFreqs(freq, freqList) {
    const existFreq = freqList.find(frequency => frequency.label === freq.label);
    if (existFreq) {
      const geos = freq.geos;
      // If frequency already exists, check it's list of regions
      // Add geo if it doesn't exist
      this.addGeo(geos, existFreq);
    }
    if (!existFreq) {
      freqList.push(freq);
    }
  }

  // Check if geo exists in geoArray
  geoExist(geoArray, geo) {
    const exist = geoArray.find(region => region.handle === geo);
    return exist ? true : false;
  }

  addGeo(geoList, freq) {
    geoList.forEach((geo) => {
      if (!this.geoExist(freq.geos, geo.handle)) {
        freq.geos.push(geo);
      }
    });
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
