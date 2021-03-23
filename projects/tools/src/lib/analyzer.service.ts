import { of as observableOf, forkJoin as observableForkJoin, BehaviorSubject, forkJoin } from 'rxjs';
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
  analyzerSeriesSource: BehaviorSubject<any> = new BehaviorSubject([]);
  analyzerSeries = this.analyzerSeriesSource.asObservable();
  private analyzerSeriesCount = new BehaviorSubject(this.analyzerSeriesSource.value.length);
  analyzerSeriesCount$ = this.analyzerSeriesCount.asObservable();
  analyzerSeriesCompareSource: BehaviorSubject<any> = new BehaviorSubject([]);
  analyzerSeriesCompare = this.analyzerSeriesCompareSource.asObservable();

  public analyzerData = {
    analyzerTableDates: [],
    analyzerDateWrapper: { firstDate: '', endDate: '' },
    analyzerSeries: [],
    displayFreqSelector: false,
    siblingFreqs: [],
    analyzerFrequency: {},
    y0Series: null,
    y1Series: null,
    requestComplete: false,
    indexed: false,
    baseYear: null
  };
  public embedData = {
    analyzerTableDates: [],
    analyzerSeries: [],
  };

  @Output() public switchYAxes: EventEmitter<any> = new EventEmitter();

  @Output() public toggleSeriesInChart: EventEmitter<any> = new EventEmitter();

  @Output() public toggleIndexedData: EventEmitter<any> = new EventEmitter();

  @Output() public updateAnalyzerCount: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService, private helperService: HelperService) { }

  checkSeriesUnits(chartSeries, units) {
    // List of units for series in analyzer chart
    const allUnits = chartSeries.map(series => series.seriesDetail.unitsLabelShort);
    const uniqueUnits = allUnits.filter((unit, index, u) => u.indexOf(unit) === index);
    if (uniqueUnits.length === 2) {
      // If two different units are already in use, check if the current series unit is in the list
      const unitsExist = chartSeries.find(cSeries => cSeries.seriesDetail.unitsLabelShort === units);
      return unitsExist ? true : false;
    }
    return uniqueUnits.length < 2 ? true : false;
  }

  checkAnalyzer(seriesInfo) {
    const analyzeSeries = this.analyzerSeriesSource.value.find(series => series.id === seriesInfo.id);
    return analyzeSeries ? true : false;
  }

  updateAnalyzerSeries(data) {
    this.analyzerSeriesSource.next(data);
    this.analyzerSeriesCount.next(this.analyzerSeriesSource.value.length);
  }

  addToComparisonChart(series) {
    const currentCompare = this.analyzerSeriesCompareSource.value;
    this.analyzerData.analyzerSeries.find(s => s.id === series.id).showInChart = true;
    const indexed = this.analyzerData.indexed;
    const baseYear = this.analyzerData.baseYear;
    console.log('ADD TO COMPARE DATA', this.analyzerData)
    currentCompare.push({
      className: series.id,
      name: indexed ? series.indexDisplayName : series.chartDisplayName,
      tooltipName: series.title,
      data: indexed ? this.getChartIndexedValues(series.chartData.level, baseYear) : series.chartData.level,
      levelData: series.chartData.level,
      yAxis: indexed ? `Index (${baseYear})-${series.selectedYAxis}` : `${series.unitsLabelShort}-${series.selectedYAxis}`,
      yAxisText: indexed ? `Index (${baseYear})` : `${series.unitsLabelShort}`,
      yAxisSide: series.selectedYAxis,
      type: series.selectedChartType,
      decimals: series.decimals,
      frequency: series.frequencyShort,
      geography: series.geography.name,
      includeInDataExport: true,
      showInLegend: true,
      showInNavigator: false,
      events: {
        legendItemClick() {
          return false;
        }
      },
      observations: series.observations,
      indexBaseYear: baseYear,
      unitsLabelShort: series.unitsLabelShort,
      seasonallyAdjusted: series.seasonalAdjustment === 'seasonally_adjusted',
      dataGrouping: {
        enabled: false
      },
      pseudoZones: series.chartData.pseudoZones,
      visible: true
    });
    this.analyzerSeriesCompareSource.next(currentCompare);
  }

  getIndexedValues(values, dates, baseYear) {
    return values.map((curr, ind, arr) => {
      const dateIndex = dates.findIndex(date => date === baseYear);
      return dateIndex > -1 ? curr / arr[dateIndex] * 100 : curr / arr[0] * 100;
    });
  }

  getChartIndexedValues(values, baseYear: string) {
    return values.map((curr, ind, arr) => {
      const dateIndex = arr.findIndex(dateValuePair => new Date(dateValuePair[0]).toISOString().substr(0, 10) === baseYear);
      return dateIndex > -1 ? [curr[0], curr[1] / arr[dateIndex][1] * 100] : [curr[0], curr[1] / arr[0][1] * 100];
    });
  }

  updateCompareSeriesAxis(seriesInfo, axis: string) {
    const currentCompare = this.analyzerSeriesCompareSource.value;
    const series = currentCompare.find(s => s.className === seriesInfo.id);
    series.yAxisSide = axis;
    series.yAxis = `${seriesInfo.unitsLabelShort}-${axis}`
    this.analyzerSeriesCompareSource.next(currentCompare);
  }

  updateCompareChartType(seriesInfo, chartType: string) {
    const currentCompare = this.analyzerSeriesCompareSource.value;
    currentCompare.find(s => s.className === seriesInfo.id).type = chartType;
    this.analyzerSeriesCompareSource.next(currentCompare);
  }

  removeFromComparisonChart(id: number) {
    const currentCompare = this.analyzerSeriesCompareSource.value;
    const newCompare = currentCompare.filter(s => s.className !== id);
    this.analyzerSeriesCompareSource.next(newCompare);
  }

  toggleIndexValues(index, minYear) {
    this.analyzerData.indexed = index;
    const currentCompareSeries = this.analyzerSeriesCompareSource.value;
    const baseYear = this.getIndexBaseYear(this.analyzerData.analyzerSeries, minYear);
    this.analyzerData.baseYear = baseYear;
    if (currentCompareSeries) {
      currentCompareSeries.forEach((s) => {
        s.data = index ? this.getChartIndexedValues(s.levelData, baseYear) : s.levelData;
        s.yAxisText = index ? `Index (${baseYear})` : `${s.unitsLabelShort}`;
        s.inndexBaseYear = baseYear;
      });
      this.analyzerSeriesCompareSource.next(currentCompareSeries);
    }
  }

  toggleAnalyzerSeries(seriesID) {
    const currentValue = this.analyzerSeriesSource.value;
    const seriesExist = currentValue.find(s => s.id === seriesID);
    let updatedValue;
    updatedValue = seriesExist ?
      currentValue.filter(s => s.id !== seriesID) : [...currentValue, { id: seriesID }];
    this.analyzerSeriesSource.next(updatedValue);
    this.analyzerSeriesCount.next(this.analyzerSeriesSource.value.length);
  }

  getAnalyzerData(aSeries, noCache: boolean, y0Series: string, y1Series: string) {
    console.log('GET ANALYZER DATA')
    this.analyzerData.analyzerSeries = [];
    //this.analyzerData = this.resetAnalyzerData();
    const ids = aSeries.map(s => s.id).join();
    this.apiService.fetchPackageAnalyzer(ids, noCache).subscribe((results) => {
      const series = results.series;
      const analyzerDateWrapper = { firstDate: '', endDate: '' };
      analyzerDateWrapper.firstDate = this.helperService.findDateWrapperStart(series);
      analyzerDateWrapper.endDate = this.helperService.fineDateWrapperEnd(series);
      this.analyzerData.analyzerDateWrapper = analyzerDateWrapper
      this.analyzerData.displayFreqSelector = this.singleFrequencyAnalyzer(results.series);
      this.analyzerData.siblingFreqs = this.analyzerData.displayFreqSelector ? this.getSiblingFrequencies(results.series) : null;
      this.analyzerData.analyzerFrequency = this.analyzerData.displayFreqSelector ? this.getCurrentAnalyzerFrequency(results.series, this.analyzerData.siblingFreqs) : null;
      series.forEach((s) => {
        if (!this.analyzerData.analyzerSeries.find(series => series.id === s.id)) {
          const seriesData = this.formatSeriesForAnalyzer(s, aSeries);
          this.analyzerData.analyzerSeries.push(seriesData);  
        }
      });
      this.createAnalyzerTable(this.analyzerData.analyzerSeries);
      this.analyzerData.y0Series = y0Series ? y0Series.split('-').map(s => +s) : null;
      this.analyzerData.y1Series = y1Series ? y1Series.split('-').map(s => +s) : null;
      this.analyzerData.requestComplete = true;
    });
    return observableForkJoin([observableOf(this.analyzerData)]);
  }

  removeAll() {
    this.updateAnalyzerSeries([]);
    this.analyzerData = this.resetAnalyzerData();
  }

  resetAnalyzerData = () => {
    return {
      analyzerTableDates: [],
      analyzerDateWrapper: { firstDate: '', endDate: '' },
      analyzerSeries: [],
      displayFreqSelector: false,
      siblingFreqs: [],
      analyzerFrequency: {},
      y0Series: null,
      y1Series: null,
      requestComplete: false,
      indexed: false,
      baseYear: null
    };
  }

  formatSeriesForAnalyzer = (series, aSeries) => {
    const abbreviatedNameDetails = {
      title: series.title,
      geography: series.geography.shortName,
      frequency: series.frequency,
      seasonalAdjustment: series.seasonalAdjustment,
      units: series.unitsLabelShort || series.unitsLabel
    };
    const chartNameDetails = {
      title: series.title,
      geography: series.geography.shortName,
      frequency: series.frequency,
      seasonalAdjustment: series.seasonalAdjustment,
      units: series.unitsLabelShort || series.unitsLabel
    };
    const indexNameDetails = {
      title: series.title,
      geography: series.geography.shortName,
      frequency: series.frequency,
      seasonalAdjustment: series.seasonalAdjustment,
      units: 'Index'
    }
    series.displayName = this.formatDisplayName(abbreviatedNameDetails);
    series.chartDisplayName = this.formatDisplayName(chartNameDetails);
    series.indexDisplayName = this.formatDisplayName(indexNameDetails);
    series.saParam = series.seasonalAdjustment !== 'not_seasonally_adjusted';
    series.currentGeo = series.geography;
    series.currentFreq = { freq: series.frequencyShort, label: series.frequency };
    series.observations = series.seriesObservations;
    const levelDates = series.observations.transformationResults[0].dates;
    const obsStart = series.observations.observationStart;
    const obsEnd = series.observations.observationEnd;
    const dateArray = [];
    if (levelDates) {
      const pseudoZones = [];
      const level = series.observations.transformationResults[0].values;
      if (level.pseudoHistory) {
        level.pseudoHistory.forEach((obs, index) => {
          if (obs && !level.pseudoHistory[index + 1]) {
            pseudoZones.push({ value: Date.parse(level.dates[index]), dashStyle: 'dash', color: '#7CB5EC', className: 'pseudoHistory' });
          }
        });
      }
      // Use to format dates for table
      this.helperService.createDateArray(obsStart, obsEnd, series.currentFreq.freq, dateArray);
      const levelChartData = this.createSeriesChartData(series.observations.transformationResults[0], dateArray);
      series.chartData = { level: levelChartData, dates: dateArray, pseudoZones };
      series.chartType = [
        'line',
        'column',
        'area',
      ];
      series.selectedChartType = 'line';
      series.yAxis = [
        'left',
        'right'
      ];
      series.selectedYAxis = 'left';
    } else {
      series.noData = 'Data not available';
    }
    return series;
  }

  singleFrequencyAnalyzer = (series: Array<any>) => {
    const freqs = series.map((s) => { return { freq: s.frequencyShort, label: s.frequency }});
    return freqs.filter((freq, index, self) => self.findIndex((f) => (f.freq === freq.freq)) === index).length === 1;
  }

  getSiblingFrequencies = (series: Array<any>) => {
    const freqs  = series.map(s => s.freqs.map((f) => { return { freq: f.freq, label: f.label } }));
    return freqs.reduce((prev, curr) => prev.filter(f => curr.some(freq => freq.freq === f.freq)));
  }

  getCurrentAnalyzerFrequency = (series: Array<any>, freqList: Array<any>) => {
    const currentFreq = freqList.filter(f => f.freq === series[0].frequencyShort)[0];
    this.helperService.updateCurrentFrequency(currentFreq);
    return currentFreq;
  }

  checkFrequencies = (series) => {
    const freqs = series.map((s) => s.currentFreq.freq);
    return freqs.includes('D') ? 'D' : freqs.includes('W') ? 'W' : freqs.includes('M') ? 'M' : freqs.includes('Q') ? 'Q' : freqs.includes('S') ? 'S' : 'A';
  }

  createAnalyzerTable = (analyzerSeries) => {
    analyzerSeries.forEach((aSeries) => {
      const decimal = aSeries.decimals;
      const dateArray = [];
      this.helperService.createDateArray(aSeries.observations.observationStart, aSeries.observations.observationEnd, aSeries.frequencyShort, dateArray);
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
        if (!dateExists) { allDates.push(date); }
      });
    });
    allDates = allDates.sort(this.dateComparison);
    if (start && end) { allDates = allDates.filter(date => date.date >= start && date.date <= end); }
    return allDates;
  }

  createSeriesTable = (transformations, tableDates, decimal) => {
    const categoryTable = {};
    transformations.forEach((t) => {
      const { transformation, dates, values, pseudoHistory } = t;
      if (dates && values) {
        categoryTable[`${transformation}`] = tableDates.map((date) => {
          const dateExists = this.helperService.binarySearch(dates, date.date);
          return dateExists > -1 ?
            { date: date.date, tableDate: date.tableDate, value: +values[dateExists], formattedValue: '' } :
            { date: date.date, tableDate: date.tableDate, value: Infinity, formattedValue: '' };
        });
      }
    });
    return categoryTable;
  }

  createSeriesChartData = (transformation, dates) => {
    if (transformation) {
      const transformationValues = [];
      dates.forEach((sDate) => {
        const dateExists = this.helperService.binarySearch(transformation.dates, sDate.date);
        dateExists > -1 ?
          transformationValues.push([Date.parse(sDate.date), +transformation.values[dateExists]]) :
          transformationValues.push([Date.parse(sDate.date), null]);
      });
      return transformationValues;
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

  getIndexBaseYear = (series: any, start: string) => {
    const maxObsStartDate = series.reduce((prev, current) => {
      const prevObsStart = prev.observations.observationStart;
      const currentObsStart = current.observations.observationStart;
      return prevObsStart > currentObsStart ? prev : current;
    }).observations.observationStart;
    return maxObsStartDate > start ? maxObsStartDate : !start ? maxObsStartDate : start;
  }
}
