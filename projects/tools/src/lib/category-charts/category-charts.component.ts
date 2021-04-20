import { Component, Input, OnChanges, Inject, Output, EventEmitter } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'lib-category-charts',
  templateUrl: './category-charts.component.html',
  styleUrls: ['./category-charts.component.scss']
})
export class CategoryChartsComponent implements OnChanges {
  @Input() portalSettings;
  @Input() data;
  @Input() findMinMax;
  @Input() freq;
  @Input() noSeries;
  @Input() showSeasonal;
  @Input() hasNonSeasonal;
  @Input() hasSeasonal;
  @Input() nsaActive;
  @Input() chartStart;
  @Input() chartEnd;
  @Input() search;
  @Input() dates;
  @Input() dateWrapper;
  @Input() analyzerView: boolean;
  @Input() indexChecked;
  @Input() indexBaseYear;
  @Output() updateURLFragment = new EventEmitter();
  minValue;
  maxValue;
  noSeriesToDisplay;
  routeSubscription;

  constructor(
    @Inject('defaultRange') private defaultRange,
    private helperService: HelperService,
    private analyzerService: AnalyzerService,
  ) { }

  ngOnChanges() {
    if (this.data) {
      this.data.forEach((chartSeries) => {
        if (chartSeries && this.dates) {
          console.log('CATEGORY CHARTS', this.chartStart)
          chartSeries.display = this.helperService.toggleSeriesForSeasonalDisplay(chartSeries, this.showSeasonal, this.hasSeasonal);
          chartSeries.categoryDisplay = this.formatCategoryChartData(chartSeries.seriesObservations, chartSeries.frequencyShort, this.dates, this.portalSettings);
          chartSeries.analyze = this.analyzerService.checkAnalyzer(chartSeries);
        }
      });
    }
    this.noSeriesToDisplay = this.helperService.checkIfSeriesAvailable(this.noSeries, this.data);
    // If setYAxes, chart view should display all charts' (level) yAxis with the same range
    // Allow y-axes to vary for search results
    if (this.portalSettings.highcharts.setYAxes && !this.search) {
      const defaultStartEnd = this.defaultRange.find(ranges => ranges.freq === this.freq);
      const start = this.chartStart || Date.parse(defaultStartEnd.start);
      const end = this.chartEnd || Date.parse(defaultStartEnd.end);
      if (this.findMinMax) {
        // Find minimum and maximum values out of all series within a sublist; Use values to set min/max of yAxis
        this.minValue = this.findMin(this.data, start, end);
        this.maxValue = this.findMax(this.data, start, end);
      }
    }
  }

  createSeriesChartData = (transformation, dates) => {
    if (transformation) {
      const transformationValues = [];
      dates.forEach((sDate) => {
        const dateExists = this.helperService.binarySearch(transformation.dates, sDate.date);
        dateExists > -1 ?
          transformationValues.push([Date.parse(sDate.date), +transformation.values[dateExists]]) :
          transformationValues.push([Date.parse(sDate.date), null]);
      });
      return transformationValues;
    }
  }

  formatCategoryChartData = (observations, freq, dates, portalSettings) => {
    console.log("FREQ", freq)
    const dateArray = [];
    const transformations = this.helperService.getTransformations(observations);
    const { series0Name, series1Name } = portalSettings.highcharts;
    const start = observations.observationStart;
    const end = observations.observationEnd;
    this.helperService.createDateArray(start, end, freq, dateArray);
    let series0 = { values: this.formatSeriesData(transformations[series0Name], dateArray), start };
    const series1 = { values: this.formatSeriesData(transformations[series1Name], dateArray), start };
    const pseudoZones = [];
    const level = transformations.level;
    if (this.analyzerView && this.indexChecked) {
      series0 = { values: 
        this.analyzerService.getIndexedValues(level.values, level.dates, this.indexBaseYear),
        start
      };
    }
    if (level.pseudoHistory) {
      level.pseudoHistory.forEach((obs, index) => {
        if (obs && !level.pseudoHistory[index + 1]) {
          pseudoZones.push({
            value: Date.parse(level.dates[index]),
            dashStyle: 'dash',
            color: '#7CB5EC',
            className: 'pseudoHistory'
          });
        }
      });
    };
    const chartData = { series0, series1, pseudoZones, dates };
    return { start, end, chartData };
  }

  formatSeriesData = (transformation, dates: Array<any>) => {
    if (transformation) {
      return dates.map((date) => {
        const dateExists = this.helperService.binarySearch(transformation.dates, date.date);
        return dateExists > -1 ? [Date.parse(date.date), +transformation.values[dateExists]] : [Date.parse(date.date), null];
      });
    }
  }

  findMin(displaySeries, start, end) {
    let minValue = null;
    displaySeries.forEach((serie) => {
      const values = this.getSeriesValues(serie, start, end);
      const min = Math.min(...values);
      if (minValue === null || min < minValue) {
        minValue = min;
      }
    });
    return minValue;
  }

  findMax(displaySeries, start, end) {
    let maxValue = null;
    displaySeries.forEach((serie) => {
      const values = this.getSeriesValues(serie, start, end);
      const max = Math.max(...values);
      if (maxValue === null || max > maxValue) {
        maxValue = max;
      }
    });
    return maxValue;
  }

  getSeriesValues(series, start, end) {
    const dateStart = this.dates.findIndex(date => date.date === new Date(start).toISOString().substr(0, 10));
    const dateEnd = this.dates.findIndex(date => date.date === new Date(end).toISOString().substr(0, 10));
    return series.seriesObservations.transformationResults[0].values.slice(dateStart, dateEnd + 1);
  }

  addToAnalyzer(series) {
    series.analyze = true;
    this.analyzerService.addToAnalzyer(series.id);
  }

  removeFromAnalyzer(series) {
    series.analyze = false;
    this.analyzerService.removeFromAnalyzer(series.id);
  }

  addCompare(series) {
    series.compare = true;
    this.analyzerService.addToComparisonChart(series);
  }

  removeCompare(series) {
    series.compare = false;
    this.analyzerService.removeFromComparisonChart(series.id);
  }

  trackBySeries(index, item) {
    return item.id;
  }
}
