// Highstock chart component used for single-series view
import { Component, Inject, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { Geography } from '../geography';
import { Frequency } from '../frequency';
import { HighchartChartData } from '../highchart-chart-data';
import { Series } from '../series';
import 'jquery';
declare var $: any;

// import * as highcharts from 'highcharts';
declare var require: any;
const Highcharts = require('highcharts/js/highstock');
const exporting = require('../../../node_modules/highcharts/js/modules/exporting');
const offlineExport = require('../../../node_modules/highcharts/js/modules/offline-exporting');
const exportCSV = require('../csv-export');

Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

@Component({
  selector: 'app-highstock',
  templateUrl: './highstock.component.html',
  styleUrls: ['./highstock.component.scss'],
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
  public options: Object;
  private extremes;
  private chartObject;

  constructor(@Inject('defaultRange') private defaultRange) { }

  ngOnChanges() {
    this.drawChart(this.chartData, this.seriesDetail, this.currentGeo, this.currentFreq, this.portalSettings);
    // Emit dates when user selects a new range
    const $chart = $('#chart');
    const chartExtremes = this.chartExtremes;
    const tableExtremes = this.tableExtremes;
    $chart.bind('click', function () {
      const xAxis = $chart.highcharts().xAxis[0];
      if (xAxis._hasSetExtremes) {
        const extremes = { minDate: xAxis._extremes.min, maxDate: xAxis._extremes.max };
        tableExtremes.emit(extremes);
        chartExtremes.emit(extremes);
      }
      xAxis._hasSetExtremes = false;
    });
  }

  drawChart(chartData: HighchartChartData, seriesDetail: Series, geo: Geography, freq: Frequency, portalSettings) {
    const series0 = chartData[portalSettings.highstock.series0Name];
    const series1 = chartData[portalSettings.highstock.series1Name];
    const series2 = chartData[portalSettings.highstock.series2Name];
    const decimals = seriesDetail.decimals ? seriesDetail.decimals : 1;
    const pseudoZones = chartData.pseudoZones;
    const name = seriesDetail.title;
    const units = seriesDetail.unitsLabel ? seriesDetail.unitsLabel : seriesDetail.unitsLabelShort;
    const change = seriesDetail.percent ? 'Change' : '% Change';
    const yoyLabel = seriesDetail.percent ? 'YOY Change' : 'YOY % Change';
    const ytdLabel = seriesDetail.percent ? 'YTD Change' : 'YTD % Change';
    const c5maLabel = seriesDetail.percent ? 'Centered 5 Year Moving Avg Change' : 'Centered 5 Year Moving Avg % Change';
    const sourceDescription = seriesDetail.sourceDescription;
    const sourceLink = seriesDetail.sourceLink;
    const sourceDetails = seriesDetail. sourceDetails;
    const chartRange = chartData.level ? this.getSelectedChartRange(this.start, this.end, chartData.level, this.defaultRange) : null;
    const startDate = this.start ? this.start : chartRange ? chartRange.start : null;
    const endDate = this.end ? this.end : chartRange ? chartRange.end : null;
    const seriesLabels = { yoy: yoyLabel, ytd: ytdLabel, c5ma: c5maLabel, none: ' ' };

    this.options = {
      chart: {
        alignTicks: false,
        zoomType: 'x',
        // Description used in xAxis label formatter
        description: freq.freq
      },
      labels: {
        items: [{
          html: sourceDescription
        }, {
          html: sourceLink
        }, {
          html: sourceDetails
        }, {
          html: name + ': ' + portalSettings.highstock.labels.seriesLink + seriesDetail.id
        }, {
          html: portalSettings.highstock.labels.portal,
        }, {
          html: portalSettings.highstock.labels.portalLink
        }, {
          html: name + ' (' + geo.name + ', ' + freq.label + ')'
        }],
        style: {
          display: 'none'
        }
      },
      rangeSelector: {
        selected: !startDate && !endDate ? 2 : null,
        buttons: [{
          type: 'year',
          count: 1,
          text: '1Y'
        }, {
          type: 'year',
          count: 5,
          text: '5Y'
        }, {
          type: 'year',
          count: 10,
          text: '10Y'
        }, {
          type: 'all',
          text: 'All'
        }],
        buttonPosition: {
          x: 10,
          y: 10
        },
        labelStyle: {
          visibility: 'hidden'
        },
        inputEnabled: false
      },
      lang: {
        exportKey: 'Download Chart',
        printKey: 'Print Chart'
      },
      navigator: {
        series: {
          includeInCSVExport: false
        }
      },
      exporting: {
        buttons: {
          contextButton: {
            enabled: false
          },
          exportButton: {
            text: 'Download',
            _titleKey: 'exportKey',
            menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems.slice(2),
          },
          printButton: {
            text: 'Print',
            _titleKey: 'printKey',
            onclick: function () {
              this.print();
            }
          }
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
      },
      tooltip: {
        borderWidth: 0,
        shadow: false,
        formatter: function () {
          const getFreqLabel = function(frequency, date) {
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
          s = s + getFreqLabel(freq.freq, this.x);
          s = s + ' ' + Highcharts.dateFormat('%Y', this.x) + '</b>';
          this.points.forEach((point) => {
            const label = '<br><span class="series-' + point.colorIndex + '">\u25CF</span> ' +
              point.series.name + ': ' +
              Highcharts.numberFormat(point.y, decimals);
            if (pseudoZones.length) {
              pseudoZones.forEach((zone) => {
                if (point.x < zone.value) {
                  return s += '<br><span class="series-' + point.colorIndex + '">\u25CF</span> ' +
                    pseudo +
                    point.series.name +
                    ': ' +
                    Highcharts.numberFormat(point.y, decimals) +
                    '<br>';
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
      },
      credits: {
        enabled: false
      },
      xAxis: {
        minRange: 1000 * 3600 * 24 * 30 * 12,
        min: Date.parse(startDate),
        max: Date.parse(endDate),
        ordinal: false,
        labels: {
          formatter: function() {
            const getQLabel = function(month) {
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
            s = (last - first <= 5) && frequency === 'Q' ? s + getQLabel(month) : '';
            s = s + Highcharts.dateFormat('%Y', this.value);
            return frequency === 'Q' ? s : this.axis.defaultLabelFormatter.call(this);
          }
        }
      },
      yAxis: [{
        className: 'series1',
        labels: {
          format: '{value:,.2f}'
        },
        title: {
          text: change
        },
        opposite: false,
        minPadding: 0,
        maxPadding: 0,
        minTickInterval: 0.01
      }, {
        className: 'series2',
        title: {
          text: units
        },
        labels: {
          format: '{value:,.2f}'
        },
        gridLineWidth: 0,
        minPadding: 0,
        maxPadding: 0,
        showLastLabel: true
      }],
      plotOptions: {
        series: {
          cropThreshold: 0,
        }
      },
      series: [{
        name: seriesLabels[portalSettings.highstock.series0Name],
        type: portalSettings.highstock.series0Type,
        data: series0,
        showInNavigator: false,
        dataGrouping: {
          enabled: false
        }
      }, {
        name: 'Level',
        type: 'line',
        yAxis: 1,
        data: series1,
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
        zones: pseudoZones
      }, {
        name: seriesLabels[portalSettings.highstock.series2Name],
        data: series2,
        includeInCSVExport: freq.freq === 'A' ? false : true,
        visible: false,
        dataGrouping: {
          enabled: false
        }
      }]
    };
  }

  setTableExtremes(e) {
    // Workaround based on https://github.com/gevgeny/angular2-highcharts/issues/158
    // Exporting calls load event and creates empty e.context object, emitting wrong values to series table
    if (!this.chartObject || this.chartObject.series.length < 4) {
      this.chartObject = Object.assign({}, e.context);
    }
    const extremes = this.getChartExtremes(this.chartObject);
    if (extremes) {
      this.tableExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
    }
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

  getSelectedChartRange(userStart, userEnd, levelData, defaults) {
    let counter = levelData.length ? levelData.length - 1 : null;
    while (new Date(levelData[counter][0]).toISOString().substr(0, 4) > defaults.end) {
      counter--;
    }
    const end = userEnd ? userEnd : new Date(levelData[counter][0]).toISOString().substr(0, 10);
    const defaultStartYear = +new Date(levelData[counter][0]).toISOString().substr(0, 4) - defaults.range;
    const start = userStart ? userStart : defaultStartYear + new Date(levelData[counter][0]).toISOString().substr(4, 6);
    return { start: start , end: end };
  }

  checkDates(date, levelArray) {
    levelArray.forEach((item) => {
      if (Date.parse(date) === item[0]) {
        return true;
      }
      return false;
    });
  }
}
