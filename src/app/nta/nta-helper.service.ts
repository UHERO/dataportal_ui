// Set up data used in category chart and table displays
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';
import { CategoryData } from '../category-data';
import { Frequency } from '../frequency';
import { Geography } from '../geography';
import { DateWrapper } from '../date-wrapper';
import { DisplaySeries } from '../display-series';

@Injectable()
export class NtaHelperService {
  private errorMessage: string;
  // Variables for geo and freq selectors
  private defaults;
  private requestsRemain;
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
  initContent(catId: number, routeGeo?: string, routeFreq?: string): Observable<any> {
    const cacheId = NtaHelperService.setCacheId(catId, routeGeo, routeFreq);
    if (this.categoryData[cacheId]) {
      return Observable.of([this.categoryData[cacheId]]);
    } else {
      this.categoryData[cacheId] = <CategoryData>{};
      this._uheroAPIService.fetchCategories().subscribe((categories) => {
        const cat = categories.find(category => category.id === catId);
        if (cat) {
          const selectedCategory = cat.name;
          const sublist = cat.children;
          this.defaultFreq = cat.defaults ? cat.defaults.freq : '';
          this.defaultGeo = cat.defaults ? cat.defaults.geo : '';
          this.categoryData[cacheId].selectedCategory = selectedCategory;
          this.categoryData[cacheId].measurements = [];
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
    const geoArray = [], freqArray = [];
    const categoryDateWrapper = { firstDate: '', endDate: '' };
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
          this.errorMessage = error;
        },
        () => {
          this.requestsRemain = sublist.length;
          if (index === sublist.length - 1) {
            sublist.forEach((subcat, i) => {
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
              this.categoryData[cacheId].regions = regions;
              this.categoryData[cacheId].frequencies = freqs;
              this.categoryData[cacheId].currentGeo = currentGeo;
              this.categoryData[cacheId].currentFreq = currentFreq;
              subcat.parentName = catName;
              const subcategory = {
                subcat: subcat,
                cacheId: cacheId,
                currentGeo: currentGeo,
                currentFreq: currentFreq,
                dateWrapper: dateWrapper,
                categoryDateWrapper: categoryDateWrapper
              };
              this.getMeasurementData(subcategory, this.categoryData[cacheId]);
              console.log('category', this.categoryData[cacheId])
            });
          }
        });
    });
  }

  // Get regions and frequencies available for a selected category
  getMeasurementData(subcategory, category) {
    const subcat = subcategory.subcat;
    const cacheId = subcategory.cacheId;
    const currentGeo = subcategory.currentGeo;
    const currentFreq = subcategory.currentFreq;
    const dateWrapper = subcategory.dateWrapper;
    const categoryDateWrapper = subcategory.categoryDateWrapper;
    this._uheroAPIService.fetchCategoryMeasurements(subcat.id).subscribe((measurements) => {
      measurements.forEach((measurement) => {
        this.categoryData[cacheId].measurements.push(measurement);
      });
    },
      (error) => {
        this.errorMessage = error;
      },
      () => {
        this.requestsRemain -= 1;
        if (this.requestsRemain === 0) {
          this.categoryData[cacheId].measurements.forEach((measurement, i) => {
            this._uheroAPIService.fetchMeasurementSeries(measurement.id, currentFreq.freq).subscribe((series) => {
              measurement.series = series;
            },
              (error) => {
                this.errorMessage = error;
              },
              () => {
                if (i === this.categoryData[cacheId].measurements.length - 1) {
                  console.log('measurement series complete');
                  this.getObservationData(this.categoryData[cacheId].measurements, categoryDateWrapper, currentFreq.freq, cacheId)
                  console.log(this.categoryData[cacheId])
                }
              });
          });
          // console.log(this.categoryData[cacheId])
        }
      });
  }

  getObservationData(measurements, catDateWrapper, freq, cacheId) {
    measurements.forEach((measurement, i) => {
      if (measurement.series) {
        measurement.series.forEach((serie, s) => {
          this._uheroAPIService.fetchObservations(serie.id).subscribe((obs) => {
            serie.seriesObservations = obs;
            serie.seriesInfo = serie;
            let seriesDates = [], seriesData;
            const seriesObsStart = serie.seriesObservations.observationStart;
            const seriesObsEnd = serie.seriesObservations.observationEnd;
            const levelData = serie.seriesObservations.transformationResults[0].observations;
            const decimals = serie.decimals ? serie.decimals : 1;
            if (levelData) {
              if (catDateWrapper.firstDate === '' || seriesObsStart < catDateWrapper.firstDate) {
                catDateWrapper.firstDate = seriesObsStart;
              }
              if (catDateWrapper.endDate === '' || seriesObsEnd > catDateWrapper.endDate) {
                catDateWrapper.endDate = seriesObsEnd;
              }
              seriesDates = this._helper.calculateDateArray(seriesObsStart, seriesObsEnd, freq, seriesDates);
              // seriesData = this._helper.dataTransform(serie.seriesObservations, seriesDates, decimals);
              serie.categoryChart = this._helper.dataTransform(serie.seriesObservations, seriesDates, decimals);
              serie.chartData = serie.categoryChart.chartData;
              serie.saParam = serie.seasonalAdjustment === 'seasonally_adjusted';
              serie.seriesInfo.id = serie.id;
              serie.seriesInfo = serie;
              serie.seriesInfo.title = serie.seriesInfo.geography.name;
            }
          },
            (error) => {
              this.errorMessage = error;
            },
            () => {
              if (i === measurements.length - 1 && s === measurement.series.length - 1) {
                const categoryDateArray = [];
                this._helper.calculateDateArray(catDateWrapper.firstDate, catDateWrapper.endDate, freq, categoryDateArray);
                this.categoryData[cacheId].categoryDates = categoryDateArray;
                this.categoryData[cacheId].categoryDateWrapper = catDateWrapper;
                this.categoryData[cacheId].sliderDates = this.getTableDates(categoryDateArray);
                // this.categoryData[cacheId].requestComplete = true;
                console.log(this.categoryData[cacheId])
              }
            });
        });
      }
    });
  }

  // Set up search results
  initSearch(search: string, routeGeo?: string, routeFreq?: string): Observable<any> {
    const cacheId = NtaHelperService.setCacheId(search, routeGeo, routeFreq);
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
    let selectedFreqExists = freqs.find(freq => freq.freq === selectedFreq);
    // Check if the selected frequency exists in the list of freqs for a selected geo
    selectedFreq = selectedFreqExists ? selectedFreq : freqs[0].freq;
    regions = freqGeos.find(freq => freq.freq === selectedFreq).geos;
    let selectedGeoExists = regions.find(region => region.handle === selectedGeo);
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
          // const searchSeries = this.filterSeriesResults(searchResults, freq, dateWrapper);
          const splitSeries = this.getDisplaySeries(searchResults, dateWrapper, freq, categoryDateWrapper);
          const sublist = {
            id: 'search',
            parentName: 'Search',
            name: search,
            // dateWrapper: splitSeries.dateWrapper,
            displaySeries: splitSeries.displaySeries
          };
          const categoryDateArray = [];
          const catWrapper = splitSeries.categoryDateWrapper;
          this._helper.calculateDateArray(catWrapper.firstDate, catWrapper.endDate, freq, categoryDateArray);
          this.formatCategoryData(splitSeries.displaySeries, categoryDateArray, splitSeries.categoryDateWrapper);
          this.categoryData[cacheId].sublist = [sublist];
          this.categoryData[cacheId].categoryDateWrapper = splitSeries.categoryDateWrapper;
          this.categoryData[cacheId].categoryDates = categoryDateArray;
          this.categoryData[cacheId].sliderDates = this.getTableDates(categoryDateArray);
          this.categoryData[cacheId].requestComplete = true;
        }
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

  filterSeriesResults(results: Array<any>, freq: string, dateWrapper) {
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
        res.saParam = res.seasonalAdjustment === 'seasonally_adjusted';
        series.seriesInfo = res;
        filtered.push(series);
      }
    });
    return filtered;
  }

  getDisplaySeries(allSeries, dateWrapper: DateWrapper, freq: string, categoryDateWrapper) {
    const dateArray = [];
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
    const filtered = this.filterSeriesResults(displaySeries, freq, dateWrapper);
    this._helper.setDateWrapper(filtered, dateWrapper);
    this._helper.calculateDateArray(dateWrapper.firstDate, dateWrapper.endDate, freq, dateArray);
    if (categoryDateWrapper.firstDate === '' || dateWrapper.firstDate < categoryDateWrapper.firstDate) {
      categoryDateWrapper.firstDate = dateWrapper.firstDate;
    }
    if (categoryDateWrapper.endDate === '' || dateWrapper.endDate > categoryDateWrapper.endDate) {
      categoryDateWrapper.endDate = dateWrapper.endDate;
    }
    return {
      displaySeries: filtered,
      // dateWrapper: dateWrapper,
      categoryDateWrapper: categoryDateWrapper
    };
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

  getTableDates(dateArray: Array<any>) {
    const tableDates = [];
    dateArray.forEach((date) => {
      tableDates.push(date.tableDate);
    });
    return tableDates;
  }
}
