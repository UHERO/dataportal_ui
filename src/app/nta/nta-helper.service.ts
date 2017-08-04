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
    if (!this.categoryData[cacheId] && (typeof catId === 'number' || catId === null)) {
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
      if (catId === null) {
        catId = categories[0].id;
      }
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
        this._uheroAPIService.fetchGeographies().subscribe((geos) => {
          this.categoryData[cacheId].geographies = geos;
        },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          this.getSubcategoryData(cacheId, this.categoryData[cacheId]);
        });
      } else {
        this.categoryData[cacheId].invalid = 'Category does not exist.';
      }
    });
  }

  getSubcategoryData(cacheId, category) {
    const freqArray = [];
    category.sublist.forEach((sub, index) => {
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
            category.currentFreq = freqArray[0];
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
      measurement.dateWrapper = { firstDate: '', endDate: '' };
      this._uheroAPIService.fetchMeasurementSeries(measurement.id).subscribe((series) => {
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
            // Use the series' geography name as its series title
            serie.title = category.geographies.find(geo => geo.handle === serie.geography.handle).name;
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
            this.getSearchObservations(series, index, searchSeries, searchResults, search, cacheId);
          });
        }
      });
  }

  // Get observations for series in search results
  getSearchObservations(series, index, searchSeries, searchResults, search, cacheId) {
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
          this.formatCategoryData(this.categoryData[cacheId]);
          this.categoryData[cacheId].requestComplete = true;
        }
      });
  }

  groupSearchMeasurements(searchSeries: Array<any>) {
    const measurements = [];
    searchSeries.forEach((series) => {
      const measurementExists = measurements.find(measurement => measurement.id === series.measurementId);
      if (!measurementExists && series.frequencyShort === 'A') {
        measurements.push({
          dateWrapper: { firstDate: '', endDate: '' },
          id: series.measurementId ? series.measurementId : 'null',
          name: series.measurementName ? series.measurementName : ' ',
          series: [series]
        });
      }
      if (measurementExists && series.frequencyShort === 'A') {
        measurementExists.series.push(series);
      }
    });
    return measurements;
  }

  // Format series data for chart and table displays
  formatCategoryData(category) {
    const measurements = category.measurements;
    measurements.forEach((measurement) => {
      const measurementDateArray = [];
      const dateWrapper = measurement.dateWrapper;
      if (measurement.series) {
        measurement.displaySeries = this.filterSeries(measurement.series, measurement);
        measurement.dateArray = this._helper.createDateArray(dateWrapper.firstDate, dateWrapper.endDate, 'A', measurementDateArray);
        measurement.sliderDates = this._helper.getTableDates(measurement.dateArray);
      }
    });
    measurements.forEach((measurement, i) => {
      if (measurement.series) {
        const displaySeries = measurement.displaySeries;
        displaySeries.forEach((series) => {
          const catData = this.formatSeriesData(series, measurement.dateArray);
          series.categoryTable = catData.catTable;
          series.categoryChart = catData.catChart;
        });
      }
      measurement.id = measurement.id.toString();
      if (i === measurements.length - 1) {
        category.requestComplete = true;
      }
    });
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
        series.title = geo ? geo.name : geoHandle;
      });
  }

  filterSeries(seriesArray: Array<any>, measurement) {
    const filtered = [];
    seriesArray.forEach((res) => {
      let seriesDates = [], series;
      const levelData = res.seriesObservations.transformationResults[0].observations;
      const decimals = res.decimals ? res.decimals : 1;
      // Add series if level data is available
      if (levelData) {
        const seriesObsStart = res.seriesObservations.observationStart;
        const seriesObsEnd = res.seriesObservations.observationEnd;
        measurement.dateWrapper.firstDate = this.setStartDate(measurement.dateWrapper, seriesObsStart);
        measurement.dateWrapper.endDate = this.setEndDate(measurement.dateWrapper, seriesObsEnd);
        seriesDates = this._helper.createDateArray(seriesObsStart, seriesObsEnd, 'A', seriesDates);
        series = this._helper.dataTransform(res.seriesObservations, seriesDates, decimals);
        res.saParam = res.seasonalAdjustment === 'seasonally_adjusted';
        series.seriesInfo = res;
        filtered.push(series);
      }
    });
    return filtered;
  }

  setStartDate(dateWrapper, observationStart) {
    if (dateWrapper.firstDate === '') {
      return observationStart;
    }
    if (observationStart < dateWrapper.firstDate) {
      return observationStart;
    }
    return dateWrapper.firstDate;
  }

  setEndDate(dateWrapper, observationEnd) {
    if (dateWrapper.endDate === '') {
      return observationEnd;
    }
    if (observationEnd > dateWrapper.endDate) {
      return observationEnd;
    }
    return dateWrapper.endDate;
  }

  formatSeriesData(series, categoryDateArray) {
    const decimals = series.decimals ? series.decimals : 1;
    const catTable = this._helper.catTable(series.tableData, categoryDateArray, decimals);
    const catChart = this._helper.dataTransform(series.seriesInfo.seriesObservations, categoryDateArray, decimals);
    return { catTable: catTable, catChart: catChart };
  }
}
