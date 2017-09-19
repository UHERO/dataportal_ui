import { Injectable } from '@angular/core';

@Injectable()
export class AnalyzerService {

  public analyzerSeries: Array<any> = [];

  checkAnalyzer(seriesInfo) {
    const analyzeSeries = this.analyzerSeries.find(series => series.id === seriesInfo.id);
    return analyzeSeries ? true : false;
  }

  updateAnalyzer(seriesInfo) {
    if (seriesInfo.analyze) {
      const analyzeSeries = this.analyzerSeries.find(series => series.id === seriesInfo.id);
      const seriesIndex = this.analyzerSeries.indexOf(analyzeSeries);
      if (seriesIndex > -1) {
        this.analyzerSeries.splice(seriesIndex, 1);
      }
      seriesInfo.analyze = false;
      return;
    }
    if (!seriesInfo.analyze) {
      this.analyzerSeries.push(seriesInfo);
      seriesInfo.analyze = true;
    }
  }

}
