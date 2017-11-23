import { Inject, Component, OnInit, AfterViewInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyzerService } from '../analyzer.service';
import { UheroApiService } from '../uhero-api.service';
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { SeriesHelperService } from '../series-helper.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';

@Component({
  selector: 'app-single-series',
  templateUrl: './single-series.component.html',
  styleUrls: ['./single-series.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SingleSeriesComponent implements OnInit, AfterViewInit {
  private noSelection: string;
  private newTableData;
  private summaryStats;
  private seasonallyAdjusted = null;
  private seasonalAdjustment;
  private startDate;
  private endDate;
  private chartStart;
  private chartEnd;
  private portalSettings;
  private category;

  // Vars used in selectors
  public currentFreq: Frequency;
  public currentGeo: Geography;
  public seriesData;

  static saFromSeasonalAdjustment(seasonalAdjustment: string): boolean {
    return seasonalAdjustment !== 'not_seasonally_adjusted';
  }

  static selectSibling(geoFreqSiblings: Array<any>, sa: boolean, freq: string) {
    const saSeries = geoFreqSiblings.find(series => series.seasonalAdjustment === 'seasonally_adjusted');
    const nsaSeries = geoFreqSiblings.find(series => series.seasonalAdjustment === 'not_seasonally_adjusted');
    const naSeries = geoFreqSiblings.find(series => series.seasonalAdjustment === 'not_applicable');
    // If more than one sibling exists (i.e. seasonal & non-seasonal)
    // Select series where seasonalAdjustment matches sa setting
    if (freq === 'A') {
      return geoFreqSiblings[0].id;
    }
    if (saSeries && nsaSeries) {
      if (sa) {
        return geoFreqSiblings.find(sibling => sibling.seasonalAdjustment === 'seasonally_adjusted').id;
      }
      return geoFreqSiblings.find(sibling => sibling.seasonalAdjustment === 'not_seasonally_adjusted').id;
    }
    if (!saSeries && nsaSeries) {
      return nsaSeries.id;
    }
    if (saSeries && !nsaSeries) {
      return saSeries.id;
    }
    if (!saSeries && !nsaSeries) {
      return naSeries.id;
    }
  }

  constructor(
    @Inject('portal') private portal,
    private _uheroAPIService: UheroApiService,
    private _dataPortalSettings: DataPortalSettingsService,
    private _series: SeriesHelperService,
    private _analyzer: AnalyzerService,
    private route: ActivatedRoute,
    private _router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.currentGeo = { fips: null, handle: null, name: null };
    this.currentFreq = { freq: null, label: null };
    this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal];
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      console.log('route params', params);
      if (params['start']) {
        this.startDate = params['start'];
      }
      if (params['end']) {
        this.endDate = params['end'];
      }
    });
    this.route.queryParams.subscribe(params => {
      const seriesId = Number.parseInt(params['id']);
      if (params['sa'] !== undefined) {
        this.seasonallyAdjusted = (params['sa'] === 'true');
      }
      if (params['category']) {
        this.category = params['category'];
      }
      this.seriesData = this._series.getSeriesData(seriesId);
    });
    this.cdRef.detectChanges();
  }

  // Redraw chart when selecting a new region or frequency
  goToSeries(siblings: Array<any>, freq: string, geo: string, sa: boolean) {
    this.seasonallyAdjusted = sa;
    this.noSelection = null;
    // Get array of siblings for selected geo and freq
    const geoFreqSib = this._series.findGeoFreqSibling(siblings, geo, freq);
    const id = geoFreqSib.length ? SingleSeriesComponent.selectSibling(geoFreqSib, sa, freq) : null;
    if (id) {
      const queryParams = {
        id: id,
        sa: this.seasonallyAdjusted,
        geo: geo,
        freq: freq
      };
      this.startDate = this.chartStart;
      this.endDate = this.chartEnd;
      this._router.navigate(['/series/'], { queryParams: queryParams, queryParamsHandling: 'merge' });
    } else {
      this.noSelection = 'Selection Not Available';
    }
  }

  updateAnalyze(seriesInfo, tableData, chartData) {
    this._analyzer.updateAnalyzer(seriesInfo, tableData, chartData);
  }

  updateChartExtremes(e) {
    this.chartStart = e.minDate;
    console.log('chart start', this.chartStart);
    this.chartEnd = e.maxDate;
  }

  // Update table when selecting new ranges in the chart
  redrawTable(e, seriesDetail, tableData, freq) {
    const deciamls = seriesDetail.decimals ? seriesDetail.decimals : 1;
    let minDate, maxDate, tableStart, tableEnd;
    minDate = e.minDate;
    maxDate = e.maxDate;
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i].date === maxDate) {
        tableStart = i;
      }
      if (tableData[i].date === minDate) {
        tableEnd = i;
      }
    }
    this.newTableData = tableData.slice(tableEnd, tableStart + 1).reverse();
    this.summaryStats = this._series.summaryStats(this.newTableData, freq, deciamls, minDate, maxDate);
  }
}
