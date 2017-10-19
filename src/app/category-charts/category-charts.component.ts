import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';

@Component({
  selector: 'app-category-charts',
  templateUrl: './category-charts.component.html',
  styleUrls: ['./category-charts.component.scss']
})
export class CategoryChartsComponent implements OnInit {
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

  constructor(
    @Inject('defaultRange') private defaultRange,
    private googleAES: GoogleAnalyticsEventsService,
    private _analyzer: AnalyzerService
  ) { }

  ngOnInit() {
    this.data.forEach((chartSeries) => {
      chartSeries.seriesInfo.analyze = this._analyzer.checkAnalyzer(chartSeries.seriesInfo);
    });
  }

  ngOnChanges() {
    // If setYAxes, chart view should display all charts' (level) yAxis with the same range
    if (this.portalSettings.highcharts.setYAxes) {
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
      const min = values.reduce(function (a, b) {
        return Math.min(a, b);
      })
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
      const max = values.reduce(function (a, b) {
        return Math.max(a, b);
      });
      if (maxValue === null || max > maxValue) {
        maxValue = max;
      }
    });
    return maxValue;
  }

  getSeriesValues(series, start, end) {
    const startValue = series.categoryChart.chartData.level.findIndex(observation => observation[0] === start);
    const endValue = series.categoryChart.chartData.level.findIndex(observation => observation[0] === end);
    const trimmedData = series.categoryChart.chartData.level.slice(startValue, endValue + 1);
    const values = trimmedData.map((observation) => observation[1]);
    return values;
  }

  // Google Analytics: Track clicking on series
  submitGAEvent(seriesId) {
    const id = seriesId.toString();
    this.googleAES.emitEvent('series', 'click', id);
  }

  updateAnalyze(seriesInfo, tableData, chartData) {
    this._analyzer.updateAnalyzer(seriesInfo, tableData, chartData);
  }
}
