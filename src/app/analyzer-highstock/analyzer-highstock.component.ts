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
  
  constructor(private _highstockHelper: HighstockHelperService, private _analyzer: AnalyzerService) {
    this._analyzer.switchYAxes.subscribe((data: any) => {
      this.switchYAxes(data, this.chartObject);
    });
    this._analyzer.toggleSeriesInChart.subscribe((data: any) => {
      this._analyzer.toggleChartSeries(data.seriesInfo.id, data.seriesInfo.unitsLabelShort);
    });
  }

  ngOnChanges() {
    // Series in the analyzer that have been selected to be displayed in the chart
    let selectedAnalyzerSeries, yAxes;
    if (this.series.length) {
      yAxes = this.setYAxes(this.series);
      selectedAnalyzerSeries = this.formatSeriesData(this.series, this.allDates, yAxes, this.navigator);
    }
    if (this.chartObject) {
      // If the chart has already been drawn, check to see if another y-axis needs to be added
      this.addYAxis(this.chartObject, yAxes);
      // Check for series that need to be added or removed from the chart.
      // (workaround to make sure x-axis updates when navigator dates change)
      this.removeSeriesFromChart(this.chartObject.series, selectedAnalyzerSeries);
      this.addSeriesToChart(this.chartObject, selectedAnalyzerSeries);
    }
    // Get buttons for chart
    const chartButtons = this.formatChartButtons(this.portalSettings.highstock.buttons);
    if (selectedAnalyzerSeries && this.chartObject === undefined) {
      this.initChart(selectedAnalyzerSeries, yAxes, this.portalSettings, chartButtons, this.navigator);
      this.updateChart = true;
    }
    // Timeout warning message alerting user if too many units are being added or attempting to remove all series from the chart
    if (this.alertMessage) {
      setTimeout(() => this.alertMessage = '', 4000);
    }
  }

  switchYAxes(data: any, chartObject) {
    const yAxes = chartObject.yAxis.slice().filter(axis => axis.userOptions.id !== 'navigator-y-axis');
    const series = chartObject.series.find(s => s.userOptions.className === data.seriesInfo.id);
    if (yAxes.length === 1) {
      chartObject.addAxis({
        labels: {
          formatter: function () {
            return Highcharts.numberFormat(this.value, 2, '.', ',');
          }
        },
        id: yAxes[0].userOptions.id === 'yAxis0' ? 'yAxis1' : 'yAxis0',
        title: {
          text: data.seriesInfo.unitsLabelShort
        },
        opposite: yAxes[0].userOptions.index === 0 ? true : false,
        minPadding: 0,
        maxPadding: 0,
        minTickInterval: 0.01,
        showEmpty: false
      });
      series.update({
        yAxis: series.userOptions.yAxis === 'yAxis0' ? 'yAxis1' : 'yAxis0'
      });
    }
    if (yAxes.length === 2) {
      console.log('2 yAxes', yAxes)
      const uniqueUnits = yAxes.map(y => y.userOptions.title.text).filter((unit, i, self) => self.indexOf(unit) === i);
      console.log(uniqueUnits);
      if (uniqueUnits.length === 2) {
        yAxes.forEach((axis) => {
          axis.update({
            title: {
              text: uniqueUnits.find(unit => unit !== axis.userOptions.title.text)
            }
          });
        });
        const chartSeries = chartObject.series.filter(s => s.userOptions.yAxis === 'yAxis0' || s.userOptions.yAxis === 'yAxis1');
        console.log('chart series', chartSeries);
        chartSeries.forEach((s) => {
          console.log('s', s.userOptions.yAxis === 'yAxis0')
          s.update({
            yAxis: s.userOptions.yAxis === 'yAxis0' ? 'yAxis1' : 'yAxis0'
          });
          console.log('s', s.userOptions.yAxis)
        })
      }
      // Check if each axis uses a unique unit
      // If yes, swap all series/axes
      // If no, swap single series
      /* const axis = this.chartObject.get(series.userOptions.yAxis === 'yAxis0' ? 'yAxis1' : 'yAxis0');
      axis.update({
        title: {
          text: data.seriesInfo.unitsLabelShort
        }
      })
      series.update({
        yAxis: series.userOptions.yAxis === 'yAxis0' ? 'yAxis1' : 'yAxis0'
      }); */
    }
    chartObject.yAxis.forEach((a) => {
      const axisSeries = a.series.filter(s => s.userOptions.className !== 'navigator');
      if (!axisSeries.length) {
        a.update({
          visibile: false,
          title: {
            text: null
          }
        });
      }
    });
  }

  addYAxis(chartObject, yAxes: Array<any>) {
    yAxes.forEach((y) => {
      const axisExists = chartObject.yAxis.findIndex(a => a.userOptions.id === y.id);
      if (axisExists === -1) {
        chartObject.addAxis(y);
      }
    });
  };

  removeSeriesFromChart(chartObjectSeries: Array<any>, analyzerSeries: Array<any>) {
    chartObjectSeries.forEach((s) => {
      const keepInChart = analyzerSeries.find(serie => serie.name === s.name && s.data.length === serie.data.length);
      if (!keepInChart) {
        s.remove();
      }
    });
  };

  addSeriesToChart(chartObject, analyzerSeries: Array<any>) {
    analyzerSeries.forEach((s) => {
      const inChart = chartObject.series.find(serie => serie.name === s.name && serie.data.length === s.data.length);
      if (!inChart) {
        chartObject.addSeries(s);
      }
    });
  };

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
      return [{ axisId: 'yAxis0', units: unit.units, series: unit.series }];
    }
    if (unitGroups.length > 1) {
      return unitGroups.map((unit, index) => {
        return { axisId: 'yAxis' + index, units: unit.units, series: unit.series };
      });
    }
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
    const setInputDateParser = (value, freq) => this._highstockHelper.inputDateParserFormatter(value, freq);
    const setDateToFirstOfMonth = (freq, date) => this._highstockHelper.setDateToFirstOfMonth(freq, date);
    const tableExtremes = this.tableExtremes;
    this.chartOptions.chart = {
      alignTicks: false,
      description: undefined,
      events: {
        render: function () {
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
      buttonPosition: {
        x: 0,
        y: 0
      },
      labelStyle: {
        visibility: 'hidden'
      },
      inputEnabled: true,
      inputDateFormat: setInputDateFormat(navigatorOptions.frequency),
      inputEditDateFormat: setInputEditDateFormat(navigatorOptions.frequency),
      inputDateParser: function (value) {
        return setInputDateParser(value, navigatorOptions.frequency);
      },
      inputPosition: {
        x: -30,
        y: 0
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
          this._selectedMin = setDateToFirstOfMonth(navigatorOptions.frequency, userMin);
          this._selectedMax = setDateToFirstOfMonth(navigatorOptions.frequency, userMax);
          this._hasSetExtremes = true;
          this._extremes = getChartExtremes(this);
          if (this._extremes) {
            tableExtremes.emit({ minDate: this._extremes.min, maxDate: this._extremes.max });
            // use setExtremes to snap dates to first of the month
            this.setExtremes(Date.parse(this._extremes.min), Date.parse(this._extremes.max));
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