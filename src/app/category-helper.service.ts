// Set up data used in category chart and table displays
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UheroApiService } from './uhero-api.service';
import { HelperService } from './helper.service';
import { CategoryData } from './category-data';
import { Frequency } from './frequency';
import { Geography } from './geography';
import { DateWrapper } from './date-wrapper';
import { DisplaySeries } from './display-series';

@Injectable()
export class CategoryHelperService {
  private errorMessage: string;
  // Variables for geo and freq selectors
  private defaults;
  private defaultFreq: string;
  private defaultGeo: string;
  private categoryData = {};
  private categoryDates = [];
  private seriesDates = [];
  private series = [];

  static setCacheId(category, routeGeo, routeFreq) {
    let id = '' + category;
    if (routeGeo) {
      id = id + routeGeo;
    }
    if (routeFreq) {
      id = id + routeFreq;
    }
    return id;
  }

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }

  // Called on page load
  // Gets data sublists available for a selected category
  initContent(catId: any, routeGeo?: string, routeFreq?: string): Observable<any> {
    const cacheId = CategoryHelperService.setCacheId(catId, routeGeo, routeFreq);
    if (this.categoryData[cacheId]) {
      return Observable.of([this.categoryData[cacheId]]);
    } else {
      this.categoryData[cacheId] = <CategoryData>{};
      this._uheroAPIService.fetchCategories().subscribe((categories) => {
        if (catId === null) {
          catId = categories[0].id;
        }
        const cat = categories.find(category => category.id === catId);
        if (cat) {
          const selectedCategory = cat.name;
          const sublist = cat.children;
          this.defaultFreq = cat.defaults ? cat.defaults.freq : '';
          this.defaultGeo = cat.defaults ? cat.defaults.geo : '';
          this.categoryData[cacheId].selectedCategory = selectedCategory;
          const sublistCopy = [];
          sublist.forEach((sub) => {
            sublistCopy.push(Object.assign({}, sub));
          });
          this.categoryData[cacheId].sublist = sublistCopy;
          this.getSubcategoryData(selectedCategory, cacheId, catId, this.categoryData[cacheId].sublist, routeGeo, routeFreq);
        } else {
          this.categoryData[cacheId].invalid = 'Category does not exist.';
        }
      });
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
  }

  getSubcategoryData(catName: string, cacheId, catId: number, sublist: Array<any>, routeGeo?: string, routeFreq?: string) {
    let count = sublist.length;
    sublist.forEach((sub, index) => {
      const freqGeosCopy = [], geoFreqsCopy = [];
      // Get all regions available in a given category
      this._uheroAPIService.fetchSelectedCategory(sub.id).subscribe((category) => {
        sub.freqGeos = category.freqGeos;
        sub.geoFreqs = category.geoFreqs;
      },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          count--;
          if (count === 0) {
            this.setRegionsFreqs(sublist, cacheId, catName, routeGeo, routeFreq);
          }
        });
    });
  }

  setRegionsFreqs(sublist: Array<any>, cacheId: string, catName: string, routeGeo?: string, routeFreq?: string) {
    const geoArray = [], freqArray = [];
    // Get a unique list of regions and frequencies
    sublist.forEach((sub, index) => {
      sub.geoFreqs.forEach((geo) => {
        this._helper.uniqueGeos(geo, geoArray);
      });
      sub.freqGeos.forEach((freq) => {
        this._helper.uniqueFreqs(freq, freqArray);
      });
    });
    const selected = this.checkSelectedGeosFreqs(routeFreq, routeGeo, freqArray, geoArray);
    const selectedFreq = selected.freq;
    const selectedGeo = selected.geo;
    let freqs, regions, currentGeo, currentFreq;
    // Get frequencies available for a selected region
    freqs = geoArray.find(geo => geo.handle === selectedGeo).freqs;
    // Get regions available for a selected frequency
    regions = freqArray.find(freq => freq.freq === selectedFreq).geos;
    currentGeo = regions.find(region => region.handle === selectedGeo);
    currentFreq = freqs.find(freq => freq.freq === selectedFreq);
    const dates = this.setCategoryDates(sublist, currentGeo, currentFreq);
    this.categoryData[cacheId].regions = regions;
    this.categoryData[cacheId].frequencies = freqs;
    this.categoryData[cacheId].currentGeo = currentGeo;
    this.categoryData[cacheId].currentFreq = currentFreq;
    this.categoryData[cacheId].categoryDateWrapper = dates.categoryDateWrapper;
    this.categoryData[cacheId].categoryDates = dates.categoryDates;
    this.categoryData[cacheId].sliderDates = this._helper.getTableDates(dates.categoryDates);

    sublist.forEach((sub, index) => {
      sub.parentName = catName;
      const subcategory = {
        subcat: sub,
        cacheId: cacheId,
        currentGeo: currentGeo,
        currentFreq: currentFreq,
      };
      // Get seires belonging to each subcategory
      this.getSeriesData(subcategory);
    });
  }

  setCategoryDates(sublist, currentGeo, currentFreq) {
    const categoryDateWrapper = { firstDate: '', endDate: '' };
    const categoryDateArray = [];
    // Check subcategories for the earliest/latest start and end dates
    // Used to create array of dates for enitre category
    sublist.forEach((sub) => {
      const geo = sub.geoFreqs.find(geoFreq => geoFreq.handle === currentGeo.handle);
      const freq = geo ? geo.freqs.find(f => f.freq === currentFreq.freq) : null;
      if (freq) {
        if (freq.observationStart < categoryDateWrapper.firstDate || categoryDateWrapper.firstDate === '') {
          categoryDateWrapper.firstDate = freq.observationStart.substr(0, 10);
        }
        if (freq.observationEnd > categoryDateWrapper.endDate || categoryDateWrapper.endDate === '') {
          categoryDateWrapper.endDate = freq.observationEnd.substr(0, 10);
        }
      }
    });
    this._helper.createDateArray(categoryDateWrapper.firstDate, categoryDateWrapper.endDate, currentFreq.freq, categoryDateArray);
    return { categoryDateWrapper: categoryDateWrapper, categoryDates: categoryDateArray };
  }

  // Get regions and frequencies available for a selected category
  getSeriesData(subcategory) {
    const subcat = subcategory.subcat;
    const cacheId = subcategory.cacheId;
    const currentGeo = subcategory.currentGeo;
    const currentFreq = subcategory.currentFreq;
    let expandedResults;
    this._uheroAPIService.fetchExpanded(subcat['id'], currentGeo.handle, currentFreq.freq).subscribe((expanded) => {
      expandedResults = expanded;
    },
      (error) => {
        console.log('error', error);
        error = this.errorMessage = error;
      },
      () => {
        // sublist id used as anchor fragments in landing-page component, fragment expects a string
        subcat.id = subcat.id.toString();
        if (expandedResults) {
          // Get array of all series that have level data available
          // Filter out series from expandedResults with non-seasonally-adjusted data
          const splitSeries = this.getDisplaySeries(expandedResults, currentFreq.freq);
          if (splitSeries) {
            subcat.displaySeries = splitSeries.displaySeries;
            // sublist.allSeries = expandedResults;
            this.formatCategoryData(splitSeries.displaySeries, this.categoryData[cacheId].categoryDates, this.categoryData[cacheId].categoryDateWrapper);
            subcat.requestComplete = true;
            subcat.noData = false;
          }
          if (!splitSeries) {
            // No series exist for a subcateogry
            this.setNoData(subcat);
          }
        } else {
          // No series exist for a subcateogry
          this.setNoData(subcat);
        }
      });
  }

  setNoData(subcategory) {
    const series = [{ seriesInfo: 'No data available' }];
    subcategory.dateWrapper = <DateWrapper>{};
    subcategory.dateRange = [];
    subcategory.datatables = {};
    subcategory.displaySeries = series;
    subcategory.noData = true;
    subcategory.requestComplete = true;
  }

  // Set up search results
  initSearch(search: string, routeGeo?: string, routeFreq?: string): Observable<any> {
    const cacheId = CategoryHelperService.setCacheId(search, routeGeo, routeFreq);
    if (this.categoryData[cacheId]) {
      return Observable.of([this.categoryData[cacheId]]);
    } else {
      let obsEnd, obsStart, freqGeos, geoFreqs;
      this.categoryData[cacheId] = <CategoryData>{};
      this._uheroAPIService.fetchSearch(search).subscribe((results) => {
        this.defaults = results.defaults;
        freqGeos = results.freqGeos;
        geoFreqs = results.geoFreqs;
        obsEnd = results.observationEnd;
        obsStart = results.observationStart;
      },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          if (obsEnd && obsStart) {
            const dateWrapper = <DateWrapper>{};
            this.searchSettings(search, cacheId, dateWrapper, geoFreqs, freqGeos, routeGeo, routeFreq);
            this.categoryData[cacheId].selectedCategory = 'Search: ' + search;
          } else {
            this.categoryData[cacheId].invalid = search;
          }
        });
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
  }

  searchSettings(search: string, cacheId, dateWrapper: DateWrapper, geoFreqs, freqGeos, routeGeo?: string, routeFreq?: string) {
    const selected = this.checkSelectedGeosFreqs(routeFreq, routeGeo, freqGeos, geoFreqs);
    let selectedGeo = selected.geo;
    let selectedFreq = selected.freq;
    let freqs, regions, currentFreq, currentGeo;
    freqs = geoFreqs.find(geo => geo.handle === selectedGeo).freqs;
    const selectedFreqExists = freqs.find(freq => freq.freq === selectedFreq);
    // Check if the selected frequency exists in the list of freqs for a selected geo
    selectedFreq = selectedFreqExists ? selectedFreq : freqs[0].freq;
    regions = freqGeos.find(freq => freq.freq === selectedFreq).geos;
    const selectedGeoExists = regions.find(region => region.handle === selectedGeo);
    // Check if the selected geo exists in the list of regions for a selected frequency
    selectedGeo = selectedGeoExists ? selectedGeo : regions[0].handle;
    currentGeo = regions.find(region => region.handle === selectedGeo);
    currentFreq = freqs.find(freq => freq.freq === selectedFreq);
    this.categoryData[cacheId].regions = regions;
    this.categoryData[cacheId].currentGeo = currentGeo;
    this.categoryData[cacheId].frequencies = freqs;
    this.categoryData[cacheId].currentFreq = currentFreq;
    this.getSearchData(search, cacheId, currentGeo.handle, currentFreq.freq, dateWrapper, routeGeo, routeFreq);
  }

  getSearchData(search: string, cacheId, geo: string, freq: string, dateWrapper: DateWrapper, routeGeo?: string, routeFreq?: string) {
    let searchResults;
    const categoryDateWrapper = { firstDate: '', endDate: '' };
    // Get expanded search results for a selected region & frequency
    this._uheroAPIService.fetchSearchSeriesExpand(search, geo, freq).subscribe((searchRes) => {
      searchResults = searchRes;
    },
      (error) => {
        this.errorMessage = error;
      },
      () => {
        if (searchResults) {
          // Get array of all series that have level data available
          const splitSeries = this.getDisplaySeries(searchResults, freq);
          const sublist = {
            id: 'search',
            parentName: 'Search',
            name: search,
            displaySeries: splitSeries.displaySeries,
            requestComplete: false
          };
          const catWrapper = this.getSearchDates(splitSeries.displaySeries);
          const categoryDateArray = [];
          this._helper.createDateArray(catWrapper.firstDate, catWrapper.endDate, freq, categoryDateArray);
          this.formatCategoryData(splitSeries.displaySeries, categoryDateArray, catWrapper);
          this.categoryData[cacheId].sublist = [sublist];
          this.categoryData[cacheId].categoryDateWrapper = categoryDateWrapper;
          this.categoryData[cacheId].categoryDates = categoryDateArray;
          this.categoryData[cacheId].sliderDates = this._helper.getTableDates(categoryDateArray);
          this.categoryData[cacheId].requestComplete = true;
          sublist.requestComplete = true;
        }
      });
  }

  getSearchDates(displaySeries) {
    const categoryDateWrapper = { firstDate: '', endDate: '' };
    displaySeries.forEach((series) => {
      if (series.start < categoryDateWrapper.firstDate || categoryDateWrapper.firstDate === '') {
        categoryDateWrapper.firstDate = series.start;
      }
      if (series.end > categoryDateWrapper.endDate || categoryDateWrapper.endDate === '') {
        categoryDateWrapper.endDate = series.end;
      }
    });
    return categoryDateWrapper;
  }

  checkSelectedGeosFreqs(routeFreq, routeGeo, freqArray, geoArray) {
    let selectedFreq, selectedGeo;
    selectedFreq = this.defaultFreq ? this.defaultFreq : freqArray[0].freq;
    selectedGeo = this.defaultGeo ? this.defaultGeo : geoArray[0].handle;
    // If a frequency/region is specified in the route, check if the frequency/region exists in a category
    // If not display default freq/region for a given category
    if (routeFreq || routeGeo) {
      const freqExist = freqArray.find(freq => freq.freq === routeFreq);
      const geoExist = geoArray.find(geo => geo.handle === routeGeo);
      if (!freqExist || !geoExist) {
        return { freq: this.defaultFreq ? this.defaultFreq : freqArray[0].freq, geo: this.defaultGeo ? this.defaultGeo : geoArray[0].handle };
      }
      return { freq: routeFreq, geo: routeGeo };
    }
    return { freq: selectedFreq, geo: selectedGeo };
  }

  filterSeriesResults(results: Array<any>, freq: string) {
    const filtered = [];
    results.forEach((res) => {
      let seriesDates = [], series;
      const seriesObsStart = res.seriesObservations.observationStart;
      const seriesObsEnd = res.seriesObservations.observationEnd;
      const levelData = res.seriesObservations.transformationResults[0].observations;
      const decimals = res.decimals ? res.decimals : 1;
      // Add series if level data is available
      if (levelData) {
        seriesDates = this._helper.createDateArray(seriesObsStart, seriesObsEnd, freq, seriesDates);
        series = this._helper.dataTransform(res.seriesObservations, seriesDates, decimals);
        res.saParam = res.seasonalAdjustment !== 'not_seasonally_adjusted';
        series.seriesInfo = res;
        filtered.push(series);
      }
    });
    return filtered;
  }

  getDisplaySeries(allSeries, freq: string) {
    // Check if (non-annual) category has seasonally adjusted data
    // Returns true for annual data
    const displaySeries = [];
    const measurements = new Map();
    allSeries.forEach((series) => {
      if (!series.hasOwnProperty('measurementId')) {
        displaySeries.push(series);
        return;
      }
      const measurementKey = `m${series.measurementId}`;
      if (!measurements.has(measurementKey)) {
        measurements.set(measurementKey, series);
        return;
      }
      if (series.seasonalAdjustment !== 'not_seasonally_adjusted') {
        measurements.set(measurementKey, series);
      }
    });
    measurements.forEach((measurement) => displaySeries.push(measurement));
    // Filter out series that do not have level data
    const filtered = this.filterSeriesResults(displaySeries, freq);
    return filtered.length ? { displaySeries: filtered } : null;
  }

  formatCategoryData(displaySeries: Array<any>, dateArray: Array<any>, dateWrapper: DateWrapper) {
    displaySeries.forEach((series) => {
      if (series.seriesInfo !== 'No data available') {
        const decimals = series.decimals ? series.decimals : 1;
        series['categoryTable'] = this._helper.catTable(series.tableData, dateArray, decimals);
        series['categoryChart'] = this._helper.dataTransform(series.seriesInfo.seriesObservations, dateArray, decimals);
      }
    });
  }
}
