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
    this.seriesData.forEach((series, index) => {
      this.options = {
        chart: {
          height: 200,
          width: 200,
          backgroundColor: '#3E3E40'
          // renderTo: series['id']
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
          },
          series: {
            pointWidth: 5,
            pointPadding: 0
          }
        },
        series: [/*{
          name: this.seriesData[index]['serie']['name'],
          type: 'column',
          color: '#1D667F',
          data: this.seriesData[index]['observations']['chart data']['perc']
        }, */{
          name: this.seriesData[index]['serie']['name'],
          type: 'line',
          yAxis: 1,
          color: '#2B908F',
          data: this.seriesData[index]['observations']['chart data']['level']
        }]
      };
    });
  }
}
