import { Component, OnInit } from '@angular/core';
import { CHART_DIRECTIVES } from 'angular2-highcharts';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-multi-series-chart',
  templateUrl: './multi-series-chart.component.html',
  styleUrls: ['./multi-series-chart.component.scss']
})

export class MultiSeriesChartComponent implements OnInit {
  options: Object;
  private series;
  private dates;
  private observations;
  private levelValues;
  private percValues;

  constructor(private _uheroAPIService: UheroApiService) {

  }

  ngOnInit() {
     var id = [1, 2, 3];
     for(var i in id) {
        this._uheroAPIService.fetchSeries(id[i])
            .subscribe(
               (series) => {
                  var series = series;
                  console.log(series);
               },
               error => console.log('Error fetching series'));


         this._uheroAPIService.fetchObservations(id[i])
            .subscribe(
               (observations) => {
                   var observations = observations.transformationResults
                   var level = observations[0].observations;
                   var perc = observations[1].observations;
                   var levelValues = [];
                   var percValues = [];
                   var dates = [];

                   for(var i = 0; i < level.length; i++) {
                      levelValues.push(+level[i].value);
                      dates.push(level[i].date);
                      percValues.push(+perc[i].value);
                   }
                   this.levelValues = levelValues;

                   this.options = {
                     chart: {
                        height: 200,
                        width: 200
                     },
                     title: {
                     text: ''
                     },
                     legend: {
                        enabled: false
                     },
                     credits: {
                         enabled: false
                     },
                     xAxis: [{
                         categories: dates.reverse(),
                         labels: {
                            enabled: false
                         },
                         lineWidth: 0,
                         tickLength: 0,
                     }],
                     yAxis: [{
                        labels: {
                           enabled: false
                        },
                        title: {
                           text: ''
                        },
                        gridLineColor: 'transparent'
                        }, {
                        title: {
                           text: ''
                        },
                        labels: {
                           enabled: false
                        },
                        gridLineColor: 'transparent',
                        opposite: true
                     }],
                     series: [{
                         name: 'Rate of Change (%)',
                         type: 'column',
                         color: '#1D667F',
                         data: percValues.reverse()
                     }, {
                         name: 'Total Visitor Arrivals',
                         type: 'line',
                         yAxis: 1,
                         color: '#F6A01B',
                         data: levelValues.reverse(),
                     }]
                 };

               },
               error => console.log('Error fetching observations'));
           }

     }

}
