import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HelperService } from '../helper.service';
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
export class HighchartComponent implements OnInit, OnChanges {
  @Input() seriesData;
  @Input() currentFreq;
  @Input() chartStart;
  @Input() chartEnd;
  public options: Object;
  private chart;

  constructor(private _helper: HelperService) { }

  ngOnInit() {
    if (this.seriesData.seriesInfo === 'No data available' || this.seriesData.chartData.level.length === 0) {
      this.noDataChart(this.seriesData);
    } else {
      this.drawChart(this.seriesData, this.currentFreq, this.chartStart, this.chartEnd);
    }
  }

  ngOnChanges() {
    this.drawChart(this.seriesData, this.currentFreq, this.chartStart, this.chartEnd);
  }

  drawChart(seriesData, currentFreq, start?, end?) {
    let level, ytd;
    level = this.trimData(seriesData.categoryChart.chartData.level, start, end);
    ytd = this.trimData(ytd = seriesData.categoryChart.chartData.ytd, start, end);
    const pseudoZones = seriesData.categoryChart.chartData.pseudoZones;
    const decimals = seriesData.seriesInfo.decimals ? seriesData.seriesInfo.decimals : 1;
    const percent = seriesData.seriesInfo.percent;
    const title = seriesData.seriesInfo.title === undefined ? seriesData.seriesInfo.name : seriesData.seriesInfo.title;
    const dataFreq = currentFreq;
    const unitsShort = seriesData.seriesInfo.unitsLabelShort;

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
          return {x: 0, y: -5};
        },
        shadow: false,
        borderWidth: 0,
        shared: true,
        backgroundColor: 'transparent',
        formatter: function () {
          const pseudo = 'Pseudo History ';
          let s = '<b>' + title + '</b><br>';
          if (dataFreq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Jan') {
            s = s + 'Q1 ';
          };
          if (dataFreq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Apr') {
            s = s + 'Q2 ';
          };
          if (dataFreq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Jul') {
            s = s + 'Q3 ';
          };
          if (dataFreq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Oct') {
            s = s + 'Q4 ';
          };
          if (dataFreq === 'M' || dataFreq === 'S') {
            s = s + Highcharts.dateFormat('%b', this.x) + ' ';
          };
          s = s + Highcharts.dateFormat('%Y', this.x) + '';
          this.points.forEach((point) => {
            let name;
            if (point.series.name === 'Level') {
              name = '';
            }
            if (point.series.name === 'YTD' && dataFreq === 'A') {
              name = 'Year-over-Year';
            }
            if (point.series.name === 'YTD' && dataFreq !== 'A') {
              name = 'Year-to-Date';
            }
            if (point.series.name === 'YTD' && percent) {
              name += ' Chg: ';
            }
            if (point.series.name === 'YTD' && !percent) {
              name += ' % Chg: ';
            }
            let label = '<br>' + name + Highcharts.numberFormat(point.y, decimals);
            if (point.series.name === 'Level') {
              label += ' (' + unitsShort + ')';
            }
            if (pseudoZones.length > 0) {
              pseudoZones.forEach((zone) => {
                if (point.x < zone.value) {
                  s += '<br>' + pseudo + name + ': ' + Highcharts.numberFormat(point.y, decimals) + '<br>';
                  if (point.series.name === 'Level') {
                    s += ' (' + unitsShort + ')';
                  }
                }
                if (point.x >= zone.value) {
                  s += label;
                }
              });
            }
            if (pseudoZones.length === 0) {
              s += label;
            }
          });
          return s;
        },
        style: {
          color: '#505050',
          fontSize: '0.9em',
          letterSpacing: '0.05em',
          width: '190px',
          marginBottom: '5px',
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
        states: {
          hover: {
            lineWidth: 2
          }
        },
        dataGrouping: {
          enabled: false
        },
        zoneAxis: 'x',
        zones: pseudoZones
      }, {
        name: 'YTD',
        type: 'column',
        color: 'transparent',
        borderColor: 'transparent',
        data: ytd,
        dataGrouping: {
          enabled: false
        },
      }],
    };
  }

  noDataChart(seriesData) {
    const title = seriesData.seriesInfo.title === undefined ? seriesData.seriesInfo.name : seriesData.seriesInfo.title;

    this.options = {
      chart: {
        backgroundColor: '#F9F9F9'
      },
      title: {
        text: '<b>' + title + '</b><br>' + 'No Data Available',
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
        noData: 'No Data Available'
      },
      noData: {
        style: {
          color: '#505050',
          fontSize: '0.85em'
        }
      }
    };
  }

  render(event) {
    this.chart = event;
    let latestLevel, latestYtd;
    const level = this.chart.series[0];
    const ytd = this.chart.series[1];
    // Get position of last non-null value
    latestLevel = (level !== undefined) ? this.findLastValue(level.points) : null;
    latestYtd = (ytd !== undefined) ? this.findLastValue(ytd.points) : null;

    // Prevent tooltip from being hidden on mouseleave
    // Reset toolip value and marker to most recent observation
    this.chart.tooltip.hide = function() {
      if (latestLevel > 0 && latestYtd > 0) {
        this.chart.tooltip.refresh([level.points[latestLevel], ytd.points[latestYtd]]);
        level.points[latestLevel].setState('hover');
      }
    };

    // Display tooltip when chart loads
    if (latestLevel > 0 && latestYtd > 0) {
      this.chart.tooltip.refresh([level.points[latestLevel], ytd.points[latestYtd]]);
    }
  }

  findLastValue(valueArray) {
    let counter = valueArray.length;
    while (counter-- && !valueArray[counter].y);
    return counter;
  }

  trimData(dataArray, start, end) {
    const defaultRange = this._helper.setDefaultRange(this.currentFreq, dataArray);
    let startIndex = defaultRange.start, endIndex = defaultRange.end;
    dataArray.forEach((item, index) => {
      if (item[0] === start) {
        startIndex = index;
      }
      if (item[0] === end) {
        endIndex = index;
      }
    });
    return dataArray.slice(startIndex, endIndex + 1);
  }
}
