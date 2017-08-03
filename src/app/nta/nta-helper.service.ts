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

  static setCacheId(category, selectedMeasure?) {
    let id = '' + category;
    if (selectedMeasure) {
      id = id + selectedMeasure;
    }
    return id;
  }

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }

  // Called on page load
  // Gets data sublists available for a selected category
  initContent(catId: any, selectedMeasure?: string): Observable<any> {
    const cacheId = NtaHelperService.setCacheId(catId, selectedMeasure);
    if (this.categoryData[cacheId]) {
      return Observable.of([this.categoryData[cacheId]]);
    }
    if (!this.categoryData[cacheId] && typeof catId === 'number') {
      this.getCategory(cacheId, catId, selectedMeasure);
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
    if (!this.categoryData[cacheId] && typeof catId === 'string') {
      this.getSearch(cacheId, catId);
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
  }

  getCategory(cacheId: string, catId: any, selectedMeasure?: string) {
    this.categoryData[cacheId] = <CategoryData>{};
    this._uheroAPIService.fetchCategories().subscribe((categories) => {
      const cat = categories.find(category => category.id === catId);
      if (cat) {
        const sublist = cat.children;
        this.categoryData[cacheId].selectedCategory = cat.name;
        this.categoryData[cacheId].categoryId = cat.id;
        this.categoryData[cacheId].currentFreq = { freq: 'A', label: 'Annual' };
        const sublistCopy = [];
        sublist.forEach((sub) => {
          sub.parentName = cat.name;
          sublistCopy.push(Object.assign({}, sub));
        });
        this.categoryData[cacheId].sublist = sublistCopy;
        this.getSubcategoryData(cacheId, this.categoryData[cacheId], selectedMeasure);
      } else {
        this.categoryData[cacheId].invalid = 'Category does not exist.';
      }
    });
  }

  getSubcategoryData(cacheId: string, category, selectedMeasure?: string) {
    let subcategoryCount = category.sublist.length;
    category.sublist.forEach((sub, index) => {
      this._uheroAPIService.fetchCategoryMeasurements(sub.id).subscribe((measures) => {
        sub.measurements = measures;
      },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          subcategoryCount--;
          if (subcategoryCount === 0) {
            category.sublist.forEach((sub) => {
              this.findSelectedMeasurement(sub, selectedMeasure);
            });
            this.getSeriesData(category)
          }
        });
    });
  }

  findSelectedMeasurement(sublist, selectedMeasure) {
    sublist.measurements.forEach((m) => {
      sublist.currentMeasurement = selectedMeasure ? sublist.measurements.find(m => m.name === selectedMeasure) : sublist.measurements[1];
    });
  }

  // Get list of series belonging to each measurement
  getSeriesData(category) {
    let subcategoryCount = category.sublist.length;
    category.sublist.forEach((sub, index) => {
      sub.dateWrapper = { firstDate: '', endDate: '' };
      this._uheroAPIService.fetchMeasurementSeries(sub.currentMeasurement.id).subscribe((series) => {
        sub.series = series;
        if (!series) {
          sub.noData = true;
        }
      },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          subcategoryCount--;
          if (subcategoryCount === 0) {
            this.formatCategoryData(category);
          }
        });
    });
  }

  // Get observations beloning to each series
  getObservationData(category) {
    category.sublist.forEach((sub, i) => {
      if (sub.series) {
        sub.series.forEach((serie, s) => {
          this._uheroAPIService.fetchObservations(serie.id).subscribe((obs) => {
            serie.seriesObservations = obs;
          },
            (error) => {
              this.errorMessage = error;
            },
            () => {
              if (i === category.sublist.length - 1 && s === sub.series.length - 1) {
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
    const sublistCopy = [];
    category.sublist.forEach((sub, index) => {
      const sublistDateArray = [];
      const dateWrapper = sub.dateWrapper;
      if (sub.series) {
        sub.displaySeries = this.filterSeries(sub.series, sub);
        sub.dateArray = this._helper.createDateArray(dateWrapper.firstDate, dateWrapper.endDate, 'A', sublistDateArray);
        sub.sliderDates = this._helper.getTableDates(sub.dateArray);
        sub.displaySeries.forEach((series, s) => {
          const catData = this.formatSeriesData(series, sub.dateArray);
          series.categoryTable = catData.catTable;
          series.categoryChart = catData.catChart;
          if (s === sub.displaySeries.length - 1) {
            sub.requestComplete = true;
          }
          if (s === sub.displaySeries.length - 1 && index === category.sublist.length - 1) {
            category.requestComplete = true;
          }
        });
        sub.id = sub.id.toString();
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

  filterSeries(seriesArray: Array<any>, sublist) {
    const filtered = [];
    seriesArray.forEach((res) => {
      let seriesDates = [], series;
      const levelData = res.seriesObservations.transformationResults[0].observations;
      const decimals = res.decimals ? res.decimals : 1;
      // Add series if level data is available
      if (levelData) {
        const seriesObsStart = res.seriesObservations.observationStart;
        const seriesObsEnd = res.seriesObservations.observationEnd;
        sublist.dateWrapper.firstDate = this.setStartDate(sublist.dateWrapper, seriesObsStart);
        sublist.dateWrapper.endDate = this.setEndDate(sublist.dateWrapper, seriesObsEnd);
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
