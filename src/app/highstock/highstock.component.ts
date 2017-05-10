// Highstock chart component used for single-series view
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Geography } from '../geography';
import { Frequency } from '../frequency';
import { HighchartChartData } from '../highchart-chart-data';
import { Series } from '../series';

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

  // Async EventEmitter, emit chart extremes on load and when selecting a new range using the range selector
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
    const dataFreq = freq;
    const dataGeo = geo;
    const sourceDescription = seriesDetail.sourceDescription;
    const sourceLink = seriesDetail.sourceLink;
    const sourceDetails = seriesDetail. sourceDetails;

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
        // allButtonsEnabled: true,
        selected: 2,
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
        valueDecimals: decimals,
        formatter: function () {
          const pseudo = 'Pseudo History ';
          let s = '<b>';
          if (freq.freq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Jan') {
            s = s + 'Q1';
          };
          if (freq.freq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Apr') {
            s = s + 'Q2';
          };
          if (freq.freq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Jul') {
            s = s + 'Q3';
          };
          if (freq.freq === 'Q' && Highcharts.dateFormat('%b', this.x) === 'Oct') {
            s = s + 'Q4';
          };
          if (freq.freq === 'M' || freq.freq === 'S') {
            s = s + Highcharts.dateFormat('%b', this.x);
          }
          s = s + ' ' + Highcharts.dateFormat('%Y', this.x) + '</b>';
          this.points.forEach((point) => {
            const label = '<br><span style="color:' +
              point.color + '">\u25CF</span> ' +
              point.series.name + ': ' +
              Highcharts.numberFormat(point.y);
            if (pseudoZones.length > 0) {
              pseudoZones.forEach((zone, index) => {
                if (point.x < pseudoZones[index].value) {
                  s += '<br><span style="color:' +
                    point.color +
                    '">\u25CF</span> ' +
                    pseudo +
                    point.series.name +
                    ': ' +
                    Highcharts.numberFormat(point.y) +
                    '<br>';
                } else {
                  s += label;
                }
              });
            } else {
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
        ordinal: false,
        labels: {
          style: {
            color: '#505050'
          },
          formatter: function() {
            let s = '';
            const month = Highcharts.dateFormat('%b', this.value);
            const frequency = this.chart.options.chart.description;
            const first = Highcharts.dateFormat('%Y', this.axis.userMin);
            const last = Highcharts.dateFormat('%Y', this.axis.userMax);
            if (last - first <= 5) {
              if (frequency === 'Q' && month === 'Jan') {
                s = s + 'Q1 ';
              }
              if (frequency === 'Q' && month === 'Apr') {
                s = s + 'Q2 ';
              }
              if (frequency === 'Q' && month === 'Jul') {
                s = s + 'Q3 ';
              }
              if (frequency === 'Q' && month === 'Oct') {
                s = s + 'Q4 ';
              }
            }
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

  updateTable(e) {
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
      this.chartExtremes.emit({ minDate: xMin, maxDate: xMax });
    }
  }
}
