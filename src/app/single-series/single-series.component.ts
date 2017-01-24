import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { SeriesHelperService } from '../series-helper.service';
import { HelperService } from '../helper.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';

@Component({
  selector: 'app-single-series',
  templateUrl: './single-series.component.html',
  styleUrls: ['./single-series.component.scss']
})
export class SingleSeriesComponent implements OnInit, AfterViewInit {
  private errorMessage: string;
  private newTableData;
  private summaryStats;

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
    this.route.params.subscribe(params => {
      let seriesId = Number.parseInt(params['id']);
      this.getSeriesData(seriesId);
    });
  }

  getSeriesData(id: number) {
    this.seriesData = this._series.drawChart(id);
  }

  // Redraw chart when selecting a new region or frequency
  redrawGeo(event, currentFreq, siblings, sa) {
    let newGeo = event.handle;
    let freq = currentFreq.freq;
    let id;
    siblings.forEach((sib, index) => {
      if (siblings[index].geography.handle === newGeo && siblings[index].frequencyShort === freq && sa === siblings[index].seasonallyAdjusted) {
        id = siblings[index].id;
      } else if (siblings[index].geography.handle === newGeo && siblings[index].frequencyShort === freq) {
        id = siblings[index].id;
      }
    });
    this._router.navigate(['/series/' + id]);
  }

  redrawFreq(event, currentGeo, siblings, sa) {
    console.log('sa', sa);
    let newFreq = event.freq;
    let geo = currentGeo.handle;
    let id;
    siblings.forEach((sib, index) => {
      if (siblings[index].frequencyShort === newFreq && siblings[index].geography.handle === geo && sa === siblings[index].seasonallyAdjusted) {
        id = siblings[index].id;
      } else if (siblings[index].frequencyShort === newFreq && siblings[index].geography.handle === geo) {
        id = siblings[index].id;
      }
    });
    this._router.navigate(['/series/' + id]);
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
    this.summaryStats = this._helper.summaryStats(this.newTableData, freq);
  }

  onSearch(event) {
    this._router.navigate(['/category/search'], {queryParams: {search: event} });
  }

  saActive(event, geo, freq, siblingPairs) {
    let id;
    siblingPairs.forEach((sib, index) => {
      if (siblingPairs[index].seasonallyAdjusted === event.target.checked && siblingPairs[index].geography.handle === geo.handle && siblingPairs[index].frequencyShort === freq.freq) {
        id = siblingPairs[index].id;
      }
    });
    this._router.navigate(['/series/' + id]);
  }
}
