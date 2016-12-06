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
  constructor() { }

  ngOnInit() {
    let level = this.seriesData['observations']['chart data']['level'];
    let ytd = this.seriesData['observations']['chart data']['ytd'];
    let title;
    if (this.seriesData['serie']['title'] === undefined) {
      title = this.seriesData['serie']['name'];
    } else {
      title = this.seriesData['serie']['title'];
    }
    if (this.seriesData['serie'] === 'No data available' || level.length === 0) {
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
      this.options = {
        chart: {
          // height: 200,
          // width: 200,
          // backgroundColor: '#3E3E40'
          backgroundColor: '#F7F7F7',
          // borderColor: '#F5F5F5',
          // borderWidth: 1
        },
        exporting: {
          enabled: false
        },
        title: {
          text: '<b>' + title + '</b>' + '<br>' + lastDate + '<br>' + 'YTD: ' + lastYtd,
          align: 'left',
          widthAdjust: 0,
          style: {
            // color: '#FFFFFF',
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
      };
    }
  }
}
