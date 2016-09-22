import { Component, OnInit } from '@angular/core';
import { CHART_DIRECTIVES } from 'angular2-highcharts';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-multi-series-chart',
  templateUrl: './multi-series-chart.component.html',
  styleUrls: ['./multi-series-chart.component.scss']
})
export class MultiSeriesChartComponent implements OnInit {
  series;

  constructor(private _uheroAPIService: UheroApiService) { }

  ngOnInit() {
     this._uheroAPIService.fetchSeries(1)
         .subscribe(
            series => this.series = console.log(series),
            error => console.log('Error fetching series'));
  }

}
