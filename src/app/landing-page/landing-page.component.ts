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
      this.freqGeos = searchFilters.freqGeos;
      this.geoFreqs = searchFilters.geoFreqs;
    },
    (error) => {
      error = this.errorMessage = error;
    },
    () => {
      this._uheroAPIService.fetchSearchSeries(search).subscribe((series) => {
        let allResults = series;
        let dateWrapper = {firstDate: '', endDate: ''};
        this.searchSettings(search, allResults, geoArray, freqArray, dateWrapper, routeGeo, routeFreq);
      });
    });
  }

  searchSettings(search: string, allResults: Array<any>, regions: Array<any>, freqs: Array<any>, dateWrapper: dateWrapper, routeGeo?: string, routeFreq?: string) {
    let dateArray = [];
    let selectedFreq = routeFreq? routeFreq : this.defaults.freq;
    let selectedGeo = routeGeo? routeGeo : this.defaults.geo;
    // Get all frequencies and regions available in all search results  
    allResults.forEach((series, index) => {
      this._helper.uniqueGeos(allResults[index].geography, regions);
      this._helper.uniqueFreqs({freq: allResults[index].frequencyShort, label: allResults[index].frequency}, freqs);
    });
    // Check that region & frequency combinations are available
    let availRegions = [];
    for (let i = 0; i < regions.length; i++) {
      for (let j = 0; j < this.freqGeos[selectedFreq].length; j++) {
        if (regions[i].handle === this.freqGeos[selectedFreq][j]) {
          availRegions.push(regions[i]);
        }
      }
    }
    let availFreqs = [];
    for (let i = 0; i < freqs.length; i++) {
      for (let j = 0; j < this.geoFreqs[selectedGeo].length; j++) {
        if (freqs[i].freq === this.geoFreqs[selectedGeo][j]) {
          availFreqs.push(freqs[i]);
        }
      }
    }
    this.regions = availRegions;
    this.freqs = availFreqs;

    this.regions.forEach((geo, index) => {
      if (selectedGeo === this.regions[index].handle) {
        this.currentGeo = this.regions[index];
      }
    });

    this.freqs.forEach((freq, index) => {
      if (selectedFreq === this.freqs[index].freq) {
        this.currentFreq = this.freqs[index];
      }
    });

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

          // this.firstDateWrapper = {firstDate: ''};
          this.sublist.forEach((sub, index) => {
            let dateWrapper = {firstDate: '', endDate: ''};
            this.initSettings(this.sublist[index], geoArray, freqArray, dateWrapper, routeGeo, routeFreq);
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

    this._uheroAPIService.fetchGeographies(sublistIndex['id']).subscribe((geos) => {
      geos.forEach((geo, index) => {
        this._helper.uniqueGeos(geos[index], regions);
      });
      this.regions = regions;
      // If geo. available as URL param, use as current geo
      if (routeGeo) {
        this.regions.forEach((geo, index) => {
          if (routeGeo === this.regions[index]['handle']) {
            this.currentGeo = this.regions[index];
          }
        });
      } else {
        // If a default region is available, export as current geo on page load
        this.regions.forEach((geo, index) => {
          if (this.defaultGeo === this.regions[index]['handle']) {
            this.currentGeo = this.regions[index];
          } else {
            this.currentGeo = this.regions[0];
          }
        });
      }

      this._uheroAPIService.fetchFrequencies(sublistIndex['id']).subscribe((frequencies) => {
        frequencies.forEach((frequency, index) => {
          this._helper.uniqueFreqs(frequencies[index], freqs);
        });
        this.freqs = freqs;
        // If freq. available as URL param, use as current frequency
        if (routeFreq) {
          this.freqs.forEach((freq, index) => {
            if (routeFreq === this.freqs[index]['freq']) {
              this.currentFreq = this.freqs[index];
            }
          });
        } else {
          // If a default freq. is available, export as current frequency on page load
          this.freqs.forEach((freq, index) => {
            if (this.defaultFreq === this.freqs[index]['label']) {
              this.currentFreq = this.freqs[index];
            } else {
              this.currentFreq = this.freqs[0];
            }
          });
        }

        // Get array of dates for a sublist
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
              this.seriesData.push({sublist: sublistIndex, series: series})
            }
          });
        });
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
