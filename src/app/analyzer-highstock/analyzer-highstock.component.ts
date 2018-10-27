import { Component, OnChanges, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { HighstockObject } from '../HighstockObject';
import 'jquery';
import { HighstockHelperService } from '../highstock-helper.service';
import { HighchartsObject } from 'app/HighchartsObject';
declare var $: any;
declare var require: any;
declare var require: any;
const Highcharts = require('highcharts/js/highstock');
const exporting = require('../../../node_modules/highcharts/js/modules/exporting');
const offlineExport = require('../../../node_modules/highcharts/js/modules/offline-exporting');
const exportCSV = require('../csv-export');
exporting(Highcharts);
offlineExport(Highcharts);
exportCSV(Highcharts);

Highcharts.setOptions({
  navigator: {
    xAxis: {
        isInternal: true
      },
    yAxis: {
        isInternal: true
      }
  }
});

@Component({
  selector: 'app-analyzer-highstock',
  templateUrl: './analyzer-highstock.component.html',
  styleUrls: ['./analyzer-highstock.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyzerHighstockComponent implements OnChanges {
  @Input() series;
  @Input() allDates;
  @Input() portalSettings;
  @Input() alertMessage;
  @Input() start;
  @Input() end;
  @Input() nameChecked;
  @Input() unitsChecked;
  @Input() geoChecked;
  @Input() navigator;
  @Output() tableExtremes = new EventEmitter(true);
  @Output() tooltipOptions = new EventEmitter();
  Highcharts = Highcharts;
  chartConstructor = 'stockChart';
  chartOptions = <HighstockObject>{};
  updateChart = false;
  chartObject;
  constructor(private _highstockHelper: HighstockHelperService) { }

  ngOnChanges() {
    console.log('test')
    // Series in the analyzer that have been selected to be displayed in the chart
    let selectedAnalyzerSeries, yAxes;
    if (this.series.length) {
      yAxes = this.setYAxes(this.series);
      selectedAnalyzerSeries = this.formatSeriesData(this.series, this.allDates, yAxes, this.navigator);
    }
    if (this.chartObject) {
      console.log('onChanges', this.chartObject);
      console.log(selectedAnalyzerSeries)
      // If the chart has already been drawn, check to see if another y-axis needs to be added
      yAxes.forEach((y) => {
        const axisExists = this.chartObject.yAxis.findIndex(a => a.userOptions.id === y.id)
        if (axisExists === -1) {
          this.chartObject.addAxis(y);
        }
      });
      this.chartObject.series.forEach((s) => {
        console.log('s', s);
        const displayInChart = selectedAnalyzerSeries.find(serie => serie.name === s.name && s.data.length === serie.data.length);
        console.log('displayInChart', displayInChart)
        if (!displayInChart) {
          s.remove()
        }
      });
      selectedAnalyzerSeries.forEach((s) => {
        const inChart = this.chartObject.series.find(serie => serie.name === s.name && serie.data.length === s.data.length);
        if (!inChart) {
          this.chartObject.addSeries(s);
        }
      });
    }
    // Get buttons for chart
    const chartButtons = this.formatChartButtons(this.portalSettings.highstock.buttons);
    if (selectedAnalyzerSeries) {
      this.initChart(selectedAnalyzerSeries, yAxes, this.portalSettings, chartButtons, this.navigator);
      this.updateChart = true;
    }
    // Timeout warning message alerting user if too many units are being added or attempting to remove all series from the chart
    if (this.alertMessage) {
      setTimeout(() => this.alertMessage = '', 4000);
    }
  }

  chartCallback = (chart) => {
    this.chartObject = chart;
  }

  setYAxes = (series) => {
    // Group series by their units
    const unitGroups = this.groupByUnits(series);
    // Create y-axis groups based on units available
    // i.e., If series with 2 different units have been selected, draw a y-axis for each unit
    // If only 1 unit is selected, check that the max value of each series does not differ by an order of magnitude
    // If yes, draw series on separate y axes
    const yAxesGroups = this.setYAxesGroups(unitGroups);
    const yAxes = yAxesGroups.map((axis, index) => {
      return {
        labels: {
          formatter: function () {
            return Highcharts.numberFormat(this.value, 2, '.', ',');
          }
        },
        id: axis.axisId,
        title: {
          text: axis.units
        },
        opposite: index === 0 ? false : true,
        minPadding: 0,
        maxPadding: 0,
        minTickInterval: 0.01,
        series: axis.series,
        showEmpty: false
      }
    });
    return yAxes;
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
  };

  setYAxesGroups = (unitGroups) => {
    // Create groups for up to 2 axes, assign axis id's as 'yAxis0' and 'yAxis1'
    if (unitGroups.length === 1) {
      // Compare series to check if values differ by order of magnitude
      const unit = unitGroups[0];
      // use series with the maximum level value as the base to compare with other series
      const maxValueSeries = this.findMaxLevelSeries(unit);
      const level = maxValueSeries.chartData.level;
      const maxValue = Math.max(...level);
      const minValue = Math.min(...level);
      return this.checkMaxValues(unit, minValue, maxValue);
    }
    if (unitGroups.length > 1) {
      return unitGroups.map((unit, index) => {
        return { axisId: 'yAxis' + index, units: unit.units, series: unit.series };
      });
    }
  };

  checkMaxValues = (unit, baseMin, baseMax) => {
    const yAxesGroups = [{ axisId: 'yAxis0', units: unit.units, series: [] }];
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
          highestOverlapAxis.push(serie);
          return;
        }
        if (!yAxis1) {
          yAxesGroups.push({ axisId: 'yAxis1', units: unit.units, series: [serie] });
          return;
        }
      }
    });
    return yAxesGroups;
  };

  findMaxLevelSeries = (unit) => {
    let maxLevelValue, maxValueSeries;
    unit.series.forEach((s) => {
      const max = Math.max(...s.chartData.level);
      if (!maxLevelValue || max > maxLevelValue) {
        maxLevelValue = max;
        maxValueSeries = s;
      }
    });
    return maxValueSeries;
  };

  // If the difference between level values of series (with common units) is sufficiently large enough, draw series on separate axes
  isOverlapSufficient = (level, baseMin, baseMax) => {
    const sufficientOverlap = 0.5;
    const overlap = this.calculateOverlap(level, baseMin, baseMax);
    return overlap >= sufficientOverlap;
  };

  calculateOverlap = (level, baseMin, baseMax) => {
    const newMin = Math.min(...level);
    const newMax = Math.max(...level);
    const baseRange = baseMax - baseMin;
    const newRange = newMax - newMin;
    const baseMaxNewMin = baseMax - newMin;
    const newMaxBaseMin = newMax - baseMin;
    return Math.min(baseRange, newRange, baseMaxNewMin, newMaxBaseMin) / Math.max(baseRange, newRange);
  };

  findHighestOverlap = (yAxesGroups, baseMin, baseMax) => {
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
  };

  groupByUnits = (series) => {
    const units = series.reduce((obj, serie) => {
      obj[serie.seriesDetail.unitsLabelShort] = obj[serie.seriesDetail.unitsLabelShort] || [];
      obj[serie.seriesDetail.unitsLabelShort].push(serie);
      return obj;
    }, {});
    const groups = Object.keys(units).map((key) => {
      return { units: key, series: units[key] };
    });
    return groups;
  };

  createNavigatorDates = (dates) => {
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
  };

  formatSeriesData = (series: Array<any>, dates: Array<any>, yAxes: Array<any>, navigatorOptions) => {
    const chartSeries = series.map((serie) => {
      const axis = yAxes ? yAxes.find(y => y.series.some(s => s.seriesDetail.id === serie.seriesDetail.id)) : null;
      return {
        className: serie.seriesDetail.id,
        name: serie.chartDisplayName,
        data: serie.chartData.level,
        yAxis: axis ? axis.id : null,
        pointStart: Date.parse(serie.chartData.dates[0].date),
        pointInterval: serie.seriesDetail.frequencyShort === 'Q' ? 3 : serie.seriesDetail.frequencyShort === 'S' ? 6 : 1,
        pointIntervalUnit: serie.seriesDetail.frequencyShort === 'A' ? 'year' : 'month',
        decimals: serie.seriesDetail.decimals,
        frequency: serie.seriesDetail.frequencyShort,
        geography: serie.seriesDetail.geography.name,
        includeInCSVExport: true,
        showInLegend: true,
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
      };
    });
    chartSeries.push({
      className: 'navigator',
      data: new Array(navigatorOptions.numberOfObservations).fill(null),
      pointStart: Date.parse(navigatorOptions.dateStart),
      pointInterval: navigatorOptions.frequency === 'Q' ? 3 : navigatorOptions.frequency === 'S' ? 6 : 1,
      pointIntervalUnit: navigatorOptions.frequency === 'A' ? 'year' : 'month',
      decimals: null,
      frequency: null,
      geography: null,
      yAxis: 0,
      dataGrouping: {
        enabled: false
      },
      showInLegend: false,
      showInNavigator: true,
      includeInCSVExport: false,
      name: 'Navigator',
      events: {
        legendItemClick: function () {
          return false;
        }
      },
      unitsLabelShort: null,
      seasonallyAdjusted: null,
      pseudoZones: null
    });
    return chartSeries;
  };

  initChart = (series, yAxis, portalSettings, buttons, navigatorOptions) => {
    const startDate = this.start ? this.start : null;
    const endDate = this.end ? this.end : null;
    const tooltipName = this.nameChecked;
    const tooltipUnits = this.unitsChecked;
    const tooltipGeo = this.geoChecked;
    const formatTooltip = (args, points, x, name, units, geo) => this.formatTooltip(args, points, x, name, units, geo);
    const getChartExtremes = (chartObject) => this._highstockHelper.getAnalyzerChartExtremes(chartObject);
    const xAxisFormatter = (chart, freq) => this._highstockHelper.xAxisLabelFormatter(chart, freq);
    const setInputDateFormat = freq => this._highstockHelper.inputDateFormatter(freq);
    const setInputEditDateFormat = freq => this._highstockHelper.inputEditDateFormatter(freq);
    const setInputDateParser = value => this._highstockHelper.inputDateParserFormatter(value);
    const tableExtremes = this.tableExtremes;
    this.chartOptions.chart = {
      alignTicks: false,
      description: undefined,
      events: {
        render: function () {
          console.log('render');
          const userMin = new Date(this.xAxis[0].getExtremes().min).toISOString().split('T')[0];
          const userMax = new Date(this.xAxis[0].getExtremes().max).toISOString().split('T')[0];
          this._selectedMin = navigatorOptions.frequency === 'A' ? userMin.substr(0, 4) + '-01-01' : userMin;
          this._selectedMax = navigatorOptions.frequency === 'A' ? userMax.substr(0, 4) + '-01-01' : userMax;
          this._hasSetExtremes = true;
          this._extremes = getChartExtremes(this);
          if (this._extremes) {
            tableExtremes.emit({ minDate: this._extremes.min, maxDate: this._extremes.max });
          }
        }
      },
      zoomType: 'x'
    };
    this.chartOptions.labels = {
      items: [
        { html: '' },
        { html: '' },
        { html: '' },
        { html: '' },
        { html: portalSettings.highstock.labels.portal },
        { html: portalSettings.highstock.labels.portalLink },
        { html: '' }
      ],
      style: {
        display: 'none'
      }
    };
    this.chartOptions.legend = {
      enabled: true,
      labelFormatter: function () {
        return this.yAxis.userOptions.opposite ? this.name + ' (right)' : this.name + ' (left)';
      }
    };
    this.chartOptions.rangeSelector = {
      selected: !startDate && !endDate ? 3 : null,
      buttons: buttons,
      labelStyle: {
        visibility: 'hidden'
      },
      inputEnabled: true,
      inputDateFormat: setInputDateFormat(navigatorOptions.frequency),
      inputEditDateFormat: setInputEditDateFormat(navigatorOptions.frequency),
      inputDateParser: function (value) {
        return setInputDateParser(value);
      }
    };
    this.chartOptions.lang = {
      exportKey: 'Download Chart'
    };
    this.chartOptions.exporting = {
      buttons: {
        contextButton: {
          enabled: false
        },
        exportButton: {
          _titleKey: 'exportKey',
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG', 'downloadCSV'],
          text: 'Download'
        }
      },
      csv: {
        dateFormat: '%Y-%m-%d',
      },
      filename: 'chart',
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
          position: { align: 'right', x: -10, y: -5 }
        },
        title: {
          align: 'left',
          text: null
        },
        subtitle: {
          text: ''
        }
      }
    };
    this.chartOptions.tooltip = {
      borderWidth: 0,
      shadow: false,
      shared: true,
      formatter: function (args) {
        return formatTooltip(args, this.points, this.x, tooltipName, tooltipUnits, tooltipGeo);
      }
    };
    this.chartOptions.credits = {
      enabled: false
    };
    this.chartOptions.xAxis = {
      events: {
        afterSetExtremes: function () {
          const userMin = new Date(this.getExtremes().min).toISOString().split('T')[0];
          const userMax = new Date(this.getExtremes().max).toISOString().split('T')[0];
          this._selectedMin = navigatorOptions.frequency === 'A' ? userMin.substr(0, 4) + '-01-01' : userMin;
          this._selectedMax = navigatorOptions.frequency === 'A' ? userMax.substr(0, 4) + '-01-01' : userMax;
          this._hasSetExtremes = true;
          this._extremes = getChartExtremes(this);
          if (this._extremes) {
            tableExtremes.emit({ minDate: this._extremes.min, maxDate: this._extremes.max });
          }
        }
      },
      minRange: 1000 * 3600 * 24 * 30 * 12,
      min: startDate ? Date.parse(startDate) : undefined,
      max: endDate ? Date.parse(endDate) : undefined,
      ordinal: false,
      labels: {
        formatter: function () {
          return xAxisFormatter(this, navigatorOptions.frequency);
        }
      }
    };
    this.chartOptions.yAxis = yAxis;
    this.chartOptions.plotOptions = {
      series: {
        cropThreshold: 0
      }
    };
    this.chartOptions.series = series;
  };

  formatTooltip(args, points, x, name: Boolean, units: Boolean, geo: Boolean) {
    // Name, units, and geo evaluate as true when their respective tooltip options are checked in the analyzer
    const getFreqLabel = (frequency, date) => this._highstockHelper.getTooltipFreqLabel(frequency, date);
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
      const displayValue = Highcharts.numberFormat(value, decimals, '.', ',');
      const formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
      return formattedValue;
    };
    const formatSeriesLabel = function (sName, sUnits, sGeo, point, seriesValue: number, date: string, pointX, s: string) {
      const seriesColor = getSeriesColor(point.colorIndex);
      const displayName = sName ? point.userOptions.name : '';
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
          const qDate = pointQuarter + ' ' + Highcharts.dateFormat('%Y', obsDate.x);
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
      const dateLabel = getFreqLabel(point.series.userOptions.frequency, point.x);
      tooltip += formatSeriesLabel(name, units, geo, point.series, point.y, dateLabel, point.x, s);
    });
    return tooltip;
  };

  nameActive(e) {
    this.nameChecked = e.target.checked;
    this.tooltipOptions.emit({ value: e.target.checked, label: 'name' });
  };

  unitsActive(e) {
    this.unitsChecked = e.target.checked;
    this.tooltipOptions.emit({ value: e.target.checked, label: 'units' });
  };

  geoActive(e) {
    this.geoChecked = e.target.checked;
    this.tooltipOptions.emit({ value: e.target.checked, label: 'geo' });
  };
}