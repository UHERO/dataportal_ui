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
  private selectedCategory;
  private categories;
  private id;
  private errorMessage: string;
  // seriesData array used as input in highchart.component
  public seriesData = [];
  public regions = [];
  public currentGeo;

  constructor(private _uheroAPIService: UheroApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentGeo = {handle: null};
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
      if (isNaN(this.id)) {
        this.getRegions(42);
        // this.drawSeries(8);
      } else {
        this.getRegions(this.id);
        // this.drawSeries(id);
      }
    });
  }

  /* drawSeries(catId: number) {
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
  } */

  // Called on page load
  // Gets data for sublists on default selected region
  getRegions(catId: number) {
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if(categories[index]['id'] === catId) {
          this.selectedCategory = categories[index]['name']
          let sublist = categories[index]['children'];
          sublist.forEach((sub, index) => {
            this._uheroAPIService.fetchGeographies(sublist[index]['id']).subscribe((geos) => {
              this.regions = geos;
              this.currentGeo = geos[0];
              this._uheroAPIService.fetchMultiChartData(sublist[index]['id'], this.currentGeo.handle).subscribe((results) => {
                this.seriesData.push({'sublist': sublist[index], 'series':results[0]});
              });
            });
          });
        } else {
          return
        }
      },
      this.seriesData = []);
    },
    error => this.errorMessage = error);
  }

  // Redraw series when a new region is selected
  redrawSeries(event) {
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if(categories[index]['id'] === this.id) {
          let sublist = categories[index]['children'];
          sublist.forEach((sub, index) => {
            this._uheroAPIService.fetchMultiChartData(sublist[index]['id'], event.handle).subscribe((results) => {
                this.seriesData.push({'sublist': sublist[index], 'series':results[0]});
              });
            });
        } else {
          return
        }
      },
      this.seriesData = []);
    },
    error => this.errorMessage = error);
  }
}
