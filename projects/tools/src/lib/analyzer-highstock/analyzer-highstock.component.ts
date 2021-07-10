import {
  Component,
  Inject,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild
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
  @Input() portalSettings;
  @Input() start;
  @Input() end;
  @Input() indexChecked;
  @Output() tableExtremes = new EventEmitter(true);
  @Output() tooltipOptions = new EventEmitter();
  Highcharts = Highcharts;
  chartConstructor = 'stockChart';
  updateChart = false;
  chartObject;
  indexed: boolean = false;
  compareSeriesSub;
  chartOptions = {} as HighstockObject;
  chartCallback;
  analyzerData;

  constructor(
    @Inject('logo') private logo,
    private highstockHelper: HighstockHelperService,
    private analyzerService: AnalyzerService,
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
      return seriesMetaData ? `${seriesMetaData}\n\n${result}` : result;
    });
    this.chartCallback = chart => {
      this.chartObject = chart;
    };
    this.analyzerData = this.analyzerService.analyzerData;
    this.compareSeriesSub = this.analyzerService.analyzerSeriesCompare.subscribe((series) => {
      console.log('series sub')
      this.updateChartData(series);
    });
    Highcharts.addEvent(Highcharts.Chart, 'render', e => {
      [...e.target.renderTo.querySelectorAll('div.dropdown')].forEach((a) => {
        if (a) {
          const legendItem = a.parentNode.parentNode as HTMLElement;
          const seriesId = +a.id.split('-')[1];
          const settingIcon = a.querySelector('span.material-icons');
          settingIcon.setAttribute('data-bs-toggle', 'dropdown');
          settingIcon.setAttribute('data-bs-boundary', 'viewport');
          const legendColor = legendItem.style.fill;
          console.log('legendColor', legendItem.classList)
          settingIcon.classList.add(Array.from(legendItem.classList).filter(c => c.includes('highcharts-color-'))[0]);
          settingIcon.classList.add(Array.from(legendItem.classList).filter(c => c.includes('highcharts-legend-item-hidden'))[0]);

          const series = this.series.find(s => s.id === seriesId);
          console.log('SERIES', series)
          const addToComparisonChartItem = a.querySelector('.add-to-comparison');
          const removeFromComparisonChartItem = a.querySelector('.remove-from-comparison');
          const changeChartTypeItem = a.querySelector('.change-chart-type');
          const changeYAxisSideItem = a.querySelector('.change-y-axis-side');
          const removeFromAnalyzerItem = a.querySelector('.remove-from-analyzer');
          changeYAxisSideItem.style.display = this.chartOptions.series.find(s => s.className === seriesId).visible ? 'block' : 'none';
          changeChartTypeItem.style.display = this.chartOptions.series.find(s => s.className === seriesId).visible ? 'block' : 'none';
          removeFromComparisonChartItem.style.display = this.chartOptions.series.find(s => s.className === seriesId).visible ? 'block' : 'none';
          addToComparisonChartItem.style.display = this.chartOptions.series.find(s => s.className === seriesId).visible ? 'none' : 'block';
          if (!a.querySelector(`#chart-type-${seriesId}`)) {
            this.createChartTypeSelector(seriesId, series, changeChartTypeItem)
          }
          if (!a.querySelector(`#y-axis-side-${seriesId}`)) {
            this.createYAxisSideSelector(seriesId, series, changeYAxisSideItem);
          }
          addToComparisonChartItem.addEventListener('click', () => analyzerService.makeCompareSeriesVisible(series));
          removeFromComparisonChartItem.addEventListener('click', () => analyzerService.removeFromComparisonChart(seriesId));
          removeFromAnalyzerItem.addEventListener('click', function() {
            //analyzerService.removeFromComparisonChart(seriesId);
            analyzerService.removeFromAnalyzer(seriesId);
          });
        }
      });
    });
  }

  ngOnChanges() {
    // prevent date ranges from resetting when adding a series/indexing
    if (this.chartOptions.xAxis) {
      this.chartOptions.xAxis.min = this.start ? Date.parse(this.start) : undefined;
      this.chartOptions.xAxis.max = this.end ? Date.parse(this.end) : undefined;
      this.setYMinMax();
    }
    if (this.chartOptions.rangeSelector) {
      this.chartOptions.rangeSelector.selected = !this.start && !this.end ? 2 : null;
      this.setYMinMax();
    }
    if (this.series.length && !this.chartObject) {
      const buttons = this.formatChartButtons(this.portalSettings.highstock.buttons);
      const highestFrequency = this.analyzerService.getHighestFrequency(this.series).freq;
      this.initChart(this.portalSettings, buttons, highestFrequency);
    }
    if (this.chartObject) {
      this.chartObject.redraw()
    }
  }

  ngOnDestroy() {
    this.compareSeriesSub.unsubscribe();
  }

  createChartTypeSelector(seriesId: number, series: any, chartTypeMenuItem: HTMLElement) {
    const chartTypeSelect = document.createElement('select');
    chartTypeSelect.setAttribute('id', `chart-type-${seriesId}`);  
    series.chartType.forEach((type: string) => {
      const selectedType = type === series.selectedChartType;
      chartTypeSelect.add(new Option(type, type, selectedType, selectedType), undefined);
    });
    chartTypeMenuItem.appendChild(chartTypeSelect);
    chartTypeSelect.addEventListener('mousedown', e => e.stopPropagation());
    chartTypeSelect.addEventListener('change', e => this.analyzerService.updateCompareChartType(seriesId, (e.target as HTMLSelectElement).value));
  }

  createYAxisSideSelector(seriesId: number, series: any, yAxisSideMenuItem: HTMLElement) {
    const yAxisSelect = document.createElement('select');
    yAxisSelect.setAttribute('id', `y-axis-side-${seriesId}`);
    series.yAxis.forEach((side: string) => {
      const selectedSide = side === series.selectedYAxis;
      yAxisSelect.add(new Option(side, side, selectedSide, selectedSide), undefined);
    });
    yAxisSideMenuItem.appendChild(yAxisSelect);
    yAxisSelect.addEventListener('mousedown', e => e.stopPropagation());

  }

  setYMinMax() {
    this.chartOptions.yAxis.forEach((y) => {
      y.min = y.min || null;
      y.max = y.max || null;
    });
  }

  updateChartData(series: Array<any>) {
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
    }];
    this.chartOptions.yAxis = chartSeries.reduce((axes, s) => {
      if (axes.findIndex(a => a.id === `${s.yAxis}`) === -1) {
        axes.push({
          labels: {
            formatter() {
              return Highcharts.numberFormat(this.value, 2, '.', ',');
            },
            align: s.yAxisSide === 'right' ? 'left' : 'right' 
          },
          id: `${s.yAxis}`,
          title: {
            text: s.yAxisText
          },
          opposite: s.yAxisSide === 'left' ? false : true,
          minPadding: 0,
          maxPadding: 0,
          minTickInterval: 0.01,
          endOnTick: false,
          startOnTick: false,
          showEmpty: false,
          yAxisSide: s.yAxisSide,
          styleOrder: s.yAxisSide === 'left' ? 1 : 2,
          showLastLabel: true,
          showFirstLabel: true,
          min: null,
          max: null
        });
      }
      return axes;
    }, []);
    this.chartOptions.series = chartSeries;
    this.updateChart = true;
    if (this.chartObject) {
      this.chartObject.redraw();
    }
  }

  changeYAxisMin(e, axis) {
    axis.min = +e.target.value || null;
    this.updateChart = true;
  }

  changeYAxisMax(e, axis) {
    axis.max = +e.target.value || null;
    this.updateChart = true;
  }

  formatChartButtons(buttons: Array<any>) {
    const chartButtons = buttons.reduce((allButtons, button) => {
        allButtons.push(button !== 'all' ? { type: 'year', count: button, text: `${button}Y` } : { type: 'all', text: 'All' });
      return allButtons;
    }, []);
    return chartButtons;
  }

  initChart = (portalSettings, buttons, highestFreq) => {
    const startDate = this.start || null;
    const endDate = this.end || null;
    const formatTooltip = (args, points) => this.formatTooltip(args, points);
    const getChartExtremes = (chartObject) => this.highstockHelper.getAnalyzerChartExtremes(chartObject);
    const xAxisFormatter = (chart, freq) => this.highstockHelper.xAxisLabelFormatter(chart, freq);
    const setInputDateFormat = freq => this.highstockHelper.inputDateFormatter(freq);
    const setInputEditDateFormat = freq => this.highstockHelper.inputEditDateFormatter(freq);
    const setInputDateParser = (value, freq) => this.highstockHelper.inputDateParserFormatter(value, freq);
    const setDateToFirstOfMonth = (freq, date) => this.highstockHelper.setDateToFirstOfMonth(freq, date);
    const tableExtremes = this.tableExtremes;
    const logo = this.logo;
    const getIndexBaseYear = (series, start) => this.analyzerService.getIndexBaseYear(series, start);
    const getIndexedValues = (values, baseYear) => this.analyzerService.getChartIndexedValues(values, baseYear);
    const updateIndexed = (chartObject) => chartObject._indexed = this.indexChecked;

    this.chartOptions.chart = {
      alignTicks: false,
      className: 'analyzer-chart',
      description: undefined,
      events: {
        render() {
          console.log('RENDER')
          const userMin = new Date(this.xAxis[0].getExtremes().min).toISOString().split('T')[0];
          const userMax = new Date(this.xAxis[0].getExtremes().max).toISOString().split('T')[0];
          this._selectedMin = highestFreq === 'A' ? `${userMin.substr(0, 4)}-01-01` : userMin;
          this._selectedMax = highestFreq.frequency === 'A' ? `${userMax.substr(0, 4)}-01-01` : userMax;
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
      useHTML: true,
      labelFormatter() {
        return this.yAxis.userOptions.opposite ?
          `${this.name} (right)` :
          `<div class="btn-group dropdown" id="series-${this.userOptions.className}">
          <span class="material-icons settings-icon">
          settings
          </span>
          <ul class="dropdown-menu px-2">
          <p class="change-y-axis-side">
            Y-Axis:
          </p>
          <p class="change-chart-type">
            Chart Type:
          </p>
          <p class="remove-from-comparison">
            <i class="material-icons analyze-chart color{{seriesInfo.id}}">assessment</i> Remove From Comparison
          </p>
          <p class="add-to-comparison">
            <i class="material-icons analyze-chart color{{seriesInfo.id}}">add_chart</i> Add To Comparison
          </p>
          <p class="remove-from-analyzer text-danger">
            <i class="material-icons analyze-button">&#xE872;</i>
            Remove From Analyzer
          </p>
          </ul>
        </div> ${this.name} (left)`;
      }
    };
    // incorrect indexing when using range selector
    this.chartOptions.rangeSelector = {
      selected: !startDate && !endDate ? 2 : null,
      buttons,
      buttonPosition: {
        x: 20,
        y: 0
      },
      labelStyle: {
        visibility: 'hidden'
      },
      inputEnabled: true,
      inputDateFormat: setInputDateFormat(highestFreq),
      inputEditDateFormat: setInputEditDateFormat(highestFreq),
      inputDateParser(value) {
        return setInputDateParser(value, highestFreq);
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
        return formatTooltip(args, this.points);
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
          this._selectedMin = setDateToFirstOfMonth(highestFreq, userMin);
          this._selectedMax = setDateToFirstOfMonth(highestFreq, userMax);
          this._hasSetExtremes = true;
          this._extremes = getChartExtremes(this);
          this._indexed = updateIndexed(this);
          if (this._extremes) {
            if (this._indexed) {
              const compareSeries = this.series.filter(s => s.name !== 'Navigator').map(s => s.userOptions);
              const indexBaseYear = getIndexBaseYear(compareSeries, this._extremes.min);
              this.chart.yAxis.forEach((axis) => {
                if (axis.userOptions.title.text && axis.userOptions.title.text.includes('Index')) {
                  axis.update({
                    title: {
                      text: `Index (${indexBaseYear})`
                    }
                  });
                }
              });
              this.series.forEach((serie) => {
                if (serie.userOptions.className !== 'navigator') {
                  serie.update({
                    data: getIndexedValues(serie.userOptions.levelData, indexBaseYear),
                    yAxisText: `Index (${indexBaseYear})`
                  });
                }
              });
            }
            tableExtremes.emit({ minDate: this._extremes.min, maxDate: this._extremes.max });
            // use setExtremes to snap dates to min/max date range
            this.setExtremes(Date.parse(this._extremes.min), Date.parse(this._extremes.max))
          }
        }
      },
      minRange: this.calculateMinRange(highestFreq),
      min: startDate ? Date.parse(startDate) : undefined,
      max: endDate ? Date.parse(endDate) : undefined,
      ordinal: false,
      labels: {
        formatter() {
          return xAxisFormatter(this, highestFreq);
        }
      }
    };
    this.chartOptions.plotOptions = {
      series: {
        cropThreshold: 0,
        turboThreshold: 0,
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

  formatTooltip(args, points) {
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
    const formatSeriesLabel = (point, seriesValue: number, date: string, pointX, str: string) => {
      const seriesColor = getSeriesColor(point.colorIndex);
      const displayName = `${point.userOptions.tooltipName} (${point.userOptions.geography})`;
      const value = formatObsValue(seriesValue, point.userOptions.decimals);
      const label = `${displayName} ${date}: ${value}`;
      const pseudoZones = point.userOptions.pseudoZones;
      if (pseudoZones.length) {
        pseudoZones.forEach((zone) => {
          return str += pointX < zone.value ? `${seriesColor}Pseudo History ${label}` : `${seriesColor}${label}`;
        });
      }
      if (!pseudoZones.length) {
        str += `${seriesColor}${label}<br>`;
      }
      return str;
    };
    const getAnnualObs = (aSeries: Array<any>, point, year: string) => {
      let label = '';
      aSeries.forEach((serie) => {
        // Check if current point's year is available in the annual series' data
        const yearObs = serie.data.find((obs) => {
          return obs ? Highcharts.dateFormat('%Y', obs.x) === Highcharts.dateFormat('%Y', point.x) : false;
        });
        if (yearObs) {
          label += formatSeriesLabel(serie, yearObs.y, year, yearObs.x, '');
        }
      });
      // Return string of annual series with their values formatted for the tooltip
      return label;
    };
    const getQuarterObs = (qSeries: Array<any>, date: string, pointQuarter: string) => {
      let label = '';
      qSeries.forEach((serie) => {
        // Check if current point's year and quarter month (i.e., Jan for Q1) is available in the quarterly series' data
        const obsDate = serie.data.find((obs) => {
          return obs ? `${Highcharts.dateFormat('%Y', obs.x)} ${Highcharts.dateFormat('%b', obs.x)}` === date : false;
        });
        if (obsDate) {
          const qDate = `${Highcharts.dateFormat('%Y', obsDate.x)} ${pointQuarter} `;
          label += formatSeriesLabel(serie, obsDate.y, qDate, obsDate.x, '');
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
        const qMonths = ['Jan', 'Apr', 'Jul', 'Oct'];
        if (!qMonths.some(m => m === pointMonth)) {
          const quarters = { Q1: 'Jan', Q2: 'Apr', Q3: 'Jul', Q4: 'Oct' };
          const months = {
            Q1: ['Feb', 'Mar'],
            Q2: ['May', 'Jun'],
            Q3: ['Aug', 'Sep'],
            Q4: ['Nov', 'Dec']
          };
          // Quarter that hovered point falls into
          const pointQuarter = Object.keys(months).find(key => months[key].some(m => m === pointMonth));
          // Month for which there is quarterly data
          const quarterMonth = quarters[pointQuarter];
          const date = `${Highcharts.dateFormat('%Y', point.x)} ${quarterMonth}`;
          // Add quarterly observations when monthly series are selected
          tooltip += getQuarterObs(quarterSeries, date, pointQuarter);
        }
      }
      const dateLabel = getFreqLabel(point.series.userOptions.frequency, point.x);
      tooltip += formatSeriesLabel(point.series, point.y, dateLabel, point.x, s);
    });
    return tooltip;
  }

  filterDatesForNavigator(allDates: Array<any>) {
    return allDates.map(date => date.date).filter((d, i, a) => {
      // If mixed frequencies are selected, filter out duplicated dates for annual observations,
      // also check if date range only contains a partial year
      return i > 0 ? a.indexOf(d) === i && d > a[i - 1] : a.indexOf(d) === i;
    });
  }

  toggleMenu() {
    $('.dropdown').dropdown('toggle');
  }
}
