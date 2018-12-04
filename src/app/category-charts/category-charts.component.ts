import { Component, Input, OnChanges, Inject, ChangeDetectionStrategy } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-category-charts',
  templateUrl: './category-charts.component.html',
  styleUrls: ['./category-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryChartsComponent implements OnChanges {
  @Input() portalSettings;
  @Input() sublist;
  @Input() data;
  @Input() freq;
  @Input() noSeries;
  @Input() nsaActive;
  @Input() yoyActive;
  @Input() ytdActive;
  @Input() params;
  @Input() chartStart;
  @Input() chartEnd;
  @Input() search;
  @Input() dates;
  @Input() dateWrapper;

  constructor(
    @Inject('defaultRange') private defaultRange,
    private _helper: HelperService,
    private googleAES: GoogleAnalyticsEventsService,
    private _analyzer: AnalyzerService
  ) { }

  ngOnChanges() {
    if (this.data) {
      this.data.forEach((chartSeries) => {
        if (chartSeries.seriesInfo !== 'No data available' && this.dates) {
          chartSeries.categoryDisplay = this.formatCategoryChartData(chartSeries.seriesInfo.seriesObservations, this.dates, this.portalSettings);
          chartSeries.seriesInfo.analyze = this._analyzer.checkAnalyzer(chartSeries.seriesInfo);
        }
      });
    }
    // If setYAxes, chart view should display all charts' (level) yAxis with the same range
    // Allow y-axes to vary for search results
    if (this.portalSettings.highcharts.setYAxes && !this.search) {
      const start = this.chartStart ? this.chartStart : Date.parse(this.defaultRange.start);
      const end = this.chartEnd ? this.chartEnd : Date.parse(this.defaultRange.end);
      if (this.sublist) {
        // Find minimum and maximum values out of all series within a sublist; Use values to set min/max of yAxis
        this.sublist.minValue = this.findMin(this.sublist, start, end);
        this.sublist.maxValue = this.findMax(this.sublist, start, end);
      }
    }
  }

  formatCategoryChartData = (observations, dates, portalSettings) => {
    const transformations = this._helper.getTransformations(observations);
    const { series0Name, series1Name } = portalSettings.highcharts;
    const start = observations.observationStart;
    const end = observations.observationEnd;
    let series0 = this.formatSeriesData(transformations[series0Name], dates);
    let series1 = this.formatSeriesData(transformations[series1Name], dates);
    const chart = this._helper.createSeriesChart(this.dates, transformations);
    const pseudoZones = [];
    const level = transformations.level;
    if (level.pseudoHistory) {
      level.pseudoHistory.forEach((obs, index) => {
        if (obs && !level.pseudoHistory[index + 1]) {
          pseudoZones.push({ value: Date.parse(level.dates[index]), dashStyle: 'dash', color: '#7CB5EC', className: 'pseudoHistory' });
        }
      });
    }
    const chartData = { series0: series0, series1: series1, pseudoZones: pseudoZones, dates: dates };
    return { start: start, end: end, chartData: chartData };
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
          const dateExists = this._helper.binarySearch(transformation.dates, sDate.date);
          dateExists > -1 ? transformationValues.push(+transformation.values[dateExists]) : transformationValues.push(null);
        });
        return transformationValues;
      }  
    }
  }

  findMin(sublist, start, end) {
    let minValue = null;
    sublist.displaySeries.forEach((serie) => {
      const values = this.getSeriesValues(serie, start, end);
      const min = Math.min(...values);
      if (minValue === null || min < minValue) {
        minValue = min;
      }
    });
    return minValue;
  }

  findMax(sublist, start, end) {
    let maxValue = null;
    sublist.displaySeries.forEach((serie) => {
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

  // Google Analytics: Track clicking on series
  submitGAEvent(seriesId) {
    const id = seriesId.toString();
    this.googleAES.emitEvent('series', 'click', id);
  }

  updateAnalyze(seriesInfo) {
    this._analyzer.updateAnalyzer(seriesInfo.id);
    // Update analyze button on chart
    seriesInfo.analyze = this._analyzer.checkAnalyzer(seriesInfo);
  }

  trackBySeries(index, item) {
    return item.seriesInfo.id;
  }
}
