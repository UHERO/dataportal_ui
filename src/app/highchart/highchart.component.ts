import { Component, Inject, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { HelperService } from '../helper.service';
import * as Highcharts from 'highcharts';

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
  @Input() minValue;
  @Input() maxValue;
  public options: Object;
  private chart;

  static findLastValue(valueArray) {
    let counter = valueArray.length - 1;
    while (valueArray[counter].y === null) {
      counter--;
      if (counter === -1) {
        return -1;
      }
    }
    return counter;
  }

  constructor(@Inject('defaultRange') private defaultRange, private _helper: HelperService) { }

  ngOnInit() {
    if (this.seriesData.seriesInfo === 'No data available' || this.seriesData.categoryDisplay.chartData.level.length === 0) {
      this.noDataChart(this.seriesData);
    } else {
      this.drawChart(this.seriesData, this.currentFreq, this.portalSettings, this.minValue, this.maxValue, this.chartStart, this.chartEnd);
    }
  }

  ngOnChanges() {
    this.drawChart(this.seriesData, this.currentFreq, this.portalSettings, this.minValue, this.maxValue, this.chartStart, this.chartEnd);
  }

  getSeriesStartAndEnd(dates, start, end) {
    const defaultRanges = this._helper.setDefaultCategoryRange(this.currentFreq, dates, this.defaultRange);
    let startIndex = defaultRanges.start, endIndex = defaultRanges.end;
    dates.forEach((item, index) => {
      if (item.date === start) {
        startIndex = index;
      }
      if (item.date === end) {
        endIndex = index;
      }
    });
    return { start: startIndex, end: endIndex };
  }

  drawChart(seriesData, currentFreq, portalSettings, min, max, start?, end?) {
    const dates = seriesData.categoryDisplay.chartData.dates;
    const seriesRange = this.getSeriesStartAndEnd(dates, start, end);
    const seriesStart = seriesRange.start;
    const seriesEnd = seriesRange.end;
    let series0 = seriesData.categoryDisplay.chartData[portalSettings.highcharts.series0Name];
    let series1 = seriesData.categoryDisplay.chartData[portalSettings.highcharts.series1Name];
    series0 = series0 ? series0.slice(seriesStart, seriesEnd + 1) : null;
    series1 = series1 ? series1.slice(seriesStart, seriesEnd + 1) : null;
    let startDate;
    if (!start) {
      startDate = dates[seriesStart].date;
    }
    // Check how many non-null points exist in level series
    const pointCount = series0.filter(value => Number.isFinite(value));
    const chartSeries = [];
    const minValue = min;
    const maxValue = max;
    const pseudoZones = seriesData.categoryDisplay.chartData.pseudoZones;
    const decimals = seriesData.seriesInfo.decimals ? seriesData.seriesInfo.decimals : 1;
    const percent = seriesData.seriesInfo.percent;
    const title = seriesData.seriesInfo.displayName;
    const dataFreq = currentFreq;
    const unitsShort = seriesData.seriesInfo.unitsLabelShort;
    chartSeries.push({
      name: portalSettings.highcharts.series0Name,
      type: portalSettings.highcharts.series0Type,
      yAxis: 1,
      data: series0,
      pointInterval: currentFreq === 'Q' ? 3 : 1,
      pointIntervalUnit: currentFreq === 'A' ? 'year' : 'month',
      pointStart: start ? Date.parse(start) : Date.parse(startDate),
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
    });
    if (series1) {
      chartSeries.push({
        name: portalSettings.highcharts.series1Name,
        type: portalSettings.highcharts.series1Type,
        data: series1,
        pointInterval: currentFreq === 'Q' ? 3 : 1,
        pointIntervalUnit: currentFreq === 'A' ? 'year' : 'month',
        pointStart: start ? Date.parse(start) : Date.parse(startDate),
        dataGrouping: {
          enabled: false
        },
      });
    }

    this.options = {
      chart: {
        spacingTop: 20, /* Add spacing to draw plot below fixed tooltip */
        className: pointCount.length === 1 ? 'single-point' : undefined
      },
      exporting: {
        enabled: false
      },
      title: {
        text: '<br>',
        useHTML: true,
        align: 'left',
        widthAdjust: 0,
        x: 0,
        y: -5,
        style: {
          margin: 75
        }
      },
      tooltip: {
        positioner: function () {
          return { x: 0, y: -5 };
        },
        shadow: false,
        borderWidth: 0,
        shared: true,
        formatter: function () {
          const getLabelName = function (seriesName, freq, precent) {
            if (seriesName === 'level') {
              return ': ';
            }
            if (seriesName === 'c5ma') {
              return percent ? 'Annual Chg: ' : 'Annual % Chg: ';
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
            if (freq === 'M' || freq === 'S') {
              return Highcharts.dateFormat('%b', date) + ' ';
            }
          };
          const pseudo = 'Pseudo History ';
          let s = '<b>' + title + '</b><br>';
          if (pointCount.length > 1) {
            // Get Quarter or Month for Q/M frequencies
            s = s + getFreqLabel(dataFreq, this.x);
            // Add year
            s = s + Highcharts.dateFormat('%Y', this.x) + '';
            this.points.forEach((point) => {
              const displayValue = Highcharts.numberFormat(point.y, decimals, '.', ',');
              const formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
              const name = getLabelName(point.series.name, dataFreq, percent);
              let label = name + formattedValue;
              if (point.series.name === 'level') {
                label += ' (' + unitsShort + ') <br>';
              }
              if (pseudoZones.length > 0) {
                pseudoZones.forEach((zone) => {
                  if (point.x < zone.value) {
                    const otherSeriesLabel = pseudo + name + formattedValue;
                    const levelLabel = otherSeriesLabel + ' (' + unitsShort + ') <br>';
                    s += point.series.name === 'level' ? levelLabel : otherSeriesLabel;
                    s += pseudo + name + formattedValue;
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
          }
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
        minTickInterval: 0.01,
      }, {
        title: {
          text: ''
        },
        labels: {
          enabled: false
        },
        min: minValue,
        max: maxValue,
        minTickInterval: 0.01,
        opposite: true
      }],
      plotOptions: {
        line: {
          marker: {
            enabled: pointCount.length === 1 ? false : true,
            radius: 1.5
          }
        }
      },
      series: chartSeries,
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
    latestSeries0 = (series0 !== undefined) ? HighchartComponent.findLastValue(series0.points) : -1;
    latestSeries1 = (series1 !== undefined) ? HighchartComponent.findLastValue(series1.points) : -1;

    // Prevent tooltip from being hidden on mouseleave
    // Reset toolip value and marker to most recent observation
    this.chart.tooltip.hide = function () {
      if (latestSeries0 > -1 && latestSeries1 > -1) {
        this.chart.tooltip.refresh([series0.points[latestSeries0], series1.points[latestSeries1]]);
        series0.points[latestSeries0].setState('');
      }
      // If there are no YTD values
      if (latestSeries0 > -1 && latestSeries1 === -1) {
        this.chart.tooltip.refresh([series0.points[latestSeries0]]);
        series0.points[latestSeries0].setState('');
      }
    };
    // Display tooltip when chart loads
    if (latestSeries0 > -1 && latestSeries1 > -1) {
      this.chart.tooltip.refresh([series0.points[latestSeries0], series1.points[latestSeries1]]);
      this.checkPointCount(series0, series0.points[latestSeries0], series1.points[latestSeries1], series1);
    }
    // If there are no YTD values
    if (latestSeries0 > -1 && latestSeries1 === -1) {
      this.chart.tooltip.refresh([series0.points[latestSeries0]]);
      this.checkPointCount(series0, series0.points[latestSeries0]);
    }
    // If no data available for a given date range, display series title and display dates where data is available for a series
    if (latestSeries0 === -1 && latestSeries1 === -1) {
      this.chart.setClassName(undefined);
      const start = this._helper.formatDate(this.seriesData.categoryDisplay.start, this.seriesData.seriesInfo.frequencyShort);
      const end = this._helper.formatDate(this.seriesData.categoryDisplay.end, this.seriesData.seriesInfo.frequencyShort);
      this.chart.setTitle({ text: '<b>' + this.seriesData.seriesInfo.displayName + '</b>' });
      this.chart.setSubtitle({ text: 'Data Available From: ' + start + ' - ' + end, verticalAlign: 'middle', y: -20 });
    }
  }

  checkPointCount(series0, point0, point1?, series1?) {
    // Fiilter out null values
    const pointCount = series0.yData.filter(value => Number.isFinite(value));
    // If only 1 non-null value exists, display data value as text
    if (pointCount.length === 1) {
      this.addSubtitle(point0, this.currentFreq, point1, series1);
      series0.userOptions.states.hover.enabled = false;
      series0.options.marker.states.hover.enabled = false;
      point0.setState('');
    }
  }

  addSubtitle(point0, freq, point1?, series1?) {
    const decimals = this.seriesData.seriesInfo.decimals ? this.seriesData.seriesInfo.decimals : 1;
    const unitsShort = this.seriesData.seriesInfo.unitsLabelShort;
    const percent = this.seriesData.seriesInfo.percent;
    const dateLabel = this.formatDateLabel(point0.x, freq);
    let subtitleText = '';
    subtitleText += Highcharts.numberFormat(point0.y, decimals, '.', ',') + '<br> (' + unitsShort + ') <br>';
    subtitleText += series1 ?
      this.formatTransformLabel(series1.name, percent) + '<br>' + Highcharts.numberFormat(point1.y, decimals, '.', ',') + '<br>' + dateLabel :
      dateLabel;
    this.chart.setSubtitle({
      text: subtitleText,
      verticalAlign: 'middle',
      y: -20
    });
  }

  formatTransformLabel(transformationName, percent) {
    if (transformationName === 'c5ma') {
      return percent ? 'Annual Chg: ' : 'Annual % Chg: ';
    }
    if (transformationName === 'ytd' && this.currentFreq === 'A') {
      return percent ? 'Year/Year Chg: ' : 'Year/Year % Chg: ';
    }
    if (transformationName === 'ytd' && this.currentFreq !== 'A') {
      return percent ? 'Year-to-Date Chg: ' : 'Year-to-Date % Chg: ';
    }
  }

  formatDateLabel(date, freq) {
    const year = Highcharts.dateFormat('%Y', date);
    if (freq === 'A') {
      return year;
    }
    if (freq === 'Q') {
      if (Highcharts.dateFormat('%b', date) === 'Jan') {
        return 'Q1 ' + year;
      }
      if (Highcharts.dateFormat('%b', date) === 'Apr') {
        return 'Q2 ' + year;
      }
      if (Highcharts.dateFormat('%b', date) === 'Jul') {
        return 'Q3 ' + year;
      }
      if (Highcharts.dateFormat('%b', date) === 'Oct') {
        return 'Q4 ' + year;
      }
    }
    if (freq === 'M' || freq === 'S') {
      return Highcharts.dateFormat('%b', date) + ' ' + year;
    }
  }

  trimData(dataArray, start, end) {
    const defaultRanges = this._helper.setDefaultCategoryRange(this.currentFreq, dataArray, this.defaultRange);
    let startIndex = defaultRanges.start, endIndex = defaultRanges.end;
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
