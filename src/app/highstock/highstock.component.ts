// Highstock chart component used for single-series view
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import * as Highcharts from 'highcharts';

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
        backgroundColor: '#F3F3F3',
      },
      rangeSelector: {
        selected: 'All',
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
            color: '#1D667F'
          }
        },
        title: {
          text: 'Percent',
          style: {
            color: '#1D667F'
          }
        },
       opposite: false
      }, {
        title: {
          text: 'In ' + units,
          style: {
            color: '#F6A01B'
          }
        },
        labels: {
          format: '{value:,.0f}',
          style: {
            color: '#F6A01B'
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
        color: '#1D667F',
        data: perc
      }, {
        name: 'Level',
        type: 'line',
        yAxis: 1,
        color: '#F6A01B',
        data: level
      }]
    };
  }

  updateTable(e) {
    // Gets range of x values to emit
    // Used to redraw table in the single series view
    let xMin, xMax, minDate, maxDate;

    // Get date range from chart selection
    xMin = new Date(e.context.min);
    xMax = new Date(e.context.max);

    // Annual series observations
    minDate = xMin.getUTCFullYear() + '-01-01';
    maxDate = xMax.getUTCFullYear() + '-01-01';

    this.chartExtremes.emit({'min date': minDate, 'max date': maxDate})
  }
}
