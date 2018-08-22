import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UheroApiService } from './uhero-api.service';
import { HelperService } from './helper.service';
import { Frequency } from './frequency';
import { Geography } from './geography';
import { DateWrapper } from './date-wrapper';

@Injectable()
export class AnalyzerService {
  // Keep track of series in the analyzer
  public analyzerSeries = [];

  public analyzerData = {
    analyzerTableDates: [],
    analyzerSeries: [],
    analyzerChartSeries: [],
    analyzerFrequency: '',
    chartNavigator: { frequency: '', dateStart: '', numberOfObservations: null }
  };

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }

  checkAnalyzer(seriesInfo) {
    const analyzeSeries = this.analyzerSeries.find(series => series.id === seriesInfo.id);
    return analyzeSeries ? true : false;
  }

  getAnalyzerData(aSeries) {
    this.analyzerData.analyzerSeries = [];
    const ids = aSeries.map(s => s.id).join();
    this._uheroAPIService.fetchPackageAnalyzer(ids).subscribe((results) => {
      const series = results.series;
      series.forEach((s) => {
        let decimals;
        const aSeriesMatch = aSeries.find(a => a.id === s.id);
        const seriesData = {
          seriesDetail: s,
          currentGeo: <Geography>{},
          currentFreq: <Frequency>{},
          chartData: {},
          displayName: '',
          chartDisplayName: '',
          seriesTableData: [],
          error: null,
          saParam: false,
          noData: '',
          observations: { transformationResults: [], observationStart: '', observationEnd: '' },
          showInChart: aSeriesMatch.showInChart
        };
        const abbreviatedNameDetails = {
          title: s.title,
          geography: s.geography.handle,
          frequency: s.frequencyShort,
          seasonalAdjustment: s.seasonalAdjustment
        };
        const chartNameDetails = {
          title: s.title,
          geography: s.geography.shortName,
          frequency: s.frequency,
          seasonalAdjustment: s.seasonalAdjustment
        };
        seriesData.displayName = this.formatDisplayName(abbreviatedNameDetails);
        seriesData.chartDisplayName = this.formatDisplayName(chartNameDetails);
        seriesData.saParam = s.seasonalAdjustment !== 'not_seasonally_adjusted';
        decimals = s.decimals ? s.decimals : 1;
        seriesData.currentGeo = s.geography;
        seriesData.currentFreq = { freq: s.frequencyShort, label: s.frequency };
        seriesData.observations = s.seriesObservations;
        const levelData = seriesData.observations.transformationResults[0].dates;
        const obsStart = seriesData.observations.observationStart;
        const obsEnd = seriesData.observations.observationEnd;
        const dateArray = [];
        if (levelData) {
          const pseudoZones = [];
          const level = seriesData.observations.transformationResults[0].values;
          if (level.pseudoHistory) {
            level.pseudoHistory.forEach((obs, index) => {
              if (obs && !level.pseudoHistory[index + 1]) {
                pseudoZones.push({ value: Date.parse(level.dates[index]), dashStyle: 'dash', color: '#7CB5EC', className: 'pseudoHistory' });
              }
            });
          } 
          // Use to format dates for table
          this._helper.createDateArray(obsStart, obsEnd, seriesData.currentFreq.freq, dateArray);
          const data = this._helper.dataTransform(seriesData.observations, dateArray, decimals);
          const levelChartData = this.createSeriesChartData(seriesData.observations.transformationResults[0], dateArray)
          seriesData.chartData = { level: levelChartData, dates: dateArray, pseudoZones: pseudoZones }
          //seriesData.seriesTableData = data.tableData;
        } else {
          seriesData.noData = 'Data not available';
        }
        this.analyzerData.analyzerSeries.push(seriesData);
      });
      this.analyzerData.analyzerTableDates = this.setAnalyzerDates(this.analyzerData.analyzerSeries);
      this.analyzerData.analyzerSeries.forEach((aSeries) => {
        const decimal = aSeries.seriesDetail.decimals;
        const dateArray = [];
        this._helper.createDateArray(aSeries.observations.observationStart, aSeries.observations.observationEnd, aSeries.seriesDetail.frequencyShort, dateArray);
        // aSeries.seriesTableData = this.createSeriesTable(aSeries.observations.transformationResults, dateArray, decimal);
        aSeries.seriesTableData = this.createSeriesTable(aSeries.observations.transformationResults, dateArray, decimal);
      });
      // /this.createAnalyzerTableData(this.analyzerData.analyzerSeries, this.analyzerData.analyzerTableDates);
      this.analyzerData.analyzerChartSeries = this.analyzerData.analyzerSeries.filter(serie => serie.showInChart === true);
      // Get highest frequency of all series in analyzer
      this.analyzerData.chartNavigator.frequency = this.checkFrequencies(this.analyzerData.analyzerSeries);
      this.analyzerData.chartNavigator.dateStart = this.analyzerData.analyzerTableDates[0].date;
      this.analyzerData.chartNavigator.numberOfObservations = Math.max(...this.analyzerData.analyzerSeries.map(s => s.chartData.level.length));
      this.checkAnalyzerChartSeries();
    });
    return Observable.forkJoin(Observable.of(this.analyzerData));
  }
  
  checkFrequencies = (series) => {
    let freq = 'A';
    series.forEach((s) => {
      if (s.currentFreq.freq === 'M') {
        freq = 'M';
      }
      if (s.currentFreq.freq === 'Q') {
        freq = 'Q';
      }
      if (s.currentFreq.freq === 'S') {
        freq = 'S';
      }
    });
    return freq;
  }

  createSeriesTable = (transformations, tableDates, decimal) => {
    const categoryTable = {};
    transformations.forEach((t) => {
      const { transformation, dates, values, pseudoHistory } = t;
      if (dates && values) {
        categoryTable[`${transformation}`] = tableDates.map((date) => {
          const dateExists = this._helper.binarySearch(dates, date.date);
          return dateExists > -1 ? { date: date.date, tableDate: date.tableDate, value: +values[dateExists], formattedValue: '' } : { date: date.date, tableDate: date.tableDate, value: Infinity, formattedValue: '' };
        });
      }
    });
    return categoryTable;
  }

  createSeriesChartData = (transformation, dates) => {
    if (transformation) {
      const dateDiff = dates.filter(date => !transformation.dates.includes(date.date));
      const transformationValues = [];
      if (!dateDiff.length) {
        return transformation.values.map(Number);
      }
      if (dateDiff.length) {
        dates.forEach((sDate) => {
          const dateExists = this._helper.binarySearch(transformation.dates, sDate.date);
          dateExists > -1 ? transformationValues.push(+transformation.values[dateExists]) : transformationValues.push(null);
        });
        return transformationValues;
      }  
    }
  }


  createAnalyzerTableData(analyzerSeries, tableDates) {
    analyzerSeries.forEach((serie) => {
      /* if (serie.observations) {
        serie.analyzerTableData = tableDates.map((date) => {
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
          const entry = serie.seriesTableData.findIndex(obs => obs.tableDate === date.tableDate);
          if (entry > -1) {
            tableObj.value = serie.seriesTableData[entry].value;
            tableObj.formattedValue = serie.seriesTableData[entry].formattedValue;
            tableObj.yoyValue = serie.seriesTableData[entry].yoyValue;
            tableObj.formattedYoy = serie.seriesTableData[entry].formattedYoy;
            tableObj.ytdValue = serie.seriesTableData[entry].ytdValue;
            tableObj.formattedYtd = serie.seriesTableData[entry].formattedYtd;
            tableObj.c5maValue = serie.seriesTableData[entry].c5maValue;
            tableObj.formattedC5ma = serie.seriesTableData[entry].formattedC5ma;
          }
          return tableObj;
        });
      } */
    });
  }

  checkAnalyzerChartSeries() {
    // At least 2 series should be drawn in the chart, if more than 1 series has been added to the analyzer
    while (this.analyzerData.analyzerChartSeries.length < 2 && this.analyzerData.analyzerSeries.length > 1 || !this.analyzerData.analyzerChartSeries.length) {
      const notInChart = this.analyzerData.analyzerSeries.find(serie => serie.showInChart !== true);
      this.analyzerSeries.find(serie => serie.id === notInChart.seriesDetail.id).showInChart = true;
      notInChart.showInChart = true;
      this.analyzerData.analyzerChartSeries = this.analyzerData.analyzerSeries.filter(serie => serie.showInChart === true);
    }
  }

  formatDisplayName({ title, geography, frequency, seasonalAdjustment }) {
    let ending = '';
    if (seasonalAdjustment === 'seasonally_adjusted') {
      ending = '; Seasonally Adjusted';
    }
    if (seasonalAdjustment === 'not_seasonall_adjusted') {
      ending = '; Not Seasonally Adjusted';
    }
    return `${title} (${geography}; ${frequency}${ending})`;
  }

  setAnalyzerDates(analyzerSeries) {
    const frequencies = [];
    const dateWrapper = { firstDate: '', endDate: '' };
    analyzerSeries.forEach((series) => {
      const freqExist = frequencies.find(freq => freq.freq === series.seriesDetail.frequencyShort);
      if (!freqExist) {
        frequencies.push({ freq: series.seriesDetail.frequencyShort, label: series.seriesDetail.frequency });
      }
      // Get earliest start date and latest end date
      this.setDateWrapper(dateWrapper, series.observations.observationStart, series.observations.observationEnd);
    });
    // Array of full range of dates for series selected in analyzer
    return this.createAnalyzerDates(dateWrapper.firstDate, dateWrapper.endDate, frequencies, []);
  }

  setDateWrapper(dateWrapper: DateWrapper, seriesStart: string, seriesEnd: string) {
    if (dateWrapper.firstDate === '' || seriesStart < dateWrapper.firstDate) {
      dateWrapper.firstDate = seriesStart;
    }
    if (dateWrapper.endDate === '' || seriesEnd > dateWrapper.endDate) {
      dateWrapper.endDate = seriesEnd;
    }
  }

  findLongestSeriesIndex(series) {
    let longestSeries, seriesLength = 0;
    series.forEach((serie, index) => {
      if (!longestSeries || seriesLength < serie.chartData.level.length) {
        seriesLength = serie.chartData.level.length;
        longestSeries = index;
      }
    });
    return longestSeries;
  }

  updateAnalyzer(seriesId, tableData?, chartData?) {
    const seriesExist = this.analyzerSeries.findIndex(series => series.id === seriesId);
    if (seriesExist >= 0) {
      this.analyzerSeries.splice(seriesExist, 1);
      this.analyzerData.analyzerSeries.splice(this.analyzerData.analyzerSeries.findIndex(series => series.seriesDetail.id === seriesId), 1);
    }
    if (seriesExist < 0) {
      this.analyzerSeries.push({ id: seriesId });
    }
  }

  createAnalyzerDates(dateStart: string, dateEnd: string, frequencies: Array<any>, dateArray: Array<any>) {
    const start = new Date(dateStart.replace(/-/g, '\/'));
    const end = new Date(dateEnd.replace(/-/g, '\/'))
    let aSelected = false;
    let qSelected = false;
    let sSelected = false;
    let mSelected = false;
    frequencies.forEach((freq) => {
      if (freq.freq === 'A') {
        aSelected = true;
      }
      if (freq.freq === 'Q') {
        qSelected = true;
      }
      if (freq.freq === 'S') {
        sSelected = true;
      }
      if (freq.freq === 'M') {
        mSelected = true;
      }
    });
    while (start <= end) {
      if (mSelected) {
        dateArray.push({
          date: start.toISOString().substr(0, 10),
          tableDate: start.toISOString().substr(0, 7)
        });
      }
      if (sSelected && !mSelected && (start.getMonth() === 0 || start.getMonth() === 6)) {
        dateArray.push({
          date: start.toISOString().substr(0, 10),
          tableDate: start.toISOString().substr(0, 7)
        });
      }
      if (qSelected) {
        const addQuarter = this.addQuarterObs(start.getMonth(), mSelected);
        if (addQuarter) {
          dateArray.push({
            date: start.toISOString().substr(0, 4) + '-' + addQuarter.m + '-01',
            tableDate: start.toISOString().substr(0, 4) + ' ' + addQuarter.q
          });
        }
      }
      if (aSelected) {
        const addAnnual = this.addAnnualObs(start.getMonth(), mSelected, qSelected, sSelected);
        if (addAnnual) {
          dateArray.push({
            date: start.toISOString().substr(0, 4) + '-01-01',
            tableDate: start.toISOString().substr(0, 4)
          });
        }
      }
      start.setMonth(start.getMonth() + 1);
    }
    return dateArray;
  }

  addQuarterObs(startMonth, monthSelected) {
    // If a monthly series is not selected, add Q at months 0, 3, 6, 9 (i.e. startMonth === 0, 3, 6, 9)
    // If a monthly series is selected, add Q after months 3, 6, 9, 12 (i.e. startMonth === 2, 5, 7, 11)
    const qMonth = monthSelected ? startMonth - 2 : startMonth;
    const addQ = this.checkStartMonth(qMonth);
    let quarter = { m: '', q: '' };
    if (addQ) {
      quarter.q = qMonth === 0 ? 'Q1' : qMonth === 3 ? 'Q2' : qMonth === 6 ? 'Q3' : 'Q4';
      quarter.m = qMonth === 0 ? '01' : qMonth === 3 ? '04' : qMonth === 6 ? '07' : '10';
    }
    return addQ ? quarter : null;
  }

  addAnnualObs(startMonth, monthSelected, quarterSelected, sSelected) {
    // If a monthly series is selected, add annual date after month 12
    if (monthSelected && startMonth === 11) {
      return true;
    }
    // If a quarterly series is selected (w/o monthly), add annual date after 4th quarter
    if (quarterSelected && !monthSelected && startMonth === 9) {
      return true;
    }
    // If only annual is selected, add to date array
    if (!quarterSelected && !monthSelected && !sSelected && startMonth === 0) {
      return true;
    }
    if (!quarterSelected && !monthSelected && sSelected && startMonth === 6) {
      return true;
    }
    return false;
  }
  
  checkStartMonth = (month) => month % 3 === 0 ? true : false;
}
