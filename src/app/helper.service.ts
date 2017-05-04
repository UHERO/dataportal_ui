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

  dataTransform(seriesObs, dates) {
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
      const tableData = this.seriesTable(combineData, dates);
      const chart = this.seriesChart(combineData, dates);
      const chartData = { level: chart[0], pseudoZones: pseudoZones, yoy: chart[1], ytd: chart[2] };
      results = { chartData: chartData, tableData: tableData, start: start, end: end };
    }
    return results;
  }

  seriesTable(seriesData, dateRange) {
    const table = [];
    dateRange.forEach((date) => {
      table.push({date: date.date, tableDate: date.tableDate, value: ' ', yoy: ' ', ytd: ' ' });
    });
    seriesData.forEach((data) => {
      const seriesDate = data.date;
      const tableEntry = table.find(date => date.date === seriesDate);
      tableEntry.value = data.value;
      tableEntry.formattedValue = data.value === null ? ' ' : this.formatNum(+data.value, 1);
      tableEntry.yoy = data.yoyValue;
      tableEntry.formattedYoy = data.yoyValue === null ? ' ' : this.formatNum(+data.yoyValue, 1);
      tableEntry.ytd = data.ytdValue;
      tableEntry.formattedYtd = data.ytdValue === null ? ' ' : this.formatNum(+data.ytdValue, 1);
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

  catTable(seriesTableData: Array<any>, dateRange: Array<any>, dateWrapper: DateWrapper) {
    // Format series data for the category table
    let categoryTableData = [];
    dateRange.forEach((date) => {
      categoryTableData.push({ date: date.date, tableDate: date.tableDate, level: '', yoy: '', ytd: '' });
    });
    seriesTableData.forEach((data) => {
      const tableObs = categoryTableData.find(obs => obs.date === data.date);
      if (tableObs) {
        tableObs.level = data.value === ' ' ? ' ' : this.formatNum(+data.value, 1);
        tableObs.yoy = data.yoy === null ? ' ' : this.formatNum(+data.yoy, 1);
        tableObs.ytd = data.ytd === null ? ' ' : this.formatNum(+data.ytd, 1);
      }
    });
    let tableStart, tableEnd;
    categoryTableData.forEach((item, index) => {
      if (item.date === dateWrapper.firstDate) {
        tableStart = index;
      }
      if (item.date === dateWrapper.endDate) {
        tableEnd = index;
      }
    });
    categoryTableData = categoryTableData.slice(tableStart, tableEnd + 1);
    return categoryTableData;
  }

  setDateWrapper(displaySeries: Array<any>, dateWrapper: DateWrapper) {
    dateWrapper.firstDate = '';
    dateWrapper.endDate = '';
    displaySeries.forEach((series) => {
      if (dateWrapper.firstDate === '' || series.start < dateWrapper.firstDate) {
        dateWrapper.firstDate = series.start;
      }
      if (dateWrapper.endDate === '' || series.end > dateWrapper.endDate) {
        dateWrapper.endDate = series.end;
      }
    });
  }

  sublistTable(displaySeries: Array<any>, dateWrapper: DateWrapper, tableDates: Array<any>) {
    // Format table for jquery datatables
    const tableData = [];
    const tableColumns = [];
    const dateStart = dateWrapper.firstDate;
    const dateEnd = dateWrapper.endDate;
    tableColumns.push({ title: 'Series', data: 'series' });
    tableDates.forEach((date) => {
      tableColumns.push({ title: date, data: 'observations.' + date });
    });
    displaySeries.forEach((series) => {
      const observations = {};
      const yoy = {};
      const ytd = {};
      const percent = series.seriesInfo.percent;
      const yoyLabel = percent ? 'YOY (ch)' : 'YOY (%)';
      const ytdLabel = percent ? 'YTD (ch)' : 'YTD (%)';
      const title = series.seriesInfo.title;
      series.categoryTable.forEach((obs) => {
        observations[obs.tableDate] = obs.level;
        yoy[obs.tableDate] = obs.yoy;
        ytd[obs.tableDate] = obs.ytd;
      });
      tableData.push(
        {
          series: series.seriesInfo.seasonalAdjustment === 'seasonally_adjusted' ? title + ' (SA)' : title,
          observations: observations
        },
        {
          series: yoyLabel,
          observations: yoy
        },
        {
          series: ytdLabel,
          observations: ytd
        }
      );
    });
    return { tableColumns: tableColumns, tableData: tableData };
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
      qMonth.forEach((q, index) => {
        if (month === q) {
          formattedDate = quarter[index] + ' ' + year;
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
    let exist = false;
    for (const i in geoList) {
      if (geo.handle === geoList[i].handle) {
        exist = true;
        // If region already exists, check it's list of frequencies
        // Get a unique list of frequencies available for a region
        const freqs = geo.freqs;
        for (const j in freqs) {
          if (!this.freqExist(geoList[i].freqs, freqs[j].freq)) {
            geoList[i].freqs.push(freqs[j]);
          }
        }
      }
    }
    if (!exist) {
      geoList.push(geo);
    }
  }

  freqExist(freqArray, freq) {
    for (const n in freqArray) {
      if (freq === freqArray[n].freq) {
        return true;
      }
    }
    return false;
  }

  // Get a unique array of available frequencies for a category
  uniqueFreqs(freq, freqList) {
    let exist = false;
    for (const i in freqList) {
      if (freq.label === freqList[i].label) {
        exist = true;
        // If frequency already exists, check it's list of regions
        // Get a unique list of regions available for a frequency
        const geos = freq.geos;
        for (const j in geos) {
          if (!this.geoExist(freqList[i].geos, geos[j].handle)) {
            freqList[i].geos.push(geos[j]);
          }
        }
      }
    }
    if (!exist) {
      freqList.push(freq);
    }
  }

  geoExist(geoArray, geo) {
    for (const n in geoArray) {
      if (geo === geoArray[n].handle) {
        return true;
      }
    }
    return false;
  }
}
