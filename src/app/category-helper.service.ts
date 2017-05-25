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
  private categoryData = [];
  private categoryDates = [];
  private seriesDates = [];
  private series = [];

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }

  // Called on page load
  // Gets data sublists available for a selected category
  initContent(catId: number, routeGeo?: string, routeFreq?: string): Observable<any> {
    if (this.categoryData[catId]) {
      return Observable.of([this.categoryData[catId + routeGeo + routeFreq]]);
    } else {
      this.categoryData[catId + routeGeo + routeFreq] = <CategoryData>{};
      this._uheroAPIService.fetchCategories().subscribe((categories) => {
        const cat = categories.find(category => category.id === catId);
        if (cat) {
          const selectedCategory = cat.name;
          const sublist = cat.children;
          this.defaultFreq = cat.defaults ? cat.defaults.freq : '';
          this.defaultGeo = cat.defaults ? cat.defaults.geo : '';
          this.categoryData[catId + routeGeo + routeFreq].selectedCategory = selectedCategory;
          this.categoryData[catId + routeGeo + routeFreq].sublist = sublist;
          this.getSubcategoryData(selectedCategory, catId, sublist, routeGeo, routeFreq);
        } else {
          this.categoryData[catId + routeGeo + routeFreq].invalid = 'Category does not exist.';
        }
      });
      return Observable.forkJoin(Observable.of(this.categoryData[catId + routeGeo + routeFreq]));
    }
  }

  getSubcategoryData(catName: string, catId: number, sublist: Array<any>, routeGeo?: string, routeFreq?: string) {
    const geoArray = [], freqArray = [];
    sublist.forEach((sub, index) => {
      // Get all regions available in a given category
      this._uheroAPIService.fetchSelectedCategory(sub.id).subscribe((category) => {
        let freqGeos, geoFreqs;
        freqGeos = category.freqGeos;
        geoFreqs = category.geoFreqs;
        geoFreqs.forEach((geo) => {
          this._helper.uniqueGeos(geo, geoArray);
        });
        freqGeos.forEach((freq) => {
          this._helper.uniqueFreqs(freq, freqArray);
        });
      },
        (error) => {
          error = this.errorMessage = error;
        },
        () => {
          if (index === sublist.length - 1) {
            sublist.forEach((subcat) => {
              const dateWrapper = <DateWrapper>{};
              let selectedFreq, selectedGeo;
              selectedFreq = this.defaultFreq ? this.defaultFreq : freqArray[0].freq;
              selectedGeo = this.defaultGeo ? this.defaultGeo : geoArray[0].handle;
              if (routeFreq || routeGeo) {
                const selected = this.checkSelectedGeosFreqs(routeFreq, routeGeo, freqArray, geoArray);
                selectedFreq = selected.freq;
                selectedGeo = selected.geo;
              }
              let freqs, regions, currentGeo, currentFreq;
              // Get frequencies available for a selected region
              freqs = geoArray.find(geo => geo.handle === selectedGeo).freqs;
              regions = freqArray.find(freq => freq.freq === selectedFreq).geos;
              currentGeo = regions.find(region => region.handle === selectedGeo);
              currentFreq = freqs.find(freq => freq.freq === selectedFreq);
              this.categoryData[catId + routeGeo + routeFreq].regions = regions;
              this.categoryData[catId + routeGeo + routeFreq].frequencies = freqs;
              this.categoryData[catId + routeGeo + routeFreq].currentGeo = currentGeo;
              this.categoryData[catId + routeGeo + routeFreq].currentFreq = currentFreq;
              subcat.parentName = catName;
              this.getSeriesData(subcat, currentGeo, currentFreq, dateWrapper);
            });
          }
        });
    });
  }

  // Get regions and frequencies available for a selected category
  getSeriesData(sublist, currentGeo: Geography, currentFreq: Frequency, dateWrapper: DateWrapper) {
    const saDateArray = [], nsaDateArray = [];
    let expandedResults;
    this._uheroAPIService.fetchExpanded(sublist['id'], currentGeo.handle, currentFreq.freq).subscribe((expanded) => {
      expandedResults = expanded;
    },
      (error) => {
        console.log('error', error);
        error = this.errorMessage = error;
      },
      () => {
        if (expandedResults) {
          // Get array of all series that have level data available
          // Filter out series from expandedResults with non-seasonally-adjusted data
          const splitSeries = this.getDisplaySeries(expandedResults, dateWrapper, currentFreq.freq);
          // sublist id used as anchor fragments in landing-page component, fragment expects a string
          sublist.id = sublist.id.toString();
          sublist.dateRange = splitSeries.tableDates;
          sublist.displaySeries = splitSeries.displaySeries;
          // sublist.allSeries = expandedResults;
          sublist.hasSeaonsallyAdjusted = splitSeries.hasSeasonallyAdjusted;
          sublist.dateWrapper = splitSeries.dateWrapper;
          sublist.noData = false;
          console.log(sublist);
        } else {
          // No series exist for a subcateogry
          const series = [{ seriesInfo: 'No data available' }];
          sublist.dateWrapper = <DateWrapper>{};
          sublist.dateRange = [];
          sublist.datatables = {};
          sublist.displaySeries = series;
          sublist.noData = true;
        }
      });
  }

  // Set up search results
  initSearch(search: string, routeGeo?: string, routeFreq?: string): Observable<any> {
    if (this.categoryData[search + routeGeo + routeFreq]) {
      return Observable.of([this.categoryData[search + routeGeo + routeFreq]]);
    } else {
      let obsEnd, obsStart, freqGeos, geoFreqs;
      this.categoryData[search + routeGeo + routeFreq] = <CategoryData>{};
      this._uheroAPIService.fetchSearch(search).subscribe((results) => {
        this.defaults = results.defaults;
        freqGeos = results.freqGeos;
        geoFreqs = results.geoFreqs;
        obsEnd = results.observationEnd;
        obsStart = results.observationStart;
      },
        (error) => {
          error = this.errorMessage = error;
        },
        () => {
          if (obsEnd && obsStart) {
            const dateWrapper = <DateWrapper>{};
            this.searchSettings(search, dateWrapper, geoFreqs, freqGeos, routeGeo, routeFreq);
            this.categoryData[search + routeGeo + routeFreq].selectedCategory = 'Search: ' + search;
          } else {
            this.categoryData[search + routeGeo + routeFreq].invalid = search;
          }
        });
      return Observable.forkJoin(Observable.of(this.categoryData[search + routeGeo + routeFreq]));
    }
  }

  searchSettings(search: string, dateWrapper: DateWrapper, geoFreqs, freqGeos, routeGeo?: string, routeFreq?: string) {
    const dateArray = [];
    let selectedFreq, selectedGeo;
    selectedFreq = this.defaultFreq ? this.defaultFreq : freqGeos[0].freq;
    selectedGeo = this.defaultGeo ? this.defaultGeo : geoFreqs[0].handle;
    if (routeFreq || routeGeo) {
      const selected = this.checkSelectedGeosFreqs(routeFreq, routeGeo, freqGeos, geoFreqs);
      selectedFreq = selected.freq;
      selectedGeo = selected.geo;
    }
    let freqs, regions, currentFreq, currentGeo;
    freqs = geoFreqs.find(geo => geo.handle === selectedGeo).freqs;
    regions = freqGeos.find(freq => freq.freq === selectedFreq).geos;
    currentGeo = selectedGeo ? regions.find(region => region.handle === selectedGeo) : regions[0];
    currentFreq = selectedFreq ? freqs.find(freq => freq.freq === selectedFreq) : freqs[0];
    this.categoryData[search + routeGeo + routeFreq].regions = regions;
    this.categoryData[search + routeGeo + routeFreq].currentGeo = currentGeo;
    this.categoryData[search + routeGeo + routeFreq].frequencies = freqs;
    this.categoryData[search + routeGeo + routeFreq].currentFreq = currentFreq;
    this.getSearchData(search, currentGeo.handle, currentFreq.freq, dateWrapper, routeGeo, routeFreq);
  }

  getSearchData(search: string, geo: string, freq: string, dateWrapper: DateWrapper, routeGeo?: string, routeFreq?: string) {
    let searchResults;
    // Get expanded search results for a selected region & frequency
    this._uheroAPIService.fetchSearchSeriesExpand(search, geo, freq).subscribe((searchRes) => {
      searchResults = searchRes;
    },
      (error) => {
        error = this.errorMessage = error;
      },
      () => {
        if (searchResults) {
          // Get array of all series that have level data available
          const searchSeries = this.filterSeriesResults(searchResults, freq);
          const splitSeries = this.getDisplaySeries(searchSeries, dateWrapper, freq);
          const sublist = {
            id: 'search',
            parentName: 'Search',
            name: search,
            dateWrapper: splitSeries.dateWrapper,
            dateRange: splitSeries.tableDates,
            hasSeaonsallyAdjusted: splitSeries.hasSeasonallyAdjusted,
            displaySeries: splitSeries.displaySeries
          };
          this.categoryData[search + routeGeo + routeFreq].sublist = [sublist];
        };
      });
  }

  checkSelectedGeosFreqs(routeFreq, routeGeo, freqArray, geoArray) {
    // Check if freq/geo specified in route exists in a category's list of freqs/geos
    const freqExist = freqArray.find(freq => freq.freq === routeFreq);
    const geoExist = geoArray.find(geo => geo.handle === routeGeo);
    // If either does not exist, set selected freq & geo to the category's default
    // or first element of freq/geo arrays if default is not specified
    if (!freqExist || !geoExist) {
      return { freq: this.defaultFreq ? this.defaultFreq : freqArray[0].freq, geo: this.defaultGeo ? this.defaultGeo : geoArray[0].handle };
    } else {
      return { freq: routeFreq, geo: routeGeo };
    }
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
        seriesDates = this._helper.calculateDateArray(seriesObsStart, seriesObsEnd, freq, seriesDates);
        series = this._helper.dataTransform(res.seriesObservations, seriesDates, decimals);
        series.seriesInfo = res;
        series.seriesInfo.saParam = res.seasonalAdjustment === 'seasonally_adjusted' ? true : false;
        filtered.push(series);
      }
    });
    return filtered;
  }

  // Check if series in a given category has seasonally adjusted data
  checkSA(seriesArray) {
    const saSeries = seriesArray.find(series => series.seasonalAdjustment === 'seasonally_adjusted');
    return saSeries ? true : false;
  }

  getDisplaySeries(allSeries, dateWrapper: DateWrapper, freq: string) {
    const dateArray = [];
    // Check if category series has seasonally adjusted data
    const hasSeasonallyAdjusted = this.checkSA(allSeries);
    const displaySeries = [];
    allSeries.forEach((series) => {
      if (series.seasonalAdjustment !== 'not_seasonally_adjusted' || hasSeasonallyAdjusted === false) {
        // only include series with seasonal adjustment or where seasonality is not applicable
        displaySeries.push(series);
      }
    });
    this._helper.setDateWrapper(displaySeries, dateWrapper);
    this._helper.calculateDateArray(dateWrapper.firstDate, dateWrapper.endDate, freq, dateArray);
    const filtered = this.filterSeriesResults(displaySeries, freq);
    const tableDates = this.formatCatTableData(filtered, dateArray, dateWrapper);

    return {
      displaySeries: filtered,
      dateWrapper: dateWrapper,
      tableDates: tableDates,
      hasSeasonallyAdjusted: hasSeasonallyAdjusted
    };
  }

  formatCatTableData(displaySeries: Array<any>, dateArray: Array<any>, dateWrapper: DateWrapper) {
    displaySeries.forEach((series) => {
      const decimals = series.decimals ? series.decimals : 1;
      series['categoryTable'] = this._helper.catTable(series.tableData, dateArray, dateWrapper, decimals);
      series['categoryChart'] = this._helper.dataTransform(series.seriesInfo.seriesObservations, dateArray, decimals);
    });
    const tableHeaderDates = [];
    const dateStart = dateWrapper.firstDate;
    const dateEnd = dateWrapper.endDate;
    dateArray.forEach((date) => {
      tableHeaderDates.push(date.tableDate);
    });
    return tableHeaderDates;
  }
}
