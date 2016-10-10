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
  private seriesObservations;
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
    this._uheroAPIService.fetchSeries(catId).subscribe((series) => {
      this.series = series;

      this.series.forEach((serie, index) => {
        this._uheroAPIService.fetchObservations(index).subscribe((observations) => {
          this.seriesObservations = observations;
          let seriesData = {'serie': this.series[index], 'observations': this.seriesObservations};
          let chartData = seriesData['observations']['chart data'];
          this.drawChartOptions(chartData, seriesData['serie']);
        });
      });
    },
    error => this.errorMessage = error);
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
