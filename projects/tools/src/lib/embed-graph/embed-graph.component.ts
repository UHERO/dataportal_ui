import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
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
  private seriesId: number;
  private chartSeries: string;
  startDate: string;
  endDate: string;
  seriesData: any;
  analyzerData: any;
  portalSettings: any;
  y0: string;
  y1: string;
  tooltipGeo: boolean = true;
  tooltipName: boolean = true;
  tooltipUnits: boolean = true;
  indexSeries: boolean;
  
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
        this.chartSeries = params[`chartSeries`].split('-').map(series => ({ id: +series, showInChart: true }));
      }
      if (params[`start`]) {
        this.startDate = params[`start`];
      }
      if (params[`end`]) {
        this.endDate = params[`end`];
      }
      if (params[`y0`]) {
        this.y0 = params[`y0`];
      }
      if (params[`y1`]) {
        this.y1 = params[`y1`];
      }
      if (params[`index`]) {
        this.indexSeries = params[`index`];
      }
    });
    if (this.seriesId) {
      this.seriesData = this.seriesHelper.getSeriesData(this.seriesId, true);
    }
    if (this.chartSeries) {
      this.analyzerData = this.analyzerService.getAnalyzerData(this.chartSeries, true, this.y0, this.y1);
    }
  }

  ngOnDestroy() {
    this.analyzerService.analyzerData = {
      analyzerTableDates: [],
      analyzerDateWrapper: { firstDate: '', endDate: '' },
      analyzerSeries: [],
      displayFreqSelector: false,
      siblingFreqs: [],
      analyzerFrequency: {},
      y0Series: null,
      y1Series: null,
      requestComplete: false,
      indexed: false,
      baseYear: null,
      minDate: null,
      maxDate: null
    };
  }

  checkTooltip(e) {
    if (e.label === 'name') {
      this.tooltipName = e.value;
    }
    if (e.label === 'units') {
      this.tooltipUnits = e.value;
    }
    if (e.label === 'geo') {
      this.tooltipGeo = e.value;
    }
  }
}
