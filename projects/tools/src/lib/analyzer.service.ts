import { of as observableOf, forkJoin as observableForkJoin, BehaviorSubject } from 'rxjs';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { ApiService } from './api.service';
import { HelperService } from './helper.service';
import { Frequency } from './tools.models';
import { Geography } from './tools.models';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {
  // Keep track of series in the analyzer
  public analyzerSeries = [];
  private analyzerSeriesCount = new BehaviorSubject(this.analyzerSeries.length);
  analyzerSeriesCount$ = this.analyzerSeriesCount.asObservable();
  public analyzerData = {
    analyzerTableDates: [],
    analyzerSeries: [],
  };

  @Output() public switchYAxes: EventEmitter<any> = new EventEmitter();

  @Output() public toggleSeriesInChart: EventEmitter<any> = new EventEmitter();

  @Output() public updateAnalyzerCount: EventEmitter<any> = new EventEmitter();

  constructor(private _uheroAPIService: ApiService, private _helper: HelperService) { }

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

  getAnalyzerData(aSeries, noCache: boolean) {
    this.analyzerData.analyzerSeries = [];
    const ids = aSeries.map(s => s.id).join();
    this._uheroAPIService.fetchPackageAnalyzer(ids, noCache).subscribe((results) => {
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
      geography: series.geography.shortName,
      frequency: series.frequency,
      seasonalAdjustment: series.seasonalAdjustment,
      units: series.unitsLabelShort ? series.unitsLabelShort : series.unitsLabel
    };
    const chartNameDetails = {
      title: series.title,
      geography: series.geography.shortName,
      frequency: series.frequency,
      seasonalAdjustment: series.seasonalAdjustment,
      units: series.unitsLabelShort ? series.unitsLabelShort : series.unitsLabel
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
    const freqs = series.map((s) => s.currentFreq.freq);
    return freqs.includes('W') ? 'W' : freqs.includes('M') ? 'M' : freqs.includes('Q') ? 'Q' : freqs.includes('S') ? 'S' : 'A'
  }

  createAnalyzerTable = (analyzerSeries) => {
    analyzerSeries.forEach((aSeries) => {
      const decimal = aSeries.seriesDetail.decimals;
      const dateArray = [];
      this._helper.createDateArray(aSeries.observations.observationStart, aSeries.observations.observationEnd, aSeries.seriesDetail.frequencyShort, dateArray);
      aSeries.seriesTableData = this.createSeriesTable(aSeries.observations.transformationResults, dateArray, decimal);
    });
    this.analyzerData.analyzerTableDates = this.createAnalyzerTableDates(analyzerSeries);
  }

  dateComparison = (a, b) => {
    if (a.date === b.date) {
      return a.tableDate < b.tableDate ? -1 : a.tableDate > b.tableDate ? 1 : 0;
    }
    return a.date < b.date ? -1 : 1;
  }

  createAnalyzerTableDates = (series, start?, end?) => {
    let allDates = [];
    series.forEach((serie) => {
      serie.seriesTableData.lvl.forEach((date) => {
        const dateExists = allDates.map(d => d.tableDate).find(tableDate => tableDate === date.tableDate);
        if (!dateExists) allDates.push(date);
      });
    });
    allDates = allDates.sort(this.dateComparison);
    if (start && end) allDates = allDates.filter(date => date.date >= start && date.date <= end);
    return allDates;
  };

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
      const transformationValues = [];
      dates.forEach((sDate) => {
        const dateExists = this._helper.binarySearch(transformation.dates, sDate.date);
        dateExists > -1 ? transformationValues.push([Date.parse(sDate.date), +transformation.values[dateExists]]) : transformationValues.push([Date.parse(sDate.date), null]);
      });
      return transformationValues;
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

  formatDisplayName({ title, geography, frequency, seasonalAdjustment, units }) {
    let ending = '';
    if (seasonalAdjustment === 'seasonally_adjusted') {
      ending = '; Seasonally Adjusted';
    }
    if (seasonalAdjustment === 'not_seasonally_adjusted') {
      ending = '; Not Seasonally Adjusted';
    }
    return `${title} (${units}) (${geography}; ${frequency}${ending})`;
  }

  updateAnalyzer(seriesId) {
    const seriesExist = this.analyzerSeries.findIndex(series => series.id === seriesId);
    if (seriesExist >= 0) {
      this.analyzerSeries.splice(seriesExist, 1);
      this.analyzerData.analyzerSeries.splice(this.analyzerData.analyzerSeries.findIndex(series => series.seriesDetail.id === seriesId), 1);
      this.analyzerData.analyzerTableDates = this.createAnalyzerTableDates(this.analyzerData.analyzerSeries);
      this.analyzerSeriesCount.next(this.analyzerSeries.length);
    }
    if (seriesExist < 0) {
      this.analyzerSeries.push({ id: seriesId });
      this.analyzerSeriesCount.next(this.analyzerSeries.length);
      this.analyzerData.analyzerTableDates = this.createAnalyzerTableDates(this.analyzerData.analyzerSeries);
    }
  }
}
