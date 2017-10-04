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
      // Check if series in the chart is selected in the analyzer, if not, remove series from the chart
      this.checkChartSeries(this.chart.series, selectedAnalyzerSeries.series, this.chart);
      // Check if the selected series have been drawn in the chart, if not, add series to the chart
      this.checkAnalyzerSeries(selectedAnalyzerSeries.series, this.chart.series, this.chart);
      return;
    }
    // Draw chart if no chart exists
    this.drawChart(selectedAnalyzerSeries.series, selectedAnalyzerSeries.yAxis, freq);
  }

  checkChartSeries(chartSeries, analyzerSeries, chart) {
    chartSeries.forEach((series, i) => {
      const findSeries = analyzerSeries.find(aSeries => aSeries.name === series.name);
      if (!findSeries && series.name !== 'Navigator 1') {
        chartSeries[i].remove();
        // Remove axis if it has no series
        const noSeriesAxis = chart.yAxis.find(axis => !axis.series.length && axis.userOptions.className !== 'highcharts-navigator-yaxis');
        if (noSeriesAxis) {
          noSeriesAxis.remove();          
        }
      }
    });
  }

  checkAnalyzerSeries(analyzerSeries, chartSeries, chart) {
    let unitsCount = 0, units = '';
    analyzerSeries.forEach((series) => {
      console.log('series', series)
      const findSeries = chartSeries.find(cSeries => cSeries.name === series.name);
      if (units === '' || units !== series.unitsLabelShort) {
        console.log('units', units)
        console.log('units short', series.unitsLabelShort)
        units = series.unitsLabelShort;
        unitsCount++;
      }
      if (!findSeries) {
        series.yAxis = 'yAxis' + unitsCount;
        console.log('chart y axes', chart.yAxis)
        console.log('chart get', chart.get('yAxis' + unitsCount))
        if (!chart.get('yAxis' + unitsCount)) {
          const oppositeExist = chart.yAxis.find(axis => axis.userOptions.opposite === true);
          chart.addAxis({
            labels: {
              format: '{value:,.2f}'
            },
            title: {
              text: units
            },
            id: 'yAxis' + unitsCount,
            opposite: oppositeExist ? false: true,
            showLastLabel: true
          });
        }
        chart.addSeries(series);
      }
    });
  }

  formatSeriesData(series) {
    const chartSeries = [];
    const yAxes = [];
    let unitsCount = 0, units = '';
    series.forEach((serie) => {
      if (units === '' || units !== serie.unitsLabelShort) {
        units = serie.unitsLabelShort;
        unitsCount++;
        if (!this.chart) {
          console.log('no chart')
          yAxes.push({
            labels: {
              format: '{value:,.2f}'
            },
            id: 'yAxis' + unitsCount,
            title: {
              text: units
            },
            opposite: unitsCount === 1 ? false : true,
            minPadding: 0,
            maxPadding: 0,
            minTickInterval: 0.01
          });
        }
      }
      chartSeries.push({
        className: serie.id,
        name: serie.seasonallyAdjusted ? serie.title + ' (' + serie.frequencyShort + '; ' + serie.geography.handle + '; SA)' : serie.title + ' (' + serie.frequencyShort + '; ' + serie.geography.handle + ')',
        data: serie.chartData.level,
        yAxis: unitsCount === 1 ? 'yAxis1' : 'yAxis2',
        displayName: serie.title,
        decimals: serie.decimals,
        frequency: serie.frequencyShort,
        geography: serie.geography.name,
        unitsLabelShort: serie.unitsLabelShort,
        seasonallyAdjusted: serie.seasonallyAdjusted,
        dataGrouping: {
          enabled: false
        },
        pseudoZones: serie.chartData.pseudoZones
      });
    });

    return { series: chartSeries, yAxis: yAxes };
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

  drawChart(series, yAxis, freq) {
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
        formatter: function (args) {
          const getFreqLabel = function (frequency, date) {
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
          const filterFrequency = function (chartSeries: Array<any>, freq: string) {
            return chartSeries.filter(series => series.userOptions.frequency === freq && series.name !== 'Navigator 1');
          }
          const getSeriesColor = function (seriesIndex: number) {
            // Get color of the line for a series
            // Use color for tooltip label
            const lineColor = $('.highcharts-markers.highcharts-color-' + seriesIndex + ' path').css('fill');
            const seriesColor = '<span style="fill:' + lineColor + '">\u25CF</span> ';
            return seriesColor;
          }
          const formatObsValue = function (value: number, decimals: number) {
            // Round observation to specified decimal place
            const displayValue = Highcharts.numberFormat(value, decimals);
            const formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
            return formattedValue
          }
          const formatSeriesLabel = function (colorIndex: number, point, seriesValue: number, date: string, pointX, s: string) {
            const seriesColor = getSeriesColor(colorIndex);
            const displayName = point.userOptions.displayName;
            const value = formatObsValue(seriesValue, point.userOptions.decimals);
            const unitsLabel = point.userOptions.unitsLabelShort;
            const geoLabel = point.userOptions.geography;
            const seasonal = point.userOptions.seasonallyAdjusted ? 'Seasonally Adjusted' : '';
            const label = displayName + ' ' + date + ': ' + value + ' (' + unitsLabel + ') <br>';
            const pseudoZones = point.userOptions.pseudoZones;
            if (pseudoZones.length) {
              pseudoZones.forEach((zone) => {
                if (pointX < zone.value) {
                  return s += seriesColor + 'Pseudo History ' + label + geoLabel + '<br>';
                }
                if (pointX > zone.value) {
                  return s += seriesColor + label + geoLabel + '<br>';
                }
              });
            }
            if (!pseudoZones.length) {
              s += seriesColor + label + geoLabel + '<br>' + seasonal + '<br>';
            }
            return s;
          }
          const getAnnualObs = function (annualSeries: Array<any>, point, year: string) {
            let annualLabel = '', label = '';
            annualSeries.forEach((serie) => {
              const seriesLabel = getSeriesColor(serie.colorIndex) + serie.userOptions.displayName;
              // Check if current point's year is available in the annual series' data
              const yearObs = serie.data.find(obs => Highcharts.dateFormat('%Y', obs.x) === Highcharts.dateFormat('%Y', point.x));
              if (yearObs) {
                const geoLabel = serie.userOptions.geography;
                label += formatSeriesLabel(serie.colorIndex, serie, yearObs.y, year, yearObs.x, annualLabel);
              }
            });
            // Return string of annual series with their values formatted for the tooltip
            return label;
          }
          const getQuarterObs = function (quarterSeries: Array<any>, date: string, pointQuarter: string) {
            let quarterLabel = '', label = '';
            quarterSeries.forEach((serie) => {
              const seriesLabel = getSeriesColor(serie.colorIndex) + serie.userOptions.displayName;
              // Check if current point's year and quarter month (i.e., Jan for Q1) is available in the quarterly series' data
              const obsDate = serie.data.find(obs => (Highcharts.dateFormat('%Y', obs.x) + ' ' + Highcharts.dateFormat('%b', obs.x)) === date);
              if (obsDate) {
                const geoLabel = serie.userOptions.geography;
                label += formatSeriesLabel(serie.colorIndex, serie, obsDate.y, Highcharts.dateFormat('%Y', obsDate.x) + ' ' + pointQuarter, obsDate.x, quarterLabel);
              }
            });
            // Return string of quarterly series with their values formatted for the tooltip
            return label;
          }
          let s = '', tooltip = '';
          const chartSeries = args.chart.series;
          // Series in chart with an annual frequency
          const annualSeries = filterFrequency(chartSeries, 'A');
          // Series in chart with a quarterly frequency
          const quarterSeries = filterFrequency(chartSeries, 'Q');
          // Series in chart with a monthly frequency
          const monthSeries = filterFrequency(chartSeries, 'M');
          // Points in the shared tooltip
          this.points.forEach((point, index) => {
            if (annualSeries && Highcharts.dateFormat('%b', point.x) !== 'Jan' && index === 0) {
              const year = Highcharts.dateFormat('%Y', point.x);
              // Add annual observations when other frequencies are selected
              tooltip += getAnnualObs(annualSeries, point, year);
            }
            if (quarterSeries && monthSeries) {
              if (Highcharts.dateFormat('%b', point.x) !== 'Jan' && Highcharts.dateFormat('%b', point.x) !== 'Apr' && Highcharts.dateFormat('%b', point.x) !== 'Jul' && Highcharts.dateFormat('%b', point.x) !== 'Oct') {
                const quarters = { Q1: 'Jan', Q2: 'Apr', Q3: 'Jul', Q4: 'Oct' };
                const months = { Feb: 'Q1', Mar: 'Q1', May: 'Q2', Jun: 'Q2', Aug: 'Q3', Sep: 'Q3', Nov: 'Q4', Dec: 'Q4' };
                // Month of hovered point
                const pointMonth = Highcharts.dateFormat('%b', point.x);
                // Quarter that hovered point falls into 
                const pointQuarter = months[pointMonth];
                // Month for which there is quarterly data
                const quarterMonth = quarters[pointQuarter];
                const date = Highcharts.dateFormat('%Y', point.x) + ' ' + quarterMonth;
                // Add quarterly observations when monthly series are selected
                tooltip += getQuarterObs(quarterSeries, date, pointQuarter);
              }
            }
            const dateLabel = Highcharts.dateFormat('%Y', this.x) + getFreqLabel(point.series.userOptions.frequency, point.x);
            tooltip += formatSeriesLabel(point.colorIndex, point.series, point.y, dateLabel, point.x, s);
          });
          return tooltip;
        }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        minRange: 1000 * 3600 * 24 * 30 * 12,
        // min: Date.parse(startDate),
        // max: Date.parse(endDate),
        ordinal: false
      },
      yAxis: yAxis,
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
    this.setTableExtremes(chartInstance);
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
    this.setTableExtremes(e.context);
  }
}
