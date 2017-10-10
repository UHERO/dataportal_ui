import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
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

  constructor( @Inject('defaultRange') private defaultRange, private googleAES: GoogleAnalyticsEventsService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('data', this.data);
    console.log('sublist', this.sublist);
    console.log('chartStart', this.chartStart);
    console.log('chartEnd', this.chartEnd);
    const start = this.chartStart ? this.chartStart : Date.parse(this.defaultRange.start);
    const end = this.chartEnd ? this.chartEnd : Date.parse(this.defaultRange.end);
    if (this.sublist) {
      let minValue = null, maxValue = null;
      this.sublist.displaySeries.forEach((serie) => {
        const startValue = serie.categoryChart.chartData.level.findIndex(observation => observation[0] === start);
        const endValue = serie.categoryChart.chartData.level.findIndex(observation => observation[0] === end);
        const trimmedData = serie.categoryChart.chartData.level.slice(startValue, endValue + 1);
        const values = trimmedData.map((observation) => observation[1]);
        const max = values.reduce(function(a, b) {
          return Math.max(a, b);
        });
        const min = values.reduces(function(a, b) {
          return Math.min(a, b);
        })
        if (maxValue === null || max > maxValue) {
          maxValue = max;
        }
        if (minValue === null || min < minValue) {
          minValue = min;
        }
        console.log('trimmed data', trimmedData);
      });
      this.sublist.maxValue = maxValue;
      this.sublist.minValue = minValue;
      console.log('maxValue', maxValue);
    }
  }

  // Google Analytics: Track clicking on series
  submitGAEvent(seriesId) {
    const id = seriesId.toString();
    this.googleAES.emitEvent('series', 'click', id);
  }

}
