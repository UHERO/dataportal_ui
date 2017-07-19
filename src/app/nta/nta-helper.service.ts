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
      this.getCategory(cacheId, catId);
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
    if (!this.categoryData[cacheId] && typeof catId === 'string') {
      this.getSearch(cacheId, catId);
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
  }

  getCategory(cacheId, catId) {
    this.categoryData[cacheId] = <CategoryData>{};
    this._uheroAPIService.fetchCategories().subscribe((categories) => {
      const cat = categories.find(category => category.id === catId);
      if (cat) {
        const sublist = cat.children;
        this.categoryData[cacheId].selectedCategory = cat.name;
        this.categoryData[cacheId].categoryId = cat.id;
        const sublistCopy = [];
        sublist.forEach((sub) => {
          sub.parentName = cat.name;
          sublistCopy.push(Object.assign({}, sub));
        });
        this.categoryData[cacheId].sublist = sublistCopy;
        this.getSubcategoryData(cacheId, this.categoryData[cacheId]);
      } else {
        this.categoryData[cacheId].invalid = 'Category does not exist.';
      }
    });
  }

  getSubcategoryData(cacheId, category) {
    const freqArray = [];
    const categoryDateWrapper = { firstDate: '', endDate: '' };
    const measurementsArray = [];
    category.sublist.forEach((sub, index) => {
      category.categoryDateWrapper = categoryDateWrapper;
      // Get all regions available in a given category
      this._uheroAPIService.fetchSelectedCategory(sub.id).subscribe((cat) => {
        const freqGeos = cat.freqGeos;
        freqGeos.forEach((freq) => {
          this._helper.uniqueFreqs(freq, freqArray);
        });
      },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          if (index === category.sublist.length - 1) {
            this.requestsRemain = category.sublist.length;
            // All NTA data has an annual frequency
            category.currentFreq = freqArray[0]
            const measurementsArray = [];
            this.getMeasurementData(category.sublist, this.categoryData[cacheId], measurementsArray);
          }
        });
    });
  }

  getMeasurementData(sublist: Array<any>, category, measurementsArray) {
    sublist.forEach((subcat) => {
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
            category.measurements = measurementsArray;
            this.getSeriesData(category);
          }
        });
    });
  }

  // Get list of series belonging to each measurement
  getSeriesData(category) {
    const measurements = category.measurements;
    let seriesCount = 0;
    let measurementCount = measurements.length;
    measurements.forEach((measurement, mIndex) => {
      measurement.parentId = category.categoryId.toString();
      this._uheroAPIService.fetchMeasurementSeries(measurement.id, 'A').subscribe((series) => {
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

  getSearch(cacheId, catId) {
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
          this.getSearchData(catId, cacheId, dateWrapper);
          this.categoryData[cacheId].currentFreq = freqGeos[0];
          this.categoryData[cacheId].selectedCategory = 'Search: ' + catId;
        } else {
          this.categoryData[cacheId].invalid = catId;
        }
      });
  }

  getSearchData(search: string, cacheId, dateWrapper: DateWrapper) {
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
            this.getSearchObservations(series, index, searchSeries, searchResults, search, categoryDateWrapper, cacheId);
          });
        }
      });
  }

  // Get observations for series in search results
  getSearchObservations(series, index, searchSeries, searchResults, search, catDateWrapper, cacheId) {
    this._uheroAPIService.fetchObservations(series.id).subscribe((obs) => {
      series.seriesObservations = obs;
    },
      (error) => {
        this.errorMessage = error;
      },
      () => {
        searchSeries.push(series);
        if (index === searchResults.length - 1) {
          // Group search results by measurement
          const measurements = this.groupSearchMeasurements(searchSeries);
          const categoryDateArray = [];
          this.categoryData[cacheId].measurements = measurements;
          this.categoryData[cacheId].sublist = measurements;
          this.categoryData[cacheId].categoryDateWrapper = catDateWrapper;
          this.formatCategoryData(this.categoryData[cacheId]);
          this._helper.createDateArray(catDateWrapper.firstDate, catDateWrapper.endDate, 'A', categoryDateArray);
          this.categoryData[cacheId].categoryDates = categoryDateArray;
          this.categoryData[cacheId].sliderDates = this._helper.getTableDates(categoryDateArray);
          this.categoryData[cacheId].requestComplete = true;
        }
      });
  }

  groupSearchMeasurements(searchSeries: Array<any>) {
    const measurements = [];
    searchSeries.forEach((series) => {
      const measurementExists = measurements.find(measurement => measurement.id === series.measurementId);
      if (!measurementExists && series.frequencyShort === 'A') {
        measurements.push({ id: series.measurementId ? series.measurementId : 'null', series: [series] })
      }
      if (measurementExists && series.frequencyShort === 'A') {
        measurementExists.series.push(series);
      }
    });
    return measurements;
  }

  // Format series data for chart and table displays
  formatCategoryData(category) {
    const categoryDateArray = [];
    const measurements = category.measurements;
    const catDateWrapper = category.categoryDateWrapper;
    measurements.forEach((measurement) => {
      if (measurement.series) {
        measurement.displaySeries = this.filterSeries(measurement.series, 'A', catDateWrapper);
      }
    });
    this._helper.createDateArray(catDateWrapper.firstDate, catDateWrapper.endDate, 'A', categoryDateArray);
    category.categoryDates = categoryDateArray;
    measurements.forEach((measurement, i) => {
      if (measurement.series) {
        const displaySeries = measurement.displaySeries;
        displaySeries.forEach((series) => {
          //series.seriesInfo.title =
          this.getGeoName(series, series.seriesInfo.geography.handle);
          console.log('title', series.seriesInfo.title)
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

  getGeoName(series, geoHandle: string) {
    let geographies;
    this._uheroAPIService.fetchGeographies().subscribe((geos) => {
      geographies = geos;
    },
      (error) => {
        this.errorMessage = error;
      },
      () => {
        const geo = geographies.find(geos => geos.handle === geoHandle);
        console.log(geo)
        series.seriesInfo.title = geo ? geo.name : geoHandle;
      });
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
