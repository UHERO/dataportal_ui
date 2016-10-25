import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

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
    console.log('highchart', this.seriesData);
    this.seriesData.forEach((series, index) => {
      this.options = {
        chart: {
          // height: 200,
          // width: 200,
          backgroundColor: '#3E3E40'
        },
        title: {
          text: this.seriesData[index]['serie']['title'],
          style: {
            color: '#FFFFFF',
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
          name: this.seriesData[index]['serie']['title'],
          type: 'line',
          yAxis: 1,
          color: '#2B908F',
          data: this.seriesData[index]['observations']['chart data']['level']
        }]
      };
    });
  }
}
