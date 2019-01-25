import { of as observableOf, forkJoin as observableForkJoin, Observable } from 'rxjs';
import { Injectable, EventEmitter, Output } from '@angular/core';
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
  };

  @Output() public switchYAxes: EventEmitter<any> = new EventEmitter();

  @Output() public toggleSeriesInChart: EventEmitter<any> = new EventEmitter();

  @Output() public updateAnalyzerCount: EventEmitter<any> = new EventEmitter();

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }

  checkSeriesUnits(chartSeries, units) {
    // List of units for series in analyzer chart
    const allUnits = chartSeries.map(series => series.seriesDetail.unitsLabelShort);
    const uniqueUnits = allUnits.filter((unit, index, units) => units.indexOf(unit) === index);
    if (uniqueUnits.length === 2) {
      // If two different units are already in use, check if the current series unit is in the list
      const unitsExist = chartSeries.find(cSeries => cSeries.seriesDetail.unitsLabelShort === units);
      return unitsExist ? true : false;
    }
    return uniqueUnits.length < 2 ? true : false;
  }

  checkAnalyzer(seriesInfo) {
    const analyzeSeries = this.analyzerSeries.find(series => series.id === seriesInfo.id);
    return analyzeSeries ? true : false;
  }

  updateAnalyzerSeriesCount(seriesInfo) {
    this.updateAnalyzer(seriesInfo.id);
    // Update analyze button on category charts/tables
    // Emits click event to parent (landing-page.component) to trigger change detection in for a series that may show up in multiple places on a page
    this.updateAnalyzerCount.emit(seriesInfo);
  }

  getAnalyzerData(aSeries) {
    this.analyzerData.analyzerSeries = [];
    const ids = aSeries.map(s => s.id).join();
    this._uheroAPIService.fetchPackageAnalyzer(ids).subscribe((results) => {
      const series = results.series;
      series.forEach((s) => {
        const seriesData = this.formatSeriesForAnalyzer(s, aSeries);
        this.analyzerData.analyzerSeries.push(seriesData);
      });
      this.createAnalyzerTable(this.analyzerData.analyzerSeries)
      this.checkAnalyzerChartSeries();
    });
    return observableForkJoin(observableOf(this.analyzerData));
  }

  formatSeriesForAnalyzer = (series, aSeries) => {
    let decimals;
    const aSeriesMatch = aSeries.find(a => a.id === series.id);
    const seriesData = {
      seriesDetail: series,
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
      title: series.title,
      geography: series.geography.handle,
      frequency: series.frequencyShort,
      seasonalAdjustment: series.seasonalAdjustment
    };
    const chartNameDetails = {
      title: series.title,
      geography: series.geography.shortName,
      frequency: series.frequency,
      seasonalAdjustment: series.seasonalAdjustment
    };
    seriesData.displayName = this.formatDisplayName(abbreviatedNameDetails);
    seriesData.chartDisplayName = this.formatDisplayName(chartNameDetails);
    seriesData.saParam = series.seasonalAdjustment !== 'not_seasonally_adjusted';
    decimals = series.decimals ? series.decimals : 1;
    seriesData.currentGeo = series.geography;
    seriesData.currentFreq = { freq: series.frequencyShort, label: series.frequency };
    seriesData.observations = series.seriesObservations;
    const levelDates = seriesData.observations.transformationResults[0].dates;
    const obsStart = seriesData.observations.observationStart;
    const obsEnd = seriesData.observations.observationEnd;
    const dateArray = [];
    if (levelDates) {
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
      const levelChartData = this.createSeriesChartData(seriesData.observations.transformationResults[0], dateArray)
      seriesData.chartData = { level: levelChartData, dates: dateArray, pseudoZones: pseudoZones }
    } else {
      seriesData.noData = 'Data not available';
    }
    return seriesData;
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

  createAnalyzerTable = (analyzerSeries) => {
    this.analyzerData.analyzerTableDates = this.setAnalyzerDates(analyzerSeries);
    analyzerSeries.forEach((aSeries) => {
      const decimal = aSeries.seriesDetail.decimals;
      const dateArray = [];
      this._helper.createDateArray(aSeries.observations.observationStart, aSeries.observations.observationEnd, aSeries.seriesDetail.frequencyShort, dateArray);
      aSeries.seriesTableData = this.createSeriesTable(aSeries.observations.transformationResults, dateArray, decimal);
    });
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

  checkAnalyzerChartSeries() {
    // At least 2 series should be drawn in the chart, if more than 1 series has been added to the analyzer
    let chartSeries = this.analyzerData.analyzerSeries.filter(s => s.showInChart);
    while (chartSeries.length < 2 && this.analyzerData.analyzerSeries.length > 1 || !chartSeries.length) {
      const notInChart = this.analyzerData.analyzerSeries.find(serie => serie.showInChart !== true);
      this.analyzerSeries.find(serie => serie.id === notInChart.seriesDetail.id).showInChart = true;
      notInChart.showInChart = true;
      chartSeries = this.analyzerData.analyzerSeries.filter(s => s.showInChart);
    }
  }

  formatDisplayName({ title, geography, frequency, seasonalAdjustment }) {
    let ending = '';
    if (seasonalAdjustment === 'seasonally_adjusted') {
      ending = '; Seasonally Adjusted';
    }
    if (seasonalAdjustment === 'not_seasonally_adjusted') {
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

  updateAnalyzer(seriesId) {
    const seriesExist = this.analyzerSeries.findIndex(series => series.id === seriesId);
    if (seriesExist >= 0) {
      this.analyzerSeries.splice(seriesExist, 1);
      this.analyzerData.analyzerSeries.splice(this.analyzerData.analyzerSeries.findIndex(series => series.seriesDetail.id === seriesId), 1);
      this.analyzerData.analyzerTableDates = this.setAnalyzerDates(this.analyzerData.analyzerSeries);
    }
    if (seriesExist < 0) {
      this.analyzerSeries.push({ id: seriesId });
      this.analyzerData.analyzerTableDates = this.setAnalyzerDates(this.analyzerData.analyzerSeries);
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
