import { forkJoin as observableForkJoin, of as observableOf, Observable } from 'rxjs';
// Set up data used in category chart and table displays
import { Injectable } from '@angular/core';
import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';
import { CategoryData } from '../category-data';
import { DateWrapper } from '../date-wrapper';

@Injectable()
export class NtaHelperService {
  private errorMessage: string;
  // Variables for geo and freq selectors
  private defaults;
  private requestsRemain;
  private defaultFreq: string;
  private categoryData = {};

  static setCacheId(category, dataListId, selectedMeasure?) {
    let id = '' + category + dataListId;
    if (selectedMeasure) {
      id = id + selectedMeasure;
    }
    return id;
  }

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }

  // Called on page load
  // Gets data sublists available for a selected category
  initContent(catId: any, noCache: boolean, dataListId: number, selectedMeasure?: string): Observable<any> {
    const cacheId = NtaHelperService.setCacheId(catId, dataListId, selectedMeasure);
    if (this.categoryData[cacheId]) {
      return observableOf([this.categoryData[cacheId]]);
    }
    if (!this.categoryData[cacheId] && (typeof catId === 'number' || catId === null)) {
      this.getCategory(cacheId, noCache, catId, dataListId, selectedMeasure);
      return observableForkJoin(observableOf(this.categoryData[cacheId]));
    }
    if (!this.categoryData[cacheId] && typeof catId === 'string') {
      this.getSearch(cacheId, noCache, catId);
      return observableForkJoin(observableOf(this.categoryData[cacheId]));
    }
  }

  getCategory(cacheId: string, noCache: boolean, catId: any, dataListId, selectedMeasure?: string) {
    this.categoryData[cacheId] = <CategoryData>{};
    this._uheroAPIService.fetchCategories().subscribe((categories) => {
      if (catId === null) {
        catId = categories[0].id;
      }
      const cat = categories.find(category => category.id === catId);
      if (cat) {
        if (dataListId == null) {
          dataListId = cat.children[0].id;
          this.categoryData[cacheId].defaultDataList = dataListId;
        }
        const categoryDataLists = cat.children;
        const selectedDataList = dataListId ? this._helper.findSelectedDataList(categoryDataLists, dataListId, '') : this._helper.getCategoryDataLists(categoryDataLists[0], '');
        this.categoryData[cacheId].selectedDataList = selectedDataList;
        this.categoryData[cacheId].selectedDataListName = selectedDataList.dataListName;
        this.categoryData[cacheId].selectedCategory = cat;
        this.categoryData[cacheId].categoryId = cat.id;
        this.categoryData[cacheId].currentFreq = { freq: 'A', label: 'Annual' };
        const sublistCopy = [];
        categoryDataLists.forEach((sub) => {
          sub.parentName = cat.name;
          sublistCopy.push(Object.assign({}, sub));
        });
        this.categoryData[cacheId].sublist = sublistCopy;
        this.getSubcategoryData(this.categoryData[cacheId], noCache, selectedMeasure);
      } else {
        this.categoryData[cacheId].invalid = 'Category does not exist.';
      }
    });
  }

  getSubcategoryData(category, noCache: boolean, selectedMeasure?: string) {
    this._uheroAPIService.fetchCategoryMeasurements(category.selectedDataList.id, noCache).subscribe((measures) => {
      category.measurements = measures;
    },
      (error) => {
        console.log('error fetching category measurements', error);
      },
      () => {
        this.findSelectedMeasurement(category, selectedMeasure);
        this.getSeriesData(category, noCache);
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
  getSeriesData(category, noCache: boolean) {
    const categoryDataArray = [];
    category.dateWrapper = { firstDate: '', endDate: '' };
    this._uheroAPIService.fetchMeasurementSeries(category.currentMeasurement.id, noCache).subscribe((series) => {
      if (series) {
        category.series = series;
        this.formatCategoryData(category, categoryDataArray, false);
      }
      if (!series) {
        category.noData = true;
      }
    },
      (error) => {
        console.log('error fetching measurement series', error);
      });
  }

  getSearch(cacheId, noCache: boolean, catId) {
    this.categoryData[cacheId] = <CategoryData>{};
    let freqGeos, freqs, obsEnd, obsStart;
    this._uheroAPIService.fetchSearch(catId, noCache).subscribe((results) => {
      this.defaults = results.defaults;
      freqGeos = results.freqGeos;
      freqs = results.freqs;
      obsEnd = results.observationEnd;
      obsStart = results.observationStart;
    },
      (error) => {
        this.errorMessage = error;
      },
      () => {
        if (obsEnd && obsStart) {
          const dateWrapper = <DateWrapper>{};
          this.getSearchData(catId, noCache, cacheId, dateWrapper);
          this.categoryData[cacheId].currentFreq = freqGeos ? freqGeos[0] : freqs[0];
          this.categoryData[cacheId].selectedCategory = { id: catId, name: 'Search: ' + catId };
        } else {
          this.categoryData[cacheId].invalid = catId;
        }
      });
  }

  getSearchData(search: string, noCache: boolean, cacheId, dateWrapper: DateWrapper) {
    let searchResults;
    // Get series for a requested search term
    this._uheroAPIService.fetchSearchSeries(search, noCache).subscribe((searchRes) => {
      searchResults = searchRes;
    },
      (error) => {
        this.errorMessage = error;
      },
      () => {
        if (searchResults) {
          const searchSeries = [];
          this.getSearchObservations(searchResults, noCache, search, this.categoryData[cacheId]);
        }
      });
  }

  // Get observations for series in search results
  getSearchObservations(searchSeries, noCache: boolean, search, category) {
    let seriesTotal = searchSeries.length;
    searchSeries.forEach((series) => {
      this._uheroAPIService.fetchObservations(series.id, noCache).subscribe((obs) => {
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
            category.dateWrapper = { firstDate: '', endDate: '' };
            category.id = 'search';
            category.series = searchSeries
            this.formatCategoryData(category, [], true);
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
  formatCategoryData(category, subcategoryDateArray: Array<any>, search: Boolean) {
    const dateWrapper = category.dateWrapper;
    category.displaySeries = this.filterSeries(category.series, category, search);
    category.dateArray = this._helper.createDateArray(dateWrapper.firstDate, dateWrapper.endDate, 'A', subcategoryDateArray);
    category.sliderDates = this._helper.getTableDates(category.dateArray);
    category.findMinMax = true;
    category.requestComplete = true;
    if (category.sublist) {
      category.sublist.forEach((sub) => {
        this.initContent(sub.parentId, sub.id, category.currentMeasurement.name);
      });  
    }
  }

  filterSeries(seriesArray: Array<any>, category, search: Boolean) {
    const filtered = [];
    seriesArray.forEach((res) => {
      let seriesDates = [], series;
      const levelData = res.seriesObservations.transformationResults[0].observations;
      const newLevelData = res.seriesObservations.transformationResults[0].dates;
      const decimals = res.decimals ? res.decimals : 1;
      // Add series if level data is available
      if (levelData || newLevelData) {
        const seriesObsStart = res.seriesObservations.observationStart;
        const seriesObsEnd = res.seriesObservations.observationEnd;
        category.dateWrapper.firstDate = this.setStartDate(category.dateWrapper, seriesObsStart);
        category.dateWrapper.endDate = this.setEndDate(category.dateWrapper, seriesObsEnd);
        seriesDates = this._helper.createDateArray(seriesObsStart, seriesObsEnd, 'A', seriesDates);
        series = {};
        res.saParam = res.seasonalAdjustment === 'seasonally_adjusted';
        series.seriesInfo = res;
        series.seriesInfo.title;
        series.seriesInfo.displayName = search ? series.seriesInfo.title + ' (' + series.seriesInfo.geography.name + ')' : series.seriesInfo.geography.name;
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
}
