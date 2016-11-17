// Highstock chart component used for single-series view
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

// import * as Highcharts from 'highcharts';
declare var require: any;
const Highcharts = require('../../../node_modules/highcharts/highstock.src');

Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

@Component({
  selector: 'app-highstock',
  templateUrl: './highstock.component.html',
  styleUrls: ['./highstock.component.scss']
})
export class HighstockComponent implements OnInit {
  @Input() chartData;
  @Input() seriesDetail;
  @Output() chartExtremes = new EventEmitter();
  private options: Object;

  constructor() { }

  ngOnInit() {
    let level = this.chartData['level'];
    let perc = this.chartData['perc'];
    let name = this.seriesDetail['title'];
    let unitsShort = this.seriesDetail['unitsLabelShort'];

    this.drawChart(level, perc, name, unitsShort);
  }

  ngOnChanges() {
    let level = this.chartData['level'];
    let perc = this.chartData['perc'];
    let name = this.seriesDetail['title'];
    let unitsShort = this.seriesDetail['unitsLabelShort'];

    this.drawChart(level, perc, name, unitsShort);
  }


  drawChart(level, perc, name, units) {
    this.options = {
      chart: {
        zoomType: 'x',
        backgroundColor: '#F9F9F9',
      },
      rangeSelector: {
        selected: 'All',
        buttons: [{
          type: 'year',
          count: 1,
          text: '1Y'
        }, {
          type: 'year',
          count: 5,
          text: '5Y'
        }, {
          type: 'year',
          count: 10,
          text: '10Y'
        }, {
          type: 'all',
          text: 'All'
        }],
        buttonTheme: {
          // visibility: 'hidden'
        },
        labelStyle: {
          visibility: 'hidden'
        },
        inputEnabled: false
        // inputDateFormat: '%Y-01-01',
        // inputEditDateFormat: '%Y-01-01',
      },
      tooltip: {
        borderWidth: 0,
        shadow: false,
        valueDecimals: 2
      },
      title: {
        text: '',
        //text: name + ' (' + units + ')',
        style: {
          color: '#505050'
        }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        ordinal: false,
        labels: {
          style: {
            color: '#505050'
          }
        }
      },
      yAxis: [{
        labels: {
          format: '{value:,.0f}',
          style: {
            color: '#727272'
          }
        },
        title: {
          text: 'Percent',
          style: {
            color: '#727272'
          }
        },
       opposite: false
      }, {
        title: {
          text: 'In ' + units,
          style: {
            color: '#1D667F'
          }
        },
        labels: {
          format: '{value:,.0f}',
          style: {
            color: '#1D667F'
          }
        }
      }],
      navigator: {
        series: {
          data: level
        }
      },
      series: [{
        name: 'Percent',
        type: 'column',
        color: '#727272',
        data: perc
      }, {
        name: 'Level',
        type: 'line',
        yAxis: 1,
        color: '#1D667F',
        data: level
      }]
    };
  }

  updateTable(e) {
    // Gets range of x values to emit
    // Used to redraw table in the single series view
    let xMin, xMax, minDate, maxDate, minYear, minMonth, maxYear, maxMonth;

    // Get date range from chart selection
    xMin = new Date(e.context.min).toISOString().split('T')[0];
    xMax = new Date(e.context.max).toISOString().split('T')[0];

    this.chartExtremes.emit({'min date': xMin, 'max date': xMax})
  }
}
