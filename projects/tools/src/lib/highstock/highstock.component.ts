// Highstock chart component used for single-series view
import { Component, Inject, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { HighchartChartData, Series, HighstockObject, Geography, Frequency } from '../tools.models';
import 'jquery';
import { HighstockHelperService } from '../highstock-helper.service';
declare var $: any;
import * as Highcharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import offlineExport from 'highcharts/modules/offline-exporting';

@Component({
  selector: 'lib-highstock',
  templateUrl: './highstock.component.html',
  styleUrls: ['../analyzer-highstock/analyzer-highstock.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HighstockComponent implements OnChanges {
  @Input() portalSettings;
  @Input() chartData;
  @Input() seriesDetail;
  @Input() start;
  @Input() end;
  @Input() showTitle;
  // Async EventEmitter, emit tableExtremes on load to render table
  @Output() tableExtremes = new EventEmitter(true);
  // When user updates range selected, emit chartExtremes to update URL params
  @Output() chartExtremes = new EventEmitter(true);
  Highcharts = Highcharts;
  chartConstructor = 'stockChart';
  chartOptions = {} as HighstockObject;
  updateChart = false;
  chartObject;
  showChart = false;

  constructor(
    @Inject('defaultRange') private defaultRange,
    @Inject('logo') private logo,
    private highstockHelper: HighstockHelperService
  ) {
    // workaround to include exporting module in production build
    exporting(this.Highcharts);
    exportData(this.Highcharts);
    offlineExport(this.Highcharts);
    Highcharts.wrap(Highcharts.Chart.prototype, 'getCSV', function(proceed) {
      // Add metadata to top of CSV export
      const result = proceed.apply(this, Array.prototype.slice.call(arguments, 1));
      let seriesMetaData = '';
      this.userOptions.labels.items.forEach((label) => {
        if (!result.includes(label.html)) {
          seriesMetaData += label.html ? `${label.html} \n` : '';
        }
      });
      return seriesMetaData ?  seriesMetaData + '\n\n' + result : result;
    });
  }

  ngOnChanges() {
    if (Object.keys(this.seriesDetail).length) {
      this.showChart = true;
      this.drawChart(this.chartData, this.seriesDetail, this.portalSettings);
      this.updateChart = true;
    }
  }

  // Gets buttons used in Highstock Chart
  formatChartButtons = (freq: string, buttons: Array<any>) => {
    const chartButtons = buttons.reduce((allButtons, button) => {
      if (freq === 'A') {
        // Do not display 1Year button for series with an annual frequency
        if (button !== 1 && button !== 'all') {
          allButtons.push({ type: 'year', count: button, text: button + 'Y' });
        }
      }
      if (freq !== 'A') {
        if (button !== 'all') {
          allButtons.push({ type: 'year', count: button, text: button + 'Y' });
        }
      }
      if (button === 'all') {
        allButtons.push({ type: 'all', text: 'All' });
      }
      return allButtons;
    }, []);
    return chartButtons;
  }

  // Labels used for metadata in CSV download
  formatChartLabels = (seriesDetail: Series, portalSettings, geo: Geography, freq: Frequency) => {
    const labelItems = [{
        html: `Series: ${seriesDetail.title} (${geo.name}, ${freq.label})`
      }, {
        html: seriesDetail.sourceDescription
      }, {
        html: seriesDetail.sourceLink
      }, {
        html: seriesDetail.sourceDetails
      }, {
        html: `${seriesDetail.title}: ${portalSettings.highstock.labels.seriesLink}${seriesDetail.id}`
      }, {
        html: portalSettings.highstock.labels.portal
      }, {
        html: portalSettings.highstock.labels.portalLink
      }];
    return { items: labelItems, style: { display: 'none' } };
  }

  formatChartSeries = (chartData: HighchartChartData, portalSettings, seriesDetail, freq: Frequency) => {
    const series0 = chartData[portalSettings.highstock.series0Name];
    const series1 = chartData[portalSettings.highstock.series1Name];
    const series2 = chartData[portalSettings.highstock.series2Name];
    const yoyLabel = seriesDetail.percent ? 'YOY Change' : 'YOY % Change';
    const ytdLabel = seriesDetail.percent ? 'YTD Change' : 'YTD % Change';
    const c5maLabel = seriesDetail.percent ? 'Annual Change' : 'Annual % Change';
    const seriesLabels = { yoy: yoyLabel, ytd: ytdLabel, c5ma: c5maLabel, none: ' ' };
    const seriesStart = seriesDetail.seriesObservations ? seriesDetail.seriesObservations.observationStart : null;
    const series = [{
      name: 'Level',
      type: 'line',
      yAxis: 1,
      data: series0,
      pointInterval: this.highstockHelper.freqInterval(freq.freq),
      pointIntervalUnit: this.highstockHelper.freqIntervalUnit(freq.freq),
      pointStart: Date.parse(seriesStart),
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
      zones: chartData.pseudoZones,
      zIndex: 1
    }, {
      name: seriesLabels[portalSettings.highstock.series1Name],
      type: portalSettings.highstock.series1Type,
      data: series1,
      pointInterval: this.highstockHelper.freqInterval(freq.freq),
      pointIntervalUnit: this.highstockHelper.freqIntervalUnit(freq.freq),
      pointStart: Date.parse(seriesStart),
      showInNavigator: false,
      dataGrouping: {
        enabled: false
      }
    }, {
      name: seriesLabels[portalSettings.highstock.series2Name],
      data: series2,
      pointInterval: this.highstockHelper.freqInterval(freq.freq),
      pointIntervalUnit: this.highstockHelper.freqIntervalUnit(freq.freq),
      pointStart: Date.parse(seriesStart),
      includeInDataExport: freq.freq === 'A' ? false : true,
      visible: true,
      dataGrouping: {
        enabled: false
      }
    }];
    return series;
  }

  setEndDate = (end: string, chartRange, chartData: HighchartChartData) => {
    // Check if end is only a year. This should occur when switching between geos/freqs for a particular series.
    // (Ex: If the max date selected in an annual series is 2015,
    // switching to the quarterly frequency should select up to 2015 Q4 rather than 2015 Q1)
    if (end && end.length === 4) {
      const dateExists = chartData.dates.slice().reverse().find(date => date.date.includes(end));
      return dateExists ? dateExists.date : null;
    }
    if (end && end.length !== 4) {
      return end;
    }
    return chartRange ? chartRange.end : null;
  }

  drawChart = (chartData: HighchartChartData, seriesDetail: Series, portalSettings) => {
    const decimals = seriesDetail.decimals || 1;
    const geo: Geography = seriesDetail.geography;
    const freq: Frequency = { freq: seriesDetail.frequencyShort, label: seriesDetail.frequency };
    const buttons = portalSettings.highstock.buttons;
    const chartButtons = this.formatChartButtons(freq.freq, buttons);
    const labelItems = this.formatChartLabels(seriesDetail, portalSettings, geo, freq);
    const pseudoZones = chartData.pseudoZones;
    const name = seriesDetail.title;
    const units = seriesDetail.unitsLabel || seriesDetail.unitsLabelShort;
    const change = seriesDetail.percent ? 'Change' : '% Change';
    const chartRange = chartData.level ? this.getSelectedChartRange(this.start, this.end, chartData.dates, this.defaultRange, freq.freq) : null;
    const startDate = this.start ? this.start : chartRange ? chartRange.start : null;
    const endDate = this.setEndDate(this.end, chartRange, chartData);
    const series = this.formatChartSeries(chartData, portalSettings, seriesDetail, freq);
    const tableExtremes = this.tableExtremes;
    const chartExtremes = this.chartExtremes;
    const formatTooltip = (points, x, pseudoZ, dec, frequency) => this.formatTooltip(points, x, pseudoZ, dec, frequency);
    const getChartExtremes = (chartObject) => this.highstockHelper.getChartExtremes(chartObject);
    const xAxisFormatter = (chart, frequency) => this.highstockHelper.xAxisLabelFormatter(chart, frequency);
    const setInputDateFormat = frequency => this.highstockHelper.inputDateFormatter(frequency);
    const setInputEditDateFormat = frequency => this.highstockHelper.inputEditDateFormatter(frequency);
    const setInputDateParser = (value, frequency) => this.highstockHelper.inputDateParserFormatter(value, frequency);
    const setDateToFirstOfMonth = (frequency, date) => this.highstockHelper.setDateToFirstOfMonth(frequency, date);
    const logo = this.logo;
    this.chartOptions.chart = {
      alignTicks: false,
      zoomType: 'x',
      description: freq.freq,
      className: 'single-series-chart',
      events: {
        render() {
          if (!this.chartObject || this.chartObject.series.length < 4) {
            this.chartObject = Object.assign({}, this);
          }
        },
        load() {
          if (logo.analyticsLogoSrc) {
            this.renderer.image(logo.analyticsLogoSrc, 0, 0, 141 / 1.75, 68 / 1.75).add();
          }
          Highcharts.fireEvent(this.xAxis[0], 'afterSetExtremes');
        }
      },
      styledMode: true,
    };
    this.chartOptions.labels = labelItems;
    this.chartOptions.rangeSelector = {
      selected: null,
      buttons: chartButtons,
      buttonPosition: {
        x: 30,
        y: 0
      },
      labelStyle: { visibility: 'hidden' },
      inputEnabled: true,
      inputDateFormat: setInputDateFormat(freq.freq),
      inputEditDateFormat: setInputEditDateFormat(freq.freq),
      inputDateParser(value) {
        return setInputDateParser(value, freq.freq);
      },
      inputPosition: {
        x: -30,
        y: 0
      }
    };
    this.chartOptions.lang = { exportKey: 'Download Chart' };
    this.chartOptions.exporting = {
      allowHTML: true,
      buttons: {
        contextButton: { enabled: false },
        exportButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG', 'downloadCSV'],
          text: 'Download',
          _titleKey: 'exportKey',
        }
      },
      csv: {
        dateFormat: '%Y-%m-%d',
      },
      filename: name + '_' + geo.name + '_' + freq.label,
      chartOptions: {
        events: null,
        chart: {
          events: {
            load() {
              if (logo.analyticsLogoSrc) {
                this.renderer.image(logo.analyticsLogoSrc, 490, 350, 141 / 1.75, 68 / 1.75).add();
              }
            }
          },
          spacingBottom: 40
        },
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
            x: -35,
            y: -5
          }
        },
        title: {
          text: `${name} (${geo.name}, ${freq.label})`,
          align: 'left'
        }
      }
    };
    this.chartOptions.tooltip = {
      borderWidth: 0,
      shadow: false,
      followPointer: true,
      formatter(args) {
        return formatTooltip(this.points, this.x, pseudoZones, decimals, freq);
      }
    };
    this.chartOptions.credits = { enabled: false };
    this.chartOptions.xAxis = {
      events: {
        afterSetExtremes() {
          const userMin = new Date(this.getExtremes().min).toISOString().split('T')[0];
          const userMax = new Date(this.getExtremes().max).toISOString().split('T')[0];
          this._selectedMin = setDateToFirstOfMonth(freq.freq, userMin);
          this._selectedMax = setDateToFirstOfMonth(freq.freq, userMax);
          this._hasSetExtremes = true;
          this._extremes = getChartExtremes(this);
          const lastDate = seriesDetail.seriesObservations.observationEnd;
          if (this._extremes) {
            tableExtremes.emit({ minDate: this._extremes.min, maxDate: this._extremes.max });
            chartExtremes.emit({
              minDate: freq.freq === 'A' ? this._extremes.min.substr(0, 4) : this._extremes.min,
              maxDate: freq.freq === 'A' ? this._extremes.max.substr(0, 4) : this._extremes.max,
              endOfSample: lastDate === this._extremes.max ? true : false
            });
            // use setExtremes to snap dates to first of the month
            this.setExtremes(Date.parse(this._extremes.min), Date.parse(this._extremes.max));
          }
        }
      },
      min: Date.parse(startDate),
      max: Date.parse(endDate),
      ordinal: false,
      labels: {
        formatter() {
          return xAxisFormatter(this, this.chart.options.chart.description);
        }
      }
    };
    this.chartOptions.yAxis = [{
      className: 'series2',
      labels: {
        formatter() {
          return Highcharts.numberFormat(this.value, decimals, '.', ',');
        }
      },
      title: {
        text: change
      },
      opposite: false,
      minPadding: 0,
      maxPadding: 0,
      minTickInterval: 0.01
    }, {
      className: 'series1',
      title: {
        text: units
      },
      labels: {
        formatter() {
          return Highcharts.numberFormat(this.value, decimals, '.', ',');
        }
      },
      gridLineWidth: 0,
      minPadding: 0,
      maxPadding: 0,
      minTickInterval: 0.01,
      showLastLabel: true
    }];
    this.chartOptions.plotOptions = {
      series: {
        cropThreshold: 0,
        turboThreshold: 0
      }
    };
    this.chartOptions.series = series;
    this.chartOptions.title = {
      text: this.showTitle ? `${name} (${geo.name}, ${freq.label})` : '',
      align: 'center'
    }
  }

  formatTooltip = (points, x, pseudoZones, decimals, freq) => {
    const getFreqLabel = (frequency, date) => this.highstockHelper.getTooltipFreqLabel(frequency, date);
    const pseudo = 'Pseudo History ';
    let s = `<b>${getFreqLabel(freq.freq, x)}</b>`;
    points.forEach((point) => {
      if (!point.series.name.includes('YTD')) {
        const displayValue = Highcharts.numberFormat(point.y, decimals, '.', ',');
        const formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
        const seriesColor = `<br><span class='series-${point.colorIndex}'>\u25CF</span>`;
        const seriesNameValue = point.series.name + ': ' + formattedValue;
        const label = seriesColor + seriesNameValue;
        if (pseudoZones.length) {
          pseudoZones.forEach((zone) => {
            if (point.x < zone.value) {
              return s += `${seriesColor}${pseudo}${seriesNameValue}<br>`;
            }
            if (point.x > zone.value) {
              return s += label;
            }
          });
        }
        if (!pseudoZones.length) {
          s += label;
        }
      }
    });
    return s;
  }

  getSelectedChartRange = (userStart, userEnd, dates, defaults, freq) => {
    const defaultSettings = defaults.find(ranges => ranges.freq === freq);
    const defaultEnd = (defaultSettings && defaultSettings.end) || dates[dates.length - 1].date.substr(0, 4);
    let counter = dates.length ? dates.length - 1 : null;
    while (dates[counter].date.substr(0, 4) > defaultEnd) {
      counter--;
    }
    const end = userEnd || dates[counter].date.substr(0, 10);
    const firstObsYear = +dates[0].date.substr(0, 4);
    const defaultStartYear = +dates[counter].date.substr(0, 4) - defaultSettings.range;
    const defaultStart = defaultStartYear < firstObsYear ? dates[0].date :
      `${defaultStartYear}${dates[counter].date.substr(4, 6)}`;
    let start = userStart || defaultStart;
    if (start > end) {
      start = defaultStart;
    }
    return { start, end };
  }
}
