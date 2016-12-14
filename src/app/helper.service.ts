// Common function used for category multi-chart and table displays

import { Injectable } from '@angular/core';

// import { UheroApiService } from './uhero-api.service';

@Injectable()
export class HelperService {

  constructor() { }

  calculateDateArray(dateStart: string, dateEnd: string, currentFreq: string, dateArray: Array<any>): void {
    let start = +dateStart.substring(0,4);
    let end = +dateEnd.substring(0,4);

    while (start < end) {
      if (currentFreq === 'A') {
        dateArray.push({'date': start.toString() + '-01-01', 'table date': start.toString()});
        start+=1;
      } else if (currentFreq === 'M') {
        let month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        month.forEach((mon, index) => {
          dateArray.push({'date': start.toString() + '-' + month[index] + '-01', 'table date': start.toString() + '-' + month[index]});
        });
        start+=1;
      } else {
        let quarterMonth = ['01', '04', '07', '10'];
        let quarter = ['Q1', 'Q2', 'Q3', 'Q4'];
        quarterMonth.forEach((quart, index) => {
          dateArray.push({'date': start.toString() + '-' + quarterMonth[index] + '-01', 'table date': start.toString() + ' ' + quarter[index]});
        });
        start+=1;
      }
    }
  }

  seriesTable(tableData, dateRange) {
    let results = [];
    if (dateRange && tableData) {
      for (let i = 0; i < dateRange.length; i++) {
        results.push({'date': dateRange[i]['date'], 'table date': dateRange[i]['table date'], 'value': ' ', 'yoy': ' ', 'ytd': ' '});
        for (let j = 0; j < tableData.length; j++) {
          if (results[i].date === tableData[j]['date']) {
            results[i].value = tableData[j]['value'];
            results[i].yoy = tableData[j]['']
            break;
          }
        }
      }
      return results;
    }
  }

  // Get a unique array of available regions for a category
  uniqueGeos(geo, geoList) {
    let exist = false;
    for (let i in geoList) {
      if (geo.name === geoList[i].name) {
        exist = true;
      }
    }

    if (!exist) {
      geoList.push(geo);
    }
  }

  // Get a unique array of available frequencies for a category
  uniqueFreqs(freq, freqList) {
    let exist = false;
    for (let i in freqList) {
      if (freq.label === freqList[i].label) {
        exist = true;
      }
    }

    if (!exist && (freq.freq === 'A' || freq.freq === 'M' || freq.freq === 'Q')) {
      freqList.push(freq);
    }
  }
}
