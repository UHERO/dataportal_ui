import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';

@Component({
  selector: 'app-category-charts',
  templateUrl: './category-charts.component.html',
  styleUrls: ['./category-charts.component.scss']
})
export class CategoryChartsComponent implements OnInit, OnChanges {
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

  constructor(
    @Inject('defaultRange') private defaultRange,
    private googleAES: GoogleAnalyticsEventsService,
    private _analyzer: AnalyzerService
  ) { }

  ngOnInit() {
    this.data.forEach((chartSeries) => {
      if (chartSeries.seriesInfo !== 'No data available') {
        chartSeries.seriesInfo.analyze = this._analyzer.checkAnalyzer(chartSeries.seriesInfo);
      }
    });
  }

  ngOnChanges() {
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
    const dateStart = series.categoryDisplay.chartData.dates.findIndex(date => date.date === new Date(start).toISOString().substr(0, 10));
    const dateEnd = series.categoryDisplay.chartData.dates.findIndex(date => date.date === new Date(end).toISOString().substr(0, 10));
    return series.categoryDisplay.chartData.level.slice(dateStart, dateEnd + 1);
  }

  // Google Analytics: Track clicking on series
  submitGAEvent(seriesId) {
    const id = seriesId.toString();
    this.googleAES.emitEvent('series', 'click', id);
  }

  updateAnalyze(seriesInfo, tableData, chartData) {
    this._analyzer.updateAnalyzer(seriesInfo.id, tableData, chartData);
    // Update analyze button on chart
    seriesInfo.analyze = this._analyzer.checkAnalyzer(seriesInfo);
  }
}
