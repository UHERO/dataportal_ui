// Component for multi-chart view
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  private sub;
  private id: number;
  private routeGeo: string;
  private routeFreq: string;
  private routeSearch: string;
  private queryParams: any = {};

  // Check if seasonally adjusted data is displayed, default to true
  private saIsActive: boolean = true;
  private errorMessage: string;

  // seriesData array used as input in highchart.component
  public seriesData = [];
  private expandedResults = [];

  // Variables for geo and freq selectors
  private defaults;
  private geoFreqs;
  private freqGeos;
  private geoHandle: string;
  private freqHandle: string;
  private defaultFreq: string;
  private defaultGeo: string;
  public regions = [];
  public freqs = [];
  public currentGeo: Geography;
  public currentFreq: Frequency;

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService, private route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {
    this.currentGeo = {fips: null, name: null, handle: null};
    this.currentFreq = {freq: null, label: null};
  }

  ngAfterViewInit() {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.id = +params['id'] || 42;
      this.routeGeo = params['geo'];
      this.routeFreq = params['freq'];
      this.routeSearch = params['search'];
      if (this.id) this.queryParams.id = this.id;
      if (this.routeSearch) {this.queryParams.search = this.routeSearch; delete this.queryParams.id};
      if (this.routeGeo) this.queryParams.geo = this.routeGeo;
      if (this.routeFreq) this.queryParams.freq = this.routeFreq;

      if (this.routeSearch) {
        if (this.routeGeo && this.routeFreq) {
          this.initSearch(this.routeSearch, this.routeGeo, this.routeFreq);
        } else {
          this.initSearch(this.routeSearch);
        }
      } else {
        if (this.routeGeo && this.routeFreq) {
          this.initContent(this.id, this.routeGeo, this.routeFreq);
        } else {
          this.initContent(this.id);
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Set up search results
  initSearch(search: string, routeGeo?: string, routeFreq?: string) {
    let geoArray = [];
    let freqArray = [];

    this._uheroAPIService.fetchSearchFilters(search).subscribe((filters) => {
      let searchFilters = filters;
      this.defaults = searchFilters.defaults;
      this.freqGeos = searchFilters.freq_geos;
      this.geoFreqs = searchFilters.geo_freqs;
    },
    (error) => {
      error = this.errorMessage = error;
    },
    () => {
      let dateWrapper = {firstDate: '', endDate: ''};
      this.searchSettings(search, geoArray, freqArray, dateWrapper, routeGeo, routeFreq);
    });
  }

  searchSettings(search: string, regions: Array<any>, freqs: Array<any>, dateWrapper: dateWrapper, routeGeo?: string, routeFreq?: string) {
    let dateArray = [];
    let selectedFreq = routeFreq? routeFreq : this.defaults.freq.freq;
    let selectedGeo = routeGeo? routeGeo : this.defaults.geo.handle;
    
    // Get frequencies available for a selected region
    this.geoFreqs.forEach((geo, index) => {
      if (selectedGeo === this.geoFreqs[index].handle) {
        this.freqs = this.geoFreqs[index].freqs;
      }
    });

    // Get regions available for a selected frequency
    this.freqGeos.forEach((freq, index) => {
      if (selectedFreq === this.freqGeos[index].freq) {
        this.regions = this.freqGeos[index].geos;
      }
    });

    if (selectedGeo) {
      this.currentGeo = this.regions.find(region => region.handle === selectedGeo);
    } else {
      this.currentGeo = this.regions[0];
    }

    if (selectedFreq) {
      this.currentFreq = this.freqs.find(freq => freq.freq === selectedFreq);
    } else {
      this.currentFreq = this.freqs[0];
    }

    this.getSearchData(search, selectedGeo, selectedFreq, dateArray, dateWrapper);
  }

  getSearchData(search: string, geo: string, freq: string, dateArray: Array<any>, dateWrapper: dateWrapper) {
    let searchReults;
    // Get expanded search results for a selected region & frequency
    this._uheroAPIService.fetchSearchSeriesExpand(search, geo, freq).subscribe((search) => {
      searchReults = search;
    },
    (error) => {
      error = this.errorMessage = error;
    },
    () => {
      this.seriesData = [];
      searchReults.forEach((search, index) => {
        if (dateWrapper.firstDate === '' || searchReults[index].seriesObservations.observationStart < dateWrapper.firstDate) {
          dateWrapper.firstDate = searchReults[index].seriesObservations.observationStart;
        }
        if (dateWrapper.endDate === '' || searchReults[index].seriesObservations.observationEnd > dateWrapper.endDate) {
          dateWrapper.endDate = searchReults[index].seriesObservations.observationEnd;
        }
      });
      this._helper.calculateDateArray(dateWrapper.firstDate, dateWrapper.endDate, this.currentFreq.freq, dateArray);
      if (searchReults) {
        let series = this._helper.dataTransform(searchReults, dateArray, dateWrapper);
        let sublist = {name: this.routeSearch, dateRange: dateArray};
        this.selectedCategory = this.routeSearch;
        this.seriesData.push({dateWrapper: dateWrapper, sublist: sublist, series: series});
      };
    });
  }

  // Called on page load
  // Gets data sublists available for a selected category
  initContent(catId: number, routeGeo?:string, routeFreq?:string) {
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

          let i = 0;
          this.sublist.forEach((sub, index) => {
            let dateWrapper = {firstDate: '', endDate: ''};
            // Get all regions available in a given category
            this._uheroAPIService.fetchSelectedCategory(this.sublist[index]['id']).subscribe((category) => {
              let catInfo = category;
              this.freqGeos = catInfo.freq_geos;
              this.geoFreqs = catInfo.geo_freqs;
              this.geoFreqs.forEach((geo, index) => {
                this._helper.uniqueGeos(this.geoFreqs[index], geoArray);
              });
              this.freqGeos.forEach((freq, index) => {
                this._helper.uniqueFreqs(this.freqGeos[index], freqArray);
              });
              i += 1
            },
            (error) => {
              error = this.errorMessage = error;
            },
            () => {
              if (i === this.sublist.length) {
                this.sublist.forEach((sub, index) => {
                  this.initSettings(this.sublist[index], geoArray, freqArray, dateWrapper, routeGeo, routeFreq);
                });
              }
            });
          });
        } else {
          return;
        }
      },
      this.seriesData = []);
    });
  }

  // Get regions and frequencies available for a selected category
  initSettings(sublistIndex, regions: Array<any>, freqs: Array<any>, dateWrapper: dateWrapper, routeGeo?: string, routeFreq?: string) {
    let dateArray = [];
    let selectedFreq = routeFreq? routeFreq : this.defaultFreq ? this.defaultFreq : freqs[0].freq;
    let selectedGeo = routeGeo? routeGeo :  this.defaultGeo? this.defaultGeo : regions[0].handle;
    // Get frequencies available for a selected region
    regions.forEach((geo, index) => {
      if (selectedGeo === regions[index].handle) {
        this.freqs = regions[index].freqs;
      }
    });

    // Get regions available for a selected frequency
    freqs.forEach((freq, index) => {
      if (selectedFreq === freqs[index].freq) {
        this.regions = freqs[index].geos;
      }
    });

    console.log('regions', this.regions);
    if (selectedGeo) {
      this.currentGeo = this.regions.find(region => region.handle === selectedGeo);
    } else {
      this.currentGeo = this.regions[0];
    }

    if (selectedFreq) {
      this.currentFreq = this.freqs.find(freq => freq.freq === selectedFreq);
    } else {
      this.currentFreq = this.freqs[0];
    }

    this._uheroAPIService.fetchSelectedCategory(sublistIndex['id']).subscribe((cat) => {
      this._helper.calculateDateArray(cat['observationStart'], cat['observationEnd'], this.currentFreq.freq, dateArray);
    },
    (error) => {
      error = this.errorMessage = error
    },
    // When date array is completed, call sublistData()
      () => {
        // Fetch data for current region/frequency settings
        this._uheroAPIService.fetchExpanded(sublistIndex['id'], this.currentGeo.handle, this.currentFreq.freq).subscribe((expanded) => {
          this.expandedResults = expanded;
        },
        (error) => {
          error = this.errorMessage = error;
        },
        () => {
          if (this.expandedResults) {
            let series = this._helper.dataTransform(this.expandedResults, dateArray, dateWrapper);
            sublistIndex.dateRange = dateArray;
            this.seriesData.push({dateWrapper: dateWrapper, sublist: sublistIndex, series: series});
          } else {
            let series = [{seriesInfo: 'No data available'}];
            this.seriesData.push({sublist: sublistIndex, series: series});
          }
        });
    });
  }

  // Redraw series when a new region is selected
  redrawSeriesGeo(event) {
    this.geoHandle = event.handle;
    if (this.routeSearch) {
      this._router.navigate(['/category'], {queryParams: {search: this.routeSearch, geo: this.geoHandle, freq: this.currentFreq.freq} });
    } else {
      this._router.navigate(['/category'], {queryParams: {id: this.id, geo: this.geoHandle, freq: this.currentFreq.freq} });
    }
  }

  redrawSeriesFreq(event) {
    this.freqHandle = event.freq;
    if (this.routeSearch) {
      this._router.navigate(['/category'], {queryParams: {search: this.routeSearch, geo: this.currentGeo.handle, freq: this.freqHandle} });
    } else {
      this._router.navigate(['/category'], {queryParams: {id: this.id, geo: this.currentGeo.handle, freq: this.freqHandle} });
    }
  }

  onSearch(event) {
    console.log('search results', event);
    this._router.navigate(['/category/search'], {queryParams: {search: event}})
  }


  saActive(e) {
    // console.log('checkbox', e)
    this.saIsActive = e.target.checked;
    console.log('SA On', this.saIsActive)
  }

  scrollTo(): void {
    this.route.fragment.subscribe(frag => {
      const el = <HTMLElement>document.querySelector('#id_' + frag);
      if (el) el.scrollIntoView(el);
      if (frag === 'top') el.scrollTop;
    });
  }
}
