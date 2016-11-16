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
  private sublist;
  private categories;
  private id: number;
  private errorMessage: string;

  // seriesData array used as input in highchart.component
  public seriesData = [];

  // Variables for geo and freq selectors
  private geoHandle: string;
  private freqHandle: string;
  private defaultFreq: string;
  private defaultGeo: string;
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
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        // Look for selected category in list of available categories
        if (categories[index]['id'] === catId) {
          this.selectedCategory = categories[index]['name'];
          this.sublist = categories[index]['children'];

          // Get a category's default geo and freq if available
          if (categories[index]['defaults']) {
            this.defaultFreq = categories[index]['defaults']['freq'];
            this.defaultGeo = categories[index]['defaults']['geo'];
          } else {
            this.defaultFreq = '';
            this.defaultGeo = '';
          }

          // If a default freq. is available, export as current frequency on page load
          this.freqs.forEach((freq, index) => {
            if (this.freqs[index]['freq'] === this.defaultFreq) {
              this.currentFreq = this.freqs[index];
            }
          });

          this.sublist.forEach((sub, index) => {
            this._uheroAPIService.fetchGeographies(this.sublist[index]['id']).subscribe((geos) => {
              geos.forEach((geo, index) => {
                this.uniqueGeos(geos[index], geoArray);
              });
              this.regions = geoArray;

              // If a default geo is available, export as current geography on page load
              this.regions.forEach((geo, index) => {
                if (this.defaultGeo === this.regions[index]['handle']) {
                  this.currentGeo = this.regions[index];
                } else {
                  this.currentGeo = this.regions[0];
                }
              })

              // Get observation data for series in a given category, region, and frequency
              this._uheroAPIService.fetchMultiChartData(this.sublist[index]['id'], this.currentGeo.handle, this.currentFreq.freq).subscribe((results) => {
                this.seriesData.push({'sublist': this.sublist[index], 'series': results[0]});
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
          this.sublist = categories[index]['children'];
          this.sublist.forEach((sub, index) => {
              this._uheroAPIService.fetchMultiChartData(this.sublist[index]['id'], event.handle, this.currentFreq.freq).subscribe((results) => {
                this.seriesData.push({'sublist': this.sublist[index], 'series': results[0]});
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
    this.freqHandle = event.freq;
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if (categories[index]['id'] === this.id) {
          this.sublist = categories[index]['children'];
          this.sublist.forEach((sub, index) => {
              this._uheroAPIService.fetchMultiChartData(this.sublist[index]['id'], this.currentGeo.handle, event.freq).subscribe((results) => {
                this.seriesData.push({'sublist': this.sublist[index], 'series': results[0]});
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

  // Get a unique array of available regions for a category
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

  scrollTo(location: string): void {
    window.location.hash = location;
    console.log(window.location.hash)
  }
}
