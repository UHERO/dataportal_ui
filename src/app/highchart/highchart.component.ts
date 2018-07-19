import { Component, Inject, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { HelperService } from '../helper.service';
import * as Highcharts from 'highcharts/js/highcharts';
import { HighchartsObject } from '../HighchartsObject';

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
  Highcharts = Highcharts;
  chartOptions = <HighchartsObject>{};
  updateChart = false;

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
      this.updateChart = true;
      this.noDataChart(this.seriesData);
    } else {
      this.updateChart = true;
      this.drawChart(this.seriesData, this.currentFreq, this.portalSettings, this.minValue, this.maxValue, this.chartStart, this.chartEnd);
    }
  }

  ngOnChanges() {
    this.updateChart = true;
    this.drawChart(this.seriesData, this.currentFreq, this.portalSettings, this.minValue, this.maxValue, this.chartStart, this.chartEnd);
  }

  getSeriesStartAndEnd = (dates, start, end) => {
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
  };

  setChartTitle = (title: string) => {
    return {
      text: title,
      useHTML: true,
      align: 'left',
      widthAdjust: 0,
      x: 0,
      y: -5,
      style: {
        margin: 75
      }
    };
  };

  setXAxis = () => {
    return {
      type: 'datetime',
      labels: {
        enabled: false
      },
      lineWidth: 0,
      tickLength: 0
    };
  };

  drawChart = (seriesData, currentFreq, portalSettings, min, max, start?, end?) => {
    const dates = seriesData.categoryDisplay.chartData.dates;
    const seriesRange = this.getSeriesStartAndEnd(dates, start, end);
    const seriesStart = seriesRange.start;
    const seriesEnd = seriesRange.end;
    let series0 = seriesData.categoryDisplay.chartData[portalSettings.highcharts.series0Name];
    let series1 = seriesData.categoryDisplay.chartData[portalSettings.highcharts.series1Name];
    series0 = series0 ? series0.slice(seriesStart, seriesEnd + 1) : null;
    series1 = series1 ? series1.slice(seriesStart, seriesEnd + 1) : null;
    const startDate = !start ? dates[seriesStart].date : undefined;
    const categoryDisplayStart = seriesData.categoryDisplay.start;
    const categoryDisplayEnd = seriesData.categoryDisplay.end;
    // Check how many non-null points exist in level series
    const levelLength = series0.filter(value => Number.isFinite(value));
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
      pointInterval: currentFreq === 'Q' ? 3 : currentFreq === 'S' ? 6 : 1,
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
        pointInterval: currentFreq === 'Q' ? 3 : currentFreq === 'S' ? 6 : 1,
        pointIntervalUnit: currentFreq === 'A' ? 'year' : 'month',
        pointStart: start ? Date.parse(start) : Date.parse(startDate),
        dataGrouping: {
          enabled: false
        },
      });
    }
    const addSubtitle = (point0, freq, chart, point1?, series1?) => {
      const dateLabel = this.formatDateLabel(point0.x, freq);
      let subtitleText = '';
      subtitleText += Highcharts.numberFormat(point0.y, decimals, '.', ',') + '<br> (' + unitsShort + ') <br>';
      subtitleText += series1 ?
        this.formatTransformLabel(series1.name, percent) + '<br>' + Highcharts.numberFormat(point1.y, decimals, '.', ',') + '<br>' + dateLabel :
        dateLabel;
      chart.setSubtitle({
        text: subtitleText,
        verticalAlign: 'middle',
        y: -20
      });
    }
    const refreshTooltip = (chart, tooltipData, latest0, series0) => {
      chart.tooltip.refresh(tooltipData);
      series0.points[latest0].setState('');
      const pointCount = series0.points.filter(point => Number.isFinite(point.y));
      if (pointCount.length > 1) {
        chart.setSubtitle({ text: '' });
      }
    };
    const formatDate = (date, freq) => this._helper.formatDate(date, freq);
    const checkPointCount = (freq, series0, point0, chart, point1?, series1?) => {
      // Fiilter out null values
      const pointCount = series0.points.filter(point => Number.isFinite(point.y));
      // If only 1 non-null value exists, display data value as text
      if (pointCount.length === 1) {
        addSubtitle(point0, freq, chart, point1, series1);
        series0.userOptions.states.hover.enabled = false;
        series0.options.marker.states.hover.enabled = false;
        point0.setState('');
      }
      if (pointCount.length > 1) {
        chart.setSubtitle({ text: '' });
      }
    }
    this.chartOptions.chart = {
      spacingTop: 20,
      className: levelLength.length === 1 ? 'single-point' : undefined,
      events: {
        render: function () {
          const series0 = this.series[0];
          const series1 = this.series[1];
          // Get position of last non-null value
          const latestSeries0 = (series0 !== undefined && series0.points && series0.points.length) ? HighchartComponent.findLastValue(series0.points) : -1;
          const latestSeries1 = (series1 !== undefined && series1.points && series1.points.length) ? HighchartComponent.findLastValue(series1.points) : -1;

          // Prevent tooltip from being hidden on mouseleave
          // Reset toolip value and marker to most recent observation
          this.tooltip.hide = () => {
            if (latestSeries0 > -1 && latestSeries1 > -1) {
              const tooltipData = [series0.points[latestSeries0], series1.points[latestSeries1]]
              refreshTooltip(this, tooltipData, latestSeries0, series0);
            }
            // If there are no YTD values
            if (latestSeries0 > -1 && latestSeries1 === -1) {
              const tooltipData = [series0.points[latestSeries0]];
              refreshTooltip(this, tooltipData, latestSeries0, series0);
            }
          };
          // Display tooltip when chart loads
          if (latestSeries0 > -1 && latestSeries1 > -1) {
            this.tooltip.refresh([series0.points[latestSeries0], series1.points[latestSeries1]]);
            checkPointCount(dataFreq, series0, series0.points[latestSeries0], this, series1.points[latestSeries1], series1);
          }
          if (latestSeries0 > -1 && latestSeries1 === -1) {
            this.tooltip.refresh([series0.points[latestSeries0]]);
            checkPointCount(dataFreq, series0, series0.points[latestSeries0], this);
          }
          // If no data available for a given date range, display series title and display dates where data is available for a series
          if (latestSeries0 === -1 && latestSeries1 === -1) {
            this.setClassName(undefined);
            const start = formatDate(categoryDisplayStart, dataFreq);
            const end = formatDate(categoryDisplayEnd, dataFreq);
            this.setTitle({ text: '<b>' + title + '</b>' });
            this.setSubtitle({ text: 'Data Available From: ' + start + ' - ' + end, verticalAlign: 'middle', y: -20 });
          }
        }
      }
    };
    this.chartOptions.exporting = {
      enabled: false
    }
    this.chartOptions.title = this.setChartTitle('<br>');
    this.chartOptions.tooltip = {
      positioner: function () {
        return { x: 0, y: -5 };
      },
      shadow: false,
      borderWidth: 0,
      shared: true,
      formatter: function () {
        const getLabelName = (seriesName, freq, precent) => {
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
        const getFreqLabel = (freq, date) => {
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
        if (levelLength.length > 1) {
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
    };
    this.chartOptions.legend = { enabled: false };
    this.chartOptions.credits = { enabled: false };
    this.chartOptions.xAxis = this.setXAxis();
    this.chartOptions.yAxis = [{
      labels: {
        enabled: false
      },
      title: {
        text: ''
      },
      minTickInterval: 0.01
    }, {
      labels: {
        enabled: false
      },
      title: {
        text: ''
      },
      min: minValue,
      max: maxValue,
      minTickInterval: 0.01,
      opposite: true
    }];
    this.chartOptions.plotOptions = {
      line: {
        marker: {
          enabled: levelLength.length === 1 ? false : true,
          radius: 1.5
        }
      }
    };
    this.chartOptions.series = chartSeries;
  }

  formatTransformLabel = (transformationName, percent) => {
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

  formatDateLabel = (date, freq) => {
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

  noDataChart = (seriesData) => {
    const title = seriesData.seriesInfo.title === undefined ? seriesData.seriesInfo.name : seriesData.seriesInfo.title;
    this.chartOptions.title = this.setChartTitle('<b>' + title + '</b><br>No Data Available');
    this.chartOptions.exporting = { enabled: false };
    this.chartOptions.legend = { enabled: false };
    this.chartOptions.credits = { enabled: false };
    this.chartOptions.yAxis = [{
      title: {
        text: ''
      }
    }];
    this.chartOptions.xAxis = this.setXAxis();
    this.chartOptions.series = [{
      data: []
    }];
    this.chartOptions.lang = { noData: 'No Data Available' };
  }
}
