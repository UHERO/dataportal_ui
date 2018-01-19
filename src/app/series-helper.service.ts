import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AnalyzerService } from './analyzer.service';
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

  constructor(
    private _uheroAPIService: UheroApiService,
    private _analyzer: AnalyzerService,
    private _helper: HelperService
  ) { }

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
    const analyzerSeries = this._analyzer.analyzerSeries;
    this._uheroAPIService.fetchSeriesDetail(id).subscribe((series) => {
      this.seriesData.seriesDetail = series;
      // Check if series is in the analyzer
      const existAnalyze = analyzerSeries.find(aSeries => aSeries.id === series.id);
      this.seriesData.seriesDetail.analyze = existAnalyze ? true : false;
      this.seriesData.seriesDetail.saParam = series.seasonalAdjustment !== 'not_seasonally_adjusted';
      const freqGeos = series.freqGeos;
      const geoFreqs = series.geoFreqs;
      const geos = series.geos;
      const freqs = series.freqs;
      decimals = series.decimals ? series.decimals : 1;
      currentGeo = series.geography;
      currentFreq = { freq: series.frequencyShort, label: series.frequency, observationStart: '', observationEnd: '' };
      this.seriesData.currentGeo = currentGeo;
      this.seriesData.regions = freqGeos ? freqGeos.find(freq => freq.freq === currentFreq.freq).geos : geos ? geos : [series.geography];
      this.seriesData.frequencies = geoFreqs ?
        geoFreqs.find(geo => geo.handle === currentGeo.handle).freqs :
        freqs ?
        freqs :
        [{ freq: series.frequencyShort, label: series.frequency }];
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
        this.getSeriesObservations(this.seriesData.seriesDetail, decimals);
      });
    return Observable.forkJoin(Observable.of(this.seriesData));
  }

  getSeriesObservations(seriesDetail, decimals: number) {
    const dateArray = [];
    this._uheroAPIService.fetchObservations(seriesDetail.id).subscribe((observations) => {
      const obs = observations;
      seriesDetail.seriesObservations = obs;
      const levelData = obs.transformationResults[0].dates;
      const obsStart = obs.observationStart;
      const obsEnd = obs.observationEnd;
      if (levelData) {
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
    if (seriesSiblings) {
      seriesSiblings.forEach((sibling) => {
        if (geo === sibling.geography.handle && freq === sibling.frequencyShort) {
          saSiblings.push(sibling);
        }
      });
      return saSiblings;
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

  // Get summary statistics for single series displays
  // Min & Max values (and their dates) for the selected date range; (%) change from selected range; level change from selected range
  summaryStats(seriesData: Array<any>, freq: Frequency, decimals: number, startDate: string, endDate: string) {
    const stats = {
      minValue: Infinity,
      minValueDate: '',
      maxValue: Infinity,
      maxValueDate: '',
      tableStartValue: Infinity,
      tableEndValue: Infinity,
      percChange: Infinity,
      levelChange: Infinity,
      total: Infinity,
      avg: Infinity,
      cagr: Infinity
    };
    const formatStats = {
      minValue: '',
      minValueDate: '',
      maxValue: '',
      maxValueDate: '',
      percChange: '',
      levelChange: '',
      total: '',
      avg: '',
      cagr: '',
      missing: null
    };

    // Values of the selected starting and ending dates
    stats.tableStartValue = this.getStartValue(seriesData, startDate);
    stats.tableEndValue = this.getEndValue(seriesData, endDate);
    const firstValue = stats.tableStartValue;
    const lastValue = stats.tableEndValue;
    const selectedRangeData = this.getSelectedRange(seriesData, startDate, endDate, firstValue, lastValue);
    const missingValues = this.checkMissingValues(selectedRangeData, freq.freq, firstValue, lastValue);
    if (selectedRangeData.length && !missingValues) {
      const periods = selectedRangeData.length - 1;
      stats.minValue = this.getMinMax(seriesData).minValue;
      stats.minValueDate = this.getMinMax(seriesData).minValueDate;
      stats.maxValue = this.getMinMax(seriesData).maxValue;
      stats.maxValueDate = this.getMinMax(seriesData).maxValueDate;
      stats.total = this.getTotalValue(selectedRangeData);
      stats.avg = stats.total !== Infinity ? stats.total / selectedRangeData.length : Infinity;
      stats.cagr = this.calculateCAGR(firstValue, lastValue, freq.freq, periods);
    }

    if (firstValue !== Infinity && lastValue !== Infinity) {
      stats.percChange = ((lastValue - firstValue) / firstValue) * 100;
      stats.levelChange = lastValue - firstValue;
    }

    // Format numbers
    formatStats.minValue = stats.minValue === Infinity ? 'N/A' : this._helper.formatNum(stats.minValue, decimals);
    formatStats.minValueDate = stats.minValueDate === '' ? ' ' : '(' + stats.minValueDate + ')';
    formatStats.maxValue = stats.maxValue === Infinity ? 'N/A' : this._helper.formatNum(stats.maxValue, decimals);
    formatStats.maxValueDate = stats.maxValueDate === '' ? ' ' : '(' + stats.maxValueDate + ')';
    formatStats.percChange = stats.percChange === Infinity ? 'N/A' : this._helper.formatNum(stats.percChange, decimals);
    formatStats.levelChange = stats.levelChange === Infinity ? 'N/A' : this._helper.formatNum(stats.levelChange, decimals);
    formatStats.total = stats.total === Infinity ? 'N/A' : this._helper.formatNum(stats.total, decimals);
    formatStats.avg = stats.avg === Infinity ? 'N/A' : this._helper.formatNum(stats.avg, decimals);
    formatStats.cagr = stats.cagr === Infinity ? 'N/A' : this._helper.formatNum(stats.cagr, decimals);
    formatStats.missing = missingValues ? true : false;
    return formatStats;
  }

  checkMissingValues(selectedRange: Array<any>, freq: string, firstValue, lastValue) {
    let missing = false;
    if (firstValue === Infinity || lastValue === Infinity) {
      return missing = true;
    }
    selectedRange.forEach((obs) => {
      if (freq === 'A' && obs.tableDate.length === 4 && obs.value === Infinity) {
        missing = true;
        return;
      }
      if (freq === 'Q' && obs.tableDate.includes('Q') && obs.value === Infinity) {
        missing = true;
        return;
      }
      if (freq === 'S' && (obs.tableDate.includes('-01') || obs.tableDate.includes('-07')) && obs.value === Infinity) {
        missing = true;
        return;
      }
      if (freq === 'M' && obs.tableDate.includes('-') && obs.value === Infinity) {
        missing = true;
        return;
      }
    });
    return missing;
  }

  getTotalValue(selectedRangeData: Array<any>) {
    let total = 0;
    selectedRangeData.forEach((data) => {
      if (data.value !== Infinity) {
        total += +data.value;
      }
    });
    return total;
  }

  getStartValue(seriesData: Array<any>, startDate: string) {
    // Find observations in seriesData that match the selected minimum date (duplicate dates may show up in analyzer table data)
    const startDateObs = seriesData.filter(obs => obs.date === startDate);
    // Select observation where value is not Infinity
    const startDateData = startDateObs.find(obs => obs.value !== Infinity);
    return startDateData ? startDateData.value : Infinity;
  }

  getEndValue(seriesData: Array<any>, endDate: string) {
    // Find observations in seriesData that match the selected maximum date (duplicate dates may show up in analyzer table data)
    const endDateObs = seriesData.filter(obs => obs.date === endDate);
    // Select observation where value is not Infinity
    const endDateData = endDateObs.find(obs => obs.value !== Infinity);
    return endDateData ? endDateData.value : Infinity;
  }

  getSelectedRange(seriesData: Array<any>, startDate: string, endDate: string, startValue: number, endValue: number) {
    const minDateIndex = seriesData.findIndex(obs => obs.date === startDate && obs.value === startValue);
    const maxDateIndex = seriesData.findIndex(obs => obs.date === endDate && obs.value === endValue);
    // minDateIndex > maxDateIndex in single series component (table is in reverse order)
    return minDateIndex > maxDateIndex ?
      seriesData.slice(maxDateIndex, minDateIndex + 1) :
      seriesData.slice(minDateIndex, maxDateIndex + 1);
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
  }

  getMinMax(seriesData: Array<any>) {
    let minValue = Infinity, minValueDate = '', maxValue = Infinity, maxValueDate = '';
    seriesData.forEach((item, index) => {
      if (minValue === Infinity || item.value < minValue) {
        minValue = item.value;
        minValueDate = item.tableDate;
      }
      if (maxValue === Infinity || item.value > maxValue && item.value !== Infinity) {
        maxValue = item.value;
        maxValueDate = item.tableDate;
      }
    });
    return { minValue: minValue, minValueDate: minValueDate, maxValue: maxValue, maxValueDate: maxValueDate };
  }
}
