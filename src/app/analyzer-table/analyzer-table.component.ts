import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';

@Component({
  selector: 'app-analyzer-table',
  templateUrl: './analyzer-table.component.html',
  styleUrls: ['./analyzer-table.component.scss']
})
export class AnalyzerTableComponent implements OnInit {
  @Input() series;
  @Input() tableDates;
  @Output() updateChartSeries = new EventEmitter();
  private yoyChecked;
  private ytdChecked;

  constructor(private _analyzer: AnalyzerService) { }

  ngOnInit() {
  }

  yoyActive(e) {
    this.yoyChecked = e.target.checked;
  }

  ytdActive(e) {
    this.ytdChecked = e.target.checked;
  }

  updateAnalyze(series) {
    this._analyzer.updateAnalyzer(series);
    this.updateChartSeries.emit(series);
  }

  updateChart(series) {
    this.updateChartSeries.emit(series)
  }

}
