import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

// import * as highcharts from 'highcharts';
declare var require: any;
const Highcharts = require('highcharts/js/highstock');
const exporting = require('../../../node_modules/highcharts/js/modules/exporting');
const offlineExport = require('../../../node_modules/highcharts/js/modules/offline-exporting');
const exportCSV = require('../csv-export');
declare var $: any;

Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

@Component({
  selector: 'app-analyzer-highstock',
  templateUrl: './analyzer-highstock.component.html',
  styleUrls: ['./analyzer-highstock.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyzerHighstockComponent implements OnInit, OnChanges {
  @Input() series;
  @Output() tableExtremes = new EventEmitter(true);  
  private options;
  private chart;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    // Series in the analyzer that have been selected to be displayed in the chart
    const selectedAnalyzerSeries = this.formatSeriesData(this.series);
    const freq = this.checkFrequencies(this.series);
    if (this.chart) {
      // If a chart has been generated:
      // Check if series in the chart are selected in the analyzer, if not, remove series from the chart
      this.checkChartSeries(this.chart.series, selectedAnalyzerSeries);
      // Check if the selected series have been drawn in the chart, if not, add series to the chart
      this.checkAnalyzerSeries(selectedAnalyzerSeries, this.chart.series, this.chart);
      return;
    }
    // Draw chart if no chart exists
    this.drawChart(selectedAnalyzerSeries, freq);
  }

  checkChartSeries(chartSeries, analyzerSeries) {
    chartSeries.forEach((series, i) => {
      const findSeries = analyzerSeries.find(aSeries => aSeries.name === series.name);
      if (!findSeries && series.name !== 'Navigator 1') {
        chartSeries[i].remove();
      }
    });
  }

  checkAnalyzerSeries(analyzerSeries, chartSeries, chart) {
    analyzerSeries.forEach((series) => {
      const findSeries = chartSeries.find(cSeries => cSeries.name === series.name);
      if (!findSeries) {
        chart.addSeries(series);
      }
    });
  }

  formatSeriesData(series) {
    const chartSeries = [];
    series.forEach((serie) => {
      chartSeries.push({
        name: serie.title + ' (' + serie.frequencyShort + '; ' + serie.geography.handle + ')',
        data: serie.chartData.level,
        displayName: serie.title,
        decimals: serie.decimals,
        frequency: serie.frequencyShort,
        geography: serie.geography.name,
        units: serie.unitsLabelShort,
        dataGrouping: {
          enabled: false
        },
        zones: serie.chartData.pseudoZones
      });
    });
    return chartSeries;
  }

  checkFrequencies(series) {
    const qExist = series.find(serie => serie.frequencyShort === 'Q');
    const mExist = series.find(serie => serie.frequencyShort === 'M');
    const sExist = series.find(serie => serie.frequencyShort === 'S');
    if (mExist || sExist) {
      return 'M';
    }
    if (qExist) {
       return 'Q';
    }
    return 'A';
  }

  drawChart(series, freq) {
    this.options = {
      chart: {
        alignTicks: false,
        zoomType: 'x',
        // Description used in xAxis label formatter
        // description: freq.freq
      },
      labels: {
        items: [{
          // html: sourceDescription
        }, {
          // html: sourceLink
        }, {
          // html: sourceDetails
        }, {
          // html: name + ': ' + portalSettings.highstock.labels.seriesLink + seriesDetail.id
        }, {
          // html: portalSettings.highstock.labels.portal,
        }, {
          // html: portalSettings.highstock.labels.portalLink
        }, {
          // html: name + ' (' + geo.name + ', ' + freq.label + ')'
        }],
        style: {
          display: 'none'
        }
      },
      rangeSelector: {
        // selected: !startDate && !endDate ? 2 : null,
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
        // filename: name + '_' + geo.name + '_' + freq.label,
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
            // text: portalSettings.highstock.credits,
            position: {
              align: 'right',
              x: -115,
              y: -41
            }
          },
          title: {
            // text: name + ' (' + geo.name + ', ' + freq.label + ')',
            align: 'left'
          }
        }
      },
      tooltip: {
        borderWidth: 0,
        shadow: false,
        shared: true,
        formatter: function () {
          const getFreqLabel = function(frequency, date) {
            if (frequency === 'A') {
              return '';
            }
            if (frequency === 'Q') {
              if (Highcharts.dateFormat('%b', date) === 'Jan') {
                return ' Q1';
              }
              if (Highcharts.dateFormat('%b', date) === 'Apr') {
                return ' Q2';
              }
              if (Highcharts.dateFormat('%b', date) === 'Jul') {
                return ' Q3';
              }
              if (Highcharts.dateFormat('%b', date) === 'Oct') {
                return ' Q4';
              }
            }
            if (frequency === 'M' || frequency === 'S') {
              return ' ' + Highcharts.dateFormat('%b', date);
            }
          };
          const pseudo = 'Pseudo History ';
          let s = '';
          this.points.forEach((point) => {
            const lineColor = $('.highcharts-markers.highcharts-color-' + point.colorIndex + ' path').css('fill');
            const seriesColor = '<span style="fill:' + lineColor + '">\u25CF</span> ';
            const seriesLabel = seriesColor + point.series.userOptions.displayName;
            const pseudoSeriesLabel = seriesColor + pseudo + point.series.userOptions.displayName;
            const dateLabel = Highcharts.dateFormat('%Y', this.x) + getFreqLabel(point.series.userOptions.frequency, point.x);
            const displayValue = Highcharts.numberFormat(point.y, point.series.userOptions.decimals);
            const formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
            const unitsLabel = point.series.userOptions.units;
            const geoLabel = point.series.userOptions.geography;
            const label = seriesLabel + ' ' + dateLabel + ': ' + formattedValue + ' (' + unitsLabel + ')';
            const pseudoLabel = pseudoSeriesLabel + ' ' + dateLabel + ': ' + formattedValue + ' (' + unitsLabel + ')';
            const pseudoZones = point.series.userOptions.pseudoZones;
            if (pseudoZones) {
              pseudoZones.forEach((zone) => {
                if (point.x < zone.value) {
                  return s += pseudoLabel + '<br>' + geoLabel + '<br>';
                }
                if (point.x > zone.value) {
                  return s += label + '<br>' + geoLabel + '<br>';
                }
              });
            }
            if (!pseudoZones) {
              s += label + '<br>' + geoLabel + '<br>';
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
        // min: Date.parse(startDate),
        // max: Date.parse(endDate),
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
            const frequency = freq;
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
          // text: change
        },
        opposite: false,
        minPadding: 0,
        maxPadding: 0,
        minTickInterval: 0.01
      }],
      plotOptions: {
        series: {
          cropThreshold: 0,
        }
      },
      series: series
    };
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  setTableExtremes(e) {
    // Workaround based on https://github.com/gevgeny/angular2-highcharts/issues/158
    // Exporting calls load event and creates empty e.context object, emitting wrong values to series table
    const extremes = this.getChartExtremes(e);
    if (extremes) {
      this.tableExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
    }
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

  updateExtremes(e) {
    e.context._hasSetExtremes = true;
    e.context._extremes = this.getChartExtremes(e.context);
  }
}
