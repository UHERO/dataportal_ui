import { of as observableOf, forkJoin as observableForkJoin,  Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { AnalyzerService } from './analyzer.service';
import { ApiService } from './api.service';
import { HelperService } from './helper.service';
import { Frequency } from './tools.models';
import { Geography } from './tools.models';

@Injectable({
  providedIn: 'root'
})
export class SeriesHelperService {
  private errorMessage: string;
  // Table header to indicate % change if series is not a rate
  private change;
  private seriesData;

  constructor(
    private _uheroAPIService: ApiService,
    private _analyzer: AnalyzerService,
    private _helper: HelperService
  ) { }

  getSeriesData(id: number, noCache: boolean, catId?: number): Observable<any> {
    let currentFreq, currentGeo, decimals;
    this.seriesData = {
      seriesDetail: {},
      saPairAvail: null,
      regions: [],
      currentGeo: <Geography>{},
      frequencies: [],
      currentFreq: <Frequency>{},
      chartData: [],
      seriesTableData: [],
      siblings: [],
      error: null,
      noData: '',
      requestComplete: false
    };
    const dateArray = [];
    const analyzerSeries = this._analyzer.analyzerSeries;
    this._uheroAPIService.fetchPackageSeries(id, noCache, catId).subscribe((data) => {
      this.seriesData.seriesDetail = data.series;
      // Check if series is in the analyzer
      const existAnalyze = analyzerSeries.find(aSeries => aSeries.id === data.series.id);
      this.seriesData.seriesDetail.analyze = existAnalyze ? true : false;
      this.seriesData.seriesDetail.saParam = data.series.seasonalAdjustment !== 'not_seasonally_adjusted';
      const geos = data.series.geos;
      const freqs = data.series.freqs;
      decimals = data.series.decimals ? data.series.decimals : 1;
      currentGeo = data.series.geography;
      currentFreq = { freq: data.series.frequencyShort, label: data.series.frequency, observationStart: '', observationEnd: '' };
      this.seriesData.currentGeo = currentGeo;
      this.seriesData.regions = geos ? geos : [data.series.geography];
      this.seriesData.frequencies = freqs ? freqs : [{ freq: data.series.frequencyShort, label: data.series.frequency }];
      this.seriesData.yoyChange = data.series.percent ? 'Year/Year Change' : 'Year/Year % Change';
      this.seriesData.ytdChange = data.series.percent ? 'Year-to-Date Change' : 'Year-to-Date % Change';
      this.seriesData.currentFreq = currentFreq;
      this.seriesData.siblings = data.siblings;
      const geoFreqPair = this.findGeoFreqSibling(data.siblings, currentGeo.handle, currentFreq.freq);
      // If a series has a seasonal and a non-seasonal sibling, display SA toggle in single series view
      this.seriesData.saPairAvail = this.checkSaPairs(geoFreqPair);
      const obs = data.observations;
      this.seriesData.seriesDetail.seriesObservations = obs;
      const levelData = obs.transformationResults[0].dates;
      const obsStart = obs.observationStart;
      const obsEnd = obs.observationEnd;
      if (levelData && levelData.length) {
        // Use to format dates for table
        this._helper.createDateArray(obsStart, obsEnd, this.seriesData.currentFreq.freq, dateArray);
        const formattedData = this.dataTransform(obs, dateArray, decimals);
        this.seriesData.chartData = formattedData.chartData;
        this.seriesData.seriesTableData = formattedData.tableData;
        this.seriesData.requestComplete = true;
      } else {
        this.seriesData.noData = 'Data not available';
        this.seriesData.requestComplete = true;
      }
    },
      (error) => {
        error = this.errorMessage = error;
        this.seriesData.eror = true;
        this.seriesData.requestComplete = true;
      });
    return observableForkJoin(observableOf(this.seriesData));
  }

  dataTransform(seriesObs, dates, decimals) {
    const observations = seriesObs;
    const start = observations.observationStart;
    const end = observations.observationEnd;
    const transformations = this._helper.getTransformations(observations);
    const level = transformations.level;
    const pseudoZones = [];
    if (level.pseudoHistory) {
      level.pseudoHistory.forEach((obs, index) => {
        if (obs && !level.pseudoHistory[index + 1]) {
          pseudoZones.push({ value: Date.parse(level.dates[index]), dashStyle: 'dash', color: '#7CB5EC', className: 'pseudoHistory' });
        }
      });
    }
    const seriesTable = this._helper.createSeriesTable(dates, transformations, decimals);
    const chart = this._helper.createSeriesChart(dates, transformations);
    const chartData = { level: chart.level, pseudoZones: pseudoZones, yoy: chart.yoy, ytd: chart.ytd, c5ma: chart.c5ma, dates: dates };
    const results = { chartData: chartData, tableData: seriesTable, start: start, end: end };
    return results;
  }


  // Find series siblings for a particular geo-frequency combination
  findGeoFreqSibling(seriesSiblings, geo, freq) {
    if (seriesSiblings) {
      return seriesSiblings.filter(sib => sib.geography.handle === geo && sib.frequencyShort === freq);
    }
  }

  checkSaPairs(seriesSiblings) {
    if (seriesSiblings) {
      const saSeries = seriesSiblings.find(series => series.seasonalAdjustment === 'seasonally_adjusted');
      const nsaSeries = seriesSiblings.find(series => series.seasonalAdjustment === 'not_seasonally_adjusted');
      if (saSeries && nsaSeries) {
        return true;
      }
      return false;
    }
    return false;
  }

  calculateAnalyzerSummaryStats = (series: Array<any>, startDate: string, endDate: string) => {
    series.forEach((s) => {
      s.seriesStartDate = s.observations.observationStart > startDate ? s.observations.observationStart : startDate;
      s.seriesEndDate = s.observations.observationEnd > endDate ? s.observations.observationEnd : endDate;
    });
    const tableRows = [];
    series.forEach((s) => {
      const stats = this.calculateSeriesSummaryStats(s.seriesDetail, s.chartData, startDate, endDate);
      stats.series = s.displayName;
      stats.interactionSettings.showInChart = s.showInChart
      tableRows.push(stats);
    });
    return tableRows;
  }

  calculateSeriesSummaryStats = (seriesDetail, chartData, startDate: string, endDate: string) => {
    const freq = seriesDetail.frequencyShort;
    const formattedStats = {
      series: '',
      seriesInfo: seriesDetail,
      minValue: 'N/A',
      maxValue: 'N/A',
      percChange: 'N/A',
      levelChange: 'N/A',
      total: 'N/A',
      avg: 'N/A',
      cagr: 'N/A',
      missing: null,
      range: null,
      showInChart: null,
      interactionSettings: {
        showInChart: null,
        color: null,
        seriesInfo: seriesDetail
      }
    };
    formattedStats.range = this._helper.formatDate(startDate, freq) + ' - ' + this._helper.formatDate(endDate, freq);
    const decimals = seriesDetail.decimals;
    //const transformations = this._helper.getTransformations(seriesDetail.seriesObservations);
    const { dates, level } = chartData;
    const datesInRange = dates.filter(date => date.date >= startDate && date.date <= endDate);
    const valuesInRange = level.filter(l => new Date(l[0]).toISOString().split('T')[0] >= startDate && new Date(l[0]).toISOString().split('T')[0] <= endDate).map(value => value[1]);
    if (valuesInRange.includes(null) || !datesInRange.length || !valuesInRange.length) {
      formattedStats.missing = true;
      return formattedStats;
    }
    const minValue = Math.min(...valuesInRange);
    const minValueIndex = valuesInRange.indexOf(minValue);
    formattedStats.minValue = this._helper.formatNum(Math.min(...valuesInRange), decimals) + ' (' + this._helper.formatDate(datesInRange[minValueIndex].date, freq) + ')';
    const maxValue = Math.max(...valuesInRange);
    const maxValueIndex = valuesInRange.indexOf(maxValue);
    formattedStats.maxValue = this._helper.formatNum(Math.max(...valuesInRange), decimals) + ' (' + this._helper.formatDate(datesInRange[maxValueIndex].date, freq) + ')';
    formattedStats.percChange = seriesDetail.percent ? null : this._helper.formatNum(((valuesInRange[valuesInRange.length - 1] - valuesInRange[0]) / valuesInRange[0]) * 100, decimals);
    formattedStats.levelChange = this._helper.formatNum(valuesInRange[valuesInRange.length - 1] - valuesInRange[0], decimals);
    const sum = valuesInRange.reduce((a, b) => a + b, 0)
    formattedStats.total = this._helper.formatNum(sum, decimals);
    formattedStats.avg = this._helper.formatNum(sum / valuesInRange.length, decimals);
    const periods = valuesInRange.length - 1;
    const cagr = this.calculateCAGR(valuesInRange[0], valuesInRange[valuesInRange.length - 1], freq, periods);
    formattedStats.cagr = this._helper.formatNum(cagr, decimals);
    return formattedStats
  }

  calculateCAGR(firstValue: number, lastValue: number, freq: string, periods: number) {
    // Calculate compound annual growth rate
    if (freq === 'A') {
      return (Math.pow((lastValue / firstValue), 1 / periods) - 1) * 100;
    }
    if (freq === 'S') {
      return (Math.pow((lastValue / firstValue), 2 / periods) - 1) * 100;
    }
    if (freq === 'Q') {
      return (Math.pow((lastValue / firstValue), 4 / periods) - 1) * 100;
    }
    if (freq === 'M') {
      return (Math.pow((lastValue / firstValue), 12 / periods) - 1) * 100;
    }
    if (freq === 'W') {
      return (Math.pow((lastValue / firstValue), 52 / periods) - 1) * 100;
    }
  }
}