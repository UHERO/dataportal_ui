import { Injectable } from '@angular/core';

@Injectable()
export class AnalyzerService {

  public analyzerSeries = [];

  checkAnalyzer(seriesInfo) {
    const analyzeSeries = this.analyzerSeries.find(series => series.id === seriesInfo.id);
    return analyzeSeries ? true : false;
  }

  updateAnalyzer(seriesInfo, tableData?, chartData?) {
    if (seriesInfo.analyze) {
      const analyzeSeries = this.analyzerSeries.find(series => series.id === seriesInfo.id);
      const seriesIndex = this.analyzerSeries.indexOf(analyzeSeries);
      if (seriesIndex > -1) {
        this.analyzerSeries.splice(seriesIndex, 1);
      }
      seriesInfo.analyze = false;
      return;
    }
    if (!seriesInfo.analyze) {
      seriesInfo.tableData = tableData;
      seriesInfo.chartData = chartData;
      this.analyzerSeries.push(seriesInfo);
      seriesInfo.analyze = true;
    }
  }

  createAnalyzerDates(dateStart: string, dateEnd: string, frequencies: Array<any>, dateArray: Array<any>) {
    let startYear = +dateStart.substr(0, 4);
    const endYear = +dateEnd.substr(0, 4);
    let startMonth = +dateStart.substr(5, 2);
    const endMonth = +dateEnd.substr(5, 2);
    const m = { 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09', 10: '10', 11: '11', 12: '12' };
    const q = { 1: 'Q1', 4: 'Q2', 7: 'Q3', 10: 'Q4' };
    // Annual frequency
    const aSelected = frequencies.indexOf(frequencies.find(freq => freq.freq === 'A')) > -1;
    // Quarterly frequency
    const qSelected = frequencies.indexOf(frequencies.find(freq => freq.freq === 'Q')) > -1;
    // Semi-annual frequency
    const sSelected = frequencies.indexOf(frequencies.find(freq => freq.freq === 'S')) > -1;
    // Monthly frequency
    const mSelected = frequencies.indexOf(frequencies.find(freq => freq.freq === 'M')) > -1;
    while (startYear + '-' + m[startMonth] + '-01' <= endYear + '-' + m[endMonth] + '-01') {
      if (mSelected) {
        dateArray.push({
          date: startYear.toString() + '-' + m[startMonth] + '-01',
          tableDate: startYear.toString() + '-' + m[startMonth]
        });
      }
      // If series with a semi-annual frequency have been selected but not monthly, add months '01' & '07' to the date array
      if (sSelected && !mSelected && (startMonth === 1 || startMonth === 7)) {
        dateArray.push({
          date: startYear.toString() + '-' + m[startMonth] + '-01',
          tableDate: startYear.toString() + '-' + m[startMonth]
        });
      }
      if (qSelected) {
        const addQuarter = this.addQuarterObs(startMonth, mSelected);
        if (addQuarter) {
          dateArray.push({
            date: startYear.toString() + '-' + m[addQuarter] + '-01',
            tableDate: startYear.toString() + ' ' + q[addQuarter]
          });
        }
      }
      if (aSelected) {
        const addAnnual = this.addAnnualObs(startMonth, mSelected, qSelected);
        if (addAnnual) {
          dateArray.push({
            date: startYear.toString() + '-01-01',
            tableDate: startYear.toString()
          });
        }
      }
      startYear = startMonth === 12 ? startYear += 1 : startYear;
      startMonth = startMonth === 12 ? 1 : startMonth += 1;
    }
    return dateArray;
  }

  addQuarterObs(startMonth, monthSelected) {
    // If a monthly series is not selected, add Q at months 1, 4, 7, 10 (i.e. startMonth === 1, 4, 7, 10)
    // If a monthly series is selected, add Q after months 3, 6, 9, 12 (i.e. startMonth === 3, 6, 9, 12)
    const qMonth = monthSelected ? startMonth - 2 : startMonth;
    const addQ = monthSelected ? this.checkStartMonth(startMonth) : this.checkStartMonth(startMonth + 2);
    return addQ ? qMonth : null;
  }

  addAnnualObs(startMonth, monthSelected, quarterSelected) {
    // If a monthly series is selected, add annual date after month 12
    if (monthSelected && startMonth === 12) {
      return true;
    }
    // If a quarterly series is selected (w/o monthly), add annueal date after 4th quarter
    if (quarterSelected && !monthSelected && startMonth === 10) {
      return true;
    }
    // If only annual is selected, add to date array
    if (!quarterSelected && !monthSelected && startMonth === 1) {
      return true;
    }
    return false;
  }

  checkStartMonth(month) {
    if (month === 3 || month === 6 || month === 9 || month === 12) {
      return true;
    }
    return false;
  }
}
