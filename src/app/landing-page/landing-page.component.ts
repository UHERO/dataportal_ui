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
  private expand: string = null;


  constructor(private _uheroAPIService: UheroApiService) {
  }

  ngOnInit() {
    this._uheroAPIService.fetchCategories().subscribe(
      categories => this.categories = categories,
      error => this.errorMessage = error);
  }

  ngAfterViewInit() {
    this.drawSeries(5);
  }

  toggleMenu(expand: string) {
    this.expand = this.expand === expand ? null : expand;
  }

  drawSeries(catId: number) {
    //this._uheroAPIService.fetchSeries(catId).then(series => {
    //  this.series = series;
    console.log(catId);
    this._uheroAPIService.fetchSeries(catId).then(series => {
      this.series = series;
      console.log(this.series);

      this.series.forEach((series, index) => {
        this._uheroAPIService.fetchObservations(this.series[index]['id']).then(observations => {
          this.seriesObservations[index] = observations;

          this.seriesObservations.forEach((result, index) => {
            let chartData = this.seriesObservations[index][0];
            console.log('chart data', chartData[0]['level']);
            this.drawChartOptions(chartData[index], this.series[index]);
          });
        });
      });
    });
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
        name: seriesID['name'],
        type: 'column',
        color: '#1D667F',
        data: obs['perc']
      }, {
        name: seriesID['name'],
        type: 'line',
        yAxis: 1,
        color: '#F6A01B',
        data: obs['level'],
      }]
    };
  }
}
