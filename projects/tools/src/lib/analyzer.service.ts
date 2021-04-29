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
    sliderDates: [],
    analyzerDateWrapper: { firstDate: '', endDate: '' },
    analyzerSeries: [],
    displayFreqSelector: false,
    siblingFreqs: [],
    analyzerFrequency: {},
    y0Series: null,
    yRightSeries: null,
    minDate: null,
    maxDate: null,
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

  checkAnalyzer = (seriesInfo) => {
    const analyzeSeries = this.analyzerSeriesSource.value.find(series => series.id === seriesInfo.id);
    return analyzeSeries ? true : false;
  }

  updateAnalyzerSeries(data) {
    this.analyzerSeriesSource.next(data);
    this.analyzerSeriesCount.next(this.analyzerSeriesSource.value.length);
  }

  addToComparisonChart(series) {
    const currentCompare = this.analyzerSeriesCompareSource.value;
    this.analyzerData.analyzerSeries.find(s => s.id === series.id).compare = true;
    this.analyzerData.baseYear = this.getIndexBaseYear([...currentCompare, { seriesInfo: series }], this.analyzerData.minDate);
    const indexed = this.analyzerData.indexed;
    const baseYear = this.analyzerData.baseYear;
    if (currentCompare.length && indexed) {
      this.updateCompareSeriesDataAndAxes(currentCompare);
    }
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
      seriesInfo: series,
      events: {
        legendItemClick() {
          return false;
        }
      },
      observations: series.observations,
      unitsLabelShort: series.unitsLabelShort,
      seasonallyAdjusted: series.seasonalAdjustment === 'seasonally_adjusted',
      dataGrouping: {
        enabled: false
      },
      pseudoZones: series.chartData.pseudoZones,
      visible: true
    });
    console.log('currentCompare', currentCompare)
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
    this.updateCompareSeriesDataAndAxes(currentCompare);
    const series = currentCompare.find(s => s.className === seriesInfo.id);
    const aSeriesMatch = this.analyzerData.yRightSeries.find(id => id === seriesInfo.id);
    const indexed = this.analyzerData.indexed;
    const baseYear = this.analyzerData.baseYear;
    if (axis === 'right' && !aSeriesMatch) {
      this.analyzerData.yRightSeries.push(seriesInfo.id);
    }
    if (axis === 'left' && aSeriesMatch) {
      const matchIndex = this.analyzerData.yRightSeries.findIndex(id => id === seriesInfo.ide);
      this.analyzerData.yRightSeries.splice(matchIndex, 1);
    }
    series.yAxisSide = axis;
    series.yAxis = indexed ? `Index (${baseYear})-${axis}` : `${series.unitsLabelShort}-${axis}`;
    series.yAxisText = indexed ? `Index (${baseYear})` : `${series.seriesInfo.unitsLabelShort}`;
    this.analyzerSeriesCompareSource.next(currentCompare);
  }

  updateCompareChartType(seriesInfo, chartType: string) {
    const currentCompare = this.analyzerSeriesCompareSource.value;
    currentCompare.find(s => s.className === seriesInfo.id).type = chartType;
    this.analyzerSeriesCompareSource.next(currentCompare);
  }

  removeFromComparisonChart(id: number) {
    const currentCompare = this.analyzerSeriesCompareSource.value;
    this.analyzerData.analyzerSeries.find(s => s.id === id).compare = false;
    const newCompare = currentCompare.filter(s => s.className !== id);
    this.analyzerData.baseYear = this.getIndexBaseYear(newCompare, this.analyzerData.minDate);
    const indexed = this.analyzerData.indexed;
    if (newCompare.length && indexed) {
      this.updateCompareSeriesDataAndAxes(newCompare);
    }
    this.analyzerSeriesCompareSource.next(newCompare);
  }

  toggleIndexValues(index: boolean, minYear: string) {
    this.analyzerData.indexed = index;
    const currentCompareSeries = this.analyzerSeriesCompareSource.value;
    const baseYear = this.getIndexBaseYear(currentCompareSeries, minYear);
    this.analyzerData.baseYear = baseYear;
    if (currentCompareSeries) {
      this.updateCompareSeriesDataAndAxes(currentCompareSeries);
      this.analyzerSeriesCompareSource.next(currentCompareSeries);
    }
  }

  updateCompareSeriesDataAndAxes(series: Array<any>) {
    const indexed = this.analyzerData.indexed;
    const baseYear = this.analyzerData.baseYear;
    series.forEach((s) => {
      s.data = indexed ? this.getChartIndexedValues(s.levelData, baseYear) : s.levelData;
      s.yAxis = indexed ? `Index (${baseYear})-${s.seriesInfo.selectedYAxis}` : `${s.unitsLabelShort}-${s.seriesInfo.selectedYAxis}`;
      s.yAxisText = indexed ? `Index (${baseYear})` : `${s.unitsLabelShort}`;
    });
  }

  addToAnalzyer(seriesID: number) {
    let currentValue = this.analyzerSeriesSource.value;
    currentValue = [...currentValue, { id: seriesID }];
    this.analyzerSeriesSource.next(currentValue);
    this.analyzerSeriesCount.next(this.analyzerSeriesSource.value.length);
  }

  removeFromAnalyzer(seriesID: number) {
    let currentValue = this.analyzerSeriesSource.value;
    this.analyzerSeriesSource.next(currentValue.filter(s => s.id !== seriesID));
    this.analyzerSeriesCount.next(this.analyzerSeriesSource.value.length);
  }

  getAnalyzerData(aSeries, noCache: boolean, rightY) {
    console.log('GET DATA aSeries', aSeries)
    this.analyzerData.analyzerSeries = [];
    //this.analyzerData.requestComplete = false;

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
      series.forEach((s) => {
        if (!this.analyzerData.analyzerSeries.find(series => series.id === s.id)) {
          const seriesData = this.formatSeriesForAnalyzer(s);
          seriesData.compare = this.analyzerSeriesCompareSource.value.find(series => series.className === s.id) ? true : aSeries.find(series => series.id === s.id) ? aSeries.find(series => series.id === s.id).compare : false;
          this.analyzerData.analyzerSeries.push(seriesData);  
          if (seriesData.compare) {
            this.addToComparisonChart(seriesData)
          }
        }
      });
      this.analyzerData.analyzerFrequency = this.analyzerData.displayFreqSelector ? this.getCurrentAnalyzerFrequency(results.series, this.analyzerData.siblingFreqs) : this.getHighestFrequency(this.analyzerData.analyzerSeries);
      //this.analyzerData.y0Series = null;
      this.analyzerData.yRightSeries = rightY ? rightY.split('-').map(s => +s) : [];
      // On load analyzer should add 1 (or 2 if available) series to comparison chart
      this.setDefaultCompareSeries();
      this.analyzerData.baseYear = this.getIndexBaseYear(this.analyzerSeriesCompareSource.value, null);
      this.createAnalyzerTable(this.analyzerData.analyzerSeries);
      this.assignYAxisSide(this.analyzerData.yRightSeries)
      this.analyzerData.requestComplete = true;
      console.log(this.analyzerData)
    });
    return observableForkJoin([observableOf(this.analyzerData)]);
  }

  setDefaultCompareSeries() {
    let currentCompare = this.analyzerSeriesCompareSource.value;
    let i = 0;
    while ((currentCompare.length < 2 && this.analyzerData.analyzerSeries.length > 1) || !currentCompare.length) {
      const aSeries = this.analyzerData.analyzerSeries[i];
      const compareSeries  = currentCompare.find(s => s.className === aSeries.id);
      if (!compareSeries) {
        aSeries.compare = true;
        this.addToComparisonChart(aSeries);
      }
      i++;
      currentCompare = this.analyzerSeriesCompareSource.value;
    }
  }

  removeAll() {
    this.updateAnalyzerSeries([]);
    this.analyzerData = this.resetAnalyzerData();
  }

  resetAnalyzerData = () => {
    return {
      analyzerTableDates: [],
      sliderDates: [],
      analyzerDateWrapper: { firstDate: '', endDate: '' },
      analyzerSeries: [],
      displayFreqSelector: false,
      siblingFreqs: [],
      analyzerFrequency: {},
      y0Series: null,
      yRightSeries: null,
      requestComplete: false,
      indexed: false,
      baseYear: null,
      minDate: null,
      maxDate: null
    };
  }

  formatSeriesForAnalyzer = (series) => {
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

  assignYAxisSide(rightY: Array<number>) {
    this.analyzerData.analyzerSeries.forEach((s) => {
      if (rightY && rightY.includes(s.id)) {
        s.selectedYAxis = 'right';
      }
    });
    const currentCompare = this.analyzerSeriesCompareSource.value;
    currentCompare.forEach((compare) => {
      const match = this.analyzerData.analyzerSeries.find(s => s.id === compare.className);
      compare.yAxis = `${match.unitsLabelShort}-${match.selectedYAxis}`;
      compare.yAxisSide = match.selectedYAxis;
    });
    this.analyzerSeriesCompareSource.next(currentCompare);
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

  getHighestFrequency = (series) => {
    const freqs = series.map((s) => s.currentFreq);
    const ordering = {};
    const freqOrder = ['D', 'W', 'M', 'Q', 'S', 'A'];
    for (let i = 0; i < freqOrder.length; i++) {
      ordering[freqOrder[i]] = i;
    }
    const sorted = freqs.sort((a, b) => {
      return (ordering[a.freq] - ordering[b.freq]);
    });
    return sorted[0];
  }

  createAnalyzerTable(analyzerSeries) {
    analyzerSeries.forEach((aSeries) => {
      const decimal = aSeries.decimals;
      const dateArray = [];
      this.helperService.createDateArray(aSeries.observations.observationStart, aSeries.observations.observationEnd, aSeries.frequencyShort, dateArray);
      aSeries.seriesTableData = this.createSeriesTable(aSeries.observations.transformationResults, dateArray, decimal);
    });
    this.analyzerData.analyzerTableDates = this.createAnalyzerTableDates(analyzerSeries);
    this.analyzerData.sliderDates = this.createSliderDates(this.analyzerData.analyzerTableDates);
  }

  createSliderDates = (allDates: Array<any>) => allDates.filter((e, i) => allDates.findIndex(a => a.date === e.date) === i);

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
      const prevObsStart = prev.seriesInfo.observations.observationStart;
      const currentObsStart = current.seriesInfo.observations.observationStart;
      return prevObsStart > currentObsStart ? prev : current;
    }).seriesInfo.observations.observationStart;
    this.analyzerData.baseYear = (maxObsStartDate > start || !start) ? maxObsStartDate : start;
    return this.analyzerData.baseYear;
  }
}
