import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UheroApiService } from './uhero-api.service';
import { HelperService } from './helper.service';
import { Frequency } from './frequency';
import { Geography } from './geography';


@Injectable()
export class SeriesHelperService {
  private errorMessage: string;
  // Table header to indicate % change if series is not a rate
  private change;
  private seriesData;

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }

  getSeriesData(id: number): Observable<any> {
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
      noData: ''
    };
    this._uheroAPIService.fetchSeriesDetail(id).subscribe((series) => {
      this.seriesData.seriesDetail = series;
      const freqGeos = series.freqGeos;
      const geoFreqs = series.geoFreqs;
      decimals = series.decimals ? series.decimals : 1;
      currentGeo = series.geography;
      currentFreq = {freq: series.frequencyShort, label: series.frequency};
      this.seriesData.currentGeo = currentGeo;
      this.seriesData.regions = freqGeos.find(freq => freq.freq === currentFreq.freq).geos;
      this.seriesData.frequencies = geoFreqs.find(geo => geo.handle === currentGeo.handle).freqs;
      this.seriesData.yoyChange = series['percent'] === true ? 'Year/Year Change' : 'Year/Year % Change';
      this.seriesData.ytdChange = series['percent'] === true ? 'Year-to-Date Change' : 'Year-to-Date % Change';
      this.seriesData.currentFreq = currentFreq;
    },
    (error) => {
      error = this.errorMessage = error;
      this.seriesData.error = true;
    },
    () => {
      this._uheroAPIService.fetchSeriesSiblings(id).subscribe((siblings) => {
        this.seriesData.siblings = siblings;
        const geoFreqPair = this.findGeoFreqSibling(siblings, currentGeo.handle, currentFreq.freq);
        // If a series has a seasonal and a non-seasonal sibling, display SA toggle in single series view
        this.seriesData.saPairAvail = this.checkSaPairs(geoFreqPair);
      });
      this.getSeriesObservations(id, decimals);
    });
    return Observable.forkJoin(Observable.of(this.seriesData));
  }

  getSeriesObservations(id: number, decimals: number) {
    const dateArray = [];
    this._uheroAPIService.fetchObservations(id).subscribe((observations) => {
      const obs = observations;
      const obsStart = obs.observationStart;
      const obsEnd = obs.observationEnd;
      if (obs) {
        // Use to format dates for table
        this._helper.createDateArray(obsStart, obsEnd, this.seriesData.currentFreq.freq, dateArray);
        const data = this._helper.dataTransform(obs, dateArray, decimals);
        this.seriesData.chartData = data.chartData;
        this.seriesData.seriesTableData = data.tableData;
      } else {
        this.seriesData.noData = 'Data not available';
      }
    });
  }

  // Find series siblings for a particular geo-frequency combination
  findGeoFreqSibling(seriesSiblings, geo, freq) {
    const saSiblings = [];
    seriesSiblings.forEach((sibling) => {
      if (geo === sibling.geography.handle && freq === sibling.frequencyShort) {
        saSiblings.push(sibling);
      }
    });
    return saSiblings;
  }

  checkSaPairs(seriesSiblings) {
    const saSeries = seriesSiblings.find(series => series.seasonallyAdjusted === true);
    const nsaSeries = seriesSiblings.find(series => series.seasonallyAdjusted === false);
    if (saSeries && nsaSeries) {
      return true;
    }
    return false;
  }

  // Get summary statistics for single series displays
  // Min & Max values (and their dates) for the selected date range; (%) change from selected range; level change from selected range
  summaryStats(seriesData, freq, decimals) {
    const stats = {
      minValue: Infinity,
      minValueDate: '',
      maxValue: Infinity,
      maxValueDate: '',
      tableStartValue: Infinity,
      tableEndValue: Infinity,
      percChange: Infinity,
      levelChange: Infinity
    };
    const formatStats = {
      minValue: '',
      minValueDate: '',
      maxValue: '',
      maxValueDate: '',
      percChange: '',
      levelChange: '',
    };

    // Find first non-empty value as the table end value
    stats.tableEndValue = this.getTableEnd(seriesData);
    // Find last non-empty value as the table start value
    stats.tableStartValue = this.getTableStart(seriesData);

    stats.minValue = this.getMinMax(seriesData).minValue;
    stats.minValueDate = this.getMinMax(seriesData).minValueDate;
    stats.maxValue = this.getMinMax(seriesData).maxValue;
    stats.maxValueDate = this.getMinMax(seriesData).maxValueDate;
    stats.percChange = ((stats.tableEndValue - stats.tableStartValue) / stats.tableStartValue) * 100;
    stats.levelChange = stats.tableEndValue - stats.tableStartValue;

    // Format numbers
    formatStats.minValue = this._helper.formatNum(stats.minValue, decimals);
    formatStats.minValueDate = this._helper.formatDate(stats.minValueDate, freq.freq);
    formatStats.maxValue = this._helper.formatNum(stats.maxValue, decimals);
    formatStats.maxValueDate = this._helper.formatDate(stats.maxValueDate, freq.freq);
    formatStats.percChange = this._helper.formatNum(stats.percChange, decimals);
    formatStats.levelChange = this._helper.formatNum(stats.levelChange, decimals);
    return formatStats;
  }

  getTableEnd(seriesData) {
    let counter;
    if (seriesData.length) {
      counter = 0;
      while (seriesData[counter].value === ' ') {
        counter++;
      }
      return seriesData[counter].value;
    }
  }

  getTableStart(seriesData) {
    let counter;
    if (seriesData.length) {
      counter = seriesData.length - 1;
      while (seriesData[counter].value === ' ') {
        counter--;
      }
      return seriesData[counter].value;
    }
  }

  getMinMax(seriesData) {
    let minValue = Infinity, minValueDate = '', maxValue = Infinity, maxValueDate = '';
    seriesData.forEach((item, index) => {
      if (minValue === Infinity || item.value < minValue) {
        minValue = item.value;
        minValueDate = item.date;
      }
      if (maxValue === Infinity || item.value > maxValue) {
        maxValue = item.value;
        maxValueDate = item.date;
      }
    });
    return { minValue: minValue, minValueDate: minValueDate, maxValue: maxValue, maxValueDate: maxValueDate };
  }
}
