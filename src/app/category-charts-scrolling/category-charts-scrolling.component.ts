import { Component, OnInit, Input } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';

@Component({
  selector: 'app-category-charts-scrolling',
  templateUrl: './category-charts-scrolling.component.html',
  styleUrls: ['./category-charts-scrolling.component.scss']
})
export class CategoryChartsScrollingComponent implements OnInit {
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
  public counter;

  constructor(private googleAES: GoogleAnalyticsEventsService) { }

  ngOnInit() {
    this.counter = 0;  
  }

  // Google Analytics: Track clicking on series
  submitGAEvent(seriesId) {
    const id = seriesId.toString();
    this.googleAES.emitEvent('series', 'click', id);
  }

  back(counter) {
    if (counter === 0) {
      return;
    }
    this.counter--;
  }

  forward(counter) {
    if (counter === this.data.length - 1) {
      return;
    }
    this.counter++;
  }

}
