import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw-multi-chart',
  templateUrl: './draw-multi-chart.component.html',
  styleUrls: ['./draw-multi-chart.component.scss']
})
export class DrawMultiChartComponent implements OnInit {
  private options: Object;

  constructor() { }

  ngOnInit() {
    this.options = {
      chart: {
        height: 200,
        width: 200
      },
      title: {
        text: ''
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      xAxis: [{
        //categories: dates.reverse(),
        labels: {
          enabled: false
        },
        lineWidth: 0,
        tickLength: 0,
      }],
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
      series: [{
        name: 'Rate of Change (%)',
        type: 'column',
        color: '#1D667F',
        //data: percValues.reverse()
      }, {
        name: 'Total Visitor Arrivals',
        type: 'line',
        yAxis: 1,
        color: '#F6A01B',
       // data: levelValues.reverse(),
      }]
    };
  }

}
