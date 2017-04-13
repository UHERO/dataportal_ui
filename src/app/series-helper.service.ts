import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UheroApiService } from './uhero-api.service';
import { HelperService } from './helper.service';
import { Frequency } from './frequency';
import { Geography } from './geography';
import { dateWrapper } from './date-wrapper';


@Injectable()
export class SeriesHelperService {
  private errorMessage: string;
  // Table header to indicate % change if series is not a rate
  private change;
  private seriesData;

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }

  getSeriesData(id: number, routeGeo?: string, routeFreq?: string): Observable<any> {
    let freqArray = [];
    let geoArray = [];
    let dateArray = [];
    let seriesDetail = null;
    this.seriesData = {seriesDetail: {}, change: '', saIsActive: null, regions: [], currentGeo: {}, frequencies: [], currentFreq: {}, chartData: [], seriesTableData: [], siblings: [], sibPairs: [], error: null, noData: ''};

    this._uheroAPIService.fetchSeriesDetail(id).subscribe((series) => {
      seriesDetail = series;
      let freqGeos = seriesDetail.freq_geos;
      let geoFreqs = seriesDetail.geo_freqs;
      let currentGeo = seriesDetail.geography;
      let currentFreq = {freq: seriesDetail.frequencyShort, label: seriesDetail.frequency};
      this.seriesData.seriesDetail = seriesDetail;
      this.seriesData.saIsActive = seriesDetail['seasonallyAdjusted'];
      this.seriesData.currentGeo = currentGeo;
      this.seriesData.regions = freqGeos.find(freq => freq.freq === currentFreq.freq).geos;
      this.seriesData.frequencies = geoFreqs.find(geo => geo.handle === currentGeo.handle).freqs;
      this.seriesData.yoyChange = seriesDetail['percent'] === true ? 'YOY Change' : 'YOY % Change';
      this.seriesData.ytdChange = seriesDetail['percent'] === true ? 'YTD Change' : 'YTD % Change';
      this.seriesData.currentFreq = currentFreq;
    },
    (error) => {
      error = this.errorMessage = error;
      this.seriesData.error = true;
    },
    () => {
      this._uheroAPIService.fetchSeriesSiblings(id).subscribe((siblings) => {
        this.seriesData.siblings = siblings;
        this.checkSaPairs(siblings);
      });
      this.getSeriesObservations(id, dateArray);
    });
    return Observable.forkJoin(Observable.of(this.seriesData));
  }

  getSeriesObservations(id: number, dateArray: Array<any>) {
    this._uheroAPIService.fetchObservations(id).subscribe((observations) => {
      // let obs = this._helper.dataTransform(observations);
      let obs = observations;
      let obsStart = obs.observationStart;
      let obsEnd = obs.observationEnd;
      if (obs) {
        // Use to format dates for table
        this._helper.calculateDateArray(obsStart, obsEnd, this.seriesData.currentFreq.freq, dateArray);
        let data = this._helper.dataTransform(obs, dateArray);
        this.seriesData.chartData = data.chartData;
        this.seriesData.seriesTableData = data.tableData; 
      } else {
        this.seriesData.noData = 'Data not available'
      }
    });
  }

  // Check if both seasonally and non-seasonally adjusted series exists for a given region & frequency combination
  // If only one is available, disable checkbox & do not display checkbox in annual/semi-annual frequencies
  checkSaPairs(seriesSiblings) {
    let checkSiblings = [];
    seriesSiblings.forEach((sibling, index) => {
      if (this.seriesData.currentGeo.handle === seriesSiblings[index].geography.handle && this.seriesData.currentFreq.freq === seriesSiblings[index].frequencyShort) {
        checkSiblings.push(seriesSiblings[index]);
      }
    });
    this.seriesData.sibPairs = checkSiblings;
  }

    // Get summary statistics for single series displays
  // Min & Max values (and their dates) for the selected date range; (%) change from selected range; level change from selected range
  summaryStats(seriesData, freq) {
    let stats = { minValue: Infinity, minValueDate: '', maxValue: Infinity, maxValueDate: '', tableStartValue: Infinity, tableEndValue: Infinity, percChange: Infinity, levelChange: Infinity };
    let formatStats = { minValue: '', minValueDate: '', maxValue: '', maxValueDate: '', percChange: '', levelChange: '', selectedStart: '', selectedEnd: '' };
    // Find first non-empty value as the table end value
    for (let i = 0; i < seriesData.length; i++) {
      if (stats.tableEndValue === Infinity && seriesData[i].value !== ' ') {
        stats.tableEndValue = seriesData[i].value;
      }
    }
    // Find last non-empty value as the table start value
    for (let i = seriesData.length - 1; i >= 0; i--) {
      if (stats.tableStartValue === Infinity && seriesData[i].value !== ' ') {
        stats.tableStartValue = seriesData[i].value;
      }
    }
    seriesData.forEach((item) => {
      if (item.value !== ' ') {
        if (stats.minValue === Infinity || item.value < stats.minValue) {
          stats.minValue = item.value;
          stats.minValueDate = item.date;
        }
        if (stats.maxValue === Infinity || item.value > stats.maxValue) {
          stats.maxValue = item.value;
          stats.maxValueDate = item.date;
        }
      }
    });
    stats.percChange = ((stats.tableEndValue - stats.tableStartValue) / stats.tableStartValue) * 100;
    stats.levelChange = stats.tableEndValue - stats.tableStartValue;

    // Format numbers
    formatStats.minValue = this._helper.formatNum(stats.minValue, 2);
    formatStats.minValueDate = this._helper.formatDate(stats.minValueDate, freq.freq);
    formatStats.maxValue = this._helper.formatNum(stats.maxValue, 2);
    formatStats.maxValueDate = this._helper.formatDate(stats.maxValueDate, freq.freq);
    formatStats.percChange = this._helper.formatNum(stats.percChange, 2);
    formatStats.levelChange = this._helper.formatNum(stats.levelChange, 2)
    formatStats.selectedStart = this._helper.formatDate(seriesData[0].date, freq.freq);
    formatStats.selectedEnd = this._helper.formatDate(seriesData[seriesData.length - 1].date, freq);
    return formatStats;
  }
}
