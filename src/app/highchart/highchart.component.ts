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
    let title = this.seriesData['serie']['title'];
    if(this.seriesData['serie'] === 'No data available' || level.length === 0) {
      this.options = {
        chart: {
          backgroundColor: '#F3F3F3'
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
      // let level = this.seriesData['observations']['chart data']['level'];
      // console.log('level', level);
      // let title = this.seriesData['serie']['title'];
      let tableData = this.seriesData['observations']['table data'];
      let unitsShort = this.seriesData['serie']['unitsLabelShort'];
      let lastLevel;
      if (level.length > 0) {
        lastLevel = level[level.length - 1][1].toLocaleString();
      } else {
        return;
      }
      // let lastLevel = level[level.length - 1][1].toLocaleString();
      this.options = {
        chart: {
          // height: 200,
          // width: 200,
          // backgroundColor: '#3E3E40'
          backgroundColor: '#F3F3F3'
        },
        title: {
          text: '<b>' + title + '</b>' + '<br>' + 'Last Observation:' + '<br>' + lastLevel + ' (' + unitsShort + ')',
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
