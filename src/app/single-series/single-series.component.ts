import { Component, OnInit, AfterViewInit } from '@angular/core';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-single-series',
  inputs: ['categoryTree'],
  templateUrl: './single-series.component.html',
  styleUrls: ['./single-series.component.scss']
})
export class SingleSeriesComponent implements OnInit {
  private series;
  private observations;
  private options: Object;
  private seriesObservations;
  private chartData = [];
  private tableData = [];
  private newTableData = [];

  constructor(private _uheroAPIService: UheroApiService) { }

  ngOnInit() {
    this._uheroAPIService.fetchSeries(150390).then(series => {
      this.series = series
      this._uheroAPIService.fetchObservations(150390).then(observations => {
        this.seriesObservations = observations;
        this.chartData = this.seriesObservations[0];
        this.tableData = this.seriesObservations[1];
        this.highStockOptions(this.chartData[0]['level'], this.chartData[0]['perc']);
      });
    });
  }

  ngAfterViewInit() {
    //this.drawChart(1);
    //console.log('table data', this.tableData);
  }

  drawChart(seriesId: number) {
    this._uheroAPIService.fetchSeries(seriesId).then(series => {
      this.series = series
      this._uheroAPIService.fetchObservations(seriesId).then(observations => {
        this.seriesObservations = observations;
        this.chartData = this.seriesObservations[0];
        this.tableData = this.seriesObservations[1];
        console.log(this.chartData[0]);

        this.highStockOptions(this.chartData[0]['level'], this.chartData[0]['perc']);
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
        /* events: {
          setExtremes: this.updateTable
        } */
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

  updateTable(e) {
    console.log(e);
    var xMin, xMax, minDate, maxDate, tableStart, tableEnd;

    // Get date range from chart selection
    xMin = new Date(e.context.min);
    xMax = new Date(e.context.max);

    // Annual series observations
    minDate = xMin.getUTCFullYear() + '-01-01';
    maxDate = xMax.getUTCFullYear() + '-01-01';
    // Find selected dates in available table data
    for(var i = 0; i < this.tableData.length; i++) {
      if(this.tableData[i].date === minDate) {
        tableStart = i;
      }
      if(this.tableData[i].date === maxDate) {
        tableEnd = i;
      }
    }

    this.newTableData = this.tableData.slice(tableStart, tableEnd + 1);
    console.log(this.newTableData);
  }
}
