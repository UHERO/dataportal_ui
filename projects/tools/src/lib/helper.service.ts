import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Frequency, Geography } from './tools.models';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private categoryData = new Subject();
  currentFreqChange: BehaviorSubject<any> = new BehaviorSubject(null);
  currentFreq = this.currentFreqChange.asObservable();
  currentGeoChange: BehaviorSubject<any> = new BehaviorSubject(null);
  currentGeo = this.currentGeoChange.asObservable();

  constructor() { }

  updateCurrentFrequency = (newFreq: Frequency) => {
    this.currentFreqChange.next(newFreq);
    return newFreq;
  }
  updateCurrentGeography = (newGeo: Geography) => {
    this.currentGeoChange.next(newGeo);
    return newGeo;
  }

  getCatData() {
    return this.categoryData;
  }

  updateCatData(data) {
    this.categoryData.next(data);
  }

  toggleSeriesForSeasonalDisplay = (series: any, showSeasonal: boolean, hasSeasonal: boolean) => {
    const seasonalAdjustment = series.seasonalAdjustment;
    if (!hasSeasonal) {
      return true;
    }
    if (!showSeasonal && (seasonalAdjustment !== 'seasonally_adjusted' || seasonalAdjustment === 'not_applicable')) {
      return true;
    }
    return showSeasonal && (seasonalAdjustment === 'seasonally_adjusted' || seasonalAdjustment === 'not_applicable');
  }

  checkIfSeriesAvailable = (noData: boolean, data: Array<any>) => {
    return noData || !data.some(s => s.display);
  }

  findSelectedDataList = (dataList, dataListId, dataListName) => {
    for (const list of dataList) {
      let name = dataListName || '';
      if (list.id === dataListId) {
        list.dataListName = `${name} ${list.name}`;
        return list;
      } else {
        if (list.children && Array.isArray(list.children)) {
          name += `${list.name} > `;
          const selected = this.findSelectedDataList(list.children, dataListId, name);
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

  findDateWrapperStart = series => series.reduce((start: string, s) => (s.seriesObservations.observationStart < start || start === '') ? s.seriesObservations.observationStart : start, '');
  
  fineDateWrapperEnd = series => series.reduce((end: string, s) => (s.seriesObservations.observationEnd > end || end === '') ? s.seriesObservations.observationEnd : end, '');

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
    if (currentFreq === 'W' || currentFreq === 'D') {
      return this.addToDateArray(start, end, dateArray, currentFreq);
    }
    return dateArray;
  }

  addToDateArray(start: Date, end: Date, dateArray: Array<any>, currentFreq: string, monthIncrease?: number) {
    while (start <= end) {
      const month = start.toISOString().substr(5, 2);
      const q = month === '01' ? 'Q1' : month === '04' ? 'Q2' : month === '07' ? 'Q3' : 'Q4';
      const tableDate = this.getTableDate(start, currentFreq, q);
      dateArray.push({ date: start.toISOString().substr(0, 10), tableDate });
      if (currentFreq === 'A') {
        start.setFullYear(start.getFullYear() + 1);
      }
      if (currentFreq === 'M' || currentFreq === 'S' || currentFreq === 'Q') {
        start.setMonth(start.getMonth() + monthIncrease);
      }
      if (currentFreq === 'W') {
        start.setDate(start.getDate() + 7);
      }
      if (currentFreq === 'D') {
        start.setDate(start.getDate() + 1);
      }
    }
    return dateArray;
  }

  getTableDate(start: Date, currentFreq: string, q: string) {
    const dateStr = {
      A: start.toISOString().substr(0, 4),
      Q: `${start.toISOString().substr(0, 4)} ${q}`,
      W: start.toISOString().substr(0, 10),
      D: start.toISOString().substr(0, 10)
    }
    return dateStr[currentFreq] || start.toISOString().substr(0, 7);
  }

  getTransformations(observations) {
    let level;
    let yoy;
    let ytd;
    let c5ma;
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
    return { level, yoy, ytd, c5ma };
  }

  binarySearch = (valueList, date) => {
    let start = 0;
    let end = valueList.length - 1;
    let middle = Math.floor((start + end) / 2);
    // check if array is in descending order
    const descending = valueList[start] > valueList[end];
    while (valueList[middle] !== date && start < end) {
      if (date < valueList[middle]) {
        start = descending ? middle + 1 : start;
        end = descending ? end : middle - 1;
      } else {
        start = descending ? start : middle + 1;
        end = descending ? middle - 1 : end;
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
        levelValue.push(this.createDateValuePairs(level.dates, date.date, level.values));
      }
      if (yoy) {
        yoyValue.push(this.createDateValuePairs(yoy.dates, date.date, yoy.values));
      }
      if (ytd) {
        ytdValue.push(this.createDateValuePairs(ytd.dates, date.date, ytd.values));
      }
      if (c5ma) {
        c5maValue.push(this.createDateValuePairs(c5ma.dates, date.date, c5ma.values));
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

  createDateValuePairs = (transformationDates: Array<any>, date: string, values: Array<any>) => {
    const transformationIndex = this.binarySearch(transformationDates, date);
    return [ Date.parse(date), transformationIndex > -1 ? +values[transformationIndex] : null ];
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

  formatDate(date: string, freq: string) {
    const year = date.substr(0, 4);
    const month = date.substr(5, 2);
    if (freq === 'A') {
      return year;
    }
    if (freq === 'Q') {
      const m = +month;
      if (m >= 0 && m <= 2) {
        return `${year} Q1`;
      }
      if (m >= 3 && m <= 5) {
        return `${year} Q2`;
      }
      if (m >= 6 && m <= 8) {
        return `${year} Q3`;
      }
      if (m >= 9 && m <= 11) {
        return `${year} Q4`;
      }
    }
    if (freq === 'M' || freq === 'S') {
      return `${year}-${month}`;
    }
    return date.substr(0, 10);
  }

  formatNum(num: number, decimal: number) {
    return num === Infinity ? ' ' : num.toLocaleString('en-US', { minimumFractionDigits: decimal, maximumFractionDigits: decimal });
  }

  setDefaultCategoryRange(freq, dateArray, defaults) {
    const defaultSettings = defaults.find(ranges => ranges.freq === freq);
    const defaultEnd = defaultSettings.end ? defaultSettings.end : new Date(dateArray[dateArray.length - 1].date).toISOString().substr(0, 4);
    let counter = dateArray.length - 1;
    while (new Date(dateArray[counter].date).toISOString().substr(0, 4) > defaultEnd) {
      counter--;
    }
    return this.getRanges(freq, counter, defaultSettings.range);
  }

  getSeriesStartAndEnd = (dates: Array<any>, start: string, end: string, freq: string, defaultRange) => {
    const defaultRanges = this.setDefaultCategoryRange(freq, dates, defaultRange);
    let { startIndex, endIndex } = defaultRanges;
    if (start) {
      const dateFromExists = this.checkDateExists(start, dates, freq);
      if (dateFromExists > -1) {
        startIndex = dateFromExists;
      }
      if (start < dates[0].date) {
        startIndex = defaultRanges.startIndex;
      }
    }
    if (end) {
      const dateToExists = this.checkDateExists(end, dates, freq);
      if (dateToExists > -1) {
        endIndex = dateToExists;
      }
      if (end > dates[dates.length - 1].date) {
        endIndex = defaultRanges.endIndex;
      }
    }
    return { seriesStart: startIndex, seriesEnd: endIndex };
  }

  checkDateExists = (date: string, dates: Array<any>, freq: string) => {
    let dateToCheck = date;
    const year = date.substring(0, 4);
    if (freq === 'A') {
      dateToCheck = `${year}-01-01`;
    }
    if (freq === 'Q') {
      const month = +date.substring(5, 7);
      if (month >= 1 && month <= 3) {
        dateToCheck = `${year}-01-01`;
      }
      if (month >= 4 && month <= 6) {
        dateToCheck = `${year}-04-01`;
      }
      if (month >= 7 && month <= 9) {
        dateToCheck = `${year}-07-01`;
      }
      if (month >= 10 && month <= 12) {
        dateToCheck = `${year}-10-01`;
      }
    }
    const dateArray = dates.map(d => d.date);
    return this.binarySearch(dateArray, dateToCheck);
  }

  getRanges(freq: string, counter: number, range: number) {
    // Range = default amount of years to display
    const multiplier = {
      A: 1,
      Q: 4,
      S: 2,
      M: 12,
      W: 52,
      D: 365
    };
    return { startIndex: this.getRangeStart(counter, range, multiplier[freq]), endIndex: counter };
  }

  getRangeStart = (counter, range, multiplier) => {
    const index = counter - multiplier * range;
    return index < 0 ? 0 : index;
  }

  getTableDates(dateArray: Array<any>) {
    return dateArray.map(date => date.tableDate);
  }
}
