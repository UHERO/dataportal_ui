// Container for charts drawn on Data Portal landing page
// See draw-multi-chart component for highcharts options for landing page charts

import { Component, OnInit } from '@angular/core';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-multi-series-chart',
  templateUrl: './multi-series-chart.component.html',
  styleUrls: ['./multi-series-chart.component.scss']
})

export class MultiSeriesChartComponent implements OnInit {
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

               },
               error => console.log('Error fetching observations'));
           }

     }

}
