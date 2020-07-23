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
  startDate;
  endDate;
  seriesData;
  analyzerData;
  portalSettings;
  y0;
  y1;
  
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
      if (params[`start`]) {
        this.startDate = params[`start`];
      }
      if (params[`end`]) {
        this.endDate = params[`end`];
      }
      if (params[`y0`]) {
        this.y0 = params[`y0`].split('-');
      }
      if (params[`y1`]) {
        this.y1 = params[`y1`].split('-');
        console.log(this.y1)
      }
    });
    if (this.seriesId) {
      this.seriesData = this.seriesHelper.getSeriesData(this.seriesId, true);
    }
    if (this.chartSeries) {
      //this.analyzerData = this.analyzerService.getAnalyzerData(this.chartSeries, true);
    }
  }

}
