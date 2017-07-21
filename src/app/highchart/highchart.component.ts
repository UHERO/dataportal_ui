import { Component, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./highchart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HighchartComponent implements OnInit, OnChanges {
  @Input() portalSettings;
  @Input() seriesData;
  @Input() currentFreq;
  @Input() chartStart;
  @Input() chartEnd;
  public options: Object;
  private chart;

  static findLastValue(valueArray) {
    let counter = valueArray.length - 1;
    while (valueArray[counter].y === null) {
      counter--;
      if (counter === -1) {
        return null;
      }
    }
    return counter;
  }

  constructor(private _helper: HelperService) { }

  ngOnInit() {
    if (this.seriesData.seriesInfo === 'No data available' || this.seriesData.chartData.level.length === 0) {
      this.noDataChart(this.seriesData);
    } else {
      this.drawChart(this.seriesData, this.currentFreq, this.portalSettings, this.chartStart, this.chartEnd);
    }
  }

  ngOnChanges() {
    this.drawChart(this.seriesData, this.currentFreq, this.portalSettings, this.chartStart, this.chartEnd);
  }

  drawChart(seriesData, currentFreq, portalSettings, start?, end?) {
    let series0 = seriesData.categoryChart.chartData[portalSettings.highcharts.series0Name];
    let series1 = seriesData.categoryChart.chartData[portalSettings.highcharts.series1Name];
    series0 = this.trimData(series0, start, end);
    series1 = this.trimData(series1, start, end);
    const pseudoZones = seriesData.categoryChart.chartData.pseudoZones;
    const decimals = seriesData.seriesInfo.decimals ? seriesData.seriesInfo.decimals : 1;
    const percent = seriesData.seriesInfo.percent;
    const title = seriesData.seriesInfo.title === undefined ? seriesData.seriesInfo.name : seriesData.seriesInfo.title;
    const dataFreq = currentFreq;
    const unitsShort = seriesData.seriesInfo.unitsLabelShort;

    this.options = {
      chart: {
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
        formatter: function () {
          const getLabelName = function (seriesName, freq, precent) {
            if (seriesName === 'Level') {
              return ': ';
            }
            if (seriesName === 'c5ma') {
              return percent ? 'Centered 5 Year Moving Avg Chg: ' : 'Centered 5 Year Moving Avg % Chg: ';
            }
            if (seriesName === 'ytd' && freq === 'A') {
              return percent ? 'Year/Year Chg: ' : 'Year/Year % Chg: ';
            }
            if (seriesName === 'ytd' && freq !== 'A') {
              return percent ? 'Year-to-Date Chg: ' : 'Year-to-Date % Chg: ';
            }
          };
          const getFreqLabel = function (freq, date) {
            if (freq === 'A') {
              return '';
            }
            if (freq === 'Q') {
              if (Highcharts.dateFormat('%b', date) === 'Jan') {
                return 'Q1 ';
              }
              if (Highcharts.dateFormat('%b', date) === 'Apr') {
                return 'Q2 ';
              }
              if (Highcharts.dateFormat('%b', date) === 'Jul') {
                return 'Q3 ';
              }
              if (Highcharts.dateFormat('%b', date) === 'Oct') {
                return 'Q4 ';
              }
            }
            if (freq === 'M' || 'S') {
              return Highcharts.dateFormat('%b', date) + ' ';
            }
          };
          const pseudo = 'Pseudo History ';
          let s = '<b>' + title + '</b><br>';
          // Get Quarter or Month for Q/M frequencies
          s = s + getFreqLabel(dataFreq, this.x);
          // Add year
          s = s + Highcharts.dateFormat('%Y', this.x) + '';
          this.points.forEach((point) => {
            const name = getLabelName(point.series.name, dataFreq, percent);
            let label = name + Highcharts.numberFormat(point.y, decimals);
            if (point.series.name === 'Level') {
              label += ' (' + unitsShort + ') <br>';
            }
            if (pseudoZones.length > 0) {
              pseudoZones.forEach((zone) => {
                if (point.x < zone.value) {
                  s += pseudo + name + Highcharts.numberFormat(point.y, decimals);
                  if (point.series.name === 'Level') {
                    s += ' (' + unitsShort + ') <br>';
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
        useHTML: true
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
      }, {
        title: {
          text: ''
        },
        labels: {
          enabled: false
        },
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
        data: series0,
        states: {
          hover: {
            lineWidth: 2
          }
        },
        dataGrouping: {
          enabled: false
        },
        zoneAxis: 'x',
        zones: pseudoZones,
        zIndex: 1
      }, {
        name: portalSettings.highcharts.series1Name,
        type: portalSettings.highcharts.series1Type,
        data: series1,
        dataGrouping: {
          enabled: false
        },
      }],
    };
  }

  noDataChart(seriesData) {
    const title = seriesData.seriesInfo.title === undefined ? seriesData.seriesInfo.name : seriesData.seriesInfo.title;

    this.options = {
      title: {
        text: '<b>' + title + '</b><br>' + 'No Data Available',
        align: 'left',
        widthAdjust: 0,
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
      }
    };
  }

  render(event) {
    this.chart = event;
    let latestSeries0, latestSeries1;
    const series0 = this.chart.series[0];
    const series1 = this.chart.series[1];
    // Get position of last non-null value
    latestSeries0 = (series0 !== undefined) ? HighchartComponent.findLastValue(series0.points) : null;
    latestSeries1 = (series1 !== undefined) ? HighchartComponent.findLastValue(series1.points) : null;

    // Prevent tooltip from being hidden on mouseleave
    // Reset toolip value and marker to most recent observation
    this.chart.tooltip.hide = function() {
      if (latestSeries0 > 0 && latestSeries1 > 0) {
        this.chart.tooltip.refresh([series0.points[latestSeries0], series1.points[latestSeries1]]);
        series0.points[latestSeries0].setState('hover');
      }
    };

    // Display tooltip when chart loads
    if (latestSeries0 > 0 && latestSeries1 > 0) {
      this.chart.tooltip.refresh([series0.points[latestSeries0], series1.points[latestSeries1]]);
    }
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
