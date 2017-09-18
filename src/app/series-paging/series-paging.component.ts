import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-series-paging',
  templateUrl: './series-paging.component.html',
  styleUrls: ['./series-paging.component.scss']
})
export class SeriesPagingComponent implements OnInit {
  @Input() data;
  @Output() seriesPageChange = new EventEmitter();
  public counter;

  constructor() { }

  ngOnInit() {
    this.counter = 0;
  }

  back(counter) {
    if (counter === 0) {
      return;
    }
    this.counter--;
    this.seriesPageChange.emit(this.counter);
  }

  forward(counter) {
    if (counter === this.data.length - 1) {
      return;
    }
    this.counter++;
    this.seriesPageChange.emit(this.counter);
  }


}
