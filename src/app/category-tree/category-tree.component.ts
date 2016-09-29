import { Component, OnInit, Input, Output } from '@angular/core';
import { CHART_DIRECTIVES } from 'angular2-highcharts';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-category-tree',
  inputs: ['categoryTree'],
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit {

  private categories;
  private categoryTree;
  options: Object;
  private series;
  private dates;
  private observations;
  private levelValues;
  private percValues;


  constructor(private _uheroAPIService: UheroApiService) {
  }

  ngOnInit() {
     this._uheroAPIService.fetchCategories()
         .subscribe(
            (categories) => {
               var categories = categories.categories;
               var dataMap = categories.reduce((map, value) => (map[value.id] = value, map), {});
               var categoryTree = [];
               categories.forEach((value) => {
                  var parent = dataMap[value.parent];
                  if (parent) {
                     (parent.children || (parent.children = []))
                     .push(value);
                  } else {
                     categoryTree.push(value);
                  }
               });
               console.log(categories);
               console.log(categoryTree);
               this.categories = categoryTree;
            },
            error => console.log('Error fetching categories'));
  }

  drawSeries(id: number) {
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
  };
}
