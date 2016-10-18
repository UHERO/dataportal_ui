// Component for landing page category tabs
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { error } from 'util';

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  private errorMessage: string;
  // seriesData array used as input in highchart.component
  public seriesData = [];

  constructor(private _uheroAPIService: UheroApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      console.log('series id', id);
      if (isNaN(id)) {
        this.drawSeries(9);
      } else {
        this.drawSeries(id);
      }
    });
  }

  drawSeries(catId: number) {
    this._uheroAPIService.fetchSeries(catId).subscribe((series) => {
      // this.series = series;
      let selectedSeries = series;

      selectedSeries.forEach((serie, index) => {
        // console.log('index', index);
        this._uheroAPIService.fetchObservations(+selectedSeries[index]['id']).subscribe((observations) => {
          let seriesObservations = observations;
          this.seriesData.push({'serie': selectedSeries[index], 'observations': seriesObservations});
          // let chartData = seriesData['observations']['chart data'];
          console.log('seriesData', this.seriesData);
        });
      });
    },
    error => this.errorMessage = error);
    this.seriesData = [];
  }
}
