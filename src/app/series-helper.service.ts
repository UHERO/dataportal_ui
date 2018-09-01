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
    const dateArray = [];
    const analyzerSeries = this._analyzer.analyzerSeries;
    this._uheroAPIService.fetchPackageSeries(id).subscribe((data) => {
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
      this.seriesData.yoyChange = data.series.percent === true ? 'Year/Year Change' : 'Year/Year % Change';
      this.seriesData.ytdChange = data.series.percent === true ? 'Year-to-Date Change' : 'Year-to-Date % Change';
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
      } else {
        this.seriesData.noData = 'Data not available';
      }
    },
      (error) => {
        error = this.errorMessage = error;
        this.seriesData.eror = true;
      });
      console.log('seriesData', this.seriesData)
    return Observable.forkJoin(Observable.of(this.seriesData));
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

  newSummaryStats(series, startDate: string, endDate: string) {
    let seriesStartDate = startDate;
    let seriesEndDate = endDate;
    series.forEach((s) => {
      if (s.observations.observationStart > seriesStartDate) {
        seriesStartDate = s.observations.observationStart;
      }
      if (s.observations.observationEnd < seriesEndDate) {
        seriesEndDate = s.observations.observationEnd;
      }
    });
    const tableRows = [];
    series.forEach((s) => {
      const formattedStats = {
        series: s.displayName,
        minValue: '',
        maxValue: '',
        percChange: '',
        levelChange: '',
        total: '',
        avg: '',
        cagr: '',
        missing: null
      };
      const decimals = s.seriesDetail.decimals;
      const transformations = this._helper.getTransformations(s.observations);
      const level = transformations.level;
      const { dates, pseudoHistory, transformation, values } = level;
      const start = dates.find(d => d >= seriesStartDate && d <= seriesEndDate);
      const end = dates.slice().reverse().find(d => d >= seriesStartDate && d <= seriesEndDate);
      const startIndex = dates.indexOf(start);
      const endIndex = dates.indexOf(end);
      const datesInRange = dates.slice(startIndex, endIndex + 1);
      const valuesInRange = values.slice(startIndex, endIndex + 1).map(Number);
      const minValue = Math.min(...valuesInRange);
      const minValueIndex = valuesInRange.indexOf(minValue);
      formattedStats.minValue = this._helper.formatNum(Math.min(...valuesInRange), decimals) + ' (' +  datesInRange[minValueIndex] + ')';
      const maxValue = Math.max(...valuesInRange);
      const maxValueIndex = valuesInRange.indexOf(maxValue);
      formattedStats.maxValue = this._helper.formatNum(Math.max(...valuesInRange), decimals) + ' (' +  datesInRange[maxValueIndex] + ')';
      formattedStats.percChange = this._helper.formatNum(((valuesInRange[valuesInRange.length - 1] - valuesInRange[0]) / valuesInRange[0]) * 100, decimals);
      formattedStats.levelChange = this._helper.formatNum(valuesInRange[valuesInRange.length - 1] - valuesInRange[0], decimals);
      const sum = valuesInRange.reduce((a, b) => a + b, 0)
      formattedStats.total = this._helper.formatNum(sum, decimals);
      formattedStats.avg = this._helper.formatNum(sum / valuesInRange.length, decimals);
      const periods = valuesInRange.length - 1;
      const cagr = this.calculateCAGR(valuesInRange[0], valuesInRange[valuesInRange.length - 1], s.currentFreq.freq, periods);
      formattedStats.cagr = this._helper.formatNum(cagr, decimals);
      tableRows.push(formattedStats);
    });
    return tableRows;
    /* const formattedStats = {
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

    const firstValue = this.getStartValue(seriesData, startDate);
    const lastValue = this.getEndValue(seriesData, endDate);
    if (this.checkMissingValues(seriesData, freq.freq, firstValue, lastValue)) {
      formattedStats.minValue = 'N/A';
      formattedStats.minValueDate = ' ';
      formattedStats.maxValue = 'N/A';
      formattedStats.maxValueDate = ' ';
      formattedStats.percChange = 'N/A';
      formattedStats.levelChange = 'N/A';
      formattedStats.total = 'N/A';
      formattedStats.avg = 'N/A';
      formattedStats.cagr = 'N/A';
      formattedStats.missing = true;
      return formattedStats; 
    }
    const minAndMax = this.getMinMax(seriesData);
    const total = this.getTotalValue(seriesData);
    const cagr = this.calculateCAGR(firstValue, lastValue, freq.freq, seriesData.length - 1);
    formattedStats.minValue = this._helper.formatNum(minAndMax.minValue, decimals);
    formattedStats.minValueDate = `(${minAndMax.minValueDate})`;
    formattedStats.maxValue = this._helper.formatNum(minAndMax.maxValue, decimals);
    formattedStats.maxValueDate = `(${minAndMax.maxValueDate})`;
    formattedStats.percChange = this._helper.formatNum(((lastValue - firstValue) / firstValue) * 100, decimals);
    formattedStats.levelChange = this._helper.formatNum(lastValue - firstValue, decimals);
    formattedStats.total = this._helper.formatNum(total, decimals);
    formattedStats.avg = this._helper.formatNum(total / seriesData.length, decimals);
    formattedStats.cagr = this._helper.formatNum(cagr, decimals);
    return formattedStats; */
  }

  newCheckMissingValues = (seriesData) => {
    const missing = seriesData.find(d => d.value === Infinity);
    return missing ? true : false;
  }


  // Get summary statistics for single series displays
  // Min & Max values (and their dates) for the selected date range; (%) change from selected range; level change from selected range
  summaryStats(seriesData, freq: Frequency, decimals: number, startDate: string, endDate: string) {
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

    if (seriesData.lvlCategoryTable.length) {
      // Values of the selected starting and ending dates
      stats.tableStartValue = this.getStartValue(seriesData.lvlCategoryTable, startDate);
      stats.tableEndValue = this.getEndValue(seriesData.lvlCategoryTable, endDate);
      const firstValue = stats.tableStartValue;
      const lastValue = stats.tableEndValue;
      const selectedRangeData = this.getSelectedRange(seriesData.lvlCategoryTable, startDate, endDate, firstValue, lastValue);
      const missingValues = this.checkMissingValues(selectedRangeData, freq.freq, firstValue, lastValue);
      if (selectedRangeData.length && !missingValues) {
        const periods = selectedRangeData.length - 1;
        stats.minValue = this.getMinMax(selectedRangeData).minValue;
        stats.minValueDate = this.getMinMax(selectedRangeData).minValueDate;
        stats.maxValue = this.getMinMax(selectedRangeData).maxValue;
        stats.maxValueDate = this.getMinMax(selectedRangeData).maxValueDate;
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
      formatStats.missing = Boolean(missingValues);
      return formatStats;
    }
  }

  checkMissingValues(selectedRange: Array<any>, freq: string, firstValue, lastValue) {
    let missing = false;
    if (firstValue === Infinity || lastValue === Infinity) {
      return missing = true;
    }
    console.log(freq)
    if (freq === 'A') {
      console.log('A', selectedRange)
      missing = selectedRange.find(obs => obs.tableDate.length === 4 && obs.value === Infinity) ? true : false;
    }
    if (freq === 'Q') {
      missing = selectedRange.find(obs => obs.tableDate.includes('Q') && obs.values === Infinity) ? true : false;
    }
    if (freq === 'S') {
      missing = selectedRange.find(obs => (obs.tableDate.includes('-01') || obs.tableDate.includes('-07')) && obs.value === Infinity) ? true : false;
    }
    if (freq === 'M') {
      missing = selectedRange.find(obs => obs.tableDate.includes('-') && obs.value === Infinity) ? true : false;
    }
    return missing;
  }

  getTotalValue(selectedRangeData: Array<any>) {
    const sum = selectedRangeData.reduce((total, data) => {
      return data.value === Infinity ? total : total + +data.value;
    }, 0);
    return sum;
  }

  getStartValue(seriesData, startDate: string) {
    // Find observations in seriesData that match the selected minimum date (duplicate dates may show up in analyzer table data)
    const startDateObs = seriesData.filter(obs => obs.date === startDate);
    // Select observation where value is not Infinity
    const startDateData = startDateObs.find(obs => obs.value !== Infinity);
    return startDateData ? startDateData.value : Infinity;
  }

  getEndValue(seriesData, endDate: string) {
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

  getMinMax(seriesData) {
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
