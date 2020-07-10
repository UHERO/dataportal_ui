import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { SeriesHelperService } from '../series-helper.service';
import { AnalyzerService } from '../analyzer.service';

@Component({
  selector: 'lib-embed-graph',
  templateUrl: './embed-graph.component.html',
  styleUrls: ['./embed-graph.component.scss']
})
export class EmbedGraphComponent implements OnInit {
  private seriesId;
  private chartSeries;
  seriesData;
  analyzerData;
  portalSettings;
  
  constructor(
    @Inject('portal') public portal,
    private analyzerService: AnalyzerService,
    private route: ActivatedRoute,
    private seriesHelper: SeriesHelperService,
    private dataPortalSettings: DataPortalSettingsService
  ) { }

  ngOnInit(): void {
    this.portalSettings = this.dataPortalSettings.dataPortalSettings[this.portal.universe];
    this.route.queryParams.subscribe(params => {
      if (params[`id`]) {
        this.seriesId = Number(params[`id`]);
      }
      if (params[`chartSeries`]) {
        this.chartSeries = params[`chartSeries`].split('-').map(series => ({ id: series, showInChart: true }));
      }
    });
    console.log('seriesId', this.seriesId);
    console.log('chartSeries', this.chartSeries)
    if (this.seriesId) {
      this.seriesData = this.seriesHelper.getSeriesData(this.seriesId, true);
    }
    if (this.chartSeries) {
      this.analyzerData = this.analyzerService.getAnalyzerEmbedData(this.chartSeries, true);
    }
  }

}
