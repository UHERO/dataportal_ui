import { Component, OnInit, Input } from '@angular/core';

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
    this.options = {
      chart: {
        // height: 200,
        // width: 200,
        // backgroundColor: '#3E3E40'
        backgroundColor: '#E5E5E5'
      },
      title: {
        text: this.seriesData['serie']['title'],
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
        name: this.seriesData['serie']['title'],
        type: 'line',
        yAxis: 1,
        color: '#2B908F',
        data: this.seriesData['observations']['chart data']['level']
      }]
    };
  }
}
