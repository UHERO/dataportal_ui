// Highstock chart component used for single-series view
import { Component, Inject, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { Geography } from '../geography';
import { Frequency } from '../frequency';
import { HighchartChartData } from '../highchart-chart-data';
import { Series } from '../series';
import { HighstockObject } from '../HighstockObject';
import 'jquery';
declare var $: any;
declare var require: any;
const Highcharts = require('highcharts/js/highstock');
const exporting = require('../../../node_modules/highcharts/js/modules/exporting');
const offlineExport = require('../../../node_modules/highcharts/js/modules/offline-exporting');
const exportCSV = require('../csv-export');
exporting(Highcharts);
offlineExport(Highcharts);
exportCSV(Highcharts);

@Component({
  selector: 'app-highstock',
  templateUrl: './highstock.component.html',
  // Use styles defined in analyzer-highstock component
  styleUrls: ['../analyzer-highstock/analyzer-highstock.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HighstockComponent implements OnChanges {
  @Input() portalSettings;
  @Input() chartData;
  @Input() currentFreq;
  @Input() currentGeo;
  @Input() seriesDetail;
  @Input() start;
  @Input() end;

  // Async EventEmitter, emit tableExtremes on load to render table
  @Output() tableExtremes = new EventEmitter(true);
  // When user updates range selected, emit chartExtremes to update URL params
  @Output() chartExtremes = new EventEmitter(true);
  Highcharts = Highcharts;
  chartConstructor = 'stockChart';
  chartOptions = <HighstockObject>{};
  updateChart = false;
  chartObject;
  showChart = false;

  constructor(@Inject('defaultRange') private defaultRange) { }

  ngOnChanges() {
    if (Object.keys(this.seriesDetail).length) {
      this.showChart = true;
      this.drawChart(this.chartData, this.seriesDetail, this.currentGeo, this.currentFreq, this.portalSettings);
      this.updateChart = true;
    }
  }

  // Gets buttons used in Highstock Chart
  formatChartButtons(freq: string, buttons: Array<any>) {
    const chartButtons = buttons.reduce((allButtons, button) => {
      if (freq === 'A') {
        // Do not display 1Year button for series with an annual frequency
        if (button !== 1 && button !== 'all') {
          allButtons.push({ type: 'year', count: button, text: button + 'Y' });
        }
      }
      if (freq !== 'A') {
        if (button !== 'all') {
          allButtons.push({ type: 'year', count: button, text: button + 'Y' });
        }
      }
      if (button === 'all') {
        allButtons.push({ type: 'all', text: 'All' });
      }
      return allButtons;
    }, []);
    return chartButtons;
  }

  // Labels used for metadata in CSV download
  formatChartLabels(seriesDetail: Series, portalSettings, geo: Geography, freq: Frequency) {
    const labelItems = [{
      html: seriesDetail.sourceDescription
    }, {
      html: seriesDetail.sourceLink
    }, {
      html: seriesDetail.sourceDetails
    }, {
      html: seriesDetail.title + ': ' + portalSettings.highstock.labels.seriesLink + seriesDetail.id
    }, {
      html: portalSettings.highstock.labels.portal
    }, {
      html: portalSettings.highstock.labels.portalLink
    }, {
      html: 'Series: ' + seriesDetail.title + ' (' + geo.name + ', ' + freq.label + ')'
    }];
    return { items: labelItems, style: { display: 'none' } };
  }

  formatChartSeries(chartData: HighchartChartData, portalSettings, seriesDetail, freq: Frequency) {
    const series0 = chartData[portalSettings.highstock.series0Name];
    const series1 = chartData[portalSettings.highstock.series1Name];
    const series2 = chartData[portalSettings.highstock.series2Name];
    const yoyLabel = seriesDetail.percent ? 'YOY Change' : 'YOY % Change';
    const ytdLabel = seriesDetail.percent ? 'YTD Change' : 'YTD % Change';
    const c5maLabel = seriesDetail.percent ? 'Annual Change' : 'Annual % Change';
    const seriesLabels = { yoy: yoyLabel, ytd: ytdLabel, c5ma: c5maLabel, none: ' ' };
    const seriesStart = seriesDetail.seriesObservations ? seriesDetail.seriesObservations.observationStart : null;
    const series = [{
      name: 'Level',
      type: 'line',
      yAxis: 1,
      data: series0,
      pointInterval: freq.freq === 'Q' ? 3 : freq.freq === 'S' ? 6 : 1,
      pointIntervalUnit: freq.freq === 'A' ? 'year' : 'month',
      pointStart: Date.parse(seriesStart),
      states: {
        hover: {
          lineWidth: 2
        }
      },
      showInNavigator: true,
      dataGrouping: {
        enabled: false
      },
      zoneAxis: 'x',
      zones: chartData.pseudoZones,
      zIndex: 1
    }, {
      name: seriesLabels[portalSettings.highstock.series1Name],
      type: portalSettings.highstock.series1Type,
      data: series1,
      pointInterval: freq.freq === 'Q' ? 3 : freq.freq === 'S' ? 6 : 1,
      pointIntervalUnit: freq.freq === 'A' ? 'year' : 'month',
      pointStart: Date.parse(seriesStart),
      showInNavigator: false,
      dataGrouping: {
        enabled: false
      }
    }, {
      name: seriesLabels[portalSettings.highstock.series2Name],
      data: series2,
      pointInterval: freq.freq === 'Q' ? 3 : freq.freq === 'S' ? 6 : 1,
      pointIntervalUnit: freq.freq === 'A' ? 'year' : 'month',
      pointStart: Date.parse(seriesStart),
      includeInCSVExport: freq.freq === 'A' ? false : true,
      visible: false,
      dataGrouping: {
        enabled: false
      }
    }];
    return series;
  }

  drawChart(chartData: HighchartChartData, seriesDetail: Series, geo: Geography, freq: Frequency, portalSettings) {
    console.log('this.end', this.end)
    const decimals = seriesDetail.decimals ? seriesDetail.decimals : 1;
    const buttons = portalSettings.highstock.buttons;
    const chartButtons = this.formatChartButtons(freq.freq, buttons);
    const labelItems = this.formatChartLabels(seriesDetail, portalSettings, geo, freq);
    const pseudoZones = chartData.pseudoZones;
    const name = seriesDetail.title;
    const units = seriesDetail.unitsLabel ? seriesDetail.unitsLabel : seriesDetail.unitsLabelShort;
    const change = seriesDetail.percent ? 'Change' : '% Change';
    const chartRange = chartData.level ? this.getSelectedChartRange(this.start, this.end, chartData.dates, this.defaultRange) : null;
    const startDate = this.start ? this.start : chartRange ? chartRange.start : null;
    const endDate = this.end ? this.end : chartRange ? chartRange.end : null;
    const series = this.formatChartSeries(chartData, portalSettings, seriesDetail, freq);
    const tableExtremes = this.tableExtremes;
    const chartExtremes = this.chartExtremes;
    const formatTooltip = (args, points, x, pseudoZones, decimals, freq) => this.formatTooltip(args, points, x, pseudoZones, decimals, freq);
    const getChartExtremes = (chartObject) => {
      // Gets range of x values to emit
      // Used to redraw table in the single series view
      let xMin, xMax;
      // Selected level data
      let selectedRange = null;
      if (chartObject.series[0].points) {
        selectedRange = chartObject.series[0].points;
      }
      if (!chartObject.series[0].points.length) {
        return { min: null, max: null };
      }
      if (selectedRange.length) {
        xMin = new Date(selectedRange[0].x).toISOString().split('T')[0];
        xMax = new Date(selectedRange[selectedRange.length - 1].x).toISOString().split('T')[0];
        return { min: xMin, max: xMax };
      }
    }

    this.chartOptions.chart = {
      alignTicks: false,
      zoomType: 'x',
      description: freq.freq,
      events: {
        render: function () {
          if (!this.chartObject || this.chartObject.series.length < 4) {
            this.chartObject = Object.assign({}, this);
          }
          console.log('seriesDetail', seriesDetail)
          const extremes = getChartExtremes(this.chartObject);
          const lastDate = seriesDetail.seriesObservations.observationEnd;
          console.log('extremes', extremes)
          if (extremes) {
            tableExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
            chartExtremes.emit({ minDate: extremes.min, maxDate: extremes.max, endOfSample: lastDate === extremes.max ? true : false })
          }
        }
      }
    };
    this.chartOptions.labels = labelItems;
    this.chartOptions.rangeSelector = {
      selected: null,
      buttons: chartButtons,
      buttonPosition: { x: 0, y: 10 },
      labelStyle: { visibility: 'hidden' },
      inputEnabled: false,
    };
    this.chartOptions.lang = { exportKey: 'Download Chart' };
    this.chartOptions.exporting = {
      buttons: {
        contextButton: { enabled: false },
        exportButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG', 'downloadCSV'],
          text: 'Download',
          _titleKey: 'exportKey',
        }
      },
      csv: {
        dateFormat: '%Y-%m-%d',
      },
      filename: name + '_' + geo.name + '_' + freq.label,
      chartOptions: {
        events: null,
        navigator: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        rangeSelector: {
          enabled: false
        },
        credits: {
          enabled: true,
          text: portalSettings.highstock.credits,
          position: {
            align: 'right',
            x: -115,
            y: -41
          }
        },
        title: {
          text: name + ' (' + geo.name + ', ' + freq.label + ')',
          align: 'left'
        }
      }
    };
    this.chartOptions.tooltip = {
      borderWidth: 0,
      shadow: false,
      formatter: function (args) {
        return formatTooltip(args, this.points, this.x, pseudoZones, decimals, freq)
      }
    };
    this.chartOptions.credits = { enabled: false };
    this.chartOptions.xAxis = {
      events: {
        afterSetExtremes: function () {
          this._hasSetExtremes = true;
          this._extremes = getChartExtremes(this);
        }
      },
      minRange: 1000 * 3600 * 24 * 30 * 12,
      min: Date.parse(startDate),
      max: Date.parse(endDate),
      ordinal: false,
      labels: {
        formatter: function () {
          const getQLabel = function (month) {
            if (month === 'Jan') {
              return 'Q1 ';
            }
            if (month === 'Apr') {
              return 'Q2 ';
            }
            if (month === 'Jul') {
              return 'Q3 ';
            }
            if (month === 'Oct') {
              return 'Q4 ';
            }
          };
          let s = '';
          const month = Highcharts.dateFormat('%b', this.value);
          const frequency = this.chart.options.chart.description;
          const first = Highcharts.dateFormat('%Y', this.axis.userMin);
          const last = Highcharts.dateFormat('%Y', this.axis.userMax);
          s = ((last - first) <= 5) && frequency === 'Q' ? s + getQLabel(month) : '';
          s = s + Highcharts.dateFormat('%Y', this.value);
          return frequency === 'Q' ? s : this.axis.defaultLabelFormatter.call(this);
        }
      }
    };
    this.chartOptions.yAxis = [{
      className: 'series2',
      labels: {
        formatter: function () {
          return Highcharts.numberFormat(this.value, decimals, '.', ',');
        }
      },
      title: {
        text: change
      },
      opposite: false,
      minPadding: 0,
      maxPadding: 0,
      minTickInterval: 0.01
    }, {
      className: 'series1',
      title: {
        text: units
      },
      labels: {
        formatter: function () {
          return Highcharts.numberFormat(this.value, decimals, '.', ',');
        }
      },
      gridLineWidth: 0,
      minPadding: 0,
      maxPadding: 0,
      minTickInterval: 0.01,
      showLastLabel: true
    }];
    this.chartOptions.plotOptions = {
      series: { cropThreshold: 0 }
    };
    this.chartOptions.series = series;
  }

  formatTooltip(args, points, x, pseudoZones, decimals, freq) {
    const getFreqLabel = function (frequency, date) {
      if (frequency === 'A') {
        return '';
      }
      if (frequency === 'Q') {
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
      if (frequency === 'M' || frequency === 'S') {
        return Highcharts.dateFormat('%b', date);
      }
    };
    const pseudo = 'Pseudo History ';
    let s = '<b>';
    s = s + getFreqLabel(freq.freq, x);
    s = s + ' ' + Highcharts.dateFormat('%Y', x) + '</b>';
    points.forEach((point) => {
      const displayValue = Highcharts.numberFormat(point.y, decimals, '.', ',');
      const formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
      const seriesColor = '<br><span class="series-' + point.colorIndex + '">\u25CF</span> ';
      const seriesNameValue = point.series.name + ': ' + formattedValue;
      const label = seriesColor + seriesNameValue;
      if (pseudoZones.length) {
        pseudoZones.forEach((zone) => {
          if (point.x < zone.value) {
            return s += seriesColor + pseudo + seriesNameValue + '<br>';
          }
          if (point.x > zone.value) {
            return s += label;
          }
        });
      }
      if (!pseudoZones.length) {
        s += label;
      }
    });
    return s;
  }

  updateExtremes(e) {
    e.context._hasSetExtremes = true;
    e.context._extremes = this.getChartExtremes(e.context);
  }

  getChartExtremes(chartObject) {
    // Gets range of x values to emit
    // Used to redraw table in the single series view
    let xMin, xMax;
    // Selected level data
    let selectedRange = null;
    if (chartObject.series[0].points) {
      selectedRange = chartObject.series[0].points;
    }
    if (!chartObject.series[0].points.length) {
      return { min: null, max: null };
    }
    if (selectedRange.length) {
      xMin = new Date(selectedRange[0].x).toISOString().split('T')[0];
      xMax = new Date(selectedRange[selectedRange.length - 1].x).toISOString().split('T')[0];
      return { min: xMin, max: xMax };
    }
  }

  getSelectedChartRange(userStart, userEnd, dates, defaults) {
    const defaultEnd = defaults.end ? defaults.end : new Date(dates[dates.length - 1].date).toISOString().substr(0, 4);
    let counter = dates.length ? dates.length - 1 : null;
    while (new Date(dates[counter].date).toISOString().substr(0, 4) > defaultEnd) {
      counter--;
    }
    const end = userEnd ? userEnd : new Date(dates[counter].date).toISOString().substr(0, 10);
    const defaultStartYear = +new Date(dates[counter].date).toISOString().substr(0, 4) - defaults.range;
    const start = userStart ? userStart : defaultStartYear + new Date(dates[counter].date).toISOString().substr(4, 6);
    return { start: start, end: end };
  }
}