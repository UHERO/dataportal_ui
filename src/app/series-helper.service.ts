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

  drawChart(id: number, routeGeo?: string, routeFreq?: string): Observable<any> {
    let freqArray = [];
    let geoArray = [];
    let dateArray = [];
    let seriesDetail = null;
    this.seriesData = {seriesDetail: {}, change: '', saIsActive: null, regions: [], currentGeo: {}, frequencies: [], currentFreq: {}, chartData: [], seriesTableData: [], siblings: [], sibPairs: [], error: null};

    this._uheroAPIService.fetchSiblingFreqs(id).subscribe((frequencies) => {
      let freqs = frequencies;
      this.seriesData.frequencies = freqs;
    });

    this._uheroAPIService.fetchSiblingGeos(id).subscribe((geos) => {
      let regions = geos;
      this.seriesData.regions = regions;
    });

    this._uheroAPIService.fetchSeriesDetail(id).subscribe((series) => {
      seriesDetail = series;
      this.seriesData.seriesDetail = seriesDetail;
      this.seriesData.saIsActive = seriesDetail['seasonallyAdjusted'];
      this.seriesData.currentGeo = seriesDetail['geography'];
      this.seriesData.change = seriesDetail['percent'] === true ? 'YOY Change' : 'YOY % Change';
      this.seriesData.currentFreq = {freq: seriesDetail['frequencyShort'], label: series['frequency']};
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
      let seriesObservations = observations;
      let start = seriesObservations.start;
      let end = seriesObservations.end;

      // Use to format dates for table
      this._helper.calculateDateArray(start, end, this.seriesData.currentFreq.freq, dateArray);
      let chartData = seriesObservations.chartData;
      let tableData = seriesObservations.tableData;

      // Create table with formatted dates and slice table to starting & ending observation dates
      let seriesTableData = this._helper.seriesTable(tableData, dateArray);
        let beginTable, endTable;
        for (let i = 0; i < seriesTableData.length; i++) {
          if (seriesTableData[i].date === start) {
            beginTable = i;
          }
          if (seriesTableData[i].date === end) {
            endTable = i;
          }
        }
      this.seriesData.chartData = chartData;
      this.seriesData.seriesTableData = seriesTableData;
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
