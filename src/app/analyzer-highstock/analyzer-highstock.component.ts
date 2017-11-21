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
  @Input() allDates;
  @Input() portalSettings;
  @Input() alertMessage;
  @Output() tableExtremes = new EventEmitter(true);
  options;
  chart;
  private nameChecked;
  private unitsChecked;
  private geoChecked;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    // Series in the analyzer that have been selected to be displayed in the chart
    const selectedAnalyzerSeries = this.formatSeriesData(this.series, this.chart, this.allDates);
    if (this.chart) {
      const navDates = this.createNavigatorDates(this.allDates);
      // If a chart has been generated:
      // Check if series in the chart is selected in the analyzer, if not, remove series from the chart
      this.removeFromChart(selectedAnalyzerSeries.series, this.chart);
      // Check if the selected series have been drawn in the chart, if not, add series to the chart
      this.addToChart(selectedAnalyzerSeries.series, this.chart, navDates);
      // Add a chart subtitle to alert user of a warning
      this.chart.setSubtitle({
        text: this.alertMessage,
        align: 'center',
        verticalAlign: 'bottom',
      });
      if (this.chart.subtitle) {
        setTimeout(() => {
          this.chart.subtitle.fadeOut('slow');
        }, 3000);
      }
      return;
    }
    // Draw chart if no chart exists
    // Get buttons for chart
    const chartButtons = this.formatChartButtons(this.portalSettings.highstock.buttons);
    this.drawChart(selectedAnalyzerSeries.series, selectedAnalyzerSeries.yAxis, this.formatTooltip, this.portalSettings, chartButtons);
  }

  formatChartButtons(buttons: Array<any>) {
    const chartButtons = buttons.reduce((allButtons, button) => {
      if (button !== 'all') {
        allButtons.push({ type: 'year', count: button, text: button + 'Y' });
      }
      if (button === 'all') {
        allButtons.push({ type: 'all', text: 'All' });
      }
      return allButtons;
    }, []);
    return chartButtons;
  }

  removeFromChart(analyzerSeries, chart) {
    // Filter out series from chart that are not in analayzerSeries
    const removeSeries = chart.series.filter(cSeries => !analyzerSeries.some(aSeries => aSeries.name === cSeries.name) && cSeries.name !== 'Navigator 1');
    removeSeries.forEach((series) => {
      series.remove();
    });
    // Remove y-axis if it has no series
    const noSeriesAxis = chart.yAxis.find(axis => !axis.series.length && axis.userOptions.className !== 'highcharts-navigator-yaxis');
    if (noSeriesAxis) {
      noSeriesAxis.remove();
      // If remaining y Axis is on the right side of the chart, update the right axis to be positioned on the left
      const opposite = chart.yAxis.find(axis => axis.userOptions.opposite);
      if (opposite) {
        opposite.update({
          opposite: false,
        });
      }
    }
  }

  addToChart(analyzerSeries, chart, navDates) {
    // Filter out series that have been selected in the analyzer but are not currently in the chart
    const addSeries = analyzerSeries.filter(aSeries => !chart.series.some(cSeries => cSeries.name === aSeries.name));
    let yAxes = chart.yAxis.filter(y => y.userOptions.className !== 'highcharts-navigator-yaxis');
    if (addSeries.length) {
      addSeries.forEach((series) => {
        // If chart has no y-axes, add axes, and draw series
        if (!yAxes.length) {
          this.addYAxis(chart, series.units, false);
          yAxes = chart.yAxis.filter(y => y.userOptions.className !== 'highcharts-navigator-yaxis');
        }
        this.addSeriesToChart(yAxes, series, chart, analyzerSeries);
      });
      // Use nav dates as the series drawn in the navigator
      chart.addSeries({
        data: navDates,
        showInNavigator: true,
        index: -1,
        colorIndex: -1,
        name: 'Navigator'
      });
    }
  }

  addSeriesToChart(yAxes: Array<any>, series, chart, analyzerSeries) {
    // If more than one yAxes, find which axis the series should be added to
    if (yAxes.length > 1) {
      this.addSeriesToDualAxisChart(yAxes, series, chart, analyzerSeries);
    }
    // If chart has one yAxis, evaluate if series should be added to existing axis or drawn on a new one
    if (yAxes.length === 1) {
      this.addSeriesToSingleAxisChart(yAxes, series, chart);
    }
  }

  addSeriesToDualAxisChart(yAxes: Array<any>, series, chart, analyzerSeries: Array<any>) {
    const seriesUnits = series.unitsLabelShort;
    const y0Exist = chart.yAxis.find(axis => axis.userOptions.id === 'yAxis0');
    // Check if a y axis already exists for the new series' units
    const unitAxis = yAxes.find(y => y.userOptions.title.text === seriesUnits);
    // If yes, add series to that axis
    if (unitAxis) {
      series.yAxis = unitAxis.userOptions.id;
      chart.addSeries(series);
      return;
    }
    // If no, consolidate series currently drawn to 1 axis (i.e. series with the same units were drawn on separate axes)
    if (!unitAxis) {
      // Find series drawn on second axis (i.e. yAxis === 'yAxis1')
      const y1Series = chart.series.filter(cSeries => cSeries.userOptions.yAxis === 'yAxis1');
      y1Series.forEach((s) => {
        // Get original data of series drawn on one axis to be redrawn on other
        const redrawSeries = analyzerSeries.find(aSeries => aSeries.className === s.userOptions.className);
        // Remove series from chart and reassign it to yAxis0
        s.remove();
        redrawSeries.yAxis = 'yAxis0';
        // Add series back to chart
        chart.addSeries(redrawSeries);
      });
      // Remove second axis
      const y1Axis = chart.yAxis.find(axis => axis.userOptions.id === 'yAxis1');
      y1Axis.remove();
      series.yAxis = 'yAxis1';
      // Redraw axis with units of the new series to be added
      this.addYAxis(chart, seriesUnits, y0Exist);
      // Add new series to chart
      chart.addSeries(series);
    }
  }

  addSeriesToSingleAxisChart(yAxes: Array<any>, series, chart) {
    const seriesUnits = series.unitsLabelShort;
    const y0Exist = chart.yAxis.find(axis => axis.userOptions.id === 'yAxis0');
    // Check if a y axis already exists for the new series' units
    const unitAxis = yAxes.find(y => y.userOptions.title.text === seriesUnits);
    // If no, draw series on a new y axis
    if (!unitAxis) {
      this.drawNewYAxis(chart, series, seriesUnits, y0Exist);
      return;
    }
    // If yes
    if (unitAxis) {
      // Get max level value of series to be added
      const seriesMaxValue = Math.max(...series.data.map(l => l[1]));
      let addAxis;
      // Check max level value of all series already drawn on axis
      unitAxis.userOptions.series.forEach((serie) => {
        const maxValue = Math.max(...serie.chartData.level.map(l => l[1]));
        const diff = seriesMaxValue - maxValue;
        // If difference between values is at least 10,000, draw series on a new axis
        if (Math.abs(diff) >= 10000) {
          addAxis = true;
          return;
        }
      });
      if (addAxis) {
        this.drawNewYAxis(chart, series, seriesUnits, y0Exist);
      }
      if (!addAxis) {
        series.yAxis = unitAxis.userOptions.id;
        chart.addSeries(series);
      }
    }
  }

  drawNewYAxis(chart, series, seriesUnits: string, y0Exist: Boolean) {
    this.addYAxis(chart, seriesUnits, y0Exist);
    series.yAxis = y0Exist ? 'yAxis1' : 'yAxis0';
    chart.addSeries(series);
  }

  addYAxis(chart, seriesUnits, y0Exist) {
    const oppositeExist = chart.yAxis.find(axis => axis.userOptions.opposite === true);
    chart.addAxis({
      labels: {
        format: '{value:,.2f}'
      },
      title: {
        text: seriesUnits
      },
      id: y0Exist ? 'yAxis1' : 'yAxis0',
      opposite: oppositeExist ? false : true,
      showLastLabel: true
    });
  }

  createYAxes(series: Array<any>, yAxes: Array<any>) {
    // Group series by their units
    const unitGroups = this.groupByUnits(series);
    // Create y-axis groups based on units available
    // i.e., If series with 2 different units have been selected, draw a y-axis for each unit
    // If only 1 units is selected, check that the max value of each series does not differ by an order of magnitude
    // If yes, draw series on separate y axes
    const yAxesGroups = this.setYAxesGroups(unitGroups);
    yAxesGroups.forEach((axis, index) => {
      yAxes.push({
        labels: {
          format: '{value:,.2f}'
        },
        id: axis.axisId,
        title: {
          text: axis.units
        },
        opposite: index === 0 ? false : true,
        minPadding: 0,
        maxPadding: 0,
        minTickInterval: 0.01,
        series: axis.series
      });
    });
    return yAxes;
  }

  setYAxesGroups(unitGroups) {
    // Create groups for up to 2 axes, assign axis id's as 'yAxis0' and 'yAxis1'
    const yAxesGroups = [];
    if (unitGroups.length === 1) {
      // Compare series to check if values differ by order of magnitude
      unitGroups.forEach((unit) => {
        // Get max level value of first series in group
        const level = unit.series[0].data ? unit.series[0].data : unit.series[0].chartData.level;
        const maxValue = Math.max(...level.map(l => l[1]));
        yAxesGroups.push({ axisId: 'yAxis0', units: unit.units, series: [unit.series[0]] });
        this.checkMaxValues(unit, maxValue, yAxesGroups);
      });
      return yAxesGroups;
    }
    if (unitGroups.length > 1) {
      unitGroups.forEach((unit, unitIndex) => {
        yAxesGroups.push({ axisId: 'yAxis' + unitIndex, units: unit.units, series: unit.series });
      });
      return yAxesGroups;
    }
  }

  checkMaxValues(unit, maxValue, yAxesGroups) {
    unit.series.forEach((serie) => {
      // Get max level value of series
      const level = serie.data ? serie.data : serie.chartData.level;
      const currentMaxValue = Math.max(...level.map(l => l[1]));
      const diff = maxValue - currentMaxValue;
      // If difference between values is at least 10,000, add second axis ('yAxis1')
      if (Math.abs(diff) >= 10000) {
        const yAxis1 = yAxesGroups.find(y => y.axisId === 'yAxis1');
        if (!yAxis1) {
          yAxesGroups.push({ axisId: 'yAxis1', units: unit.units, series: [serie] });
          return;
        }
        if (yAxis1) {
          yAxis1.series.push(serie);
          return;
        }
      }
      // If difference is less than 10,000, add series to frist axis
      if (Math.abs(diff) < 10000) {
        yAxesGroups[0].series.push(serie);
      }
    });
    return yAxesGroups;
  }

  groupByUnits(series) {
    const units = series.reduce((obj, serie) => {
      obj[serie.unitsLabelShort] = obj[serie.unitsLabelShort] || [];
      obj[serie.unitsLabelShort].push(serie);
      return obj;
    }, {});

    const groups = Object.keys(units).map((key) => {
      return { units: key, series: units[key] };
    });
    return groups;
  }

  createNavigatorDates(dates) {
    // Dates include duplicates when annual is mixed with higher frequencies, causes highcharts error
    const uniqueDates = dates.filter((date, index, self) =>
      self.findIndex(d => d.date === date.date) === index
    );
    const navigatorDates = uniqueDates.map((date) => {
      const obs = [];
      obs[0] = Date.parse(date.date);
      obs[1] = null;
      return obs;
    });
    return navigatorDates;
  }

  formatSeriesData(series, chartInstance, dates) {
    const chartSeries = [];
    let yAxes;
    // Check if chartInstance exists, i.e. if chart is already drawn
    // False when navigating to analyzer
    if (!chartInstance) {
      yAxes = this.createYAxes(series, []);
    }
    series.forEach((serie, index) => {
      // Find corresponding y-axis on initial display (i.e. no chartInstance)
      const axis = yAxes ? yAxes.find(y => y.series.some(s => s.id === serie.id)) : null;
      chartSeries.push({
        className: serie.id,
        name: serie.seasonallyAdjusted ?
          serie.title + ' (' + serie.frequencyShort + '; ' + serie.geography.handle + '; SA)' :
          serie.title + ' (' + serie.frequencyShort + '; ' + serie.geography.handle + ')',
        data: serie.chartData.level,
        yAxis: axis ? axis.id : null,
        displayName: serie.title,
        decimals: serie.decimals,
        frequency: serie.frequencyShort,
        geography: serie.geography.name,
        showInNavigator: false,
        unitsLabelShort: serie.unitsLabelShort,
        seasonallyAdjusted: serie.seasonallyAdjusted,
        dataGrouping: {
          enabled: false
        },
        pseudoZones: serie.chartData.pseudoZones
      });
    });
    if (!chartInstance) {
      const navDates = this.createNavigatorDates(dates);
      chartSeries.push({
        data: navDates,
        showInNavigator: true,
        index: -1,
        colorIndex: -1,
        name: 'Navigator'
      });
    }
    return { series: chartSeries, yAxis: yAxes };
  }

  drawChart(series, yAxis, tooltipFormatter, portalSettings, buttons) {
    this.options = {
      chart: {
        alignTicks: false,
        zoomType: 'x',
        // Description used in xAxis label formatter
        // description: freq.freq
      },
      labels: {
        items: [{
          html: ''
        }, {
          html: ''
        }, {
          html: ''
        }, {
          html: ''
        }, {
          html: portalSettings.highstock.labels.portal,
        }, {
          html: portalSettings.highstock.labels.portalLink
        }, {
          html: ''
        }],
        style: {
          display: 'none'
        }
      },
      rangeSelector: {
        buttons: buttons,
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
        exportKey: 'Download Chart'
      },
      navigator: {
        series: {
          includeInCSVExport: false,
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
            onclick: function (this) {
              this.exportChart(null, { subtitle: { text: '' } });
            }
          }
        },
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
            align: 'left'
          }
        }
      },
      tooltip: {
        borderWidth: 0,
        shadow: false,
        shared: true,
        formatter: function (args) {
          return tooltipFormatter(args, this.points, this.x);
        }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        minRange: 1000 * 3600 * 24 * 30 * 12,
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

  formatTooltip(args, points, x, name: Boolean, units: Boolean, geo: Boolean) {
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
    };
    const getSeriesColor = function (seriesIndex: number) {
      // Get color of the line for a series
      // Use color for tooltip label
      const lineColor = $('.highcharts-markers.highcharts-color-' + seriesIndex + ' path').css('fill');
      const seriesColor = '<span style="fill:' + lineColor + '">\u25CF</span> ';
      return seriesColor;
    };
    const formatObsValue = function (value: number, decimals: number) {
      // Round observation to specified decimal place
      const displayValue = Highcharts.numberFormat(value, decimals);
      const formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
      return formattedValue;
    };
    const formatSeriesLabel = function (sName, sUnits, sGeo, point, seriesValue: number, date: string, pointX, s: string) {
      const seriesColor = getSeriesColor(point.colorIndex);
      const displayName = sName ? point.userOptions.displayName : '';
      const value = formatObsValue(seriesValue, point.userOptions.decimals);
      const unitsLabel = sUnits ? ' (' + point.userOptions.unitsLabelShort + ') <br>' : '<br>';
      const geoLabel = sGeo ? point.userOptions.geography + '<br>' : '<br>';
      const seasonal = point.userOptions.seasonallyAdjusted ? 'Seasonally Adjusted <br>' : '<br>';
      const label = displayName + ' ' + date + ': ' + value + unitsLabel;
      const pseudoZones = point.userOptions.pseudoZones;
      if (pseudoZones.length) {
        pseudoZones.forEach((zone) => {
          if (pointX < zone.value) {
            return s += seriesColor + 'Pseudo History ' + label + geoLabel;
          }
          if (pointX > zone.value) {
            return s += seriesColor + label + geoLabel;
          }
        });
      }
      if (!pseudoZones.length) {
        s += seriesColor + label + geoLabel + seasonal + '<br>';
      }
      return s;
    };
    const getAnnualObs = function (annualSeries: Array<any>, point, year: string) {
      let label = '';
      annualSeries.forEach((serie) => {
        // Check if current point's year is available in the annual series' data
        const yearObs = serie.data.find(obs => Highcharts.dateFormat('%Y', obs.x) === Highcharts.dateFormat('%Y', point.x));
        if (yearObs) {
          label += formatSeriesLabel(name, units, geo, serie, yearObs.y, year, yearObs.x, '');
        }
      });
      // Return string of annual series with their values formatted for the tooltip
      return label;
    };
    const getQuarterObs = function (quarterSeries: Array<any>, date: string, pointQuarter: string) {
      let label = '';
      quarterSeries.forEach((serie) => {
        // Check if current point's year and quarter month (i.e., Jan for Q1) is available in the quarterly series' data
        const obsDate = serie.data.find(obs => (Highcharts.dateFormat('%Y', obs.x) + ' ' + Highcharts.dateFormat('%b', obs.x)) === date);
        if (obsDate) {
          const qDate = Highcharts.dateFormat('%Y', obsDate.x) + ' ' + pointQuarter;
          label += formatSeriesLabel(name, units, geo, serie, obsDate.y, qDate, obsDate.x, '');
        }
      });
      // Return string of quarterly series with their values formatted for the tooltip
      return label;
    };
    let s = '', tooltip = '';
    const chartSeries = args.chart.series;
    // Series in chart with an annual frequency
    const annualSeries = filterFrequency(chartSeries, 'A');
    // Series in chart with a quarterly frequency
    const quarterSeries = filterFrequency(chartSeries, 'Q');
    // Series in chart with a monthly frequency
    const monthSeries = filterFrequency(chartSeries, 'M');
    // Points in the shared tooltip
    points.forEach((point, index) => {
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
      const dateLabel = Highcharts.dateFormat('%Y', x) + getFreqLabel(point.series.userOptions.frequency, point.x);
      tooltip += formatSeriesLabel(name, units, geo, point.series, point.y, dateLabel, point.x, s);
    });
    return tooltip;
  }

  reformatTooltip(chart, tooltipFormatter) {
    const name = this.nameChecked;
    const units = this.unitsChecked;
    const geo = this.geoChecked;
    chart.tooltip.options.formatter = function (args) {
      return tooltipFormatter(args, this.points, this.x, name, units, geo);
    };
  }

  nameActive(e, chart, tooltipFormatter) {
    this.nameChecked = e.target.checked;
    return this.reformatTooltip(chart, tooltipFormatter);
  }

  unitsActive(e, chart, tooltipFormatter) {
    this.unitsChecked = e.target.checked;
    return this.reformatTooltip(chart, tooltipFormatter);
  }

  geoActive(e, chart, tooltipFormatter) {
    this.geoChecked = e.target.checked;
    return this.reformatTooltip(chart, tooltipFormatter);
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
    let xMin = null, xMax = null;
    // Selected level data
    let selectedRange = null;
    if (chartObject && chartObject.series) {
      let series, seriesLength = 0;
      const nav = chartObject.series.find(serie => serie.name === 'Navigator');
      chartObject.series.forEach((serie) => {
        if (!series || seriesLength < serie.points.length) {
          seriesLength = serie.points.length;
          series = serie;
        }
      });
      selectedRange = nav ? nav.points : series ? series.points : null;
    }
    if (!selectedRange) {
      return { min: null, max: null };
    }
    if (selectedRange) {
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
