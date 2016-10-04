// Component for landing page category tabs
import { Component, OnInit, Input, Output } from '@angular/core';

import { CategoryTree } from '../category-tree';
import { UheroApiService } from '../uhero-api.service';
import {error} from "util";
import {Observable} from "rxjs";
import {ObservableInput} from "rxjs/Observable";
import {ObservationResults} from "../observation-results";

@Component({
  selector: 'app-category-tree',
  inputs: ['categoryTree'],
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit {
  private categories: CategoryTree;
  private errorMessage: string;
  private selectedSeries: number;
  private series;
  private observations;
  private options: Object;
  private seriesObservations: ObservationResults[] = [];
  private chartData;
  /* private categories;
   private categoryTree;
   options: Object;
   private series;
   private dates;
   private observations;
   private levelValues;
   private percValues; */


  constructor(private _uheroAPIService: UheroApiService) {
  }

  ngOnInit() {
    this._uheroAPIService.fetchCategories().subscribe(
      categories => this.categories = categories,
      error => this.errorMessage = error);
  }

  drawSeries(catId: number) {
    let chartData = [];

    this._uheroAPIService.fetchSeries(catId).subscribe(
      (series) => {
        this.series = series;
        this.series.forEach((serie, index) => {
          this._uheroAPIService.fetchObservations(index).subscribe(
            observations => this.seriesObservations[index] = observations,
            error => this.errorMessage = error
          );

          this.chartData[index] = [{
            name: this.series[index]['id'],
            type: 'column',
            color: '#1d667f',
            //data: this.seriesObservations[index][0].observations.value
          }];
        });
      },
        error => this.errorMessage = error
    );


    //console.log('chart data', this.chartData);
    console.log('series observations', this.seriesObservations);
    /* this.seriesObservations.forEach((result, index) => {
      let level = this.seriesObservations[index][0].observations;
      let perc = this.seriesObservations[index][1].observations;

      let levelValues = [];
      let percValues = [];
      let dates = [];

      level.forEach((entry, index) => {
        levelValues.push(+level[index].value);
        dates.push(level[index].date);
        percValues.push(+perc[index].value);
      });

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
          name: this.series[index]['id'],
          type: 'column',
          color: '#1D667F',
          data: percValues.reverse()
        }, {
          name: this.series[index]['id'],
          type: 'line',
          yAxis: 1,
          color: '#F6A01B',
          data: levelValues.reverse(),
        }]
      };
    }); */

    /*this._uheroAPIService.fetchObservations(catId).subscribe(
      observations => this.observations = observations,
      error => this.errorMessage = error
    );*/



  }
}




  /* drawSeries(id: number) {
    this._uheroAPIService.fetchSeries(id)
      .subscribe(
        (series) => {
          var series = series;
          console.log(series);
        },
        error => console.log('Error fetching series')
      );

    this._uheroAPIService.fetchObservations(id)
      .subscribe(
        (observations) => {
          var observations = observations.transformationResults;
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
  }; */

