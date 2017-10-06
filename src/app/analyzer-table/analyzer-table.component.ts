import { Component, OnInit, OnChanges, Input, Output, ViewChildren, EventEmitter, AfterViewChecked } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { SeriesHelperService } from '../series-helper.service';
import { TableHelperService } from '../table-helper.service';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-analyzer-table',
  templateUrl: './analyzer-table.component.html',
  styleUrls: ['./analyzer-table.component.scss']
})
export class AnalyzerTableComponent implements OnInit {
  @ViewChildren('tableScroll') private tableEl;
  @Input() series;
  @Input() minDate;
  @Input() maxDate;
  @Input() allTableDates;
  @Input() chartSeries;
  @Output() updateChartSeries = new EventEmitter();
  private yoyChecked;
  private ytdChecked;
  private previousHeight;
  private tableWidths = [];
  private tableDates;

  constructor(private _analyzer: AnalyzerService, private _series: SeriesHelperService, private _table: TableHelperService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // Update table as minDate & maxDate changee
    const tableEnd = this.allTableDates.findIndex(item => item.date === this.maxDate);
    const tableStart = this.allTableDates.findIndex(item => item.date === this.minDate);
    // Display values in the range of dates selected
    this.series.forEach((series) => {
      series.analyzerTableDisplay = series.analyzerTableData.slice(tableStart, tableEnd + 1);
      let seriesFreq = { freq: series.frequencyShort, label: series.frequency };
      series.summaryStats = this._series.summaryStats(series.analyzerTableDisplay, seriesFreq, series.decimals);
      const seriesInChart = $('.' + series.id + ' > .highcharts-graph');
      if (seriesInChart) {
        // Match color of show_chart icon for a series with its respective color in the graph
        $('.color' + series.id).css('color', seriesInChart.css('color'));
      }
      if (!seriesInChart.length) {
        // If series is not selected for the chart, reset color of show_chart icon
        $('.color' + series.id).css('color', '#000');
      }
    });
    this.tableDates = this.allTableDates.slice(tableStart, tableEnd + 1);
  }

  ngAfterViewChecked() {
    // Check height of content and scroll tables to the right
    // If true, height is changing, i.e. content still loading
    const container = this._table.checkContainerHeight(this.previousHeight);
    this.previousHeight = container.previousHeight;
    if (container.scroll) {
      // On load, table scrollbars should start at the right -- showing most recent data
      return this._table.tableScroll(this.tableEl);
    }

    // Scroll tables to the right when table widths changes, i.e. changing frequency from A to Q | M
    return this._table.checkTableWidth(this.tableWidths);
  }

  showPopover(seriesInfo) {
    return this._table.showPopover(seriesInfo);
  }

  hideInfo(seriesId) {
    return this._table.hideInfo(seriesId);
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
