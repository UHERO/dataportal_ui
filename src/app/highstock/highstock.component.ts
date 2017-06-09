// Highstock chart component used for single-series view
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { Geography } from '../geography';
import { Frequency } from '../frequency';
import { HighchartChartData } from '../highchart-chart-data';
import { Series } from '../series';
import 'jquery';
declare var $: any;

// import * as highcharts from 'highcharts';
declare var require: any;
const Highcharts = require('highcharts');
const exporting = require('../../../node_modules/highcharts/modules/exporting.src');
const offlineExport = require('../../../node_modules/highcharts/modules/offline-exporting');
const exportCSV = require('../csv-export');

// Plug in export module for Highstock chart
exporting(Highcharts);
offlineExport(Highcharts);
exportCSV(Highcharts);

@Component({
  selector: 'app-highstock',
  templateUrl: './highstock.component.html',
  styleUrls: ['./highstock.component.scss']
})
export class HighstockComponent implements OnChanges {
  @Input() chartData;
  @Input() currentFreq;
  @Input() currentGeo;
  @Input() seriesDetail;
  @Input() start;
  @Input() end;
  @ViewChild('chart') private chart;

  // Async EventEmitter, emit tableExtremes on load to render table
  @Output() tableExtremes = new EventEmitter(true);
  // When user updates range selected, emit chartExtremes to update URL params
  @Output() chartExtremes = new EventEmitter(true);
  public options: Object;

  constructor() { }

  ngOnChanges() {
    this.drawChart(this.chartData, this.seriesDetail, this.currentGeo, this.currentFreq);
  }

  drawChart(chartData: HighchartChartData, seriesDetail: Series, geo: Geography, freq: Frequency) {
    const level = chartData.level;
    const decimals = seriesDetail.decimals ? seriesDetail.decimals : 1;
    const pseudoZones = chartData.pseudoZones;
    const yoy = chartData.yoy;
    const ytd = chartData.ytd;
    const name = seriesDetail.title;
    const units = seriesDetail.unitsLabel ? seriesDetail.unitsLabel : seriesDetail.unitsLabelShort;
    const change = seriesDetail.percent ? 'Change' : '% Change';
    const yoyLabel = seriesDetail.percent ? 'YOY Change' : 'YOY % Change';
    const ytdLabel = seriesDetail.percent ? 'YTD Change' : 'YTD % Change';
    const sourceDescription = seriesDetail.sourceDescription;
    const sourceLink = seriesDetail.sourceLink;
    const sourceDetails = seriesDetail. sourceDetails;
    const startDate = this.start ? this.start.substr(0, 4) + '-' + this.start.substr(4, 2) + '-01' : null;
    const endDate = this.end ? this.end.substr(0, 4) + '-' + this.end.substr(4, 2) + '-01' : null;

    this.options = {
      chart: {
        alignTicks: false,
        zoomType: 'x',
        backgroundColor: '#F9F9F9',
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
          html: name + ': http://data.uhero.hawaii.edu/#/series?id=' + seriesDetail.id
        }, {
          html: 'The University of Hawaii Economic Research Organization (UHERO)',
        }, {
          html: 'Data Portal: http://data.uhero.hawaii.edu/'
        }],
        style: {
          display: 'none'
        }
      },
      navigation: {
        buttonOptions: {
          theme: {
            fill: '#F9F9F9'
          }
        }
      },
      rangeSelector: {
        selected: !this.start && !this.end ? 2 : null,
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
        buttonTheme: {
          states: {
            select: {
              fill: '#1D667F',
              style: {
                color: '#FFFFFF'
              }
            }
          }
        },
        labelStyle: {
          visibility: 'hidden'
        },
        inputEnabled: false
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
            menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems.slice(2)
          },
          printButton: {
            text: 'Print',
            onclick: function () {
              this.print();
            }
          }
        },
        filename: name + '_' + geo.name + '_' + freq.label,
        chartOptions: {
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
            text: 'data.uhero.hawaii.edu',
            position: {
              align: 'right',
              x: -115,
              y: -38
            }
          },
          title: {
            text: name + ' (' + geo.name + ', ' + freq.label + ')',
            align: 'left',
            style: {
              display: 'block',
              color: '#1D667F',
              fontFamily: 'sans-serif'
            }
          }
        }
      },
      tooltip: {
        borderWidth: 0,
        shadow: false,
        formatter: function () {
          const getFreqLabel = function(freq, date) {
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
              return Highcharts.dateFormat('%b', date);
            }
          }
          const pseudo = 'Pseudo History ';
          let s = '<b>';
          s = s + getFreqLabel(freq.freq, this.x);
          s = s + ' ' + Highcharts.dateFormat('%Y', this.x) + '</b>';
          this.points.forEach((point) => {
            const label = '<br><span style="color:' +
              point.color + '">\u25CF</span> ' +
              point.series.name + ': ' +
              Highcharts.numberFormat(point.y, decimals);
            if (pseudoZones.length) {
              pseudoZones.forEach((zone) => {
                if (point.x < zone.value) {
                  return s += '<br><span style="color:' +
                    point.color +
                    '">\u25CF</span> ' +
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
      title: {
        text: name + ' (' + geo.name + ' ' + freq.label + ')',
        style: {
          display: 'none'
        }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        minRange: 1000 * 3600 * 24 * 30 * 12,
        min: this.start ? Date.parse(startDate) : null,
        max: this.end ? Date.parse(endDate) : null,
        ordinal: false,
        labels: {
          style: {
            color: '#505050'
          },
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
            }
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
        labels: {
          format: '{value:,.2f}',
          style: {
            color: '#727272'
          },
        },
        title: {
          text: change,
          style: {
            color: '#727272'
          }
        },
        opposite: false,
        minPadding: 0,
        maxPadding: 0
      }, {
        title: {
          text: units,
          style: {
            color: '#1D667F'
          }
        },
        labels: {
          format: '{value:,.2f}',
          style: {
            color: '#1D667F'
          },
        },
        gridLineWidth: 0,
        minPadding: 0,
        maxPadding: 0
      }],
      plotOptions: {
        series: {
          cropThreshold: 0,
        }
      },
      series: [{
        name: yoyLabel,
        type: 'column',
        color: '#727272',
        data: yoy,
        showInNavigator: false,
        dataGrouping: {
          enabled: false
        }
      }, {
        name: ytdLabel,
        data: ytd,
        includeInCSVExport: freq.freq === 'A' ? false : true,
        visible: false,
        dataGrouping: {
          enabled: false
        }
      }, {
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
        showInNavigator: true,
        dataGrouping: {
          enabled: false
        },
        zoneAxis: 'x',
        zones: pseudoZones
      }]
    };
  }

  setTableExtremes(e) {
    const extremes = this.getChartExtremes(e);
    if (extremes) {
      this.tableExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
    }
  }

  updateExtremes(e) {
    const extremes = this.getChartExtremes(e);
    const chartExtremes = this.chartExtremes;
    const chart = $('.stock-chart');
    $('.stock-chart').mouseup(function() {
      chartExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
    });
  }

  getChartExtremes(e) {
    // Gets range of x values to emit
    // Used to redraw table in the single series view
    let xMin, xMax;
    // Selected level data
    let selectedRange = null;
    if (e.context.series[0].points) {
      selectedRange = e.context.series[0].points;
    }
    if (selectedRange.length) {
      xMin = new Date(selectedRange[0].x).toISOString().split('T')[0];
      xMax = new Date(selectedRange[selectedRange.length - 1].x).toISOString().split('T')[0];
      return { min: xMin, max: xMax };
    }
  }
}
