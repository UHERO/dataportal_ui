import { Component, OnInit, Input, Output, ViewChildren, EventEmitter, AfterViewChecked } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';

@Component({
  selector: 'app-analyzer-table',
  templateUrl: './analyzer-table.component.html',
  styleUrls: ['./analyzer-table.component.scss']
})
export class AnalyzerTableComponent implements OnInit {
  @ViewChildren('tableScroll') private tableEl;  
  @Input() series;
  @Input() tableDates;
  @Output() updateChartSeries = new EventEmitter();
  private yoyChecked;
  private ytdChecked;
  private previousHeight;
  private tableWidths = [];

  constructor(private _analyzer: AnalyzerService) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    // Check height of content and scroll tables to the right
    // If true, height is changing, i.e. content still loading
    if (this.checkContainerHeight()) {
      this.tableScroll();
    }

    // Scroll tables to the right when table widths changes, i.e. changing frequency from A to Q | M
    this.checkTableWidth();
  }

  checkContainerHeight() {
    const contianer = $('.multi-series-container');
    const heightDiff = (this.previousHeight !== contianer.height());
    this.previousHeight = contianer.height();
    return heightDiff;
  }

  checkTableWidth() {
    const tables = $('.table');
    const tableWidths = this.tableWidths;
    if (tables) {
      tables.each(function (index) {
        const widthDiff = (tableWidths[index] !== tables[index].scrollWidth);
        if (widthDiff) {
          tables[index].scrollLeft = tables[index].scrollWidth;
        }
        tableWidths[index] = tables[index].scrollWidth;
      });
    }
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
    series.showInChart = !series.showInChart;
  }

  // On load, table scrollbars should start at the right -- showing most recent data
  tableScroll(): void {
    try {
      this.tableEl._results.forEach((el) => {
        el.nativeElement.scrollLeft = el.nativeElement.scrollWidth;
      });
    } catch (err) {
      console.log(err);
    }
  }

}
