import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { Frequency } from '../frequency';
import * as Highcharts from 'highcharts';

Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

@Component({
  selector: 'app-single-series',
  templateUrl: './single-series.component.html',
  styleUrls: ['./single-series.component.scss']
})
export class SingleSeriesComponent implements OnInit {
  private errorMessage: string;
  public chartData;
  public seriesDetail;
  public freqs;
  public currentFreq;
  public regions = [];
  public currentGeo;
  private seriesSiblings;
  private options: Object;
  private tableData = [];
  private newTableData = [];

  constructor(private _uheroAPIService: UheroApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.currentGeo = {fips: null, name: null, handle: null};
    this.currentFreq = {freq: null, label: null};
    /* this.route.params.subscribe(params => {
      let seriesId = Number.parseInt(params['id']);

      this._uheroAPIService.fetchSeriesDetail(seriesId).subscribe((series) => {
        this.seriesDetail = series;

        this._uheroAPIService.fetchObservations(seriesId).subscribe((observations) => {
          let seriesObservations = observations;
          //let chartData = seriesObservations['chart data'];
          this.chartData = seriesObservations['chart data'];
          console.log('chart data', this.chartData);
          this.tableData = seriesObservations['table data'];
          // this.highStockOptions(chartData['level'], chartData['perc'], seriesDetail['title'], seriesDetail['unitsLabelShort']);
        });
        },
        error => this.errorMessage = error
      );
    }); */
  }

  ngAfterViewInit() {
    /* this.route.params.subscribe(params => {
      let seriesId = Number.parseInt(params['id']);
      this.drawChart(seriesId);
    }) */
   this.route.params.subscribe(params => {
      let seriesId = Number.parseInt(params['id']);
      this.drawChart(seriesId);
    })

  }

  drawChart(id: number) {
    this._uheroAPIService.fetchSeriesDetail(id).subscribe((series) => {
      this.seriesDetail = series;
      console.log('detail', this.seriesDetail);

      this._uheroAPIService.fetchSeriesSiblings(id).subscribe((siblings) => {
        this.seriesSiblings = siblings;
        console.log('siblings', this.seriesSiblings);
      })

      this._uheroAPIService.fetchSiblingFreqs(id).subscribe((frequencies) => {
        this.freqs = frequencies;
        this.currentFreq = {'freq': this.seriesDetail['frequencyShort'], 'label': this.seriesDetail['frequency']};
        console.log(this.currentFreq);
      });

      this._uheroAPIService.fetchSiblingGeos(id).subscribe((geos) => {
        this.regions = geos;
        this.currentGeo = {'fips': this.seriesDetail['geography']['fips'], 'name': this.seriesDetail['geography']['name'], 'handle': this.seriesDetail['geography']['handle']};
      });
      this._uheroAPIService.fetchObservations(id).subscribe((observations) => {
        console.log('observations', observations);
        let seriesObservations = observations;
        this.chartData = seriesObservations['chart data'];
        // this.chartData.push(seriesObservations['chart data']);
        console.log('chart data', this.chartData);
        this.tableData = seriesObservations['table data'];
      });
    });
  }

  highStockOptions(leveldata, percdata, seriesName, seriesUnits) {
  }

  redrawGeo(event) {
    this.chartData = [];
    console.log(event);
    this.seriesSiblings.forEach((sibling, index) => {
      if (event.handle === this.seriesSiblings[index]['geography']['handle'] && this.currentFreq.label === this.seriesSiblings[index]['frequency']) {
        let id = this.seriesSiblings[index]['id'];

        this._uheroAPIService.fetchSeriesDetail(id).subscribe((series) => {
          this.seriesDetail = series;
        });

        this._uheroAPIService.fetchObservations(id).subscribe((observations) => {
          let seriesObservations = observations;
          this.chartData = seriesObservations['chart data'];
          // this.chartData.push(seriesObservations['chart data']);
          console.log('new data', this.chartData)
          this.tableData = seriesObservations['table data'];
        });
      } else {
        return;
      }
    },
    error => this.errorMessage = error);
  }

  redrawFreq(event) {
    console.log(event);
    this.seriesSiblings.forEach((sibling, index) => {
      if (this.currentGeo.handle === this.seriesSiblings[index]['geography']['handle'] && event.label === this.seriesSiblings[index]['frequency']) {
        console.log('true');
      } else {
        return;
      }
    });
  }

  /* updateTable(e) {
    let xMin, xMax, minDate, maxDate, tableStart, tableEnd;

    // Get date range from chart selection
    xMin = new Date(e.context.min);
    xMax = new Date(e.context.max);

    // Annual series observations
    minDate = xMin.getUTCFullYear() + '-01-01';
    maxDate = xMax.getUTCFullYear() + '-01-01';

    // Find selected dates in available table data
    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].date === minDate) {
        tableStart = i;
      }
      if (this.tableData[i].date === maxDate) {
        tableEnd = i;
      }
    }

    this.newTableData = this.tableData.slice(tableStart, tableEnd + 1);
  } */
  redrawTable(e) {
    let minDate, maxDate, tableStart, tableEnd;
    minDate = e['min date'];
    maxDate = e['max date'];

    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].date === minDate) {
        tableStart = i;
      }
      if (this.tableData[i].date === maxDate) {
        tableEnd = i;
      }
    }

    this.newTableData = this.tableData.slice(tableStart, tableEnd + 1);
  }
}
