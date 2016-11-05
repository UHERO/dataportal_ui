import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
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
  private seriesSiblings;
  private options: Object;
  private tableData = [];
  private newTableData = [];
  
  // Vars used in highstock component
  public chartData;
  public seriesDetail;

  // Vars used in selectors
  public freqs;
  public currentFreq;
  public regions = [];
  public currentGeo;

  constructor(private _uheroAPIService: UheroApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.currentGeo = {fips: null, name: null, handle: null};
    this.currentFreq = {freq: null, label: null};
  }

  ngAfterViewInit() {
   this.route.params.subscribe(params => {
      let seriesId = Number.parseInt(params['id']);
      this.drawChart(seriesId);
    })

  }

  // Draws chart & table on load
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
        this.currentGeo = this.seriesDetail['geography'];
      });
      this._uheroAPIService.fetchObservations(id).subscribe((observations) => {
        console.log('observations', observations);
        let seriesObservations = observations;
        this.chartData = seriesObservations['chart data'];
        this.tableData = seriesObservations['table data'];
      });
    });
  }

  // Redraw chart when selecting a new region
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
          this.tableData = seriesObservations['table data'];
        });
      } else {
        return;
      }
    },
    error => this.errorMessage = error);
  }

  // Redraw chart when selecting a new frequency
  redrawFreq(event) {
    console.log(event);
    this.seriesSiblings.forEach((sibling, index) => {
      if (this.currentGeo.handle === this.seriesSiblings[index]['geography']['handle'] && event.label === this.seriesSiblings[index]['frequency']) {
        let id = this.seriesSiblings[index]['id'];

        this._uheroAPIService.fetchSeriesDetail(id).subscribe((series) => {
          this.seriesDetail = series;
        });

        this._uheroAPIService.fetchObservations(id).subscribe((observations) => {
          let seriesObservations = observations;
          this.chartData = seriesObservations['chart data'];
          this.tableData = seriesObservations['table data'];
        });
      } else {
        return;
      }
    },
    error => this.errorMessage = error);
  }

  // Update table when selecting new ranges in the chart
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
