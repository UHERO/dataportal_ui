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
      this.seriesData.change = seriesDetail['percent'] === true ? 'YOY Change' : 'YOY % Change';
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
      let obs = this._helper.dataTransform(observations);
      if (obs) {
        // Use to format dates for table
        this._helper.calculateDateArray(obs.start, obs.end, this.seriesData.currentFreq.freq, dateArray);
        let chartData = obs.chartData;
        let tableData = obs.tableData;

        // Create table with formatted dates and slice table to starting & ending observation dates
        let seriesTableData = this._helper.seriesTable(tableData, dateArray);
        let beginTable, endTable;
        for (let i = 0; i < seriesTableData.length; i++) {
          if (seriesTableData[i].date === obs.start) {
            beginTable = i;
          }
          if (seriesTableData[i].date === obs.end) {
            endTable = i;
          }
        }
        this.seriesData.chartData = chartData;
        this.seriesData.seriesTableData = seriesTableData;
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
}
