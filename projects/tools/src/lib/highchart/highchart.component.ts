import { Component, Inject, OnChanges, Input } from '@angular/core';
import { HelperService } from '../helper.service';
import * as Highcharts from 'highcharts';
import { HighchartsObject } from '../tools.models';
import { HighstockHelperService } from '../highstock-helper.service';

@Component({
  selector: 'lib-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.scss']
})
export class HighchartComponent implements OnChanges {
  @Input() portalSettings;
  @Input() seriesData;
  @Input() currentFreq;
  @Input() chartStart;
  @Input() chartEnd;
  @Input() minValue;
  @Input() maxValue;
  @Input() categoryDates;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {} as HighchartsObject;
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

  constructor(
    @Inject('defaultRange') private defaultRange,
    private helperService: HelperService,
    private highstockHelper: HighstockHelperService
  ) { }

  ngOnChanges() {
    if (this.seriesData.seriesInfo === 'No data available') {
      this.noDataChart(this.seriesData);
      this.updateChart = true;
    } else {
      this.drawChart(this.seriesData, this.currentFreq, this.portalSettings, this.minValue, this.maxValue, this.chartStart, this.chartEnd);
      this.updateChart = true;
    }
  }

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
  }

  setXAxis = () => {
    return {
      type: 'datetime',
      labels: {
        enabled: false
      },
      lineWidth: 0,
      tickLength: 0
    };
  }

  setYAxis = (min?: number, max?: number) => {
    return [{
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
      min,
      max,
      minTickInterval: 0.01,
      opposite: true
    }];
  }

  setChartSeries = (portalSettings, series0, currentFreq, startDate, pseudoZones, series1) => {
    const chartSeries = [];
    chartSeries.push({
      name: portalSettings.highcharts.series0Name,
      type: portalSettings.highcharts.series0Type,
      yAxis: 1,
      data: series0,
      pointInterval: this.highstockHelper.freqInterval(currentFreq),
      pointIntervalUnit: this.highstockHelper.freqIntervalUnit(currentFreq),
      pointStart: startDate,
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
        pointInterval: this.highstockHelper.freqInterval(currentFreq),
        pointIntervalUnit: this.highstockHelper.freqIntervalUnit(currentFreq),
        pointStart: startDate,
        dataGrouping: {
          enabled: false
        },
      });
    }
    return chartSeries;
  }

  drawChart = (seriesData, currentFreq: string, portalSettings, min: number, max: number, chartStart?, chartEnd?) => {
    const { dates, pseudoZones } = seriesData.categoryDisplay.chartData;
    const { start, end } = seriesData.categoryDisplay;
    const { percent, title, unitsLabelShort, displayName } = seriesData.seriesInfo;
    const { seriesStart, seriesEnd } = this.helperService.getSeriesStartAndEnd(this.categoryDates, chartStart, chartEnd, currentFreq, this.defaultRange);
    const decimals = seriesData.seriesInfo.decimals || 1;
    let series0 = seriesData.categoryDisplay.chartData.series0;
    let series1 = seriesData.categoryDisplay.chartData.series1;
    series0 = series0 ? series0.slice(seriesStart, seriesEnd + 1) : null;
    series1 = series1 ? series1.slice(seriesStart, seriesEnd + 1) : null;
    const chartStartExists = this.categoryDates.find(d => chartStart === d.date);
    const startDate = chartStartExists ? Date.parse(chartStart) : Date.parse(this.categoryDates[seriesStart].date);
    // Check how many non-null points exist in level series
    const levelLength = series0.filter(value => Number.isFinite(value));
    const chartSeries = this.setChartSeries(portalSettings, series0, currentFreq, startDate, pseudoZones, series1);
    const addSubtitle = (point0, freq, chart, point1?, s1?) => {
      const dateLabel = this.formatDateLabel(point0.x, freq);
      let subtitleText = '';
      subtitleText += Highcharts.numberFormat(point0.y, decimals, '.', ',') + '<br> (' + unitsLabelShort + ') <br>';
      subtitleText += s1 ?
      `${this.formatTransformLabel(s1.name, percent)}<br>${Highcharts.numberFormat(point1.y, decimals, '.', ',')}<br>${dateLabel}` :
        dateLabel;
      chart.setSubtitle({
        text: subtitleText,
        verticalAlign: 'middle',
        y: -20
      });
    };
    const refreshTooltip = (chart, tooltipData, latest0, s0) => {
      chart.tooltip.refresh(tooltipData);
      s0.points[latest0].setState('');
      const pointCount = s0.points.filter(point => Number.isFinite(point.y));
      if (pointCount.length > 1) {
        chart.setSubtitle({ text: '' });
      }
    };
    const formatDate = (date, freq) => this.helperService.formatDate(date, freq);
    const checkPointCount = (freq, s0, point0, chart, point1?, s1?) => {
      // Fiilter out null values
      const pointCount = s0.points.filter(point => Number.isFinite(point.y));
      // If only 1 non-null value exists, display data value as text
      if (pointCount.length === 1) {
        addSubtitle(point0, freq, chart, point1, s1);
        s0.userOptions.states.hover.enabled = false;
        s0.options.marker.states.hover.enabled = false;
        point0.setState('');
      }
      if (pointCount.length > 1) {
        chart.setSubtitle({ text: '' });
      }
    };
    this.chartOptions.chart = {
      spacingTop: 20,
      className: levelLength.length === 1 ? 'single-point' : undefined,
      events: {
        render() {
          const s0 = this.series[0];
          const s1 = this.series[1];
          // Get position of last non-null value
          const latestSeries0 = (s0 !== undefined && s0.points && s0.points.length) ?
            HighchartComponent.findLastValue(s0.points) : -1;
          const latestSeries1 = (s1 !== undefined && s1.points && s1.points.length) ?
            HighchartComponent.findLastValue(s1.points) : -1;

          // Prevent tooltip from being hidden on mouseleave
          // Reset toolip value and marker to most recent observation
          this.tooltip.hide = () => {
            if (latestSeries0 > -1 && latestSeries1 > -1) {
              const tooltipData = [s0.points[latestSeries0], s1.points[latestSeries1]];
              refreshTooltip(this, tooltipData, latestSeries0, s0);
            }
            // If there are no YTD values
            if (latestSeries0 > -1 && latestSeries1 === -1) {
              const tooltipData = [s0.points[latestSeries0]];
              refreshTooltip(this, tooltipData, latestSeries0, s0);
            }
          };
          // Display tooltip when chart loads
          if (latestSeries0 > -1 && latestSeries1 > -1) {
            this.tooltip.refresh([s0.points[latestSeries0], s1.points[latestSeries1]]);
            checkPointCount(currentFreq, s0, s0.points[latestSeries0], this, s1.points[latestSeries1], s1);
          }
          if (latestSeries0 > -1 && latestSeries1 === -1) {
            this.tooltip.refresh([s0.points[latestSeries0]]);
            checkPointCount(currentFreq, s0, s0.points[latestSeries0], this);
          }
          // If no data available for a given date range, display series title and display dates where data is available for a series
          if (latestSeries0 === -1 && latestSeries1 === -1) {
            this.setClassName(undefined);
            const categoryDisplayStart = formatDate(start, currentFreq);
            const categoryDisplayEnd = formatDate(end, currentFreq);
            this.setTitle({ text: '<b>' + title + '</b>' });
            this.setSubtitle({
              text: `Data Available From: ${categoryDisplayStart} - ${categoryDisplayEnd}`,
              verticalAlign: 'middle',
              y: -20
            });
          }
        }
      },
      styledMode: true,
    };
    this.chartOptions.exporting = { enabled: false };
    this.chartOptions.title = this.setChartTitle('<br>');
    this.chartOptions.tooltip = {
      positioner() {
        return { x: 0, y: -5 };
      },
      shadow: false,
      borderWidth: 0,
      shared: true,
      formatter() {
        const getLabelName = (seriesName, freq, perc) => {
          if (seriesName === 'level') {
            return ': ';
          }
          if (seriesName === 'c5ma') {
            return perc ? 'Annual Chg: ' : 'Annual % Chg: ';
          }
          if (seriesName === 'ytd' && freq === 'A') {
            return perc ? 'Year/Year Chg: ' : 'Year/Year % Chg: ';
          }
          if (seriesName === 'ytd' && freq !== 'A') {
            return perc ? 'Year-to-Date Chg: ' : 'Year-to-Date % Chg: ';
          }
        };
        const getFreqLabel = (freq, date) => {
          if (freq === 'A') {
            return '';
          }
          if (freq === 'Q') {
            const month = Highcharts.dateFormat('%b', date);
            if (month === 'Jan' || month === 'Feb' || month === 'Mar') {
              return 'Q1 ';
            }
            if (month === 'Apr' || month === 'May' || month === 'Jun') {
              return 'Q2 ';
            }
            if (month === 'Jul' || month === 'Aug' || month === 'Sep') {
              return 'Q3 ';
            }
            if (month === 'Oct' || month === 'Nov' || month === 'Dec') {
              return 'Q4 ';
            }
          }
          if (freq === 'M' || freq === 'S') {
            return Highcharts.dateFormat('%b', date) + ' ';
          }
          return Highcharts.dateFormat('%b %d', date) + ' ';
        };
        const getSeriesLabel = (points, labelString) => {
          points.forEach((point) => {
            const displayValue = Highcharts.numberFormat(point.y, decimals, '.', ',');
            const formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
            const name = getLabelName(point.series.name, currentFreq, percent);
            let label = name + formattedValue;
            const pseudo = ' Pseudo History ';
            if (point.series.name === 'level') {
              label += ' (' + unitsLabelShort + ') <br>';
            }
            if (pseudoZones.length) {
              pseudoZones.forEach((zone) => {
                if (point.x < zone.value) {
                  const otherSeriesLabel = pseudo + name + formattedValue;
                  const levelLabel = otherSeriesLabel + ' (' + unitsLabelShort + ') <br>';
                  labelString += point.series.name === 'level' ? levelLabel : otherSeriesLabel;
                }
                if (point.x >= zone.value) {
                  labelString += label;
                }
              });
            }
            if (pseudoZones.length === 0){
              labelString += label;
            }
          });
          return labelString;
        };
        let s = '<b>' + displayName + '</b><br>';
        if (levelLength.length > 1) {
          // Get Quarter or Month for Q/M frequencies
          s = s + getFreqLabel(currentFreq, this.x);
          // Add year
          s = s + Highcharts.dateFormat('%Y', this.x) + '';
          s = getSeriesLabel(this.points, s);
        }
        return s;
      },
      useHTML: true
    };
    this.chartOptions.legend = { enabled: false };
    this.chartOptions.credits = { enabled: false };
    this.chartOptions.xAxis = this.setXAxis();
    this.chartOptions.yAxis = this.setYAxis(min, max);
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
      const month = Highcharts.dateFormat('%b', date);
      if (month === 'Jan' || month === 'Feb' || month === 'Mar') {
        return 'Q1 ';
      }
      if (month === 'Apr' || month === 'May' || month === 'Jun') {
        return 'Q2 ';
      }
      if (month === 'Jul' || month === 'Aug' || month === 'Sep') {
        return 'Q3 ';
      }
      if (month === 'Oct' || month === 'Nov' || month === 'Dec') {
        return 'Q4 ';
      }
    }
    if (freq === 'M' || freq === 'S') {
      return Highcharts.dateFormat('%b', date) + ' ' + year;
    }
    return Highcharts.dateFormat('%b %e, %Y', date);
  }

  noDataChart = (seriesData) => {
    const title = seriesData.seriesInfo.displayName;
    this.chartOptions.title = this.setChartTitle('<b>' + title + '</b><br>No Data Available');
    this.chartOptions.exporting = { enabled: false };
    this.chartOptions.legend = { enabled: false };
    this.chartOptions.credits = { enabled: false };
    this.chartOptions.yAxis = this.setYAxis();
    this.chartOptions.xAxis = this.setXAxis();
    this.chartOptions.series = [{
      data: []
    }];
    this.chartOptions.lang = { noData: 'No Data Available' };
  }
}
