import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private googleAES: GoogleAnalyticsEventsService, private _analyzer: AnalyzerService) { }

  ngOnInit() {
  }

  // Google Analytics: Track clicking on series
  submitGAEvent(seriesId) {
    const id = seriesId.toString();
    this.googleAES.emitEvent('series', 'click', id);
  }

  updateAnalyze(serie) {
    if (serie.analyze) {
      const analyzeSeries = this._analyzer.analyzerSeries.find(series => series.seriesInfo.id === serie.seriesInfo.id);
      const seriesIndex = this._analyzer.analyzerSeries.indexOf(analyzeSeries);
      if (seriesIndex > -1) {
        this._analyzer.analyzerSeries.splice(seriesIndex, 1);
      }
      serie.analyze = false;
      return;
    }
    if (!serie.analyze) {
      this._analyzer.analyzerSeries.push(serie);
      serie.analyze = true;
    }
  }
}
