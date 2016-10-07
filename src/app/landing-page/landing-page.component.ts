// Component for landing page category tabs
import { Component, OnInit, Input, Output, AfterViewInit } from '@angular/core';

import { CategoryTree } from '../category-tree';
import { UheroApiService } from '../uhero-api.service';
import {error} from 'util';
import {ObservationResults} from '../observation-results';

@Component({
  selector: 'app-landing-page',
  inputs: ['categoryTree'],
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  private categories: CategoryTree;
  private errorMessage: string;
  // private selectedSeries: number;
  private series;
  // private observations;
  private options: Object;
  private seriesObservations = [];


  constructor(private _uheroAPIService: UheroApiService) {
  }

  ngOnInit() {
    this._uheroAPIService.fetchCategories().subscribe(
      categories => this.categories = categories,
      error => this.errorMessage = error);
  }

  ngAfterViewInit() {
    this.drawSeries(1);
  }

  drawSeries(catId: number) {
    this._uheroAPIService.fetchSeries(catId).then(series => {
      this.series = series;

      this.series.forEach((seriesEntry, index) => {
        this._uheroAPIService.fetchObservations(index).then(observations => {
          this.seriesObservations[index] = observations;

          this.seriesObservations.forEach((result, index) => {
            let chartData = this.seriesObservations[index][0];
            console.log(chartData);
            this.drawChartOptions(chartData[index], this.series[index])
            //this.drawChartOptions(this.seriesObservations[index], this.series[index]);
          });
        });
      });
    });

    // console.log(this.seriesObservations);
  }

  drawChartOptions(obs, seriesID) {
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
      xAxis: {
        type: 'datetime',
        labels: {
          enabled: false
        },
        lineWidth: 0,
        tickLength: 0      
      },/* [{
        //categories: obs['dates'],
        type: 'datetime',
        labels: {
          enabled: false
        },
        lineWidth: 0,
        tickLength: 0,
      }], */
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
      plotOptions: {
        line: {
          marker: {
            enabled: false
          }
        },
        series: {
          pointWidth: 5,
          pointPadding: 0
        }
      },
      series: [{
        name: seriesID['id'],
        type: 'column',
        color: '#1D667F',
        data: obs['perc']
      }, {
        name: seriesID['id'],
        type: 'line',
        yAxis: 1,
        color: '#F6A01B',
        data: obs['level'],
      }]
    };
  }
}
