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

  findSelectedDataList = (dataList, dataListId, dataListName) => {
    for (let i = 0; i < dataList.length; i++) {
      let name = dataListName || '';
      if (dataList[i].id === dataListId) {
        dataList[i].dataListName = `${name} ${dataList[i].name}`;
        return dataList[i];
      } else {
        if (dataList[i].children && Array.isArray(dataList[i].children)) {
          name += `${dataList[i].name} > `;
          const selected = this.findSelectedDataList(dataList[i].children, dataListId, name);
          if (selected) {
            return selected;
          }
        }
      }
    }
  }

  getCategoryDataLists = (category, dataListName) => {
    let name = dataListName || '';
    if (!category.children) {
      category.dataListName = `${name} ${category.name}`;
      return category;
    }
    if (category.children && Array.isArray(category.children)) {
      name += `${category.name} > `;
      return this.getCategoryDataLists(category.children[0], name);
    }
  }

  createDateArray(dateStart: string, dateEnd: string, currentFreq: string, dateArray: Array<any>) {
    const start = new Date(dateStart.replace(/-/g, '\/'));
    const end = new Date(dateEnd.replace(/-/g, '\/'));
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
    if (currentFreq === 'W') {
      return this.addToDateArray(start, end, dateArray, currentFreq);
    }
    return dateArray;
  }

  addToDateArray(start: Date, end: Date, dateArray: Array<any>, currentFreq: string, monthIncrease?: number) {
    while (start <= end) {
      const month = start.toISOString().substr(5, 2);
      const q = month === '01' ? 'Q1' : month === '04' ? 'Q2' : month === '07' ? 'Q3' : 'Q4';
      const tableDate = this.getTableDate(start, currentFreq, q);
      dateArray.push({ date: start.toISOString().substr(0, 10), tableDate: tableDate });
      if (currentFreq === 'A') {
        start.setFullYear(start.getFullYear() + 1);
      }
      if (currentFreq !== 'A' && currentFreq !== 'W') {
        start.setMonth(start.getMonth() + monthIncrease);
      }
      if (currentFreq === 'W') {
        start.setDate(start.getDate() + 7)
      }
    }
    return dateArray;
  }

  getTableDate(start, currentFreq, q) {
    if (currentFreq === 'A') {
      return start.toISOString().substr(0, 4);
    }
    if (currentFreq === 'Q') {
      return start.toISOString().substr(0, 4) + ' ' + q;
    }
    if (currentFreq === 'W') {
      return start.toISOString().substr(0, 10);
    }
    return start.toISOString().substr(0, 7);
  }

  getTransformations(observations) {
    let level, yoy, ytd, c5ma;
    observations.transformationResults.forEach((obj) => {
      if (obj.transformation === 'lvl') {
        level = obj.dates ? obj : level;
      }
      if (obj.transformation === 'pc1') {
        yoy = obj.dates ? obj : yoy;
      }
      if (obj.transformation === 'ytd') {
        ytd = obj.dates ? obj : ytd;
      }
      if (obj.transformation === 'c5ma') {
        c5ma = obj.dates ? obj : c5ma;
      }
    });
    return { level: level, yoy: yoy, ytd: ytd, c5ma: c5ma };
  }

  binarySearch = (valueList, date) => {
    let start = 0;
    let end = valueList.length - 1;
    let middle = Math.floor((start + end) / 2);
    while (valueList[middle] !== date && start < end) {
      if (date < valueList[middle]) {
        end = middle - 1;
      } else {
        start = middle + 1;
      }
      middle = Math.floor((start + end) / 2);
    }
    return (valueList[middle] !== date) ? -1 : middle;
  }

  createSeriesChart(dateRange, transformations) {
    const level = transformations.level;
    const yoy = transformations.yoy;
    const ytd = transformations.ytd;
    const c5ma = transformations.c5ma;
    const levelValue = [];
    let yoyValue = [];
    let ytdValue = [];
    let c5maValue = [];
    dateRange.forEach((date) => {
      if (level) {
        const levelIndex = this.binarySearch(level.dates, date.date);
        levelIndex > -1 ? levelValue.push([Date.parse(date.date), +level.values[levelIndex]]) : levelValue.push([Date.parse(date.date), null]);
      }
      if (yoy) {
        const yoyIndex = this.binarySearch(yoy.dates, date.date);
        yoyIndex > -1 ? yoyValue.push([Date.parse(date.date), +yoy.values[yoyIndex]]) : yoyValue.push([Date.parse(date.date), null]);
      }
      if (ytd) {
        const ytdIndex = this.binarySearch(ytd.dates, date.date);
        ytdIndex > -1 ? ytdValue.push([Date.parse(date.date), +ytd.values[ytdIndex]]) : ytdValue.push([Date.parse(date.date), null]);
      }
      if (c5ma) {
        const c5maIndex = this.binarySearch(c5ma.dates, date.date);
        c5maIndex > -1 ? c5maValue.push([Date.parse(date.date), +c5ma.values[c5maIndex]]) : c5maValue.push([Date.parse(date.date), null]);
      }
    });
    if (!yoyValue.length) {
      yoyValue = new Array(level.dates.length - 1).fill(null);
    }
    if (!ytdValue.length) {
      ytdValue = new Array(level.dates.length - 1).fill(null);
    }
    return { level: levelValue, yoy: yoyValue, ytd: ytdValue, c5ma: c5maValue };
  }

  addToTable(valueArray, date, tableObj, value, formattedValue, decimals) {
    const tableEntry = this.binarySearch(valueArray.dates, date.date);
    if (tableEntry > -1) {
      tableObj[value] = +valueArray.values[tableEntry];
      tableObj[formattedValue] = this.formattedValue(valueArray.values[tableEntry], decimals);
    }
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
      if (level) {
        this.addToTable(level, date, tableObj, 'value', 'formattedValue', decimals);
      }
      if (yoy) {
        this.addToTable(yoy, date, tableObj, 'yoyValue', 'formattedYoy', decimals);
      }
      if (ytd) {
        this.addToTable(ytd, date, tableObj, 'ytdValue', 'formattedYtd', decimals);
      }
      if (c5ma) {
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
    if (freq === 'A') {
      return year;
    }
    if (freq === 'Q') {
      const month = new Date(date).getMonth();
      if (month >= 0 && month <= 2) {
        return `${year} Q1`;
      }
      if (month >= 3 && month <= 5) {
        return `${year} Q2`;
      }
      if (month >= 6 && month <= 8) {
        return `${year} Q3`;
      }
      if (month >= 9 && month <= 11) {
        return `${year} Q4`;
      }
    }
    if (freq === 'M' || freq === 'S') {
      return  year + '-' + month;
    }
    return date.substr(0, 10);
  }

  formatNum(num: number, decimal: number) {
    return num === Infinity ? ' ' : num.toLocaleString('en-US', { minimumFractionDigits: decimal, maximumFractionDigits: decimal });
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
      return { startIndex: this.getRangeStart(counter, range, 1), endIndex: counter };
    }
    if (freq === 'Q') {
      return { startIndex: this.getRangeStart(counter, range, 4), endIndex: counter };
    }
    if (freq === 'S') {
      return { startIndex: this.getRangeStart(counter, range, 2), endIndex: counter };
    }
    if (freq === 'M') {
      return { startIndex: this.getRangeStart(counter, range, 12), endIndex: counter };
    }
    if (freq === 'W') {
      return { startIndex: this.getRangeStart(counter, range, 52), endIndex: counter };
    }
  }

  getRangeStart = (counter, range, multiplier) => {
    const index = counter - multiplier * range;
    return index < 0 ? 0 : index;
  }

  getTableDates(dateArray: Array<any>) {
    const tableDates = dateArray.map(date => date.tableDate);
    return tableDates;
  }
}
