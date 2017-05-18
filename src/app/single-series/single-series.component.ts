import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
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

  // Vars used in selectors
  public currentFreq: Frequency;
  public currentGeo: Geography;
  public seriesData;

  constructor(
    private _uheroAPIService: UheroApiService,
    private _series: SeriesHelperService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.currentGeo = {fips: null, handle: null, name: null};
    this.currentFreq = {freq: null, label: null};
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      const seriesId = Number.parseInt(params['id']);
      if (params['sa'] !== undefined) {
        this.seasonallyAdjusted = (params['sa'] === 'true');
      }
      this.seriesData = this._series.getSeriesData(seriesId);
    });
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

  // Update table when selecting new ranges in the chart
  redrawTable(e, tableData, freq) {
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
    this.summaryStats = this._series.summaryStats(this.newTableData, freq);
  }
}
