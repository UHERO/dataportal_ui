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
    if(this.seriesData['serie'] === 'No data available') {
      this.options = {
        chart: {
          backgroundColor: '#E5E5E5'
        },
        title: {
          text: 'No Data Available',
          verticalAlign: 'middle',
          style: {
            color: '#505050',
            fontSize: '1em',
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
      let level = this.seriesData['observations']['chart data']['level'];
      let title = this.seriesData['serie']['title'];
      let tableData = this.seriesData['observations']['table data'];
      let unitsShort = this.seriesData['serie']['unitsLabelShort'];
      let lastLevel = level[level.length - 1][1].toLocaleString();
      this.options = {
        chart: {
          // height: 200,
          // width: 200,
          // backgroundColor: '#3E3E40'
          backgroundColor: '#E5E5E5'
        },
        title: {
          text: '<b>' + this.seriesData['serie']['title'] + '</b>' + '<br>' + 'Last Observation:' + '<br>' + lastLevel + ' (' + unitsShort + ')',
          align: 'left',
          widthAdjust: 0,
          style: {
            // color: '#FFFFFF',
            color: '#505050',
            fontSize: '0.85em',
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
        /* labels: {
          items: [{
            html: 'Last Observation:<br>' + level[level.length - 1] + ' (' + unitsShort + ') <br>', //+ tableData[tableData.length - 1]['date'],
            style: {
              left: '0px',
              top: '0px',
              color: '#505050'
            }
          }]
        } */
      };
    }
  }
}
