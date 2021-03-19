import {
  Component,
  Inject,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { HighstockObject } from '../tools.models';
import 'jquery';
import { HighstockHelperService } from '../highstock-helper.service';
declare var $: any;
import * as Highcharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import offlineExport from 'highcharts/modules/offline-exporting';

@Component({
  selector: 'lib-analyzer-highstock',
  templateUrl: './analyzer-highstock.component.html',
  styleUrls: ['./analyzer-highstock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AnalyzerHighstockComponent implements OnChanges, OnDestroy {
  @Input() series;
  @Input() allDates;
  @Input() portalSettings;
  @Input() start;
  @Input() end;
  @Input() seriesOptions: Array<any>;
  @Input() nameChecked;
  @Input() unitsChecked;
  @Input() geoChecked;
  @Input() indexChecked;
  @Input() y0;
  @Input() y1;
  @Output() tableExtremes = new EventEmitter(true);
  @Output() tooltipOptions = new EventEmitter();
  @Output() yAxesSeries = new EventEmitter();
  Highcharts = Highcharts;
  chartConstructor = 'stockChart';
  //chartOptions = {} as HighstockObject;
  updateChart = false;
  chartObject;
  toggleSeries;
  switchAxes;
  indexed: boolean = false;
  compareSeriesSub;
  compareSeries;
  chartOptions = {} as HighstockObject;
  chartCallback;
  analyzerData;

  constructor(
    @Inject('logo') private logo,
    private highstockHelper: HighstockHelperService,
    private analyzerService: AnalyzerService,
    private cdr: ChangeDetectorRef
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
    this.chartCallback = chart => {
      this.chartObject = chart;
      console.log('CALLBACK', this.chartObject)
    };
    this.analyzerData = this.analyzerService.analyzerData;
    this.compareSeriesSub = this.analyzerService.analyzerSeriesCompare.subscribe((series) => {
      this.compareSeries = series;
      const chartSeries = [...series, {
        className: 'navigator',
        data: this.analyzerData.analyzerTableDates.map(d => [Date.parse(d.date), null]),
        levelData: [],
        decimals: null,
        tooltipName: '',
        frequency: null,
        geography: null,
        yAxisSide: 'right',
        yAxis: `null-right`,
        dataGrouping: {
          enabled: false
        },
        showInLegend: false,
        showInNavigator: true,
        includeInDataExport: false,
        name: 'Navigator',
        events: {
          legendItemClick() {
            return false;
          }
        },
        unitsLabelShort: null,
        seasonallyAdjusted: null,
        pseudoZones: null,
        visible: true,
      }]
      this.chartOptions.yAxis = chartSeries.reduce((axes, s) => {
        console.log('AXES', axes);
        console.log('S', s)
        if (axes.findIndex(a => a.id === `${s.unitsLabelShort}-${s.yAxisSide}`) === -1) {
          axes.push({
            labels: {
              formatter() {
                return Highcharts.numberFormat(this.value, 2, '.', ',');
              }
            },
            id: `${s.unitsLabelShort}-${s.yAxisSide}`,
            title: {
              text: s.unitsLabelShort // this.indexChecked ? `Index (${indexBaseYear})` : visibleSeries ? visibleSeries.unitsLabelShort : null
            },
            opposite: s.yAxisSide === 'left' ? false : true, //index === 0 ? false : true,
            minPadding: 0,
            maxPadding: 0,
            minTickInterval: 0.01,
            showEmpty: false,
            yAxisSide: s.yAxisSide
            //series: axisIds[axis],
            //visible: visibleSeries ? true : false
            //visible: true
          })
        }
        return axes
      }, []);
      console.log('YAXIS', this.chartOptions.yAxis)
      this.chartOptions.series = chartSeries;
      this.updateChart = true;
      if (this.chartObject) {
        this.chartObject.redraw()
      }
    });
  }

  ngOnChanges() {
    console.log('ON CHANGES', this.allDates)
    /* if (this.series.length && this.chartObject) {
      this.chartObject._indexed = this.indexChecked;
      // const yAxes = this.setYAxes(this.series, '', '');
      // this.chartOptions.yAxis = yAxes;
      // this.chartOptions.series = this.formatSeriesData(this.series, this.allDates, yAxes, this.chartObject._extremes.min);
      this.chartOptions.rangeSelector.selected = null;
      this.chartOptions.xAxis = null;
      this.updateChart = true;
    } */
    console.log('INDEX CHECKED', this.indexChecked);
    if (this.indexChecked) {
      const indexBaseYear = this.getIndexBaseYear(this.compareSeries, this.start);
      console.log('INDEX BASE YEAR', indexBaseYear)
    }
    if(this.series.length && !this.chartObject) {
      const buttons = this.formatChartButtons(this.portalSettings.highstock.buttons);
      const navigatorOptions = {
        frequency: this.analyzerService.checkFrequencies(this.series),
        dateStart: this.allDates[0].date,
        numberOfObservations: this.filterDatesForNavigator(this.allDates).length
      };
      this.initChart(this.series, this.portalSettings, buttons, navigatorOptions);
    }
  }

  ngOnDestroy() {
    this.compareSeriesSub.unsubscribe();
  }

  /* formatSeriesData = (series: Array<any>, dates: Array<any>, yAxes: Array<any>, start) => {
    // create copy to prevent original data from being altered if calculating indexed values
    const seriesCopy = JSON.parse(JSON.stringify(series));
    const indexBaseYear = this.getIndexBaseYear(series, start);
    const chartSeries = seriesCopy.map((serie) => {
      console.log('analyzer highstock', serie)
      const axis = yAxes ? yAxes.find(y => y.series.some(s => s.id === serie.id)) : null;
      return {
        className: serie.id,
        name: this.indexChecked ? serie.indexDisplayName : serie.chartDisplayName,
        tooltipName: serie.title,
        data: this.indexChecked ? this.getIndexedValues(serie.chartData.level, indexBaseYear) : serie.chartData.level,
        levelData: serie.chartData.level.slice(),
        yAxis: axis ? axis.id : null,
        decimals: serie.decimals,
        frequency: serie.frequencyShort,
        geography: serie.geography.name,
        includeInDataExport: serie.showInChart ? true : false,
        showInLegend: serie.showInChart ? true : false,
        showInNavigator: false,
        events: {
          legendItemClick() {
            return false;
          }
        },
        unitsLabelShort: serie.unitsLabelShort,
        seasonallyAdjusted: serie.seasonalAdjustment === 'seasonally_adjusted',
        dataGrouping: {
          enabled: false
        },
        pseudoZones: serie.chartData.pseudoZones,
        visible: serie.showInChart ? true : false
      };
    });
    chartSeries.push({
      className: 'navigator',
      data: dates.map(d => [Date.parse(d.date), null]),
      levelData: [],
      decimals: null,
      tooltipName: '',
      frequency: null,
      geography: null,
      yAxis: 'yAxis1',
      dataGrouping: {
        enabled: false
      },
      showInLegend: false,
      showInNavigator: true,
      includeInDataExport: false,
      name: 'Navigator',
      events: {
        legendItemClick() {
          return false;
        }
      },
      unitsLabelShort: null,
      seasonallyAdjusted: null,
      pseudoZones: null,
      visible: true,
    });
    return chartSeries;
  } */

  getIndexBaseYear = (series: any, start: string) => {
    const maxObsStartDate = series.reduce((prev, current) => {
      const prevObsStart = prev.observations.observationStart;
      const currentObsStart = current.observations.observationStart;
      return prevObsStart > currentObsStart ? prev : current;
    }).observations.observationStart;
    return maxObsStartDate > start ? maxObsStartDate : start;
  }

  getIndexedValues(values, baseYear: string) {
    return values.map((curr, ind, arr) => {
      const dateIndex = arr.findIndex(dateValuePair => new Date(dateValuePair[0]).toISOString().substr(0, 10) === baseYear);
      return dateIndex > -1 ? [curr[0], curr[1] / arr[dateIndex][1] * 100] : [curr[0], curr[1] / arr[0][1] * 100];
    });
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

  initChart = (series, portalSettings, buttons, navigatorOptions) => {
    const startDate = this.start ? this.start : null;
    const endDate = this.end ? this.end : null;
    const tooltipName = this.nameChecked;
    const tooltipUnits = this.unitsChecked;
    const tooltipGeo = this.geoChecked;
    const formatTooltip = (args, points, x, name, units, geo) => this.formatTooltip(args, points, x, name, units, geo);
    const getChartExtremes = (chartObject) => this.highstockHelper.getAnalyzerChartExtremes(chartObject);
    const xAxisFormatter = (chart, freq) => this.highstockHelper.xAxisLabelFormatter(chart, freq);
    const setInputDateFormat = freq => this.highstockHelper.inputDateFormatter(freq);
    const setInputEditDateFormat = freq => this.highstockHelper.inputEditDateFormatter(freq);
    const setInputDateParser = (value, freq) => this.highstockHelper.inputDateParserFormatter(value, freq);
    const setDateToFirstOfMonth =  (freq, date) => this.highstockHelper.setDateToFirstOfMonth(freq, date);
    const tableExtremes = this.tableExtremes;
    const logo = this.logo;
    const getIndexBaseYear = (series, start) => this.getIndexBaseYear(series, start);
    const getIndexedValues = (values, baseYear) => this.getIndexedValues(values, baseYear);
    const updateIndexed = (chartObject) => chartObject._indexed = this.indexChecked;

    this.chartOptions.chart = {
      alignTicks: false,
      className: 'analyzer-chart',
      description: undefined,
      events: {
        render() {
          const userMin = new Date(this.xAxis[0].getExtremes().min).toISOString().split('T')[0];
          const userMax = new Date(this.xAxis[0].getExtremes().max).toISOString().split('T')[0];
          this._selectedMin = navigatorOptions.frequency === 'A' ? userMin.substr(0, 4) + '-01-01' : userMin;
          this._selectedMax = navigatorOptions.frequency === 'A' ? userMax.substr(0, 4) + '-01-01' : userMax;
          this._hasSetExtremes = true;
          this._extremes = getChartExtremes(this);
          if (this._extremes) {
            tableExtremes.emit({ minDate: this._extremes.min, maxDate: this._extremes.max });
          }
        },
        load() {
          if (logo.analyticsLogoSrc) {
            this.renderer.image(logo.analyticsLogoSrc, 10, 0, 141 / 1.75, 68 / 1.75).add();
          }
        }
      },
      styledMode: true,
      zoomType: 'x'
    };
    this.chartOptions.labels = {
      items: [
        { html: portalSettings.highstock.labels.portal },
        { html: portalSettings.highstock.labels.portalLink },
      ],
      style: {
        display: 'none'
      }
    };
    this.chartOptions.legend = {
      enabled: true,
      labelFormatter() {
        return this.yAxis.userOptions.opposite ? this.name + ' (right)' : this.name + ' (left)';
      }
    };
    this.chartOptions.rangeSelector = {
      selected: !startDate && !endDate ? 3 : null,
      buttons,
      buttonPosition: {
        x: 20,
        y: 0
      },
      labelStyle: {
        visibility: 'hidden'
      },
      inputEnabled: true,
      inputDateFormat: setInputDateFormat(navigatorOptions.frequency),
      inputEditDateFormat: setInputEditDateFormat(navigatorOptions.frequency),
      inputDateParser(value) {
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
      allowHTML: true,
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
      followPointer: true,
      formatter(args) {
        return formatTooltip(args, this.points, this.x, tooltipName, tooltipUnits, tooltipGeo);
      }
    };
    this.chartOptions.credits = {
      enabled: false
    };
    this.chartOptions.xAxis = {
      events: {
        afterSetExtremes() {
          const userMin = new Date(this.getExtremes().min).toISOString().split('T')[0];
          const userMax = new Date(this.getExtremes().max).toISOString().split('T')[0];
          this._selectedMin = setDateToFirstOfMonth(navigatorOptions.frequency, userMin);
          this._selectedMax = setDateToFirstOfMonth(navigatorOptions.frequency, userMax);
          this._hasSetExtremes = true;
          this._extremes = getChartExtremes(this);
          this._indexed = updateIndexed(this);
          if (this._extremes) {
            if (this._indexed) {
              const indexBaseYear = getIndexBaseYear(series, this._extremes.min);
              this.series.forEach((serie) => {
                if (serie.userOptions.className !== 'navigator') {
                  serie.update({
                    data: getIndexedValues(serie.userOptions.levelData, indexBaseYear)
                  })
                }
              });
            }
            tableExtremes.emit({ minDate: this._extremes.min, maxDate: this._extremes.max });
            // use setExtremes to snap dates to min/max date range
            setTimeout(() => {
              this.setExtremes(Date.parse(this._extremes.min), Date.parse(this._extremes.max))
            }, 1);
          }
        }
      },
      minRange: this.calculateMinRange(navigatorOptions.frequency),
      min: startDate ? Date.parse(startDate) : undefined,
      max: endDate ? Date.parse(endDate) : undefined,
      ordinal: false,
      labels: {
        formatter() {
          return xAxisFormatter(this, navigatorOptions.frequency);
        }
      }
    };
    this.chartOptions.plotOptions = {
      series: {
        cropThreshold: 0,
        turboThreshold: 0
      }
    };
  }

  calculateMinRange = (freq: string) => {
    const range = {
      'A': 1000 * 3600 * 24 * 30 * 12,
      'S': 1000 * 3600 * 24 * 30 * 6,
      'Q': 1000 * 3600 * 24 * 30 * 3,
      'M': 1000 * 3600 * 24 * 30,
      'W': 1000 * 3600 * 24 * 7,
    }
    return range[freq] || 1000 * 3600 * 24;
  }

  formatTooltip(args, points, x, name: boolean, units: boolean, geo: boolean) {
    // Name, units, and geo evaluate as true when their respective tooltip options are checked in the analyzer
    const getFreqLabel = (frequency, date) => this.highstockHelper.getTooltipFreqLabel(frequency, date);
    const filterFrequency = (cSeries: Array<any>, freq: string) => cSeries.filter(series => series.userOptions.frequency === freq && series.name !== 'Navigator 1');
    const getSeriesColor = (seriesIndex: number) => {
      // Get color of the line for a series
      // Use color for tooltip label
      const lineColor = $('.highcharts-markers.highcharts-color-' + seriesIndex + ' path').css('fill');
      const seriesColor = '<span style="fill:' + lineColor + '">\u25CF</span> ';
      return seriesColor;
    };
    const formatObsValue = (value: number, decimals: number) => {
      // Round observation to specified decimal place
      const displayValue = Highcharts.numberFormat(value, decimals, '.', ',');
      const formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
      return formattedValue;
    };
    const formatSeriesLabel = (sName, sUnits, sGeo, point, seriesValue: number, date: string, pointX, str: string) => {
      const seriesColor = getSeriesColor(point.colorIndex);
      const displayName = sName ? point.userOptions.tooltipName : '';
      const value = formatObsValue(seriesValue, point.userOptions.decimals);
      const unitsLabel = sUnits ? this.indexChecked ? `(Index)` : ` (${point.userOptions.unitsLabelShort}) `: '';
      const geoLabel = sGeo ? `${point.userOptions.geography}` : '';
      const label = `${displayName} ${date}: ${value} ${unitsLabel}`;
      const pseudoZones = point.userOptions.pseudoZones;
      if (pseudoZones.length) {
        pseudoZones.forEach((zone) => {
          if (pointX < zone.value) {
            return str += `${seriesColor}Pseudo History ${label}${geoLabel}`;
          }
          if (pointX > zone.value) {
            return str += `${seriesColor}${label}${geoLabel}`;
          }
        });
      }
      if (!pseudoZones.length) {
        str += `${seriesColor}${label}${geoLabel}<br>`;
      }
      return str;
    };
    const getAnnualObs = (aSeries: Array<any>, point, year: string) => {
      let label = '';
      aSeries.forEach((serie) => {
        // Check if current point's year is available in the annual series' data
        const yearObs = serie.data.find(obs => Highcharts.dateFormat('%Y', obs.x) === Highcharts.dateFormat('%Y', point.x));
        if (yearObs) {
          label += formatSeriesLabel(name, units, geo, serie, yearObs.y, year, yearObs.x, '');
        }
      });
      // Return string of annual series with their values formatted for the tooltip
      return label;
    };
    const getQuarterObs = (qSeries: Array<any>, date: string, pointQuarter: string) => {
      let label = '';
      qSeries.forEach((serie) => {
        // Check if current point's year and quarter month (i.e., Jan for Q1) is available in the quarterly series' data
        const obsDate = serie.data.find(obs => `${Highcharts.dateFormat('%Y', obs.x)} ${Highcharts.dateFormat('%b', obs.x)}` === date);
        if (obsDate) {
          const qDate = `${pointQuarter} ${Highcharts.dateFormat('%Y', obsDate.x)}`;
          label += formatSeriesLabel(name, units, geo, serie, obsDate.y, qDate, obsDate.x, '');
        }
      });
      // Return string of quarterly series with their values formatted for the tooltip
      return label;
    };
    const s = '';
    let tooltip = '';
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
  }

  nameActive(e) {
    this.nameChecked = e.target.checked;
    this.tooltipOptions.emit({ value: e.target.checked, label: 'name' });
    this.updateTooltipOptions(this.nameChecked, this.unitsChecked, this.geoChecked);
  }

  unitsActive(e) {
    this.unitsChecked = e.target.checked;
    this.tooltipOptions.emit({ value: e.target.checked, label: 'units' });
    this.updateTooltipOptions(this.nameChecked, this.unitsChecked, this.geoChecked);
  }

  geoActive(e) {
    this.geoChecked = e.target.checked;
    this.tooltipOptions.emit({ value: e.target.checked, label: 'geo' });
    this.updateTooltipOptions(this.nameChecked, this.unitsChecked, this.geoChecked);
  }

  filterDatesForNavigator(allDates: Array<any>) {
    return allDates.map(date => date.date).filter((d, i, a) => {
      // If mixed frequencies are selected, filter out duplicated dates for annual observations,
      // also check if date range only contains a partial year
      return i > 0 ? a.indexOf(d) === i && d > a[i - 1] : a.indexOf(d) === i;
    });
  }

  updateTooltipOptions(tooltipName: boolean, tooltipUnits: boolean, tooltipGeo: boolean) {
    this.chartOptions.rangeSelector.selected = null;
    const formatTooltip = (args, points, x, name, units, geo) => this.formatTooltip(args, points, x, name, units, geo);
    this.chartOptions.tooltip = {
      borderWidth: 0,
      shadow: false,
      shared: true,
      followPointer: true,
      formatter(args) {
        return formatTooltip(args, this.points, this.x, tooltipName, tooltipUnits, tooltipGeo);
      }
    };
    this.updateChart = true;
  }
}
