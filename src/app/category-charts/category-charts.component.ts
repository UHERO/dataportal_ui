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
    console.log(this.data)
    this.data.forEach((chartSeries) => {
      chartSeries.seriesInfo.analyze = this._analyzer.checkAnalyzer(chartSeries.seriesInfo);
    });
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
