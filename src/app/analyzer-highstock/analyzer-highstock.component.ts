import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { HighchartComponent } from 'app/highchart/highchart.component';

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
  @Input() start;
  @Input() end;
  @Input() nameChecked;
  @Input() unitsChecked;
  @Input() geoChecked;
  @Output() tableExtremes = new EventEmitter(true);
  @Output() tooltipOptions = new EventEmitter();
  options;
  chart;
  showChart;

  constructor(private _analyzer: AnalyzerService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // 'destroy' chart on changes
    this.showChart = false;
    // Series in the analyzer that have been selected to be displayed in the chart
    let selectedAnalyzerSeries;
    if (this.series.length) {
      selectedAnalyzerSeries = this.formatSeriesData(this.series, this.allDates);
    }
    // Get buttons for chart
    const chartButtons = this.formatChartButtons(this.portalSettings.highstock.buttons);
    if (selectedAnalyzerSeries) {
      this.drawChart(selectedAnalyzerSeries.series, selectedAnalyzerSeries.yAxis, this.formatTooltip, this.portalSettings, chartButtons);
    }
    // Timeout warning message alerting user if too many units are being added or attempting to remove all series from the chart
    if (this.alertMessage) {
      setTimeout(() => this.alertMessage = '', 4000);
    }
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

  addYAxis(chart, series, seriesUnits, y0Exist) {
    const oppositeExist = chart.yAxis.find(axis => axis.userOptions.opposite === true) ? true : false;
    chart.addAxis({
      labels: {
        format: '{value:,.2f}'
      },
      title: {
        text: seriesUnits
      },
      id: y0Exist ? 'yAxis1' : 'yAxis0',
      opposite: oppositeExist ? false : true,
      showLastLabel: true,
      minTickInterval: 0.01,
      series: [series]
    });
  }

  createYAxes(series: Array<any>, yAxes: Array<any>) {
    // Group series by their units
    const unitGroups = this.groupByUnits(series);
    // Create y-axis groups based on units available
    // i.e., If series with 2 different units have been selected, draw a y-axis for each unit
    // If only 1 unit is selected, check that the max value of each series does not differ by an order of magnitude
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
      const unit = unitGroups[0];
      // use series with the maximum level value as the base to compare with other series
      const maxValueSeries = this.findMaxLevelSeries(unit);
      const level = maxValueSeries.chartData.level;
      const maxValue = Math.max(...level.map(l => l[1]));
      const minValue = Math.min(...level.map(l => l[1]));
      yAxesGroups.push({ axisId: 'yAxis0', units: unit.units, series: [] });
      this.checkMaxValues(unit, minValue, maxValue, yAxesGroups);
      return yAxesGroups;
    }
    if (unitGroups.length > 1) {
      unitGroups.forEach((unit, unitIndex) => {
        yAxesGroups.push({ axisId: 'yAxis' + unitIndex, units: unit.units, series: unit.series });
      });
      return yAxesGroups;
    }
  }

  findMaxLevelSeries(unit) {
    let maxLevelValue, maxValueSeries;
    unit.series.forEach((s) => {
      const max = Math.max(...s.chartData.level.map(l => l[1]));
      if (!maxLevelValue || max > maxLevelValue) {
        maxLevelValue = max;
        maxValueSeries = s;
      }
    });
    return maxValueSeries;
  }

  // If the difference between level values of series (with common units) is sufficiently large enough, draw series on separate axes
  isOverlapSufficient(level, baseMin, baseMax) {
    const sufficientOverlap = 0.5;
    const overlap = this.calculateOverlap(level, baseMin, baseMax);
    return overlap >= sufficientOverlap;
  }

  calculateOverlap(level, baseMin, baseMax) {
    const newMin = Math.min(...level.map(l => l[1]));
    const newMax = Math.max(...level.map(l => l[1]));
    const baseRange = baseMax - baseMin;
    const newRange = newMax - newMin;
    const baseMaxNewMin = baseMax - newMin;
    const newMaxBaseMin = newMax - baseMin;
    return Math.min(baseRange, newRange, baseMaxNewMin, newMaxBaseMin) / Math.max(baseRange, newRange);
  }

  findHighestOverlap(yAxesGroups, baseMin, baseMax) {
    const y0Series = yAxesGroups[0].series;
    const y1Series = yAxesGroups[1].series;
    let highestOverlap, highestOverlapAxis;
    y0Series.forEach((s) => {
      const level = s.chartData.level;
      const overlap = this.calculateOverlap(level, baseMin, baseMax);
      if (!highestOverlap || overlap >= highestOverlap) {
        highestOverlap = overlap;
        highestOverlapAxis = y0Series;
      }
    });
    y1Series.forEach((s) => {
      const level = s.chartData.level;
      const overlap = this.calculateOverlap(level, baseMin, baseMax);
      if (!highestOverlap || overlap >= highestOverlap) {
        highestOverlap = overlap;
        highestOverlapAxis = y1Series;
      }
    });
    return highestOverlapAxis;
  }

  checkMaxValues(unit, baseMin, baseMax, yAxesGroups) {
    unit.series.forEach((serie) => {
      // Check if series need to be drawn on separate axes
      const level = serie.chartData ? serie.chartData.level : serie.data;
      const sufficientOverlap = this.isOverlapSufficient(level, baseMin, baseMax);
      const yAxis1 = yAxesGroups.find(y => y.axisId === 'yAxis1');
      if (sufficientOverlap) {
        yAxesGroups[0].series.push(serie);
        return;
      }
      if (!sufficientOverlap) {
        if (yAxis1) {
          const highestOverlapAxis = this.findHighestOverlap(yAxesGroups, baseMin, baseMax);
          highestOverlapAxis.push(serie)
          return;
        }
        if (!yAxis1) {
          yAxesGroups.push({ axisId: 'yAxis1', units: unit.units, series: [serie] });
          return;
        }
      }
    });
    return yAxesGroups;
  }

  groupByUnits(series) {
    const units = series.reduce((obj, serie) => {
      obj[serie.seriesDetail.unitsLabelShort] = obj[serie.seriesDetail.unitsLabelShort] || [];
      obj[serie.seriesDetail.unitsLabelShort].push(serie);
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

  formatSeriesData(series, dates) {
    const chartSeries = [];
    let yAxes;
    yAxes = this.createYAxes(series, []);
    series.forEach((serie, index) => {
      const axis = yAxes ? yAxes.find(y => y.series.some(s => s.seriesDetail.id === serie.seriesDetail.id)) : null;
      chartSeries.push({
        className: serie.seriesDetail.id,
        name: serie.displayName,
        data: serie.chartData.level,
        yAxis: axis ? axis.id : null,
        displayName: serie.seriesDetail.title,
        decimals: serie.seriesDetail.decimals,
        frequency: serie.seriesDetail.frequencyShort,
        geography: serie.seriesDetail.geography.name,
        showInNavigator: false,
        events: {
          legendItemClick: function () {
            return false;
          }
        },
        unitsLabelShort: serie.seriesDetail.unitsLabelShort,
        seasonallyAdjusted: serie.seriesDetail.seasonallyAdjusted,
        dataGrouping: {
          enabled: false
        },
        pseudoZones: serie.chartData.pseudoZones
      });
    });
    const navDates = this.createNavigatorDates(dates);
    chartSeries.push({
      data: navDates,
      showInLegend: false,
      showInNavigator: true,
      includeInCSVExport: false,
      index: -1,
      colorIndex: -1,
      name: 'Navigator'
    });
    return { series: chartSeries, yAxis: yAxes };
  }

  drawChart(series, yAxis, tooltipFormatter, portalSettings, buttons) {
    const startDate = this.start ? this.start : null;
    const endDate = this.end ? this.end : null;
    const tooltipName = this.nameChecked;
    const tooltipUnits = this.unitsChecked;
    const tooltipGeo = this.geoChecked;

    this.options = {
      chart: {},
      labels: {
        style: {}
      },
      legend: {},
      rangeSelector: {
        labelStyle: {}
      },
      lang: {},
      exporting: {
        buttons: {
          contextButton: {},
          exportButton: {}
        },
        chartOptions: {
          navigator: {},
          scrollbar: {},
          rangeSelector: {},
          credits: {},
          title: {},
          subtitle: {}
        }
      },
      tooltip: {},
      credits: {},
      xAxis: {},
      yAxis: [],
      plotOptions: {
        series: {}
      },
      series: []
    };

    // Chart Options
    this.options.chart.alignTicks = false;
    this.options.zoomType = 'x';

    // Labels
    this.options.labels.items = [
      {
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
      }
    ];
    this.options.labels.style.display = 'none';

    // Legend
    this.options.legend.enabled = true;
    this.options.legend.labelFormatter = function () {
      return this.yAxis.userOptions.opposite ? this.name + ' (right)' : this.name + ' (left)';
    };

    // Range Selector
    this.options.rangeSelector.selected = !startDate && !endDate ? 3 : null;
    this.options.rangeSelector.buttons = buttons;
    this.options.rangeSelector.buttonPosition = { x: 10, y: 10 };
    this.options.rangeSelector.labelStyle.visibility = 'hidden';
    this.options.rangeSelector.inputEnabled = false;
    this.options.lang.exportKey = 'Download Chart';

    // Exporting
    this.options.exporting.buttons.contextButton.enabled = false;
    this.options.exporting.buttons.exportButton.text = 'Download';
    this.options.exporting.buttons.exportButton._titleKey = 'exportKey';
    this.options.exporting.buttons.exportButton.menuItems = [
      {
        textKey: 'downloadPNG',
        onclick: function () {
          this.exportChart();
        }
      }, {
        textKey: 'downloadJPEG',
        onclick: function () {
          this.exportChart({
            type: 'image/jpeg'
          });
        }
      }, {
        textKey: 'downloadPDF',
        onclick: function () {
          this.exportChart({
            type: 'application/pdf'
          });
        }
      }, {
        textKey: 'downloadSVG',
        onclick: function () {
          this.exportChart({
            type: 'image/svg+xml'
          });
        }
      }, {
        textKey: 'downloadCSV',
        onclick: function () {
          this.downloadCSV();
        }
      }
    ];
    this.options.exporting.chartOptions.events = null;
    this.options.exporting.chartOptions.navigator.enabled = false;
    this.options.exporting.chartOptions.scrollbar.enabled = false;
    this.options.exporting.chartOptions.rangeSelector.enabled = false;
    this.options.exporting.chartOptions.credits.enabled = true;
    this.options.exporting.chartOptions.credits.text = portalSettings.highstock.credits;
    this.options.exporting.chartOptions.credits.position = { align: 'right' };
    this.options.exporting.chartOptions.title.align = 'left';
    this.options.exporting.chartOptions.subtitle.text = '';

    // Tooltip
    this.options.tooltip.borderWidth = 0;
    this.options.tooltip.shadow = false;
    this.options.tooltip.shared = true;
    this.options.tooltip.formatter = function (args) {
      return tooltipFormatter(args, this.points, this.x, tooltipName, tooltipUnits, tooltipGeo);
    };

    // Credits
    this.options.credits.enabled = false;

    // xAxis
    this.options.xAxis.minRange = 1000 * 3600 * 24 * 30 * 12;
    this.options.xAxis.min = startDate ? Date.parse(startDate) : undefined;
    this.options.xAxis.max = endDate ? Date.parse(endDate) : undefined;
    this.options.xAxis.ordinal = false;

    // yAxis
    this.options.yAxis = yAxis;

    // Plot Options
    this.options.plotOptions.series.cropThreshold = 0;

    // Series
    this.options.series = series;

    this.showChart = true;
  }

  saveInstance(chartInstance) {
    this.setTableExtremes(chartInstance);
  }

  formatTooltip(args, points, x, name: Boolean, units: Boolean, geo: Boolean) {
    // Name, units, and geo evaluate as true when their respective tooltip options are checked in the analyzer
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
        s += seriesColor + label + geoLabel + '<br>';
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
        const pointMonth = Highcharts.dateFormat('%b', point.x);
        if (pointMonth !== 'Jan' && pointMonth !== 'Apr' && pointMonth !== 'Jul' && pointMonth !== 'Oct') {
          const quarters = { Q1: 'Jan', Q2: 'Apr', Q3: 'Jul', Q4: 'Oct' };
          const months = { Feb: 'Q1', Mar: 'Q1', May: 'Q2', Jun: 'Q2', Aug: 'Q3', Sep: 'Q3', Nov: 'Q4', Dec: 'Q4' };
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

  nameActive(e, chart, tooltipFormatter) {
    this.nameChecked = e.target.checked;
    this.tooltipOptions.emit({ value: e.target.checked, label: 'name' });
  }

  unitsActive(e, chart, tooltipFormatter) {
    this.unitsChecked = e.target.checked;
    this.tooltipOptions.emit({ value: e.target.checked, label: 'units' });
  }

  geoActive(e, chart, tooltipFormatter) {
    this.geoChecked = e.target.checked;
    this.tooltipOptions.emit({ value: e.target.checked, label: 'geo' });
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
