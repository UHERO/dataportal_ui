// Common function used for category multi-chart and table displays

import { Injectable } from '@angular/core';
import { DateWrapper } from './date-wrapper';

@Injectable()
export class HelperService {

  constructor() { }

  calculateDateArray(dateStart: string, dateEnd: string, currentFreq: string, dateArray: Array<any>) {
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
    const level = observations.transformationResults[0].observations;
    const yoy = observations.transformationResults[1].observations;
    const ytd = observations.transformationResults[2].observations;
    const pseudoZones = [];

    if (level) {
      level.forEach((entry, i) => {
        // Get last pseudoHistory date if available
        if (entry.pseudoHistory && !level[i + 1].pseudoHistory) {
          pseudoZones.push({ value: Date.parse(entry.date), dashStyle: 'dash', color: '#7CB5EC' });
        }
      });
      const combineData = this.combineObsData(level, yoy, ytd);
      const tableData = this.seriesTable(combineData, dates, decimals);
      const chart = this.seriesChart(combineData, dates);
      const chartData = { level: chart[0], pseudoZones: pseudoZones, yoy: chart[1], ytd: chart[2] };
      results = { chartData: chartData, tableData: tableData, start: start, end: end };
    }
    return results;
  }

  seriesTable(seriesData, dateRange, decimals) {
    const table = [];
    dateRange.forEach((date) => {
      table.push({ date: date.date, tableDate: date.tableDate, value: ' ', yoy: ' ', ytd: ' ' });
    });
    seriesData.forEach((data) => {
      const seriesDate = data.date;
      const tableEntry = table.find(date => date.date === seriesDate);
      tableEntry.value = data.value;
      tableEntry.formattedValue = data.value === null ? ' ' : this.formatNum(+data.value, decimals);
      tableEntry.yoy = data.yoyValue;
      tableEntry.formattedYoy = data.yoyValue === null ? ' ' : this.formatNum(+data.yoyValue, decimals);
      tableEntry.ytd = data.ytdValue;
      tableEntry.formattedYtd = data.ytdValue === null ? ' ' : this.formatNum(+data.ytdValue, decimals);
    });
    return table;
  }

  seriesChart(seriesData, dateRange) {
    const levelValue = [];
    const yoyValue = [];
    const ytdValue = [];
    dateRange.forEach((date) => {
      const data = seriesData.find(obs => obs.date === date.date);
      if (data) {
        levelValue.push([Date.parse(date.date), data.value]);
        yoyValue.push([Date.parse(date.date), data.yoyValue]);
        ytdValue.push([Date.parse(date.date), data.ytdValue]);
      } else {
        levelValue.push([Date.parse(date.date), null]);
        yoyValue.push([Date.parse(date.date), null]);
        ytdValue.push([Date.parse(date.date), null]);
      }
    });
    return [levelValue, yoyValue, ytdValue];
  }

  catTable(seriesTableData: Array<any>, dateRange: Array<any>, decimals: number) {
    // Format series data for the category table
    const categoryTableData = [];
    dateRange.forEach((date) => {
      categoryTableData.push({ date: date.date, tableDate: date.tableDate, value: ' ', yoy: ' ', ytd: ' ' });
    });
    seriesTableData.forEach((data) => {
      const tableObs = categoryTableData.find(obs => obs.date === data.date);
      if (tableObs) {
        tableObs.level = data.value === ' ' ? ' ' : this.formatNum(+data.value, decimals);
        tableObs.yoy = data.yoy === null ? ' ' : this.formatNum(+data.yoy, decimals);
        tableObs.ytd = data.ytd === null ? ' ' : this.formatNum(+data.ytd, decimals);
      }
    });
    return categoryTableData;
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

  // Combine level and percent arrays from Observation data
  // Used to construct table data for single series view
  combineObsData(level, yoy, ytd) {
    let table;
    if (level) {
      table = level;
      for (let i = 0; i < level.length; i++) {
        table[i].yoyValue = null;
        table[i].ytdValue = null;
        table[i].value = +level[i].value;
      }
    }
    if (yoy) {
      for (let i = 0; i < yoy.length; i++) {
        const seriesObs = table.find(obs => obs.date === yoy[i].date);
        if (seriesObs) {
          seriesObs.yoyValue = +yoy[i].value;
        }
      }
    }
    if (ytd) {
      for (let i = 0; i < ytd.length; i++) {
        const seriesObs = table.find(obs => obs.date === ytd[i].date);
        if (seriesObs) {
          seriesObs.ytdValue = +ytd[i].value;
        }
      }
    }
    return table;
  }

  formatDate(date: string, freq: string) {
    let formattedDate;
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const quarter = ['Q1', 'Q2', 'Q3', 'Q4'];
    const qMonth = ['01', '04', '07', '10'];
    if (freq === 'A') {
      formattedDate = year;
    }
    if (freq === 'Q') {
      qMonth.forEach((q) => {
        if (month === q) {
          formattedDate = q + ' ' + year;
        }
      });
    }
    if (freq === 'M' || freq === 'S') {
      formattedDate = month + '-' + year;
    }
    return formattedDate;
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
      return '-' + returnValue;
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
    for (const j in freqList) {
      if (!this.freqExist(geo.freqs, freqList[j].freq)) {
        geo.freqs.push(freqList[j]);
      }
    }
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
    for (const j in geoList) {
      if (!this.geoExist(freq.geos, geoList[j].handle)) {
        freq.geos.push(geoList[j]);
      }
    }
  }

  setDefaultRange(freq, dataArray) {
    // Default to last 10 years
    if (freq === 'A') {
      return { start: dataArray.length - 11, end: dataArray.length - 1 };
    }
    if (freq === 'Q') {
      return { start: dataArray.length - 41, end: dataArray.length - 1 };
    }
    if (freq === 'S') {
      return { start: dataArray.length - 21, end: dataArray.length - 1 };
    }
    if (freq === 'M') {
      return { start: dataArray.length - 121, end: dataArray.length - 1 };
    }
  }
}
