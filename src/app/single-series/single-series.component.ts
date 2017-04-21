import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { SeriesHelperService } from '../series-helper.service';
import { HelperService } from '../helper.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';

@Component({
  selector: 'app-single-series',
  templateUrl: './single-series.component.html',
  styleUrls: ['./single-series.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SingleSeriesComponent implements OnInit, AfterViewInit {
  private errorMessage: string;
  private noSelection: string;
  private newTableData;
  private summaryStats;
  private seasonallyAdjusted = null;

  // Vars used in selectors
  public currentFreq: Frequency;
  public currentGeo: Geography;
  private seriesData;

  constructor(private _uheroAPIService: UheroApiService, private _series: SeriesHelperService, private _helper: HelperService, private route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    this.currentGeo = {fips: null, handle: null, name: null};
    this.currentFreq = {freq: null, label: null};
  }

  ngAfterViewInit() {
    console.log(this.seasonallyAdjusted)
    this.route.queryParams.subscribe(params => {
      let seriesId = Number.parseInt(params['id']);
      if (params['sa'] !== undefined) {
        this.seasonallyAdjusted = (params['sa'] == 'true');
      }
      console.log(this.seasonallyAdjusted)
      this.seriesData = this._series.getSeriesData(seriesId);
    });
  }

  // Redraw chart when selecting a new region or frequency
  redrawGeo(event, currentFreq, siblings, sa) {
    let geo = event.handle;
    let freq = currentFreq.freq;
    this.noSelection = null;
    this.goToSeries(siblings, freq, geo, sa);
  }

  redrawFreq(event, currentGeo, siblings, sa) {
    let freq = event.freq;
    let geo = currentGeo.handle;
    this.noSelection = null;
    this.goToSeries(siblings, freq, geo, sa);
  }

  goToSeries(siblings, freq, geo, sa) {
    let id;
    siblings.forEach((sib) => {
      if (freq === 'A') {
        if (sib.frequencyShort === freq && sib.geography.handle === geo) {
          id = sib.id;
        }
      } else {
        if (sib.frequencyShort === freq && sib.geography.handle === geo && sa === sib.seasonallyAdjusted) {
          id = sib.id;
          console.log(sib.id)
        }
      }
    });
    if (id) {
      this._router.navigate(['/series/'], {queryParams: {'id': id, 'sa': this.seasonallyAdjusted}});
    } else {
      this.noSelection = 'Selection Not Available';
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

  saActive(event, geo, freq, siblingPairs) {
    this.seasonallyAdjusted = event;
    this.noSelection = null;
    this.goToSeries(siblingPairs, freq.freq, geo.handle, this.seasonallyAdjusted);
  }
}
