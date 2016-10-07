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
  private seriesObservations = [];
  private chartData = [];
  private tableData = [];
  private newTableData = [];

  constructor(private _uheroAPIService: UheroApiService) { }

  ngOnInit() {
    this._uheroAPIService.fetchSeries(1).then(series => {
      this.series = series
      this._uheroAPIService.fetchObservations(1).then(observations => {
        this.seriesObservations = observations;
        this.chartData = this.seriesObservations[0];
        this.tableData = this.seriesObservations[1];
        console.log(this.tableData);

        /* for(var i = 0; i < this.observations['dates'].length; i++) {
          this.levelData[i] = [Date.parse(this.observations['dates'][i]), +this.observations['levelValues'][i]];
          this.percData[i] = [Date.parse(this.observations['dates'][i]), +this.observations['percValues'][i]];
          this.tableData[i] = {date: this.observations['dates'][i], level: +this.observations['levelValues'][i], perc: +this.observations['percValues'][i]};
        } */
        this.highStockOptions(this.chartData[0]['level'], this.chartData[0]['perc']);
      });
    });
  }

  /* ngAfterViewInit() {
    this.drawChart(1);
    //console.log('table data', this.tableData);
  }

  drawChart(seriesId: number) {
    //let levelData = [];
    //let percData = [];

    this._uheroAPIService.fetchSeries(seriesId).then(series => {
      this.series = series
      this._uheroAPIService.fetchObservations(seriesId).then(observations => {
        this.seriesObservations = observations;
        this.chartData = this.seriesObservations[0];
        console.log(this.chartData[0]);

        for(var i = 0; i < this.observations['dates'].length; i++) {
          this.levelData[i] = [Date.parse(this.observations['dates'][i]), +this.observations['levelValues'][i]];
          this.percData[i] = [Date.parse(this.observations['dates'][i]), +this.observations['percValues'][i]];
          this.tableData[i] = {date: this.observations['dates'][i], level: +this.observations['levelValues'][i], perc: +this.observations['percValues'][i]};
        }
        this.highStockOptions(this.chartData[0]['level'], this.chartData[0]['perc']);
      });
    });

  } */

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

  /* updateTable(e) {
    if(e.trigger != undefined) {
      var minDate, maxDate, tableStart, tableEnd;

      // Get date range from chart selection
      minDate = Highcharts.dateFormat('%Y-01-01', e.context.min);
      maxDate = Highcharts.dateFormat('%Y-01-01', e.context.max);
      console.log('min date', minDate);

      // Find selected dates in available data
      for(var i = 0; i < this.tableData.length; i++) {
        for (var date in this.tableData[i]) {
          if(this.tableData[i].date === minDate) {
            tableStart = i;
          }
          if(this.tableData[i].date === maxDate) {
            tableEnd = i;
          }
        }
      };

      this.tableData = this.tableData.slice(tableEnd, tableStart + 1)
    }
  } */

  updateTable(e) {
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

    this.newTableData = this.tableData.slice(tableEnd, tableStart + 1);
    console.log(this.newTableData);
  }
}
