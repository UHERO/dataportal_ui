// Common function used for category multi-chart and table displays

import { Injectable } from '@angular/core';
import { DateWrapper } from './date-wrapper';

@Injectable()
export class HelperService {

  constructor() { }

  calculateDateArray(dateStart: string, dateEnd: string, currentFreq: string, dateArray: Array<any>) {
    let startYear = +dateStart.substr(0, 4);
    let endYear = +dateEnd.substr(0, 4);
    let startMonth = +dateStart.substr(5, 2);
    let endMonth = +dateEnd.substr(5, 2);
    let m = { 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09', 10: '10', 11: '11', 12: '12' };
    let q = { 1: 'Q1', 4: 'Q2', 7: 'Q3', 10: 'Q4' };
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
        dateArray.push({ date: startYear.toString() + '-' + m[startMonth] + '-01', tableDate: startYear.toString() + ' ' + q[startMonth] })
        startYear = startMonth === 10 ? startYear += 1 : startYear;
        startMonth = startMonth === 10 ? startMonth = 1 : startMonth += 3;
      }
    }
    return dateArray;
  }

  dataTransform(seriesObs, dates) {
    let results = null;
    let observations = seriesObs;
    let start = observations.observationStart;
    let end = observations.observationEnd;
    let level = observations.transformationResults[0].observations;
    let yoy = observations.transformationResults[1].observations;
    let ytd = observations.transformationResults[2].observations;

    let levelValue = [];
    let pseudoZones = [];
    let yoyValue = [];
    let ytdValue = [];

    if (level) {
      level.forEach((entry, i) => {
        // Create [date, value] level pairs for charts
        levelValue.push([Date.parse(entry.date), +entry.value]);
        if (entry.pseudoHistory && !level[i + 1].pseudoHistory) {
          pseudoZones.push({ value: Date.parse(entry.date), dashStyle: 'dash', color: '#7CB5EC' });
        }
      });
    }
    if (level) {
      let combineData = this.combineObsData(level, yoy, ytd);
      let tableData = this.seriesTable(combineData, dates);
      let chart = this.seriesChart(combineData, dates);
      let chartData = { level: chart[0], pseudoZones: pseudoZones, yoy: chart[1], ytd: chart[2] };
      results = { chartData: chartData, tableData: tableData, start: start, end: end };
    }
    return results;
  }

  seriesTable(tableData, dateRange) {
    let results = [];
    if (dateRange && tableData) {
      for (let i = 0; i < dateRange.length; i++) {
        results.push({ date: dateRange[i].date, tableDate: dateRange[i].tableDate, value: ' ', yoy: ' ', ytd: ' ' });
        for (let j = 0; j < tableData.length; j++) {
          if (results[i].date === tableData[j].date) {
            results[i].value = tableData[j].value;
            results[i].formattedValue = tableData[j].value === null ? ' ' : this.formatNum(+tableData[j].value, 2);
            results[i].yoy = tableData[j].yoyValue;
            results[i].formattedYoy = tableData[j].yoyValue === null ? ' ' : this.formatNum(+tableData[j].yoyValue, 2);
            results[i].ytd = tableData[j].ytdValue;
            results[i].formattedYtd = tableData[j].ytdValue === null ? ' ' : this.formatNum(+tableData[j].ytdValue, 2);
            break;
          }
        }
      }
      return results;
    }
  }

  seriesChart(data, dateRange) {
    let levelValue = [];
    let yoyValue = [];
    let ytdValue = [];
    if (dateRange && data) {
      for (let i = 0; i < dateRange.length; i++) {
        levelValue.push([Date.parse(dateRange[i].date), null]);
        yoyValue.push([Date.parse(dateRange[i].date), null]);
        ytdValue.push([Date.parse(dateRange[i].date), null]);
        for (let j = 0; j < data.length; j++) {
          if (dateRange[i].date === data[j].date) {
            levelValue[i][1] = data[j].value;
            yoyValue[i][1] = data[j].yoyValue;
            ytdValue[i][1] = data[j].ytdValue;
            break;
          }
        }
      }
      return [levelValue, yoyValue, ytdValue];
    }
  }

  catTable(seriesTableData: Array<any>, dateRange: Array<any>, dateWrapper: DateWrapper) {
    let categoryTable = [];
    // Set datewrapper first and end date based on seasonally adjusted series only for non-annual/non-semiannual frequencies
    for (let i = 0; i < dateRange.length; i++) {
      categoryTable.push({ date: dateRange[i].date, tableDate: dateRange[i].tableDate, level: '', yoy: '', ytd: '' });
    }
    categoryTable.forEach((item) => {
      seriesTableData.forEach((seriesData) => {
        if (item.date === seriesData.date) {
          item.level = seriesData.value === ' ' ? ' ' : this.formatNum(+seriesData.value, 2);
          item.yoy = seriesData.yoy === null ? ' ' : this.formatNum(+seriesData.yoy, 2);
          item.ytd = seriesData.ytd === null ? ' ' : this.formatNum(+seriesData.ytd, 2);
        }
      });
    });
    let tableStart, tableEnd;
    categoryTable.forEach((item, index) => {
      if (item.date === dateWrapper.firstDate) {
        tableStart = index;
      }
      if (item.date === dateWrapper.endDate) {
        tableEnd = index;
      }
    });
    categoryTable = categoryTable.slice(tableStart, tableEnd + 1);
    return categoryTable;
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
    let tableData = [];
    let tableColumns = [];
    let dateStart = dateWrapper.firstDate;
    let dateEnd = dateWrapper.endDate;
    tableColumns.push({ title: 'Series', data: 'series' });
    tableDates.forEach((date) => {
      tableColumns.push({ title: date, data: 'observations.' + date });
    });
    displaySeries.forEach((series) => {
      let observations = {};
      let yoy = {};
      let ytd = {};
      let percent = series.seriesInfo.percent;
      let yoyLabel = percent ? 'YOY (ch)' : 'YOY (%)';
      let ytdLabel = percent ? 'YTD (ch)' : 'YTD (%)';
      series.categoryTable.forEach((obs) => {
        observations[obs.tableDate] = obs.level;
        yoy[obs.tableDate] = obs.yoy;
        ytd[obs.tableDate] = obs.ytd;
      });
      tableData.push(
        {
          series: series.seriesInfo.seasonalAdjustment === 'seasonally_adjusted' ? series.seriesInfo.title + ' (SA)' : series.seriesInfo.title,
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
    // Check that level and perc arrays are not null
    if (level && yoy && ytd) {
      let table = level;
      for (let i = 0; i < level.length; i++) {
        table[i].yoyValue = null;
        table[i].ytdValue = null;
        table[i].value = +level[i].value;
        for (let j = 0; j < yoy.length; j++) {
          if (level[i].date === yoy[j].date) {
            table[i].yoyValue = +yoy[j].value;
            table[i].ytdValue = +ytd[j].value;
            break;
          }
        }
      }
      return table;
    } else if (level && (!yoy || !ytd)) {
      let table = level;
      for (let i = 0; i < level.length; i++) {
        table[i].yoyValue = null;
        table[i].ytdValue = null;
        table[i].value = +level[i].value;
      }
      return table;
    }
  }

  formatDate(date: string, freq: string) {
    let formattedDate;
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let quarter = ['Q1', 'Q2', 'Q3', 'Q4'];
    let qMonth = ['01', '04', '07', '10'];
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
    if (freq === 'M' || freq == 'S') {
      formattedDate = month + '-' + year;
    }
    return formattedDate;
  }

  formatNum(num: number, decimal: number) {
    let fixedNum: any;
    fixedNum = num.toFixed(decimal);
    // remove decimals 
    let int = fixedNum | 0;
    let signCheck = num < 0 ? 1 : 0;
    // store deicmal value
    let remainder = Math.abs(fixedNum - int);
    let decimalString = ('' + remainder.toFixed(decimal)).substr(2, decimal);
    let intString = '' + int, i = intString.length;
    let r = '';
    while ((i -= 3) > signCheck) { r = ',' + intString.substr(i, 3) + r; }
    let returnValue = intString.substr(0, i + 3) + r + (decimalString ? '.' + decimalString : '');
    // If int == 0, converting int to string drops minus sign
    if (int == 0 && num < 0) {
      return '-' + returnValue;
    }
    return returnValue;
  }

  // Get a unique array of available regions for a category
  uniqueGeos(geo, geoList) {
    let exist = false;
    for (let i in geoList) {
      if (geo.handle === geoList[i].handle) {
        exist = true;
        // If region already exists, check it's list of frequencies
        // Get a unique list of frequencies available for a region
        let freqs = geo.freqs;
        for (let j in freqs) {
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
    for (let n in freqArray) {
      if (freq === freqArray[n].freq) {
        return true;
      }
    }
    return false;
  }

  // Get a unique array of available frequencies for a category
  uniqueFreqs(freq, freqList) {
    let exist = false;
    for (let i in freqList) {
      if (freq.label === freqList[i].label) {
        exist = true;
        // If frequency already exists, check it's list of regions
        // Get a unique list of regions available for a frequency
        let geos = freq.geos;
        for (let j in geos) {
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
    for (let n in geoArray) {
      if (geo === geoArray[n].handle) {
        return true;
      }
    }
    return false;
  }
}
