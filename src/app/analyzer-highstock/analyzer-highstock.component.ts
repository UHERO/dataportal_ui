import { Component, OnChanges, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { HighstockObject } from '../HighstockObject';
import 'jquery';
import { HighstockHelperService } from '../highstock-helper.service';
import { HighchartsObject } from 'app/HighchartsObject';
declare var $: any;
declare var require: any;
const Highcharts = require('highcharts/highstock');
const exporting = require('../../../node_modules/highcharts/modules/exporting');
const offlineExport = require('../../../node_modules/highcharts/modules/offline-exporting');
const exportCSV = require('../csv-export');
exporting(Highcharts);
offlineExport(Highcharts);
exportCSV(Highcharts);

@Component({
  selector: 'app-analyzer-highstock',
  templateUrl: './analyzer-highstock.component.html',
  styleUrls: ['./analyzer-highstock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyzerHighstockComponent implements OnChanges, OnDestroy {
  @Input() series;
  @Input() allDates;
  @Input() portalSettings;
  @Input() start;
  @Input() end;
  @Input() nameChecked;
  @Input() unitsChecked;
  @Input() geoChecked;
  @Output() tableExtremes = new EventEmitter(true);
  @Output() tooltipOptions = new EventEmitter();
  Highcharts = Highcharts;
  chartConstructor = 'stockChart';
  chartOptions = <HighstockObject>{};
  updateChart = false;
  chartObject;
  toggleSeries;
  switchAxes;
  alertMessage;

  constructor(private _highstockHelper: HighstockHelperService, private _analyzer: AnalyzerService, private cdr: ChangeDetectorRef) {
    this.switchAxes = this._analyzer.switchYAxes.subscribe((data: any) => {
      this.switchYAxes(data, this.chartObject);
    });
    this.toggleSeries = this._analyzer.toggleSeriesInChart.subscribe((data: any) => {
      const chartSeries = this.series.filter(s => s.showInChart);
      const toggleDisplay = this._analyzer.checkSeriesUnits(chartSeries, data.seriesInfo.unitsLabelShort);
      if (toggleDisplay) {
        this.toggleSeriesDisplay(data);
        const seriesToUpdate = this._analyzer.analyzerData.analyzerSeries.find(s => s.seriesDetail.id === data.seriesInfo.id);
        if (seriesToUpdate) {
          seriesToUpdate.showInChart = !seriesToUpdate.showInChart;
        }
      }
      if (!toggleDisplay) {
        this.alertMessage = 'Chart may only display up to two different units.';
        if (this.alertMessage) {
          // Timeout warning message alerting user if too many units are being added to the chart
          setTimeout(() => {
            this.alertMessage = '';
            this.cdr.detectChanges();
          }, 4000);
        }
        this.cdr.detectChanges();
      }
    });
  }

  ngOnChanges() {
    // Series in the analyzer that have been selected to be displayed in the chart
    let selectedAnalyzerSeries, yAxes, navigatorOptions;
    if (this.series.length) {
      yAxes = this.setYAxes(this.series);
      navigatorOptions = {
        frequency: this._analyzer.checkFrequencies(this.series),
        dateStart: this.allDates[0].date,
        numberOfObservations: this.allDates.map(date => date.date).filter((d, i, a) => a.indexOf(d) === i).length
      }
      selectedAnalyzerSeries = this.formatSeriesData(this.series, this.allDates, yAxes, navigatorOptions);
    }
    if (this.chartObject) {
      // Check for series that need to be added or removed from the chart.
      // (workaround to make sure x-axis updates when navigator dates change)
      // this.removeSeriesFromChart(this.chartObject.series, selectedAnalyzerSeries);
      const nav = this.chartObject.series.find(s => s.userOptions.className === 'navigator');
      if (nav) {
        nav.update({
          data: new Array(navigatorOptions.numberOfObservations).fill(null),
          pointStart: Date.parse(navigatorOptions.dateStart),
          pointInterval: navigatorOptions.frequency === 'Q' ? 3 : navigatorOptions.frequency === 'S' ? 6 : 1,
          pointIntervalUnit: navigatorOptions.frequency === 'A' ? 'year' : 'month',  
        });
      }
    }
    if (selectedAnalyzerSeries) {
      const chartButtons = this.formatChartButtons(this.portalSettings.highstock.buttons);
      this.initChart(selectedAnalyzerSeries, yAxes, this.portalSettings, chartButtons, navigatorOptions);
      this.updateChart = true;
    }
  }

  ngOnDestroy() {
    this.toggleSeries.unsubscribe();
    this.switchAxes.unsubscribe();
  }

  toggleSeriesDisplay(data) {
    const yAxes = this.chartObject.yAxis.slice().filter(axis => axis.userOptions.id !== 'navigator-y-axis');
    const seriesInChart = this.chartObject.series.find(s => s.userOptions.className === data.seriesInfo.id);
    seriesInChart.update({
      visible: !seriesInChart.userOptions.visible,
      showInLegend: !seriesInChart.userOptions.showInLegend,
      includeInCSVExport: !seriesInChart.userOptions.includeInCSVExport
    }, false);
    const seriesAxis = this.chartObject.get(seriesInChart.userOptions.yAxis);
    const visibleSeriesDifferentUnits = seriesAxis.series.filter(s => s.userOptions.unitsLabelShort !== seriesInChart.userOptions.unitsLabelShort && s.userOptions.className !== 'navigator' && s.userOptions.visible);
    if (visibleSeriesDifferentUnits.length) {
      // If the series being made visible is associated with an axis that is currently being used with different units,
      // (i.e., 2 axes are being used with series that have 'Thous' as their units) move the currently drawn series to the opposite axis first
      const oppositeAxis = seriesInChart.userOptions.yAxis === 'yAxis0' ? 'yAxis1' : 'yAxis0'
      visibleSeriesDifferentUnits.forEach((s) => {
        s.update({
          yAxis: seriesInChart.userOptions.yAxis === 'yAxis0' ? 'yAxis1' : 'yAxis0'
        });
      });
      this.chartObject.get(oppositeAxis).update({
        title: {
          text: visibleSeriesDifferentUnits[0].userOptions.unitsLabelShort
        },
        visible: true
      });
    }
    seriesAxis.update({
      title: {
        text: seriesInChart.userOptions.unitsLabelShort
      },
      visible: seriesAxis.series.find(s => s.userOptions.visible) ? true : false
    });
    yAxes.forEach((a) => {
      const axisSeries = a.series.filter(s => s.userOptions.className !== 'navigator' && s.userOptions.visible);
      if (!axisSeries.length) {
        a.update({
          visible: false,
        }, false);
      }
    });
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
      const visibleSeries = chartObject.series.filter(s => s.userOptions.visible && s.userOptions.showInLegend);
      const visibleUnits = visibleSeries.map(s => s.userOptions.unitsLabelShort).filter((unit, i, self) => self.indexOf(unit) === i);
      if (visibleUnits.length === 2) {
        this.swapAllSeriesAndAxes(visibleUnits, chartObject, yAxes);
      }
      if (visibleUnits.length === 1) {
        this.swapSingleSeriesAndAxis(series, chartObject);
      }
    }
    yAxes.forEach((a) => {
      const axisSeries = a.series.filter(s => s.userOptions.className !== 'navigator' && s.userOptions.visible);
      if (!axisSeries.length) {
        a.update({
          visible: false,
        }, false);
      }
    });
  }

  swapAllSeriesAndAxes(visibleUnits: Array<any>, chartObject, yAxes: Array<any>) {
    const chartSeries = chartObject.series.filter(s => s.userOptions.yAxis === 'yAxis0' || s.userOptions.yAxis === 'yAxis1');
    chartSeries.forEach((s) => {
      s.update({
        yAxis: s.userOptions.yAxis === 'yAxis0' ? 'yAxis1' : 'yAxis0'
      });
    });
    yAxes.forEach((axis) => {
      axis.update({
        title: {
          text: visibleUnits.find(unit => unit !== axis.userOptions.title.text)
        },
        visible: axis.series.find(s => s.userOptions.visible) ? true : false
      });
    });
  }

  swapSingleSeriesAndAxis(series, chartObject) {
    const axisToUpdate = series.userOptions.yAxis === 'yAxis0' ? 'yAxis1' : 'yAxis0';
    chartObject.get(axisToUpdate).update({
      title: {
        text: series.userOptions.unitsLabelShort
      },
      visible: true
    });
    series.update({
      yAxis: series.userOptions.yAxis === 'yAxis0' ? 'yAxis1' : 'yAxis0'
    });
  }

  removeSeriesFromChart(chartObjectSeries: Array<any>, analyzerSeries: Array<any>) {
    chartObjectSeries.forEach((s) => {
      const keepInChart = analyzerSeries.find(serie => serie.name === s.name && s.data.length === serie.data.length);
      if (!keepInChart) {
        s.remove();
      }
    });
  };

  chartCallback = (chart) => {
    this.chartObject = chart;
  }

  setYAxes = (series) => {
    // Group series by their units
    // i.e., If series with 2 different units have been selected, draw a y-axis for each unit
    const axisIds = {
      yAxis0: [],
      yAxis1: []
    };
    series.reduce((obj, serie) => {
      if (!obj.yAxis0.length) {
        obj.yAxis0.push(serie);
        return obj;
      }
      const y0Units = obj.yAxis0[0].seriesDetail.unitsLabelShort;
      if (serie.seriesDetail.unitsLabelShort === y0Units) {
        obj.yAxis0.push(serie);
      }
      if (serie.seriesDetail.unitsLabelShort !== y0Units) {
        obj.yAxis1.push(serie);
      }
      return obj;
    }, axisIds);
    const yAxes = Object.keys(axisIds).map((axis, index) => {
      const atLeastOneSeriesVisible = axisIds[axis].find(s => s.showInChart);
      return {
        labels: {
          formatter: function () {
            return Highcharts.numberFormat(this.value, 2, '.', ',');
          }
        },
        id: axis,
        title: {
          text: atLeastOneSeriesVisible ? atLeastOneSeriesVisible.seriesDetail.unitsLabelShort : null
        },
        opposite: index === 0 ? false : true,
        minPadding: 0,
        maxPadding: 0,
        minTickInterval: 0.01,
        showEmpty: false,
        series: axisIds[axis],
        visible: atLeastOneSeriesVisible ? true : false
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
        includeInCSVExport: serie.showInChart ? true : false,
        showInLegend: serie.showInChart ? true : false,
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
        pseudoZones: serie.chartData.pseudoZones,
        visible: serie.showInChart ? true : false
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
      yAxis: 'yAxis0',
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
      pseudoZones: null,
      visible: true
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
      styledMode: true,
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
        y: 5
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
        y: 5
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
