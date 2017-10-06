import { Component, OnInit, OnChanges, Input, Output, ViewChildren, EventEmitter, AfterViewChecked } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { SeriesHelperService } from '../series-helper.service';
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

  constructor(private _analyzer: AnalyzerService, private _series: SeriesHelperService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // Update table as minDate & maxDate changee
    let tableStart, tableEnd;
    for (let i = 0; i < this.allTableDates.length; i++) {
      if (this.allTableDates[i].date === this.maxDate) {
        tableEnd = i;
      }
      if (this.allTableDates[i].date === this.minDate) {
        tableStart = i;
      }
    }
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

  showPopover(seriesInfo) {
    $('[data-toggle="tooltip"]').tooltip('hide');
    const popover = $('#' + seriesInfo.id).popover({
      trigger: 'manual',
      placement: function (popoverEl, el) {
        // popoverEl = popover DOM element
        // el = DOM element that triggers popover
        let position = 'top';
        const elOffset = $(el).offset().top;
        if (elOffset <= 150) {
          position = 'bottom';
        }
        return position;
      },
      html: true,
      title: function () {
        let title = seriesInfo.title;
        title += seriesInfo.unitsLabel ? ' (' + seriesInfo.unitsLabel + ')' : ' (' + seriesInfo.unitsLabelShort + ')';
        return title;
      },
      content: function () {
        let info = '';
        if (seriesInfo.seasonalAdjustment === 'seasonally_adjusted') {
          info += 'Seasonally Adjusted<br>';
        }
        if (seriesInfo.sourceDescription) {
          info += 'Source: ' + seriesInfo.sourceDescription + '<br>';
        }
        if (seriesInfo.sourceLink) {
          info += '<a target="_blank" href="' + seriesInfo.sourceLink + '">' + seriesInfo.sourceLink + '</a><br>';
        }
        if (seriesInfo.sourceDetails) {
          info += seriesInfo.sourceDetails;
        }
        return info;
      }
    }).on('show.bs.popover', function (e) {
      // Display only one popover at a time
      $('.popover').not(e.target).popover('dispose');
      setTimeout(() => {
        // Close popover on next click (source link in popover is still clickable)
        $('body').one('click', function () {
          popover.popover('dispose');
        });
      }, 1);
    });
    popover.popover('toggle');
  }

  hideInfo(seriesId) {
    $('[data-toggle="tooltip"]').tooltip('hide');
    $('.popover').popover('dispose');
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
