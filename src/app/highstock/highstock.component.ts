// Highstock chart component used for single-series view
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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

Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

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
  private options: Object;

  constructor() { }

  ngOnChanges() {
    let level = this.chartData.level;
    let pseudoLevel = this.chartData.pseudoLevel;
    let pseudoZones = this.chartData.pseudoZones;
    let yoy = this.chartData.yoy;
    let name = this.seriesDetail.title;
    let unitsShort = this.seriesDetail.unitsLabelShort === '' ? ' ' : this.seriesDetail.unitsLabelShort;
    let change = this.seriesDetail.percent === true ? 'Change' : '% Change';
    let yoyLabel = this.seriesDetail.percent === true ? 'YOY Change' : 'YOY % Change';
    let dataFreq = this.currentFreq;
    let dataGeo = this.currentGeo;
    this.drawChart(level, yoy, name, unitsShort, change, dataGeo, dataFreq, yoyLabel, pseudoLevel, pseudoZones);
  }

  drawChart(level, yoy, name, units, change, geo, freq, yoyLabel, pseudoLevel?, pseudoZones?) {
    this.options = {
      chart: {
        alignTicks: false,
        zoomType: 'x',
        backgroundColor: '#F9F9F9',
      },
      navigation: {
        buttonOptions: {
          align: 'left',
          theme: {
            fill: '#F9F9F9'
          }
        }
      },
      rangeSelector: {
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
              x: -90,
              y: -40
            }
          },
          title: {
            text: name + ' (' + geo.name + ', ' + freq.label + ')',
            align: 'left',
            style: {
              color: '#1D667F',
              fontFamily: 'sans-serif'
            }
          }
        }
      },
      tooltip: {
        borderWidth: 0,
        shadow: false,
        valueDecimals: 2,
        formatter: function () {
          let pseudo = 'Pseudo History ';
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
          this.points.forEach((point, index) => {
            let label = '<br><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + Highcharts.numberFormat(point.y);
            if (pseudoZones.length > 0) {
              pseudoZones.forEach((zone, index) => {
                if (point.x < pseudoZones[index].value) {
                  s += '<br><span style="color:' + point.color + '">\u25CF</span> ' + pseudo + point.series.name + ': ' + Highcharts.numberFormat(point.y) + '<br>';
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
        text: '',
        style: {
          color: '#505050'
        }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        ordinal: false,
        labels: {
          style: {
            color: '#505050'
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
        gridLineWidth: 0
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
        name: 'Level',
        type: 'line',
        yAxis: 1,
        color: '#1D667F',
        data: level,
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
    if (e.context.series[1].points) {
      selectedRange = e.context.series[1].points;
    }
    if (selectedRange.length) {
      xMin = new Date(selectedRange[0].x).toISOString().split('T')[0];
      xMax = new Date(selectedRange[selectedRange.length - 1].x).toISOString().split('T')[0];
      this.chartExtremes.emit({minDate: xMin, maxDate: xMax});
    }
  }
}
