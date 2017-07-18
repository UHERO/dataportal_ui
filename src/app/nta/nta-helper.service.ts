// Set up data used in category chart and table displays
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';
import { CategoryData } from '../category-data';
import { Frequency } from '../frequency';
import { DateWrapper } from '../date-wrapper';
import { DisplaySeries } from '../display-series';

@Injectable()
export class NtaHelperService {
  private errorMessage: string;
  // Variables for geo and freq selectors
  private defaults;
  private requestsRemain;
  private defaultFreq: string;
  private categoryData = {};

  static setCacheId(category, routeFreq) {
    let id = '' + category;
    if (routeFreq) {
      id = id + routeFreq;
    }
    return id;
  }

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }

  // Called on page load
  // Gets data sublists available for a selected category
  initContent(catId: any, routeFreq?: string): Observable<any> {
    const cacheId = NtaHelperService.setCacheId(catId, routeFreq);
    if (this.categoryData[cacheId]) {
      return Observable.of([this.categoryData[cacheId]]);
    }
    if (!this.categoryData[cacheId] && typeof catId === 'number') {
      this.getCategory(cacheId, catId, routeFreq);
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
    if (!this.categoryData[cacheId] && typeof catId === 'string') {
      this.getSeach(cacheId, catId, routeFreq);
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
  }

  getCategory(cacheId, catId, routeFreq?) {
    this.categoryData[cacheId] = <CategoryData>{};
    this._uheroAPIService.fetchCategories().subscribe((categories) => {
      const cat = categories.find(category => category.id === catId);
      if (cat) {
        const selectedCategory = cat.name;
        const sublist = cat.children;
        this.defaultFreq = cat.defaults ? cat.defaults.freq : '';
        this.categoryData[cacheId].selectedCategory = selectedCategory;
        this.categoryData[cacheId].categoryId = cat.id;
        const sublistCopy = [];
        sublist.forEach((sub) => {
          sublistCopy.push(Object.assign({}, sub));
        });
        this.categoryData[cacheId].sublist = sublistCopy;
        this.getSubcategoryData(selectedCategory, cacheId, this.categoryData[cacheId].sublist, routeFreq);
      } else {
        this.categoryData[cacheId].invalid = 'Category does not exist.';
      }
    });
  }

  getSubcategoryData(catName: string, cacheId, sublist: Array<any>, routeFreq?: string) {
    const freqArray = [];
    const categoryDateWrapper = { firstDate: '', endDate: '' };
    sublist.forEach((sub, index) => {
      // Get all regions available in a given category
      this._uheroAPIService.fetchSelectedCategory(sub.id).subscribe((category) => {
        const freqGeos = category.freqGeos;
        freqGeos.forEach((freq) => {
          this._helper.uniqueFreqs(freq, freqArray);
        });
      },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          if (index === sublist.length - 1) {
            this.requestsRemain = sublist.length;
            const measurementsArray = [];
            this.formatSubcategories(sublist, freqArray, cacheId, categoryDateWrapper, catName, routeFreq);
          }
        });
    });
  }

  formatSubcategories(sublist: Array<any>, freqArray: Array<Frequency>, cacheId: string, catDateWrapper: DateWrapper, catName: string, routeFreq?: string) {
    const measurementsArray = [];
    sublist.forEach((subcat, i) => {
      let selectedFreq;
      selectedFreq = this.defaultFreq ? this.defaultFreq : freqArray[0].freq;
      if (routeFreq) {
        const selected = this.checkSelectedFreqs(routeFreq, freqArray);
        selectedFreq = selected.freq;
      }
      // Get frequencies available for a selected region
      const currentFreq = freqArray.find(freq => freq.freq === selectedFreq);
      this.categoryData[cacheId].frequencies = freqArray;
      this.categoryData[cacheId].currentFreq = currentFreq;
      subcat.parentName = catName;
      this.categoryData[cacheId].categoryDateWrapper = catDateWrapper;
      this.getMeasurementData(subcat, currentFreq.freq, this.categoryData[cacheId], measurementsArray);
    });
  }

  // Get list of measurements belonging to a category
  getMeasurementData(subcategory, freq, category, measurementsArray) {
    this._uheroAPIService.fetchCategoryMeasurements(subcategory.id).subscribe((measurements) => {
      measurements.forEach((measurement) => {
        measurementsArray.push(Object.assign({}, measurement));
      });
    },
      (error) => {
        this.errorMessage = error;
      },
      () => {
        this.requestsRemain -= 1;
        if (this.requestsRemain === 0) {
          category.measurements = measurementsArray;
          this.getSeriesData(category, freq);
        }
      });
  }

  // Get list of series belonging to each measurement
  getSeriesData(category, freq) {
    const measurements = category.measurements;
    let seriesCount = 0;
    let measurementCount = measurements.length;
    measurements.forEach((measurement, mIndex) => {
      measurement.parentId = category.categoryId.toString();
      this._uheroAPIService.fetchMeasurementSeries(measurement.id, freq).subscribe((series) => {
        if (series) {
          seriesCount += series.length;
        }
        if (!series) {
          measurement.noData = true;
        }
        measurement.series = series;
      },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          measurementCount--;
          if (measurementCount === 0) {
            this.getObservationData(category, seriesCount);
          }
        });
    });
  }

  // Get observations beloning to each series
  getObservationData(category, seriesCount) {
    const measurements = category.measurements;
    measurements.forEach((measurement) => {
      if (measurement.series) {
        measurement.series.forEach((serie) => {
          this._uheroAPIService.fetchObservations(serie.id).subscribe((obs) => {
            serie.seriesObservations = obs;
          },
            (error) => {
              this.errorMessage = error;
            },
            () => {
              seriesCount--;
              if (seriesCount === 0) {
                this.formatCategoryData(category);
              }
            });
        });
      }
    });
  }

    getSeach(cacheId, catId, routeFreq?) {
    this.categoryData[cacheId] = <CategoryData>{};
    let freqGeos, obsEnd, obsStart;
    this._uheroAPIService.fetchSearch(catId).subscribe((results) => {
      this.defaults = results.defaults;
      freqGeos = results.freqGeos;
      obsEnd = results.observationEnd;
      obsStart = results.observationStart;
    },
      (error) => {
        this.errorMessage = error;
      },
      () => {
        if (obsEnd && obsStart) {
          const dateWrapper = <DateWrapper>{};
          this.searchSettings(catId, cacheId, dateWrapper, freqGeos, routeFreq);
          this.categoryData[cacheId].selectedCategory = 'Search: ' + catId;
        } else {
          this.categoryData[cacheId].invalid = catId;
        }
      });
  }

  searchSettings(search: string, cacheId, dateWrapper: DateWrapper, freqGeos, routeFreq?: string) {
    const dateArray = [];
    let selectedFreq;
    selectedFreq = this.defaultFreq ? this.defaultFreq : freqGeos[0].freq;
    if (routeFreq) {
      const selected = this.checkSelectedFreqs(routeFreq, freqGeos);
      selectedFreq = selected.freq;
    }
    let freqs, currentFreq;
    freqs = freqGeos;
    // freqs = geoFreqs.find(geo => geo.handle === selectedGeo).freqs;
    const selectedFreqExists = freqs.find(freq => freq.freq === selectedFreq);
    // Check if the selected frequency exists in the list of freqs for a selected geo
    selectedFreq = selectedFreqExists ? selectedFreq : freqs[0].freq;
    currentFreq = freqs.find(freq => freq.freq === selectedFreq);
    this.categoryData[cacheId].frequencies = freqs;
    this.categoryData[cacheId].currentFreq = currentFreq;
    this.getSearchData(search, cacheId, currentFreq.freq, dateWrapper, routeFreq);
  }

  getSearchData(search: string, cacheId, freq: string, dateWrapper: DateWrapper, routeFreq?: string) {
    let searchResults;
    const categoryDateWrapper = { firstDate: '', endDate: '' };
    // Get series for a requested search term
    this._uheroAPIService.fetchSearchSeries(search).subscribe((searchRes) => {
      searchResults = searchRes;
    },
      (error) => {
        this.errorMessage = error;
      },
      () => {
        if (searchResults) {
          const searchSeries = [];
          searchResults.forEach((series, index) => {
            this.getSearchObservations(series, index, searchSeries, searchResults, search, categoryDateWrapper, cacheId, freq);
          });
        }
      });
  }

  // Get observations for series in search results
  getSearchObservations(series, index, searchSeries, searchResults, search, catDateWrapper, cacheId, freq) {
    // TODO: Remove condition when NTA data is live
    if (series.frequencyShort === 'A') {
      this._uheroAPIService.fetchObservations(series.id).subscribe((obs) => {
        series.seriesObservations = obs;
      },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          searchSeries.push(series);
          if (index === searchResults.length - 1) {
            const measurements = {
              id: 'search',
              parentName: 'Search',
              name: search,
              series: searchSeries
            };
            const categoryDateArray = [];
            this.categoryData[cacheId].measurements = [measurements];
            this.categoryData[cacheId].sublist = [measurements];
            this.categoryData[cacheId].categoryDateWrapper = catDateWrapper;
            this.formatCategoryData(this.categoryData[cacheId]);
            this._helper.createDateArray(catDateWrapper.firstDate, catDateWrapper.endDate, freq, categoryDateArray);
            this.categoryData[cacheId].categoryDates = categoryDateArray;
            this.categoryData[cacheId].sliderDates = this._helper.getTableDates(categoryDateArray);
            this.categoryData[cacheId].requestComplete = true;
          }
        });
    }
  }

  // Format series data for chart and table displays
  formatCategoryData(category) {
    const categoryDateArray = [];
    const measurements = category.measurements;
    const freq = category.currentFreq.freq;
    const catDateWrapper = category.categoryDateWrapper;
    measurements.forEach((measurement) => {
      if (measurement.series) {
        measurement.displaySeries = this.filterSeries(measurement.series, freq, catDateWrapper);
      }
    });
    this._helper.createDateArray(catDateWrapper.firstDate, catDateWrapper.endDate, freq, categoryDateArray);
    category.categoryDates = categoryDateArray;
    measurements.forEach((measurement, i) => {
      if (measurement.series) {
        const displaySeries = measurement.displaySeries;
        displaySeries.forEach((series) => {
          series.seriesInfo.title = series.seriesInfo.geography.name;
          const catData = this.formatSeriesData(series, categoryDateArray);
          series.categoryTable = catData.catTable;
          series.categoryChart = catData.catChart;
        });
      }
      measurement.id = measurement.id.toString();
      if (i === measurements.length - 1) {
        category.requestComplete = true;
      }
    });
    category.sliderDates = this._helper.getTableDates(categoryDateArray);
  }

  checkSelectedFreqs(routeFreq, freqArray) {
    // Check if freq specified in route exists in a category's list of freqs
    const freqExist = freqArray.find(freq => freq.freq === routeFreq);
    // If it does not exist, set selected freq to the category's default
    // or first element of freq array, if default is not specified
    if (!freqExist) {
      return { freq: this.defaultFreq ? this.defaultFreq : freqArray[0].freq };
    } else {
      return { freq: routeFreq };
    }
  }

  filterSeries(seriesArray: Array<any>, freq: string, categoryDateWrapper) {
    const filtered = [];
    seriesArray.forEach((res) => {
      let seriesDates = [], series;
      const levelData = res.seriesObservations.transformationResults[0].observations;
      const decimals = res.decimals ? res.decimals : 1;
      // Add series if level data is available
      if (levelData) {
        const seriesObsStart = res.seriesObservations.observationStart;
        const seriesObsEnd = res.seriesObservations.observationEnd;
        categoryDateWrapper.firstDate = this.setStartDate(categoryDateWrapper, seriesObsStart);
        categoryDateWrapper.endDate = this.setEndDate(categoryDateWrapper, seriesObsEnd);
        seriesDates = this._helper.createDateArray(seriesObsStart, seriesObsEnd, freq, seriesDates);
        series = this._helper.dataTransform(res.seriesObservations, seriesDates, decimals);
        res.saParam = res.seasonalAdjustment === 'seasonally_adjusted';
        series.seriesInfo = res;
        filtered.push(series);
      }
    });
    return filtered;
  }

  setStartDate(categoryDateWrapper, observationStart) {
    if (categoryDateWrapper.firstDate === '') {
      return observationStart;
    }
    if (observationStart < categoryDateWrapper.firstDate) {
      return observationStart;
    }
    return categoryDateWrapper.firstDate;
  }

  setEndDate(categoryDateWrapper, observationEnd) {
    if (categoryDateWrapper.endDate === '') {
      return observationEnd;
    }
    if (observationEnd > categoryDateWrapper.endDate) {
      return observationEnd;
    }
    return categoryDateWrapper.endDate;
  }

  formatSeriesData(series, categoryDateArray) {
    const decimals = series.decimals ? series.decimals : 1;
    const catTable = this._helper.catTable(series.tableData, categoryDateArray, decimals);
    const catChart = this._helper.dataTransform(series.seriesInfo.seriesObservations, categoryDateArray, decimals);
    return { catTable: catTable, catChart: catChart };
  }
}
