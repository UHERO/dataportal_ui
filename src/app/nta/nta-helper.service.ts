// Set up data used in category chart and table displays
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/mergeMap';
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
          this.defaultGeo = cat.defaults ? cat.defaults.geo : '';
          this.categoryData[cacheId].selectedCategory = selectedCategory;
          const sublistCopy = [];
          sublist.forEach((sub) => {
            sublistCopy.push(Object.assign({}, sub));
          });
          this.categoryData[cacheId].sublist = sublistCopy;
          this.getSubcategoryData(selectedCategory, cacheId, catId, this.categoryData[cacheId].sublist, routeFreq);
        } else {
          this.categoryData[cacheId].invalid = 'Category does not exist.';
        }
      });
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
  }

  getSubcategoryData(catName: string, cacheId, catId: number, sublist: Array<any>, routeFreq?: string) {
    const freqArray = [];
    const categoryDateWrapper = { firstDate: '', endDate: '' };
    sublist.forEach((sub, index) => {
      // Get all regions available in a given category
      this._uheroAPIService.fetchSelectedCategory(sub.id).subscribe((category) => {
        let freqGeos, geoFreqs;
        freqGeos = category.freqGeos;
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
              let selectedFreq;
              selectedFreq = this.defaultFreq ? this.defaultFreq : freqArray[0].freq;
              if (routeFreq) {
                const selected = this.checkSelectedFreqs(routeFreq, freqArray);
                selectedFreq = selected.freq;
              }
              let freqs, currentFreq;
              // Get frequencies available for a selected region
              freqs = freqArray;
              currentFreq = freqs.find(freq => freq.freq === selectedFreq);
              this.categoryData[cacheId].frequencies = freqs;
              this.categoryData[cacheId].currentFreq = currentFreq;
              subcat.parentName = catName;
              const subcategory = {
                subcat: subcat,
                cacheId: cacheId,
                currentFreq: currentFreq,
                dateWrapper: dateWrapper,
                categoryDateWrapper: categoryDateWrapper
              };
              this.categoryData[cacheId].categoryDateWrapper = categoryDateWrapper;
              this.getMeasurementData(subcategory, this.categoryData[cacheId]);
            });
          }
        });
    });
  }

  // Get list of measurements belonging to a category
  getMeasurementData(subcategory, category) {
    const subcat = subcategory.subcat;
    const cacheId = subcategory.cacheId;
    const currentFreq = subcategory.currentFreq;
    const dateWrapper = subcategory.dateWrapper;
    const categoryDateWrapper = subcategory.categoryDateWrapper;
    const measurementsArray = [];
    this._uheroAPIService.fetchCategoryMeasurements(subcat.id).subscribe((measurements) => {
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
          this.categoryData[cacheId].measurements = measurementsArray;
          this.getSeriesData(this.categoryData[cacheId], currentFreq.freq, dateWrapper, categoryDateWrapper);
        }
      });
  }

  // Get list of series belonging to each measurement
  getSeriesData(category, freq, dateWrapper, categoryDateWrapper) {
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
    let reqCount = 0;
    let seriesObservations;
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
                this.formatSeriesData(category);
              }
            });
        });
      }
    });
  }

  // Format series data for chart and table displays
  formatSeriesData(category) {
    const categoryDateArray = [];
    const measurements = category.measurements;
    let displaySeries;
    measurements.forEach((measurement) => {
      if (measurement.series) {
        measurement.displaySeries = this.filterSeriesResults(measurement.series, category.currentFreq.freq, category.categoryDateWrapper);
      }
    });
    this._helper.calculateDateArray(category.categoryDateWrapper.firstDate, category.categoryDateWrapper.endDate, category.currentFreq.freq, categoryDateArray);
    category.categoryDates = categoryDateArray;
    measurements.forEach((measurement, i) => {
      if (measurement.series) {
        this.formatCategoryData(measurement.displaySeries, categoryDateArray, category.categoryDateWrapper);
      }
      measurement.id = measurement.id.toString();
      if (i === measurements.length - 1) {
        category.requestComplete = true;
      }
    });
    category.sliderDates = this.getTableDates(categoryDateArray);
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

  filterSeriesResults(results: Array<any>, freq: string, categoryDateWrapper) {
    const filtered = [];
    results.forEach((res) => {
      let seriesDates = [], series;
      const levelData = res.seriesObservations.transformationResults[0].observations;
      const decimals = res.decimals ? res.decimals : 1;
      // Add series if level data is available
      if (levelData) {
        const seriesObsStart = res.seriesObservations.observationStart;
        const seriesObsEnd = res.seriesObservations.observationEnd;
        if (categoryDateWrapper.firstDate === '' || seriesObsStart < categoryDateWrapper.firstDate) {
          categoryDateWrapper.firstDate = seriesObsStart;
        }
        if (categoryDateWrapper.endDate === '' || seriesObsEnd > categoryDateWrapper.endDate) {
          categoryDateWrapper.endDate = seriesObsEnd;
        }
        seriesDates = this._helper.calculateDateArray(seriesObsStart, seriesObsEnd, freq, seriesDates);
        series = this._helper.dataTransform(res.seriesObservations, seriesDates, decimals);
        res.saParam = res.seasonalAdjustment === 'seasonally_adjusted';
        series.seriesInfo = res;
        filtered.push(series);
      }
    });
    return filtered;
  }

  formatCategoryData(displaySeries: Array<any>, dateArray: Array<any>, dateWrapper: DateWrapper) {
    displaySeries.forEach((series) => {
      if (series.seriesInfo !== 'No data available') {
        series.seriesInfo.title = series.seriesInfo.geography.name;
        const decimals = series.decimals ? series.decimals : 1;
        series.categoryTable = this._helper.catTable(series.tableData, dateArray, decimals);
        series.categoryChart = this._helper.dataTransform(series.seriesInfo.seriesObservations, dateArray, decimals);
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
