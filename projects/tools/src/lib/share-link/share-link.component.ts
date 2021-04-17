import { Component, Input, Inject, OnChanges } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';

@Component({
  selector: 'lib-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss']
})
export class ShareLinkComponent implements OnChanges {
  @Input() startDate;
  @Input() endDate;
  // View -- 'analyzer' or 'series'
  @Input() view;

  // Series in the analyzer and series drawn in the analyzer chart
  @Input() analyzerSeries;

  // Tooltip options in the analyzer view
  @Input() name;
  @Input() units;
  @Input() geography;
  @Input() yoy;
  @Input() ytd;
  @Input() c5ma;
  @Input() index;
  @Input() yRightSeries;
  shareLink: string;
  embedCode: string;
  compareSeriesSub;
  compareChartSeries;
  
  constructor(
    @Inject('environment') private environment,
    private analyzerService: AnalyzerService,
  ) {
    this.compareSeriesSub = this.analyzerService.analyzerSeriesCompare.subscribe((series) => {
      //this.updateChartData(series);
      this.compareChartSeries = series;
      console.log('CONSTRUCTOR SHARE COMPONENT', this.getAnalyzerParams(this.startDate, this.endDate, '/analyzer'))
      this.embedCode = this.view === 'analyzer' ? this.formatEmbedSnippet(this.startDate, this.endDate) : '';
      this.shareLink = this.view === 'analyzer' ? this.formatShareLink(this.startDate, this.endDate) : '';
    });
  }

  ngOnChanges() {
    console.log('INIT SHARE COMPONENT');
    console.log('SHARE COMPONENT', this.getAnalyzerParams(this.startDate, this.endDate, '/analyzer'));
    this.embedCode = this.view === 'analyzer' ? this.formatEmbedSnippet(this.startDate, this.endDate) : '';
    this.shareLink = this.view === 'analyzer' ? this.formatShareLink(this.startDate, this.endDate) : '';
  }

  formatShareLink = (start: string, end: string) => this.environment[`portalUrl`] + this.getAnalyzerParams(start, end, '/analyzer');

  formatEmbedSnippet = (start: string, end: string) => {
    const embedURL = this.getAnalyzerParams(start, end, '/graph');
    return `<div style="position:relative;width:100%;overflow:hidden;padding-top:56.25%;height:475px;"><iframe style="position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;border:none;" src="${this.environment[`portalUrl`]}${embedURL}" scrolling="no"></iframe></div>`;
  }

  getAnalyzerParams(start, end, seriesUrl) {
    let aSeries = '?analyzerSeries=';
    let cSeries = '&chartSeries=';
    if (this.analyzerSeries) {
      const chartSeries = this.analyzerService.analyzerData.analyzerSeries.filter(s => s.compare);
      aSeries += this.analyzerSeries.map(s => s.id).join('-');
      cSeries += this.compareChartSeries.map(s => s.className).join('-');
    }
    seriesUrl += aSeries + cSeries;
    seriesUrl += `&start=${start}&end=${end}`;
    seriesUrl += this.index ? `&index=${this.index}` : '';
    seriesUrl += this.name ? `&name=${this.name}` : '';
    seriesUrl += this.units ? `&units${this.units}` : '';
    seriesUrl += this.geography ? `&geography=${this.geography}` : '';
    seriesUrl += this.yoy ? `&yoy=${this.yoy}` : '';
    seriesUrl += this.ytd ? `&ytd=${this.ytd}` : '';
    seriesUrl += this.c5ma ? `&c5ma=${this.c5ma}` : '';
    seriesUrl += this.yRightSeries && this.yRightSeries.length ? `&yright=${this.yRightSeries.join('-')}` : '';
    return seriesUrl;
  }


  copyLink(inputValue) {
    $('.share-link').attr('title', 'Copied');
    inputValue.select();
    document.execCommand('copy');
    inputValue.setSelectionRange(0, 0);
    setTimeout(() => {
      // Reset share link title
      $('.share-link').attr('title', 'Copy');
    }, 3000);
  }
}
