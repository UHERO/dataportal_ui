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
  private yoyChecked;
  private ytdChecked;

  constructor(private _analyzer: AnalyzerService, private _helper: HelperService) { }

  ngOnInit() {
    this.analyzerSeries = this._analyzer.analyzerSeries;
    console.log(this.analyzerSeries)
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
      this.analyzerSeries.forEach((series) => {
        series.analyzerTable = this._helper.catTable(series.tableData, this.analyzerTableDates, series.decimals);
      });
      console.log('analyzer table dates', this.analyzerTableDates);
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

}
