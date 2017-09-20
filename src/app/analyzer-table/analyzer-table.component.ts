import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-analyzer-table',
  templateUrl: './analyzer-table.component.html',
  styleUrls: ['./analyzer-table.component.scss']
})
export class AnalyzerTableComponent implements OnInit {
  @Input() series;
  @Input() tableDates;
  private yoyChecked;
  private ytdChecked;

  constructor() { }

  ngOnInit() {
  }

  yoyActive(e) {
    this.yoyChecked = e.target.checked;
  }

  ytdActive(e) {
    this.ytdChecked = e.target.checked;
  }

}
