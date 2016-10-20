import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { Highcharts } from 'angular2-highcharts';

Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

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
          this.highStockOptions(chartData['level'], chartData['perc'], seriesDetail['title'], seriesDetail['unitsLabelShort']);
        });
        },
        error => this.errorMessage = error
      );
    });
  }

  highStockOptions(leveldata, percdata, seriesName, seriesUnits) {
    this.options = {
      chart: {
        height: 425,
        width: 800,
        zoomType: 'x',
        backgroundColor: '#3E3E40'
      },
      rangeSelector: {
        selected: 1,
        buttonTheme: {
          visibility: 'hidden'
        },
        labelStyle: {
          visibility: 'hidden'
        },
        inputEnabled: false
        // inputDateFormat: '%Y-01-01',
        // inputEditDateFormat: '%Y-01-01',
      },
      title: {
        text: seriesName + ' (' + seriesUnits + ')',
        style: {
          color: '#FFFFFF'
        }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        ordinal: false,
        labels: {
          style: {
            color: '#FFFFFF'
          }
        }
      },
      yAxis: [{
        labels: {
          format: '{value:,.0f}',
          style: {
            color: '#2B908F'
          }
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
          format: '{value:,.0f}',
          style: {
            color: '#F6A01B'
          }
        }
      }],
      series: [{
        // name: seriesName,
        name: 'Percent',
        type: 'column',
        color: '#2B908F',
        data: percdata,
        pointStart: 1964
      }, {
        // name: seriesName,
        name: 'Level',
        type: 'line',
        yAxis: 1,
        color: '#F6A01B',
        data: leveldata,
        pointStart: 1964
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
