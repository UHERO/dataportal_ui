// Component for landing page category tabs
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { Frequencies } from '../freq-const';
import { Frequency } from '../frequency';
import { Geography } from '../geography';

import { error } from 'util';

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  private selectedCategory;
  private categories;
  private id: number;
  private geoHandle: string;
  private freqHandle: string;
  private errorMessage: string;
  // seriesData array used as input in highchart.component
  public seriesData = [];
  public regions = [];
  public freqs = Frequencies;
  public currentGeo: Geography;
  public currentFreq: Frequency;

  constructor(private _uheroAPIService: UheroApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentGeo = {fips: null, name: null, handle: null};
    this.currentFreq = {freq: null, label: null};
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
      if (isNaN(this.id)) {
        this.id = 42;
        this.drawSeries(42);
      } else {
        this.drawSeries(this.id);
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
  drawSeries(catId: number) {
    let geoArray = [];
    this.currentFreq = this.freqs[0];
    console.log('default freq', this.currentFreq);
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if (categories[index]['id'] === catId) {
          this.selectedCategory = categories[index]['name'];
          let sublist = categories[index]['children'];
          sublist.forEach((sub, index) => {
            this._uheroAPIService.fetchGeographies(sublist[index]['id']).subscribe((geos) => {
              geos.forEach((geo, index) => {
                this.uniqueGeos(geos[index], geoArray);
              });
              this.regions = geoArray;
              this.currentGeo = geoArray[0];
              this._uheroAPIService.fetchMultiChartData(sublist[index]['id'], this.currentGeo.handle, this.currentFreq.freq).subscribe((results) => {
                this.seriesData.push({'sublist': sublist[index], 'series': results[0]});
              });
            });
          });
        } else {
          return;
        }
      },
      this.seriesData = []);
    },
    error => this.errorMessage = error);
  }

  // Redraw series when a new region is selected
  redrawSeriesGeo(event) {
    this.geoHandle = event.handle;
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if (categories[index]['id'] === this.id) {
          let sublist = categories[index]['children'];
          sublist.forEach((sub, index) => {
              this._uheroAPIService.fetchMultiChartData(sublist[index]['id'], event.handle, this.currentFreq.freq).subscribe((results) => {
                this.seriesData.push({'sublist': sublist[index], 'series': results[0]});
              });
          });
        } else {
          return;
        }
      },
      this.seriesData = []);
    },
    error => this.errorMessage = error);
  }

  redrawSeriesFreq(event) {
    this.freqHandle = event.handle;
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if (categories[index]['id'] === this.id) {
          let sublist = categories[index]['children'];
          sublist.forEach((sub, index) => {
              this._uheroAPIService.fetchMultiChartData(sublist[index]['id'], this.currentGeo.handle, event.handle).subscribe((results) => {
                this.seriesData.push({'sublist': sublist[index], 'series': results[0]});
              });
          });
        } else {
          return;
        }
      },
      this.seriesData = []);
    },
    error => this.errorMessage = error);
  }

  uniqueGeos(geo, geoList) {
    let exist = false;
    for (let i in geoList) {
      if (geo.name === geoList[i].name) {
        exist = true;
      }
    }

    if (!exist) {
      geoList.push(geo);
    }
  }
}
