import { Component, OnInit, Input } from '@angular/core';

import * as Highcharts from 'highcharts';

Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.scss']
})
export class HighchartComponent implements OnInit {
  @Input() seriesData;
  private options: Object;
  private chart;
  private SA: boolean;
  constructor() { }

  ngOnInit() {
    console.log('chart data', this.seriesData);
    let level = this.seriesData['observations']['chart data']['level'];
    let ytd = this.seriesData['observations']['chart data']['ytd'];
    let title = this.seriesData['serie']['title'] === undefined? this.seriesData['serie']['name'] : this.seriesData['serie']['title'];
    this.SA = this.seriesData['serie']['seasonallyAdjusted'] === true? true : false;
    if (this.seriesData['serie'] === 'No data available' || level.length === 0) {
      this.noDataChart(title);
    } else {
      let unitsShort = this.seriesData['serie']['unitsLabelShort'];
      let lastYtd;
      let lastDate;
      if (ytd.length > 0) {
        lastYtd = ytd[ytd.length - 1][1].toLocaleString();
        lastDate = ytd[ytd.length - 1][0];
      } else {
        return;
      }
      this.drawChart(title, lastDate, lastYtd, level);
      // let chart = drawChart(title, lastDate, lastYtd, level, SA)
    }
  }

  drawChart(title: string, lastDate: string, lastYtd: string, level: Array<any>) {
    this.options = {
      chart: {
        backgroundColor: '#F7F7F7',
      },
      exporting: {
        enabled: false
      },
      title: {
        text: '<b>' + title + '</b>' + '<br>' + lastDate + '<br>' + 'YTD: ' + lastYtd,
        align: 'left',
        widthAdjust: 0,
        style: {
          color: '#505050',
          fontSize: '0.9em',
          letterSpacing: '0.05em'
        }
      },
      tooltip: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      /* labels: {
        items: [{
          html: 'test',
          style: {
            top: '100px',
            left: '100px'
          }
        }]
      }, */
      xAxis: {
        type: 'datetime',
        labels: {
          enabled: false
        },
        lineWidth: 0,
        tickLength: 0
      },
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
        }
      },
      series: [{
        name: title,
        type: 'line',
        yAxis: 1,
        color: '#1D667F',
        data: level,
      }],
    }

    // setInterval(() => this.saLabel(this.chart, SA));
  }

  saLabel(chart, SA) {
    if (SA) {
      chart.renderer.label('<span class="tag tag-pill" style="font-size: 100%; background-color: #1D667F">SA</span>', 160, 170, null, null, null, true)
        .css({
          size: '16px'
        })
        .add();
    }
  }

  noDataChart(title) {
    this.options = {
      chart: {
        backgroundColor: '#F9F9F9'
      },
      title: {
        text: '<b>' + title + '</b><br>' + 'No Data Available',
        // verticalAlign: 'middle',
        align: 'left',
        widthAdjust: 0,
        style: {
          color: '#505050',
          fontSize: '0.9em',
          letterSpacing: '0.05em'
        }
      },
      exporting: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      yAxis: [{
        title: {
          text: ''
        }
      }],
      xAxis: {
        lineWidth: 0
      },
      series: [{
        data: []
      }],
      lang: {
        noData: "No Data Available"
      },
      noData: {
        style: {
          color: '#505050',
          fontSize: '0.85em'
        }
      }
    }
  }

  render(event) {
    this.chart = event;
    this.saLabel(this.chart, this.SA);
  }
}
