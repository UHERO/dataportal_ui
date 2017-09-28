import { Component, OnInit } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { HelperService } from '../helper.service';
import { DateWrapper } from '../date-wrapper';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent implements OnInit {
  private frequencies;
  private currentFreq;
  private analyzerSeries;
  private analyzerTableDates;
  private tableDates;
  private analyzerChartSeries;
  private yoyChecked;
  private ytdChecked;
  private chartStart;
  private chartEnd;
  private newTableData;

  constructor(private _analyzer: AnalyzerService, private _helper: HelperService) { }

  ngOnInit() {
    this.analyzerSeries = this._analyzer.analyzerSeries;
    this.frequencies = [];
    const dateWrapper = { firstDate: '', endDate: '' };
    this.analyzerSeries.forEach((series) => {
      const freqExist = this.frequencies.find(freq => freq.freq === series.frequencyShort);
      if (!freqExist) {
        this.frequencies.push({ freq: series.frequencyShort, label: series.frequency });
      }
      this.setDateWrapper(dateWrapper, series.seriesObservations.observationStart, series.seriesObservations.observationEnd);
    });

    if (this.analyzerSeries.length) {
      this.analyzerTableDates = this._analyzer.createAnalyzerDates(dateWrapper.firstDate, dateWrapper.endDate, this.frequencies, []);
      this.tableDates = this.analyzerTableDates;
      this.analyzerSeries.forEach((series) => {
        series.analyzerTable = this._helper.catTable(series.tableData, this.analyzerTableDates, series.decimals);
        series.analyzerTableData = series.analyzerTable;
      });
      this.analyzerSeries[0].showInChart = true;
      this.analyzerChartSeries = [Object.assign({}, this.analyzerSeries[0])];
    }
  }

  setDateWrapper(dateWrapper: DateWrapper, seriesStart: string, seriesEnd: string) {
    if (dateWrapper.firstDate === '' || seriesStart < dateWrapper.firstDate) {
      dateWrapper.firstDate = seriesStart;
    }
    if (dateWrapper.endDate === '' || seriesEnd > dateWrapper.endDate) {
      dateWrapper.endDate = seriesEnd;
    }
  }

  yoyActive(e) {
    this.yoyChecked = e.target.checked;
  }

  ytdActive(e) {
    this.ytdChecked = e.target.checked;
  }

  updateAnalyzerChart(event) {
    const seriesExist = this.analyzerChartSeries.find(series => series.id === event.id);
    if (seriesExist) {
      const chartSeriesCopy = [];
      const index = this.analyzerChartSeries.indexOf(seriesExist);
      this.analyzerChartSeries.splice(index, 1);
      this.analyzerChartSeries = this.copyChartSeries(this.analyzerChartSeries);
      return
    }
    if (!seriesExist) {
      const chartSeriesCopy = [];
      this.analyzerChartSeries.push(event);
      this.analyzerChartSeries = this.copyChartSeries(this.analyzerChartSeries);
    }
  }

  copyChartSeries(analyzerChartSeries) {
    const chartSeriesCopy = [];
    analyzerChartSeries.forEach((series) => {
      chartSeriesCopy.push(Object.assign({}, series));
    });
    return chartSeriesCopy;
  }

  updateChartExtremes(e) {
    this.chartStart = e.minDate;
    this.chartEnd = e.maxDate;
  }

  // Update table when selecting new ranges in the chart
  redrawTable(e, tableData, tableDates) {
    console.log(tableData);
    console.log('e', e)
    // const deciamls = seriesDetail.decimals ? seriesDetail.decimals : 1;
    let minDate, maxDate, tableStart, tableEnd;
    minDate = e.minDate;
    maxDate = e.maxDate;
    for (let i = 0; i < tableDates.length; i++) {
      if (tableDates[i].date === maxDate) {
        tableStart = i;
      }
      if (tableDates[i].date === minDate) {
        tableEnd = i;
      }
    }
    tableData.forEach((series) => {
      series.analyzerTableData = series.analyzerTable.slice(tableEnd, tableStart + 1);
    });
    this.tableDates = tableDates.slice(tableEnd, tableStart + 1);
    console.log('tableDates', this.analyzerTableDates)
  }

}
