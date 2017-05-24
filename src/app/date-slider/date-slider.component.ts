import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss']
})
export class DateSliderComponent implements OnInit {
  private someRange;
  private sliderConfig;
  @Input() dates;
  @Input() freq;
  constructor() { }

  ngOnInit() {
    this.sliderConfig = {
      behavior: 'drag',
      connect: true,
      start: [0, 5],
      keyboard: true,
      step: 1,
      range: {
        min: 0,
        max: 5
      }
    }
  }

  ngOnChanges() {
    console.log('dates', this.dates);
    console.log('freq', this.freq);
    if (this.dates && this.freq) {
      const step = this.calculateStep(this.freq);
      const range = this.calculateRange(this.dates, this.freq);
      // this.createSliderConfig(range, step);
    }
  }

  /* createSliderConfig(range, step) {
    this.sliderConfig = {
      behavior: 'drag',
      connect: true,
      range: {
        min: ,
        max:
      },
      step: step,
      start: []
    }
  } */

  calculateStep(freq) {
    if (freq === 'A') {
      return 52 * 7 * 24 * 60 * 60 * 1000; // One Year
    }
    if (freq === 'Q') {
      return 12 * 7 * 24 * 60 * 60 * 1000; // One Quarter
    }
    if (freq === 'M') {
      return 4 * 7 * 24 * 60 * 60 * 1000; // One Month
    }
  }

  calculateRange(dates, freq) {
    if (freq === 'A') {
      return [dates[0], dates[dates.length - 1]];
    }
    if (freq === 'Q') {
      const first = dates[0].substr(0, 4);
      const last
    }
  }

  onChange(event) {
    console.log(event);
  }

}
