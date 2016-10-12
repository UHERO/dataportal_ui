import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-single-series',
  templateUrl: './single-series.component.html',
  styleUrls: ['./single-series.component.scss']
})
export class SingleSeriesComponent implements OnInit {
  private errorMessage: string;
  private options: Object;
  private tableData = [];
  private newTableData = [];

  constructor(private _uheroAPIService: UheroApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // let catId = Number.parseInt(params['catId']);
      let seriesId = Number.parseInt(params['id']);
      console.log('series id', seriesId);
      // console.log('category id', catId);

      this._uheroAPIService.fetchSeriesDetail(seriesId).subscribe((series) => {
        let seriesDetail = series;

        this._uheroAPIService.fetchObservations(seriesId).subscribe((observations) => {
          let seriesObservations = observations;
          console.log('series detail', seriesDetail);
          console.log('series observations', seriesObservations);
          let chartData = seriesObservations['chart data'];
          this.tableData = seriesObservations['table data'];
          this.highStockOptions(chartData['level'], chartData['perc'], seriesDetail['name']);
        });
        },
        error => this.errorMessage = error
      );
    });
  }

  highStockOptions(leveldata, percdata, seriesName) {
    this.options = {
      chart: {
        zoomType: 'x',
        backgroundColor: '#3E3E40'
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
        name: seriesName,
        type: 'column',
        color: '#2B908F',
        data: percdata
      }, {
        name: seriesName,
        type: 'line',
        yAxis: 1,
        color: '#F6A01B',
        data: leveldata
      }]
    };
  }

  updateTable(e) {
    console.log(e);
    let xMin, xMax, minDate, maxDate, tableStart, tableEnd;

    // Get date range from chart selection
    xMin = new Date(e.context.min);
    xMax = new Date(e.context.max);

    // Annual series observations
    minDate = xMin.getUTCFullYear() + '-01-01';
    maxDate = xMax.getUTCFullYear() + '-01-01';

    // Find selected dates in available table data
    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].date === minDate) {
        tableStart = i;
      }
      if (this.tableData[i].date === maxDate) {
        tableEnd = i;
      }
    }

    this.newTableData = this.tableData.slice(tableStart, tableEnd + 1);
    console.log(this.newTableData);
  }
}
