import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UheroApiService } from './uhero-api.service';
import { HelperService } from './helper.service';
import { Frequency } from './frequency';
import { Geography } from './geography';
import { dateWrapper } from './date-wrapper';

@Injectable()
export class CategoryHelperService {
  private errorMessage: string;

  // seriesData array used as input in highchart.component
  private seriesData = [];
  private expandedResults = [];

  // Variables for geo and freq selectors
  private defaults;
  private geoFreqs;
  private freqGeos;
  private geoHandle: string;
  private freqHandle: string;
  private defaultFreq: string;
  private defaultGeo: string;
  private categoryData;


  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }
  
  // Called on page load
  // Gets data sublists available for a selected category
  initContent(catId: number, routeGeo?:string, routeFreq?:string): Observable<any> {
    this.categoryData = {selectedCategory: '', sublist: [], regions: [], currentGeo: {}, frequencies: {}, currentFreq: {}, seriesData: []};
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;
      this.seriesData = [];
      categories.forEach((category, index) => {
        if (categories[index]['id'] === catId) {
          let selectedCategory = categories[index]['name'];
          let sublist = categories[index]['children'];

          // Get a sublist's default geo/freq if available
          if (categories[index]['defaults']) {
            this.defaultFreq = categories[index]['defaults']['freq'];
            this.defaultGeo  = categories[index]['defaults']['geo'];
          } else {
            this.defaultFreq = '';
            this.defaultGeo = '';
          }
          this.categoryData.selectedCategory = selectedCategory;
          this.categoryData.sublist = sublist;
          this.categoryData.seriesData = this.seriesData;

          this.getSubcategoryData(sublist, routeGeo, routeFreq);
        } else {
          return;
        }
      });
    });
    return Observable.forkJoin(Observable.of(this.categoryData));
  }

  getSubcategoryData(sublist: Array<any>, routeGeo: string, routeFreq: string) {
    let geoArray = [];
    let freqArray = [];
    let i = 0;
    sublist.forEach((sub, index) => {
      let dateWrapper = {firstDate: '', endDate: ''};
      // Get all regions available in a given category
      this._uheroAPIService.fetchSelectedCategory(sublist[index]['id']).subscribe((category) => {
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
        if (i === sublist.length) {
          sublist.forEach((sub, index) => {
            let selectedFreq = routeFreq? routeFreq : this.defaultFreq ? this.defaultFreq : freqArray[0].freq;
            let selectedGeo = routeGeo? routeGeo :  this.defaultGeo? this.defaultGeo : geoArray[0].handle;
            let freqs, regions, currentGeo, currentFreq;
            // Get frequencies available for a selected region
            geoArray.forEach((geo, index) => {
              if (selectedGeo === geoArray[index].handle) {
                freqs = geoArray[index].freqs;
              }
            });

            // Get regions available for a selected frequency
            freqArray.forEach((freq, index) => {
              if (selectedFreq === freqArray[index].freq) {
                regions = freqArray[index].geos;
              }
            });
            currentGeo = regions.find(region => region.handle === selectedGeo);
            currentFreq = freqs.find(freq => freq.freq === selectedFreq);
            this.categoryData.regions = regions;
            this.categoryData.frequencies = freqs;
            this.categoryData.currentGeo = currentGeo;
            this.categoryData.currentFreq = currentFreq;
            this.getSeriesData(sublist[index], geoArray, currentGeo, freqArray, currentFreq, dateWrapper, routeGeo, routeFreq);
          });
        }
      });
    });
  }

  // Get regions and frequencies available for a selected category
  getSeriesData(sublistIndex, regions: Array<any>, currentGeo: Geography, freqs: Array<any>, currentFreq: Frequency, dateWrapper: dateWrapper, routeGeo?: string, routeFreq?: string) {
    let dateArray = [];
    this._uheroAPIService.fetchSelectedCategory(sublistIndex['id']).subscribe((cat) => {
      this._helper.calculateDateArray(cat['observationStart'], cat['observationEnd'], currentFreq.freq, dateArray);
    },
    (error) => {
      error = this.errorMessage = error
    },
    // When date array is completed, call sublistData()
      () => {
        // Fetch data for current region/frequency settings
        this._uheroAPIService.fetchExpanded(sublistIndex['id'], currentGeo.handle, currentFreq.freq).subscribe((expanded) => {
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

  // Set up search results
  initSearch(search: string, routeGeo?: string, routeFreq?: string): Observable<any> {
    this.categoryData = {selectedCategory: '', sublist: [], regions: [], currentGeo: {}, frequencies: {}, currentFreq: {}, seriesData: []};
    // let sublist = [search];
    this.seriesData = [];
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
      this.searchSettings(search, dateWrapper, routeGeo, routeFreq);
      this.categoryData.selectedCategory = search;
      this.categoryData.seriesData = this.seriesData;
    });
    return Observable.forkJoin(Observable.of(this.categoryData));
  }

  searchSettings(search: string, dateWrapper: dateWrapper, routeGeo?: string, routeFreq?: string) {
    let dateArray = [];
    let geoArray = [];
    let freqArray = [];
    let selectedFreq = routeFreq? routeFreq : this.defaults.freq.freq;
    let selectedGeo = routeGeo? routeGeo : this.defaults.geo.handle;
    let freqs, regions, currentFreq, currentGeo;
    // Get frequencies available for a selected region
    this.geoFreqs.forEach((geo, index) => {
      if (selectedGeo === this.geoFreqs[index].handle) {
        freqs = this.geoFreqs[index].freqs;
      }
    });

    // Get regions available for a selected frequency
    this.freqGeos.forEach((freq, index) => {
      if (selectedFreq === this.freqGeos[index].freq) {
        regions = this.freqGeos[index].geos;
      }
    });

    if (selectedGeo) {
      currentGeo = regions.find(region => region.handle === selectedGeo);
    } else {
      currentGeo = regions[0];
    }

    if (selectedFreq) {
      currentFreq = freqs.find(freq => freq.freq === selectedFreq);
    } else {
      currentFreq = freqs[0];
    }
    this.categoryData.regions = regions;
    this.categoryData.currentGeo = currentGeo;
    this.categoryData.frequencies = freqs;
    this.categoryData.currentFreq = currentFreq;
    this.getSearchData(search, currentGeo.handle, currentFreq.freq, dateArray, dateWrapper);
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
      searchReults.forEach((search, index) => {
        if (dateWrapper.firstDate === '' || searchReults[index].seriesObservations.observationStart < dateWrapper.firstDate) {
          dateWrapper.firstDate = searchReults[index].seriesObservations.observationStart;
        }
        if (dateWrapper.endDate === '' || searchReults[index].seriesObservations.observationEnd > dateWrapper.endDate) {
          dateWrapper.endDate = searchReults[index].seriesObservations.observationEnd;
        }
      });
      this._helper.calculateDateArray(dateWrapper.firstDate, dateWrapper.endDate, freq, dateArray);
      if (searchReults) {
        let series = this._helper.dataTransform(searchReults, dateArray, dateWrapper);
        let sublist = {name: search, dateRange: dateArray};
        this.categoryData.sublist = [sublist];
        this.seriesData.push({dateWrapper: dateWrapper, sublist: sublist, series: series});
      };
    });
  }
}
