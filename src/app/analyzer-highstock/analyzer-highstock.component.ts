import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-analyzer-highstock',
  templateUrl: './analyzer-highstock.component.html',
  styleUrls: ['./analyzer-highstock.component.scss']
})
export class AnalyzerHighstockComponent implements OnInit {
  @Input() series;
  private options;

  constructor() { }

  ngOnInit() {
    const testSeries = this.series[0];
    this.drawChart(testSeries);
    console.log(testSeries)
  }

  drawChart(series) {
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
            // menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems.slice(2),
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
        formatter: function () {
          /* const getFreqLabel = function(frequency, date) {
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
          }; */
          const pseudo = 'Pseudo History ';
          let s = '<b>';
          // s = s + getFreqLabel(freq.freq, this.x);
          // s = s + ' ' + Highcharts.dateFormat('%Y', this.x) + '</b>';
          /* this.points.forEach((point) => {
            const displayValue = Highcharts.numberFormat(point.y, decimals);
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
          return s; */
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
            /* const month = Highcharts.dateFormat('%b', this.value);
            const frequency = this.chart.options.chart.description;
            const first = Highcharts.dateFormat('%Y', this.axis.userMin);
            const last = Highcharts.dateFormat('%Y', this.axis.userMax);
            s = (last - first <= 5) && frequency === 'Q' ? s + getQLabel(month) : '';
            s = s + Highcharts.dateFormat('%Y', this.value);
            return frequency === 'Q' ? s : this.axis.defaultLabelFormatter.call(this); */
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
      }/* , {
        className: 'series2',
        title: {
          // text: units
        },
        labels: {
          format: '{value:,.2f}'
        },
        gridLineWidth: 0,
        minPadding: 0,
        maxPadding: 0,
        minTickInterval: 0.01,
        showLastLabel: true
      } */],
      plotOptions: {
        series: {
          cropThreshold: 0,
        }
      },
      series: [{
        name: series.title,
        // type: portalSettings.highstock.series0Type,
        // data: series0,
        data: series.chartData.level,
        // showInNavigator: false,
        dataGrouping: {
          enabled: false
        }
      }]
    };
  }

}
