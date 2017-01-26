// Set up data used in category chart and table displays
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
  private seriesData = [];
  // Variables for geo and freq selectors
  private defaults;
  private geoFreqs;
  private freqGeos;
  private defaultFreq: string;
  private defaultGeo: string;
  private categoryData;

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }

  // Called on page load
  // Gets data sublists available for a selected category
  initContent(catId: number, routeGeo?: string, routeFreq?: string): Observable<any> {
    this.categoryData = {selectedCategory: '', sublist: [], regions: [], currentGeo: {}, frequencies: [], currentFreq: {}, seriesData: [], invalid: ''};
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;
      this.seriesData = [];
      let cat = categories.find(cat => cat.id === catId);
      if (cat) {
        let selectedCategory = cat.name;
        let sublist = cat.children;
        if (cat.defaults) {
          this.defaultFreq = cat.defaults['freq'];
          this.defaultGeo = cat.defaults['geo'];
        } else {
          this.defaultFreq = '';
          this.defaultGeo = '';
        }
        this.categoryData.selectedCategory = selectedCategory;
        this.categoryData.sublist = sublist;
        this.categoryData.seriesData = this.seriesData;
        this.getSubcategoryData(sublist, routeGeo, routeFreq);
      } else {
        this.categoryData.invalid = 'Category does not exist.';
      }
    });
    return Observable.forkJoin(Observable.of(this.categoryData));
  }

  getSubcategoryData(sublist: Array<any>, routeGeo: string, routeFreq: string) {
    let geoArray = [];
    let freqArray = [];
    let i = 0;
    sublist.forEach((sub, index) => {
      // Get all regions available in a given category
      this._uheroAPIService.fetchSelectedCategory(sublist[index]['id']).subscribe((category) => {
        let catInfo = category;
        this.freqGeos = catInfo.freq_geos;
        this.geoFreqs = catInfo.geo_freqs;
        this.geoFreqs.forEach((geo, indx) => {
          this._helper.uniqueGeos(this.geoFreqs[indx], geoArray);
        });
        this.freqGeos.forEach((freq, indx) => {
          this._helper.uniqueFreqs(this.freqGeos[indx], freqArray);
        });
        i += 1;
      },
      (error) => {
        error = this.errorMessage = error;
      },
      () => {
        if (i === sublist.length) {
          sublist.forEach((subcat, indx) => {
            let dateWrapper = {firstDate: '', endDate: ''};
            let selectedFreq = routeFreq ? routeFreq : this.defaultFreq ? this.defaultFreq : freqArray[0].freq;
            let selectedGeo = routeGeo ? routeGeo :  this.defaultGeo ? this.defaultGeo : geoArray[0].handle;
            let freqs, regions, currentGeo, currentFreq;
            // Get frequencies available for a selected region
            geoArray.forEach((geo, ind) => {
              if (selectedGeo === geoArray[ind].handle) {
                freqs = geoArray[ind].freqs;
              }
            });

            // Get regions available for a selected frequency
            freqArray.forEach((freq, ind) => {
              if (selectedFreq === freqArray[ind].freq) {
                regions = freqArray[ind].geos;
              }
            });
            currentGeo = regions.find(region => region.handle === selectedGeo);
            currentFreq = freqs.find(freq => freq.freq === selectedFreq);
            this.categoryData.regions = regions;
            this.categoryData.frequencies = freqs;
            this.categoryData.currentGeo = currentGeo;
            this.categoryData.currentFreq = currentFreq;
            this.getSeriesData(sublist[indx], geoArray, currentGeo, freqArray, currentFreq, dateWrapper, routeGeo, routeFreq);
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
      error = this.errorMessage = error;
    },
    // When date array is completed, call sublistData()
      () => {
        // Fetch data for current region/frequency settings
        let expandedResults;
        this._uheroAPIService.fetchExpanded(sublistIndex['id'], currentGeo.handle, currentFreq.freq).subscribe((expanded) => {
          expandedResults = expanded;
        },
        (error) => {
          error = this.errorMessage = error;
        },
        () => {
          if (expandedResults) {
            let categorySeries = [];
            expandedResults.forEach((result, index) => {
              let series = this._helper.dataTransform(expandedResults[index].seriesObservations);
              // Only add series that have data
              if (series) {
                let sa = expandedResults[index].seasonallyAdjusted;
                let freq = expandedResults[index].frequencyShort;
                series['seriesInfo'] = expandedResults[index];
                series['categoryTable'] = this._helper.catTable(series.tableData, dateArray, dateWrapper, sa, freq);
                categorySeries.push(series);
              }
            });
            let hasSeasonallyAdjusted;
            let falseCount = 0;
            categorySeries.forEach((serie, index) => {
              if (categorySeries[index].seriesInfo.seasonallyAdjusted === false) {
                hasSeasonallyAdjusted = false;
                falseCount += 1;
              }
            });
            if (falseCount === categorySeries.length) {
              hasSeasonallyAdjusted = false;
            } else {
              hasSeasonallyAdjusted = true;
            }
            sublistIndex.dateRange = dateArray;
            this.seriesData.push({dateWrapper: dateWrapper, sublist: sublistIndex, series: categorySeries, seasonallyAdjusted: hasSeasonallyAdjusted});
          } else {
            // No series exist for a subcateogry
            let series = [{seriesInfo: 'No data available'}];
            this.seriesData.push({sublist: sublistIndex, series: series});
          }
        });
    });
  }

  // Set up search results
  initSearch(search: string, routeGeo?: string, routeFreq?: string): Observable<any> {
    let obsEnd, obsStart;
    this.categoryData = {selectedCategory: '', sublist: [], regions: [], currentGeo: {}, frequencies: {}, currentFreq: {}, seriesData: [], invalid: ''};
    this.seriesData = [];
    this._uheroAPIService.fetchSearchFilters(search).subscribe((filters) => {
      let searchFilters = filters;
      this.defaults = searchFilters.defaults;
      this.freqGeos = searchFilters.freq_geos;
      this.geoFreqs = searchFilters.geo_freqs;
      obsEnd = searchFilters.observationEnd;
      obsStart = searchFilters.observationStart;
    },
    (error) => {
      error = this.errorMessage = error;
    },
    () => {
      if (obsEnd && obsStart) {
        let dateWrapper = {firstDate: '', endDate: ''};
        this.searchSettings(search, dateWrapper, routeGeo, routeFreq);
        this.categoryData.selectedCategory = 'Search: ' + search;
        this.categoryData.seriesData = this.seriesData;
      } else {
        this.categoryData.invalid = search;
      }
    });
    return Observable.forkJoin(Observable.of(this.categoryData));
  }

  searchSettings(search: string, dateWrapper: dateWrapper, routeGeo?: string, routeFreq?: string) {
    let dateArray = [];
    let selectedFreq = routeFreq ? routeFreq : this.defaults.freq.freq;
    let selectedGeo = routeGeo ? routeGeo : this.defaults.geo.handle;
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
    let searchResults;
    // Get expanded search results for a selected region & frequency
    this._uheroAPIService.fetchSearchSeriesExpand(search, geo, freq).subscribe((searchRes) => {
      searchResults = searchRes;
    },
    (error) => {
      error = this.errorMessage = error;
    },
    () => {
      searchResults.forEach((searchRes, index) => {
        // Set datewrapper first and end date based on seasonally adjusted series only for non-annual/non-semiannual frequencies
        let seasonalFreq = true;
        let freq = searchResults[index].frequencyShort;
        let sa = searchResults[index].seasonallyAdjusted
        if ((freq !== 'A' && !sa) && (freq !== 'S' && !sa)) {
          seasonalFreq = false;
        }
        if (dateWrapper.firstDate === '' || seasonalFreq && searchResults[index].seriesObservations.observationStart < dateWrapper.firstDate) {
          dateWrapper.firstDate = searchResults[index].seriesObservations.observationStart;
        }
        if (dateWrapper.endDate === '' || seasonalFreq && searchResults[index].seriesObservations.observationEnd > dateWrapper.endDate) {
          dateWrapper.endDate = searchResults[index].seriesObservations.observationEnd;
        }
      }); 
      this._helper.calculateDateArray(dateWrapper.firstDate, dateWrapper.endDate, freq, dateArray);
      if (searchResults) {
        // let series = this._helper.dataTransform(searchResults, dateArray, dateWrapper);
        let searchSeries = [];
        searchResults.forEach((res, index) => {
          let series = this._helper.dataTransform(searchResults[index].seriesObservations);
          // Only add series that have data
          if (series) {
            let sa = searchResults[index].seasonallyAdjusted;
            let freq = searchResults[index].frequencyShort;
            series['seriesInfo'] = searchResults[index];
            series['categoryTable'] = this._helper.catTable(series.tableData, dateArray, dateWrapper, sa, freq);
            searchSeries.push(series);
          }
        });
        // Check if a subcateogry has seasonally adjusted series
        let hasSeasonallyAdjusted;
        let falseCount = 0;
        searchSeries.forEach((serie, index) => {
          if (searchSeries[index].seriesInfo.seasonallyAdjusted === false) {
            hasSeasonallyAdjusted = false;
            falseCount += 1;
          }
        });
        if (falseCount === searchSeries.length) {
          hasSeasonallyAdjusted = false;
        } else {
          hasSeasonallyAdjusted = true;
        }

        let sublist = {name: search, dateRange: dateArray};
        this.categoryData.sublist = [sublist];
        this.seriesData.push({dateWrapper: dateWrapper, sublist: sublist, series: searchSeries, seasonallyAdjusted: hasSeasonallyAdjusted});
      };
    });
  }
}
