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
  @Input() sublist;
  @Input() data;
  @Input() findMinMax;
  @Input() selectedDataList;
  @Input() freq;
  @Input() noSeries;
  @Input() showSeasonal;
  @Input() hasNonSeasonal;
  @Input() hasSeasonal;
  @Input() nsaActive;
  @Input() yoyActive;
  @Input() ytdActive;
  @Input() params;
  @Input() chartStart;
  @Input() chartEnd;
  @Input() search;
  @Input() dates;
  @Input() dateWrapper;
  @Input() seriesInAnalyzer;
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
        if (chartSeries.seriesInfo !== 'No data available' && this.dates) {
          chartSeries.display = this.helperService.toggleSeriesForSeasonalDisplay(chartSeries, this.showSeasonal, this.hasSeasonal);
          chartSeries.categoryDisplay = this.formatCategoryChartData(chartSeries.seriesInfo.seriesObservations, this.dates, this.portalSettings);
          chartSeries.seriesInfo.analyze = this.analyzerService.checkAnalyzer(chartSeries.seriesInfo);
        }
      });
    }
    this.noSeriesToDisplay = this.helperService.checkIfSeriesAvailable(this.noSeries, this.data);
    // If setYAxes, chart view should display all charts' (level) yAxis with the same range
    // Allow y-axes to vary for search results
    if (this.portalSettings.highcharts.setYAxes && !this.search) {
      const start = this.chartStart ? this.chartStart : Date.parse(this.defaultRange.start);
      const end = this.chartEnd ? this.chartEnd : Date.parse(this.defaultRange.end);
      if (this.findMinMax) {
        // Find minimum and maximum values out of all series within a sublist; Use values to set min/max of yAxis
        this.minValue = this.findMin(this.data, start, end);
        this.maxValue = this.findMax(this.data, start, end);
      }
    }
  }

  formatCategoryChartData = (observations, dates, portalSettings) => {
    const transformations = this.helperService.getTransformations(observations);
    const { series0Name, series1Name } = portalSettings.highcharts;
    const start = observations.observationStart;
    const end = observations.observationEnd;
    const series0 = this.formatSeriesData(transformations[series0Name], dates);
    const series1 = this.formatSeriesData(transformations[series1Name], dates);
    const pseudoZones = [];
    const level = transformations.level;
    if (level.pseudoHistory) {
      level.pseudoHistory.forEach((obs, index) => {
        if (obs && !level.pseudoHistory[index + 1]) {
          pseudoZones.push({ value: Date.parse(level.dates[index]), dashStyle: 'dash', color: '#7CB5EC', className: 'pseudoHistory' });
        }
      });
    }
    const chartData = { series0, series1, pseudoZones, dates };
    return { start, end, chartData };
  }

  formatSeriesData = (transformation, dates: Array<any>) => {
    if (transformation) {
      const dateDiff = dates.filter(date => !transformation.dates.includes(date.date));
      const transformationValues = [];
      if (!dateDiff.length) {
        return transformation.values.map(Number);
      }
      if (dateDiff.length) {
        dates.forEach((sDate) => {
          const dateExists = this.helperService.binarySearch(transformation.dates, sDate.date);
          dateExists > -1 ? transformationValues.push(+transformation.values[dateExists]) : transformationValues.push(null);
        });
        return transformationValues;
      }
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
    return series.seriesInfo.seriesObservations.transformationResults[0].values.slice(dateStart, dateEnd + 1);
  }

  updateAnalyze(seriesInfo) {
    this.analyzerService.updateAnalyzerSeriesCount(seriesInfo);
  }

  trackBySeries(index, item) {
    return item.seriesInfo.id;
  }
}
