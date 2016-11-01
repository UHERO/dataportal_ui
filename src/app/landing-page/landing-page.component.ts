// Component for landing page category tabs
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { error } from 'util';

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  private categories;
  private errorMessage: string;
  // seriesData array used as input in highchart.component
  public seriesData = [];
  public regions = [];

  constructor(private _uheroAPIService: UheroApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (isNaN(id)) {
        // this.drawSeriesRegions(9);
        this.drawSeries(8);
      } else {
        // this.drawSeriesRegions(id);
        this.drawSeries(id);
      }
    });
  }

  /* drawSeries(catId: number) {
    this._uheroAPIService.fetchChartData(catId).subscribe((results) => {
      this.seriesData = results[0];
      console.log('series data', this.seriesData);
    },
    error => this.errorMessage = error);
  } */


  drawSeries(catId: number) {
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if(categories[index]['id'] === catId) {
          let sublist = categories[index]['children'];
          sublist.forEach((sub, index) => {
            this._uheroAPIService.fetchChartData(sublist[index]['id']).subscribe((results) => {
              this.seriesData.push({'sublist': sublist[index], 'series': results[0]});
            });
          });
        } else {
          return
        }
      },
      this.seriesData = []);
    },
    error =>this.errorMessage = error);
  }

  drawSeriesRegions(catId: number) {
    /* this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if(categories[index]['id'] === catId) {
          let sublist = categories[index]['children'];
          sublist.forEach((sub, index) => {
            this._uheroAPIService.fetchGeographies(sublist[index]['id']).subscribe((geos) => {
              this.regions = geos;
              console.log('landing page', geos);
            });
          });
        }
      });
    }); */
    /* this._uheroAPIService.fetchGeographies(catId).subscribe((geos) => {
      this.regions = geos;
      this.regions.forEach((region, index) => {
        this._uheroAPIService.fetchMultiChartData(catId, this.regions[index]['handle']).subscribe((results) => {
          console.log(results);
        })
      })
    },
    error => this.errorMessage = error); */
  }
}
