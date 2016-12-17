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
  @Input() currentFreq;
  private options: Object;
  private chart;
  private SA: boolean;
  constructor() { }

  ngOnInit() {
    let level = this.seriesData['observations']['chart data']['level'];
    let ytd = this.seriesData['observations']['chart data']['ytd'];
    let title = this.seriesData['serie']['title'] === undefined? this.seriesData['serie']['name'] : this.seriesData['serie']['title'];
    let dataFreq = this.currentFreq.freq;
    this.SA = this.seriesData['serie']['seasonallyAdjusted'] === true? true : false;
    if (this.seriesData['serie'] === 'No data available' || level.length === 0) {
      this.noDataChart(title);
    } else {
      let unitsShort = this.seriesData['serie']['unitsLabelShort'];
      this.drawChart(title, level, ytd, dataFreq);
    }
  }

  drawChart(title: string, level: Array<any>, ytd: Array<any>, dataFreq) {
    this.options = {
      chart: {
        backgroundColor: '#F7F7F7',
        spacingTop: 20 /* Add spacing to draw plot below fixed tooltip */
      },
      exporting: {
        enabled: false
      },
      title: {
        text: '<br>',
        useHTML: true,
        align: 'left',
        widthAdjust: 0,
        style: {
          margin: 75
        }
      },
      tooltip: {
        positioner: function() {
          return {x: 0, y: 0};
        },
        shadow: false,
        borderWidth: 0,
        shared: true,
        backgroundColor: 'transparent',
        // backgroundColor: 'rgba(247, 247, 247, 0.5)',
        formatter: function () {
          let s = '<b>' + title + '</b><br>';
          if (dataFreq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Jan') {
            s = s + 'Q1 '
          };
          if (dataFreq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Apr') {
            s = s + 'Q2 '
          };
          if (dataFreq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Jul') {
            s = s + 'Q3 '
          };
          if (dataFreq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Oct') {
            s = s + 'Q4 '
          };
          if (dataFreq === 'M') {
            s = s + Highcharts.dateFormat('%b', this.x) + ' ';
          }
          s = s + Highcharts.dateFormat('%Y', this.x) + '';
          this.points.forEach((point, index) => {
            s += '<br>' + point.series.name + ': ' + Highcharts.numberFormat(point.y) + '<br>';
          });
          return s;
        },
        style: {
          color: '#505050',
          fontSize: '0.9em',
          letterSpacing: '0.05em',
          width: '190px',
          marginBottom: '5px',
          // whiteSpace: 'normal'
        }
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
        name: 'Level',
        type: 'line',
        yAxis: 1,
        color: '#1D667F',
        data: level,
        dataGrouping: {
          enabled: false
        }
      }, {
        name: 'YTD',
        type: 'column',
        color: 'transparent',
        borderColor: 'transparent',
        data: ytd,
        dataGrouping: {
          enabled: false
        },
        // visible: false 
      }],
    }
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
    // Prevent tooltip from being hidden
    this.chart.tooltip.hide = function(){};

    // Display tooltip when chart loads
    let latestLevel = this.chart.series[0].points.length - 1;
    let latestYtd = this.chart.series[1].points.length - 1;
    this.chart.tooltip.refresh([this.chart.series[0].points[latestLevel], this.chart.series[1].points[latestYtd]]);

    // Display pill tag to indicate if series is seasonally adjusted
    this.saLabel(this.chart, this.SA);
  }
}
