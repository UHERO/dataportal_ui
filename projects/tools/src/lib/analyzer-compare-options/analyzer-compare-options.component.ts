import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyzerService } from '../analyzer.service';

@Component({
  selector: 'lib-analyzer-compare-options',
  templateUrl: './analyzer-compare-options.component.html',
  styleUrls: ['./analyzer-compare-options.component.scss']
})
export class AnalyzerCompareOptionsComponent implements OnInit, OnDestroy {
  analyzerSeries;
  @Input() seriesInfo;
  inCompareChart: boolean;
  compareSeriesSub;
  compareSeries;

  constructor(private analyzerService: AnalyzerService) {
    this.analyzerSeries = analyzerService.analyzerData;
    this.compareSeriesSub = analyzerService.analyzerSeriesCompare.subscribe((data) => {
      this.compareSeries = data;
    });
  }

  ngOnInit(): void {
    this.inCompareChart = this.compareSeries.findIndex(s => s.className === this.seriesInfo.id) > -1;
  }

  ngOnDestroy(): void {
    this.compareSeriesSub.unsubscribe();
  }

  removeFromAnalyzer(seriesInfo) {
    this.removeFromCompare(seriesInfo);
    this.analyzerService.removeFromAnalyzer(seriesInfo.id);
  }

  onChartTypeChange(e, seriesInfo) {
    console.log('e', e);
    this.analyzerService.updateCompareChartType(seriesInfo, e);
  }

  onChartAxisChange(e, seriesInfo) {
    console.log('e', e);
    this.analyzerService.updateCompareSeriesAxis(seriesInfo, e);
  }

  removeFromCompare(seriesInfo) {
    console.log('remove');
    this.analyzerService.removeFromComparisonChart(seriesInfo.id);
    this.inCompareChart = this.compareSeries.findIndex(s => s.className === this.seriesInfo.id) > -1;
  }

  addToCompare(seriesInfo) {
    console.log('add');
    this.analyzerService.addToComparisonChart(seriesInfo);
    this.inCompareChart = this.compareSeries.findIndex(s => s.className === this.seriesInfo.id) > -1;
  }
}
