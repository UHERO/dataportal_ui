// Component for landing page category tabs
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';
import { dateWrapper } from '../date-wrapper';

import { error } from 'util';

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  private selectedCategory;
  private sublist: Array<any> = [];
  private categories;
  private id: number;

  // Check if seasonally adjusted data is displayed, default to true
  private saIsActive: boolean = true;
  private errorMessage: string;

  // seriesData array used as input in highchart.component
  public seriesData = [];

  // Variables for geo and freq selectors
  private geoHandle: string;
  private freqHandle: string;
  private defaultFreq: string;
  private defaultGeo: string;
  public regions = [];
  public freqs = [];
  public currentGeo: Geography;
  public currentFreq: Frequency;

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService, private route: ActivatedRoute) {
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
        this.initContent(42);
      } else {
        this.initContent(this.id)
      }
    });
  }

  // Called on page load
  // Gets data sublists available for a selected category
  initContent(catId: number) {
    let geoArray = [];
    let freqArray = [];

    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if (categories[index]['id'] === catId) {
          this.selectedCategory = categories[index]['name'];
          this.sublist = categories[index]['children'];

          // Get a sublist's default geo/freq if available
          if (categories[index]['defaults']) {
            this.defaultFreq = categories[index]['defaults']['freq'];
            this.defaultGeo  = categories[index]['defaults']['geo'];
          } else {
            this.defaultFreq = '';
            this.defaultGeo = '';
          }

          // this.firstDateWrapper = {firstDate: ''};
          this.sublist.forEach((sub, index) => {
            let dateWrapper = {firstDate: '', endDate: ''};
            this.initSettings(this.sublist[index], geoArray, freqArray, dateWrapper);
          });
        } else {
          return
        }
      },
      this.seriesData = []);
    });
  }

  // Get regions and frequencies available for a selected category
  initSettings(sublistIndex, regions: Array<any>, freqs: Array<any>, dateWrapper: dateWrapper) {
    let dateArray = [];

    this._uheroAPIService.fetchGeographies(sublistIndex['id']).subscribe((geos) => {
      geos.forEach((geo, index) => {
        this._helper.uniqueGeos(geos[index], regions);
      });
      this.regions = regions;

      this.regions.forEach((geo, index) => {
        if (this.defaultGeo === this.regions[index]['handle']) {
          this.currentGeo = this.regions[index];
        } else {
          this.currentGeo = this.regions[0];
        }
      });

      this._uheroAPIService.fetchFrequencies(sublistIndex['id']).subscribe((frequencies) => {
        frequencies.forEach((frequency, index) => {
          this._helper.uniqueFreqs(frequencies[index], freqs);
        });
        this.freqs = freqs;

        // If a default freq. is available, export as current frequency on page load
        this.freqs.forEach((freq, index) => {
          if (this.defaultFreq === this.freqs[index]['label']) {
            this.currentFreq = this.freqs[index];
          } else {
            this.currentFreq = this.freqs[0];
          }
        });

        // Fetch data for current region/frequency settings
        this.sublistData(sublistIndex, this.currentGeo.handle, this.currentFreq.freq, dateArray, dateWrapper);
      });
    });
  }

  // Get series for each subcategory
  sublistData(sublistIndex, geoHandle: string, freqFrequency: string, dates: Array<any>, dateWrapper: dateWrapper) {
    this._uheroAPIService.fetchSelectedCategory(sublistIndex['id']).subscribe((cat) => {
      this._helper.calculateDateArray(cat['observationStart'], cat['observationEnd'], freqFrequency, dates);
    });

    this._uheroAPIService.fetchMultiChartData(sublistIndex['id'], geoHandle, freqFrequency, dates, dateWrapper).subscribe((results) => {
      sublistIndex['date range'] = dates;

      // Get first date wrapper from cached data
      results.forEach((res, index) => {
        let series = results[index];
        series.forEach((serie, index) => {
          if (dateWrapper.firstDate === '' || series[index].dateWrapper.firstDate < dateWrapper.firstDate) {
            dateWrapper.firstDate = series[index].dateWrapper.firstDate;
          }
          if (dateWrapper.endDate === '' || series[index].endDate > dateWrapper.endDate) {
            dateWrapper.endDate = series[index].dateWrapper.endDate;
          }
        });
      });

      this.seriesData.push({'dateWrapper':dateWrapper, 'sublist': sublistIndex, 'series': results[0]});
      console.log('chart view', this.seriesData);
    });
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
            let dateArray = [];
            let dateWrapper = {firstDate: '', endDate: ''};
            this.sublistData(this.sublist[index], this.geoHandle, this.currentFreq.freq, dateArray, dateWrapper);
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
            let dateArray = [];
            let dateWrapper = {firstDate: '', endDate: ''};
            this.sublistData(this.sublist[index], this.currentGeo.handle, this.freqHandle, dateArray, dateWrapper);
          });
        } else {
          return;
        }
      },
      this.seriesData = []);
    },
    error => this.errorMessage = error);
  }

  saActive(e) {
    // console.log('checkbox', e)
    this.saIsActive = e.target.checked;
    console.log('SA On', this.saIsActive)
  }

  scrollTo(location: string): void {
    window.location.hash = location;
  }
}
