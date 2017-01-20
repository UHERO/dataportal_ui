import { Component, OnInit, AfterViewInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';

@Component({
  selector: 'app-single-series',
  templateUrl: './single-series.component.html',
  styleUrls: ['./single-series.component.scss']
})
export class SingleSeriesComponent implements OnInit {
  private errorMessage: string;
  private seriesSiblings;

  private options: Object;
  public seriesTableData = [];
  private newTableData = [];
  private summaryStats;
  private saIsActive: boolean = true;
  
  // Vars used in highstock component
  public chartData;
  public seriesDetail;

  // Table header to indicate % change if series is not a rate
  private change;

  // Vars used in selectors
  public freqs = [];
  public currentFreq: Frequency;
  public regions = [];
  public currentGeo: Geography;

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService, private route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    this.currentGeo = {fips: null, handle: null, name: null};
    this.currentFreq = {freq: null, label: null};
  }

  ngAfterViewInit() {
  this.route.params.subscribe(params => {
      let seriesId = Number.parseInt(params['id']);
      this.drawChart(seriesId);
    });
  }

  // Draws chart & table on load
  drawChart(id: number, routeGeo?: string, routeFreq?: string) {
    let freqArray = [];
    let dateArray = [];

    this._uheroAPIService.fetchSeriesDetail(id).subscribe((series) => {
      this.seriesDetail = series;
      this.change = this.seriesDetail['percent'] === true? 'YOY Change' : 'YOY % Change';
      this.currentFreq = {'freq': this.seriesDetail['frequencyShort'], 'label': this.seriesDetail['frequency']};

      this._uheroAPIService.fetchSeriesSiblings(id).subscribe((siblings) => {
        this.seriesSiblings = siblings;
        console.log('siblings', this.seriesSiblings);
      });

      // Prevent frequency select menu from resetting when navigating from another series
      if (this.freqs.length === 0) {
        this._uheroAPIService.fetchSiblingFreqs(id).subscribe((frequencies) => {
          this.freqs = frequencies;
        });
      } else {
        return;
      }

      // Prevent region select menu from resetting when navigating from another series
      if (this.regions.length === 0) {
        this._uheroAPIService.fetchSiblingGeos(id).subscribe((geos) => {
        this.regions = geos;
        this.currentGeo = this.seriesDetail['geography'];
        });
      } else {
        this.currentGeo = this.seriesDetail['geography'];
      }
    },
    (error) => {
      error = this.errorMessage = error;
    },
    () => {
      this.getSeriesObservations(id, dateArray);
    });
  }

  getSeriesObservations(id: number, dateArray: Array<any>) {
    this._uheroAPIService.fetchObservations(id).subscribe((observations) => {
      let seriesObservations = observations;
      let start = seriesObservations['start'];
      let end = seriesObservations['end'];

      // Use to format dates for table
      this._helper.calculateDateArray(start, end, this.currentFreq.freq, dateArray);
      this.chartData = seriesObservations['chart data'];
      let tableData = seriesObservations['table data'];

      // Create table with formatted dates and slice table to starting & ending observation dates
      this.seriesTableData = this._helper.seriesTable(tableData, dateArray);
        let beginTable, endTable;
        for (let i = 0; i < this.seriesTableData.length; i++) {
          if (this.seriesTableData[i].date === start) {
            beginTable = i;
          }
          if (this.seriesTableData[i].date === end) {
            endTable = i;
          }
        }
      this.seriesTableData = this.seriesTableData.slice(beginTable, endTable + 1).reverse();
    });

  }

  // Redraw chart when selecting a new region
  redrawGeo(event) {
    this.seriesSiblings.forEach((sibling, index) => {
      if (event.handle === this.seriesSiblings[index]['geography']['handle'] && this.currentFreq.freq === this.seriesSiblings[index]['frequencyShort']) {
        let id = this.seriesSiblings[index]['id'];
        // Update id param in URL to reflect selected series ID
        this._router.navigate(['/series/' + id]);
      } else {
        return;
      }
    },
    error => this.errorMessage = error);
  }

  // Redraw chart when selecting a new frequency
  redrawFreq(event) {
    this.seriesSiblings.forEach((sibling, index) => {
      if (this.currentGeo.handle === this.seriesSiblings[index]['geography']['handle'] && event.freq === this.seriesSiblings[index]['frequencyShort']) {
        let id = this.seriesSiblings[index]['id'];
        // Update id param in URL to reflect selected series ID
        this._router.navigate(['/series/' + id]);
      } else {
        return;
      }
    },
    error => this.errorMessage = error);
  }

  // Update table when selecting new ranges in the chart
  redrawTable(e) {
    let minDate, maxDate, tableStart, tableEnd;
    minDate = e['min date'];
    maxDate = e['max date'];

    for (let i = 0; i < this.seriesTableData.length; i++) {
      if (this.seriesTableData[i].date === maxDate) {
        tableStart = i;
      }
      if (this.seriesTableData[i].date === minDate) {
        tableEnd = i;
      }
    }

    this.newTableData = this.seriesTableData.slice(tableStart, tableEnd + 1);

    this.summaryStats = this._helper.summaryStats(this.newTableData, this.currentFreq.freq);
  }

  onSearch(event) {
    console.log('search results', event);
    this._router.navigate(['/category/search'], {queryParams: {search: event} })
  }

  saActive(e) {
    // console.log('checkbox', e)
    this.saIsActive = e.target.checked;
    console.log('SA On', this.saIsActive)
  }

}
