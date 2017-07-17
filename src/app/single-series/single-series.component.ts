import { Inject, Component, OnInit, AfterViewInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  private startDate;
  private endDate;
  private chartStart;
  private chartEnd;
  private portalSettings;

  // Vars used in selectors
  public currentFreq: Frequency;
  public currentGeo: Geography;
  public seriesData;

  constructor(
    @Inject('portal') private portal,
    private _uheroAPIService: UheroApiService,
    private _dataPortalSettings: DataPortalSettingsService,
    private _series: SeriesHelperService,
    private route: ActivatedRoute,
    private _router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentGeo = {fips: null, handle: null, name: null};
    this.currentFreq = {freq: null, label: null};
    this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal];
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      const seriesId = Number.parseInt(params['id']);
      if (params['sa'] !== undefined) {
        this.seasonallyAdjusted = (params['sa'] === 'true');
      }
      this.seriesData = this._series.getSeriesData(seriesId);
    });
    this.cdRef.detectChanges();
  }

  // Redraw chart when selecting a new region or frequency
  goToSeries(siblings: Array<any>, freq: string, geo: string, sa: boolean) {
    this.seasonallyAdjusted = sa;
    this.noSelection = null;
    let id;
    // Get array of siblings for selected geo and freq
    const geoFreqSib = this._series.findGeoFreqSibling(siblings, geo, freq);
    id = this.selectSibling(geoFreqSib, sa, freq);
    if (id) {
      const queryParams = {
        id: id,
        sa: this.seasonallyAdjusted,
        geo: geo,
        freq: freq
      };
      this.startDate = this.chartStart;
      this.endDate = this.chartEnd;
      this._router.navigate(['/series/'], {queryParams: queryParams, queryParamsHandling: 'merge'});
    } else {
      this.noSelection = 'Selection Not Available';
    }
  }

  selectSibling(geoFreqSiblings: Array<any>, sa: boolean, freq: string) {
    // If more than one sibling exists (i.e. seasonal & non-seasonal)
    // Select series where seasonallyAdjusted matches sa
    if (geoFreqSiblings.length > 1) {
      return geoFreqSiblings.find(sibling => sibling.seasonallyAdjusted === sa).id;
    }
    if (geoFreqSiblings.length <= 1) {
      if (sa !== geoFreqSiblings[0].seasonallyAdjusted && freq !== 'A') {
        this.seasonallyAdjusted = geoFreqSiblings[0].seasonallyAdjusted;
      }
      return geoFreqSiblings[0].id;
    }
  }

  updateChartExtremes(e) {
    this.chartStart = e.minDate;
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
    this.summaryStats = this._series.summaryStats(this.newTableData, freq, deciamls);
  }
}
