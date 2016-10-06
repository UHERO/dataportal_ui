import { Component, OnInit, AfterViewInit } from '@angular/core';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-single-series',
  inputs: ['categoryTree'],
  templateUrl: './single-series.component.html',
  styleUrls: ['./single-series.component.scss']
})
export class SingleSeriesComponent implements OnInit, AfterViewInit {
  private series;
  private observations;
  private options: Object;

  constructor(private _uheroAPIService: UheroApiService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.drawChart(1);
  }

  drawChart(seriesId: number) {
    let levelData = [];
    let percData = [];

    let series = this._uheroAPIService.fetchSeries(seriesId).then(series => {
      this.series = series
      let observations = this._uheroAPIService.fetchObservations(seriesId).then(observations => {
        this.observations = observations;
        console.log(this.observations);

        for(var i = 0; i < this.observations['dates'].length; i++) {
          levelData[i] = [Date.parse(this.observations['dates'][i]), +this.observations['levelValues'][i]];
          percData[i] = [Date.parse(this.observations['dates'][i]), +this.observations['percValues'][i]];
        }
        this.highStockOptions(levelData, percData);
      });
    });

  }

  highStockOptions(leveldata, percdata) {
    this.options = {
      chart: {
        zoomType: 'x'
      },
      rangeSelector: {
        selected: 1,
        inputDateFormat: '%Y-01-01',
        inputEditDateFormat: '%Y-01-01'
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {

      },
      yAxis: [{
        labels: {
          format: '{value}'
        },
        title: {
          text: ''
        },
       opposite: false
      }, {
        title: {
          text: ''
        },
        labels: {
          format: '{value}'
        }
      }],
      series: [{
        name: 'test',
        type: 'column',
        color: '#1D667F',
        data: percdata
      }, {
        name: 'test',
        type: 'line',
        yAxis: 1,
        color: '#F6A01B',
        data: leveldata
      }]
    };
  }
}
