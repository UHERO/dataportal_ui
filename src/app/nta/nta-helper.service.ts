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
    if (!this.categoryData[cacheId] && (typeof catId === 'number' || catId === null)) {
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
      if (catId === null) {
        catId = categories[0].id;
      }
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
            category.sublist.forEach((subcategory) => {
              this.findSelectedMeasurement(subcategory, selectedMeasure);
            });
            this.getSeriesData(category);
          }
        });
    });
  }

  findSelectedMeasurement(sublist, selectedMeasure) {
    sublist.measurements.forEach((measurement) => {
      sublist.currentMeasurement = selectedMeasure ?
        sublist.measurements.find(m => m.name === selectedMeasure) :
        sublist.measurements.find(m => m.name === 'Region');
    });
  }

  // Get list of series belonging to each measurement
  getSeriesData(category) {
    category.sublist.forEach((sub, index) => {
      const sublistDateArray = [];
      sub.dateWrapper = { firstDate: '', endDate: '' };
      this._uheroAPIService.fetchMeasurementSeries(sub.currentMeasurement.id).subscribe((series) => {
        if (series) {
          sub.series = series;
          this.formatCategoryData(category, sub, sublistDateArray);
        }
        sub.id = sub.id.toString();
        if (!series) {
          sub.noData = true;
        }
      },
        (error) => {
          this.errorMessage = error;
        });
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
          this.getSearchObservations(searchResults, this.categoryData[cacheId]);
        }
      });
  }

  // Get observations for series in search results
  getSearchObservations(searchSeries, category) {
    let seriesTotal = searchSeries.length;
    searchSeries.forEach((series) => {
      this._uheroAPIService.fetchObservations(series.id).subscribe((obs) => {
        series.seriesObservations = obs;
      },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          seriesTotal--;
          if (seriesTotal === 0) {
            const sublist = {
              dateWrapper: { firstDate: '', endDate: '' },
              id: 'search',
              series: searchSeries
            };
            this.formatCategoryData(category, sublist, []);
            category.sublist = [sublist];
          }
        });
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
  formatCategoryData(category, subcategory, subcategoryDateArray) {
    const dateWrapper = subcategory.dateWrapper;
    subcategory.displaySeries = this.filterSeries(subcategory.series, subcategory);
    subcategory.dateArray = this._helper.createDateArray(dateWrapper.firstDate, dateWrapper.endDate, 'A', subcategoryDateArray);
    subcategory.sliderDates = this._helper.getTableDates(subcategory.dateArray);
    subcategory.displaySeries.forEach((series, s) => {
      const catData = this.formatSeriesData(series, subcategory.dateArray);
      series.categoryTable = catData.catTable;
      series.categoryChart = catData.catChart;
      if (s === subcategory.displaySeries.length - 1) {
        subcategory.requestComplete = true;
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
