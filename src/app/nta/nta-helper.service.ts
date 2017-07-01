// Set up data used in category chart and table displays
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/mergeMap';
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
  private categoryDates = [];
  private seriesDates = [];
  private series = [];

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
  initContent(catId: number, routeFreq?: string): Observable<any> {
    const cacheId = NtaHelperService.setCacheId(catId, routeFreq);
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
          this.categoryData[cacheId].selectedCategory = selectedCategory;
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
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
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
              this.categoryData[cacheId].categoryDateWrapper = categoryDateWrapper;
              this.getMeasurementData(subcat, currentFreq.freq, this.categoryData[cacheId], measurementsArray);
            });
          }
        });
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
      this._uheroAPIService.fetchMeasurementSeries(measurement.id, freq).subscribe((series) => {
        if (series) {
          seriesCount += series.length;
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
