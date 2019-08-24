import { forkJoin as observableForkJoin, of as observableOf, Observable } from 'rxjs';
// Set up data used in category chart and table displays
import { Injectable } from '@angular/core';

import { UheroApiService } from './uhero-api.service';
import { HelperService } from './helper.service';
import { CategoryData } from './category-data';
import { Frequency } from './frequency';
import { Geography } from './geography';
import { DateWrapper } from './date-wrapper';

@Injectable()
export class CategoryHelperService {
  private errorMessage: string;
  // Variables for geo and freq selectors
  private categoryData = {};

  static setCacheId(category, routeGeo, routeFreq, dataList?) {
    let id = `category${category}list${dataList}`;
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
  initContent(catId: any, dataListId?: number, routeGeo?: string, routeFreq?: string): Observable<any> {
    const cacheId = CategoryHelperService.setCacheId(catId, routeGeo, routeFreq, dataListId);
    if (this.categoryData[cacheId]) {
      return observableOf([this.categoryData[cacheId]]);
    } else {
      this.categoryData[cacheId] = <CategoryData>{};
      this._uheroAPIService.fetchCategories().subscribe((categories) => {
        if (catId === null) {
          catId = categories[0].id;
        }
        const cat = categories.find(category => category.id === catId);
        if (cat) {
          console.log('cat', cat)
          const categoryDataLists = cat.children;
          const selectedDataList = dataListId ? this._helper.findSelectedDataList(categoryDataLists, dataListId, '') : this._helper.getCategoryDataLists(categoryDataLists[0], '');
          this.categoryData[cacheId].selectedDataList = selectedDataList;
          console.log('selectedDataList', selectedDataList)
          this.categoryData[cacheId].selectedDataListName = selectedDataList.dataListName;
          if (dataListId === null) {
            this.categoryData[cacheId].defaultDataList = selectedDataList.id;
          }
          this.categoryData[cacheId].selectedCategoryId = cat.id;
          this.categoryData[cacheId].selectedCategory = cat;
          this.categoryData[cacheId].subcategories = categoryDataLists;
          this.getDataListGeos(catId, selectedDataList, cacheId, routeGeo, routeFreq);
        } else {
          this.categoryData[cacheId].invalid = 'Category does not exist.';
          this.categoryData[cacheId].requestComplete = true;
        }
      });
      return observableForkJoin(observableOf(this.categoryData[cacheId]));
    }
  }

  getDataListGeos(catId: any, dataList: any, cacheId: string, routeGeo: string, routeFreq: string) {
    this._uheroAPIService.fetchCategoryGeos(dataList.id).subscribe((geos) => {
      this.categoryData[cacheId].regions = geos ? geos : [dataList.defaults.geo];
    },
      (error) => {
        console.log('check category geos error', error);
      },
      () => {
        this.getDataListFreqs(catId, dataList, cacheId, routeGeo, routeFreq);
      });
  }

  getDataListFreqs(catId: any, dataList: any, cacheId: string, routeGeo: string, routeFreq: string) {
    this._uheroAPIService.fetchCategoryFreqs(dataList.id).subscribe((freqs) => {
      this.categoryData[cacheId].frequencies = freqs ? freqs : [dataList.defaults.freq];
    },
      (error) => {
        console.log('check category freqs error', error);
      },
      () => {
        let routeGeoExists, routeFreqExists;
        if (routeGeo && routeFreq) {
          routeGeoExists = this.categoryData[cacheId].regions.find(region => region.handle === routeGeo);
          routeFreqExists = this.categoryData[cacheId].frequencies.find(frequency => frequency.freq === routeFreq);
        }
        if (routeGeoExists && routeFreqExists) {
          //this.getData(catId, dataList.id, routeGeo, routeFreq, cacheId, routeGeo, routeFreq);
        }
        if (!routeGeoExists || !routeFreqExists) {
          console.log('!routeGeoExists || !routeFreqExists')
          const defaultFreq = dataList.defaults && dataList.defaults.freq ? dataList.defaults.freq : this.categoryData[cacheId].frequencies[0];
          const defaultGeo = dataList.defaults && dataList.defaults.geo ? dataList.defaults.geo : this.categoryData[cacheId].regions[0];
          this.getData(catId, dataList.id, defaultGeo.handle, defaultFreq.freq, cacheId, defaultGeo.handle, defaultFreq.freq);
        }
      });
  }

  getData(catId: any, subId: number, geo: string, freq: string, cacheId: string, routeGeo: string, routeFreq: string) {
    this._uheroAPIService.fetchExpanded(subId, geo, freq).subscribe((expandedCategory) => {
      console.log('subId', subId)
      if (expandedCategory) {
        const series = expandedCategory;
        const dates = this.setCategoryDates(series, freq);
        this.categoryData[cacheId].sliderDates = this._helper.getTableDates(dates.categoryDates);
        this.categoryData[cacheId].categoryDateWrapper = dates.categoryDateWrapper;
        this.categoryData[cacheId].categoryDates = dates.categoryDates;
        this.categoryData[cacheId].currentGeo = this.categoryData[cacheId].regions.find(region => region.handle === geo);
        this.categoryData[cacheId].currentFreq = this.categoryData[cacheId].frequencies.find(frequency => frequency.freq === freq);
        const displaySeries = this.getDisplaySeries(series, this.categoryData[cacheId].currentFreq.freq);
        this.categoryData[cacheId].displaySeries = displaySeries;
        this.categoryData[cacheId].series = series;
        this.categoryData[cacheId].requestComplete = true;
      }
      if (!expandedCategory) {
        this.categoryData[cacheId].requestComplete = true;
        this.categoryData[cacheId].currentGeo = this.categoryData[cacheId].regions.find(region => region.handle === geo);
        this.categoryData[cacheId].currentFreq = this.categoryData[cacheId].frequencies.find(frequency => frequency.freq === freq);
        this.categoryData[cacheId].noData = true;
      }
      console.log('categoryData', this.categoryData[cacheId])

      /* this.categoryData[cacheId].subcategories.forEach((sub) => {
        this.getSiblingData(sub, catId, routeGeo, routeFreq);
      }); */
    });
  }

  getSiblingData(sub, catId, routeGeo, routeFreq) {
    if (!sub.children) {
      console.log('!sub.children', sub)
      this.initContent(catId, sub.id, routeGeo, routeFreq);  
    }
    if (sub.children) {
      sub.children.forEach((s) => {
        this.getSiblingData(s, catId, routeGeo, routeFreq);
      });
    }
  }

  setCategoryDates = (series: Array<any>, currentFreq: string) => {
    const categoryDateWrapper = { firstDate: '', endDate: '' };
    const categoryDateArray = [];
    // Check series for the earliest/latest start and end dates
    // Used to create array of dates for enitre category
    series.forEach((s) => {
      if (categoryDateWrapper.endDate === '' || s.seriesObservations.observationEnd > categoryDateWrapper.endDate) {
        categoryDateWrapper.endDate = s.seriesObservations.observationEnd;
      }
      if (categoryDateWrapper.firstDate === '' || s.seriesObservations.observationStart < categoryDateWrapper.firstDate) {
        categoryDateWrapper.firstDate = s.seriesObservations.observationStart;
      }
    });
    this._helper.createDateArray(categoryDateWrapper.firstDate, categoryDateWrapper.endDate, currentFreq, categoryDateArray);
    return { categoryDateWrapper: categoryDateWrapper, categoryDates: categoryDateArray };
  }

  getUniqueRegionList = (series: Array<any>) => {
    const regionList = [];
    series.forEach((s) => {
      s.geos.forEach((geo) => {
        const regionExists = regionList.find(region => region.handle === geo.handle);
        if (!regionExists) {
          regionList.push(geo);
        }
      });
    });
    return regionList;
  }

  getUniqueFrequencyList = (series: Array<any>) => {
    const freqList = [];
    series.forEach((s) => {
      s.freqs.forEach((freq) => {
        const freqExists = freqList.find(frequency => frequency.freq === freq.freq);
        if (!freqExists) {
          freqList.push(freq);
        }
      });
    });
    return freqList;
  }

  setNoData(subcategory) {
    const series = [{ seriesInfo: 'No data available' }];
    subcategory.dateWrapper = <DateWrapper>{};
    subcategory.dateRange = [];
    subcategory.datatables = {};
    subcategory.displaySeries = series;
    subcategory.noData = true;
    subcategory.requestComplete = true;
  }

  // Set up search results
  initSearch(search: string, routeGeo?: string, routeFreq?: string): Observable<any> {
    const cacheId = CategoryHelperService.setCacheId(search, routeGeo, routeFreq);
    if (this.categoryData[cacheId]) {
      return observableOf([this.categoryData[cacheId]]);
    } else {
      let obsEnd, obsStart;
      this.categoryData[cacheId] = <CategoryData>{};
      if (routeGeo && routeFreq) {
        this._uheroAPIService.fetchPackageSearch(search, routeGeo, routeFreq).subscribe((results) => {
          const routeGeoExists = results.geos.find(geo => geo.handle === routeGeo);
          const routeFreqExists = results.freqs.find(freq => freq.freq === routeFreq);
          const defaultGeo = results.defaultGeo.handle;
          const defaultFreq = results.defaultFreq.freq;
          obsStart = results.observationStart;
          obsEnd = results.observationEnd;
          if (routeFreqExists && routeGeoExists) {
            this.getSearchData(results, cacheId, search, routeGeo, routeFreq);
          }
          if (!routeFreqExists || !routeGeoExists) {
            this.getSearchWithDefaults(search, cacheId);
          }
        });
      }
      if (!routeGeo || !routeFreq) {
        this.getSearchWithDefaults(search, cacheId);
      }
      return observableForkJoin(observableOf(this.categoryData[cacheId]));
    }
  }

  getSearchWithDefaults(search, cacheId) {
    this._uheroAPIService.fetchPackageSearch(search, '', '').subscribe((results) => {
      const geo = results.defaultGeo.handle;
      const freq = results.defaultFreq.freq;
      this.getSearchData(results, cacheId, search, geo, freq);
    });
  }

  getSearchData(results, cacheId, search, geo, freq) {
    if (results.observationStart && results.observationEnd) {
      const categoryDateWrapper = { firstDate: '', endDate: '' };
      this.categoryData[cacheId].selectedCategory = { id: search, name: 'Search: ' + search };
      this.categoryData[cacheId].regions = results.geos;
      this.categoryData[cacheId].currentGeo = results.geos.find(g => g.handle === geo);
      this.categoryData[cacheId].frequencies = results.freqs;
      this.categoryData[cacheId].currentFreq = results.freqs.find(f => f.freq === freq);
      const displaySeries = this.getDisplaySeries(results.series, freq);
      this.categoryData[cacheId].displaySeries = displaySeries;
      const catWrapper = this.getSearchDates(displaySeries);
      const categoryDateArray = [];
      this._helper.createDateArray(catWrapper.firstDate, catWrapper.endDate, freq, categoryDateArray);
      this.categoryData[cacheId].categoryDateWrapper = categoryDateWrapper;
      this.categoryData[cacheId].categoryDates = categoryDateArray;
      this.categoryData[cacheId].requestComplete = true;
    }
    if (!results.observationStart || !results.observationEnd) {
      this.categoryData[cacheId].invalid = search;
    }
  }

  getSearchDates(displaySeries) {
    const categoryDateWrapper = { firstDate: '', endDate: '' };
    displaySeries.forEach((series) => {
      if (series.seriesInfo.seriesObservations.observationStart < categoryDateWrapper.firstDate || categoryDateWrapper.firstDate === '') {
        categoryDateWrapper.firstDate = series.seriesInfo.seriesObservations.observationStart;
      }
      if (series.seriesInfo.seriesObservations.observationEnd > categoryDateWrapper.endDate || categoryDateWrapper.endDate === '') {
        categoryDateWrapper.endDate = series.seriesInfo.seriesObservations.observationEnd;
      }
    });
    return categoryDateWrapper;
  }

  filterSeriesResults(results: Array<any>, freq: string) {
    const filtered = [];
    results.forEach((res) => {
      const levelData = res.seriesObservations.transformationResults[0].dates;
      if (levelData) {
        let series = { seriesInfo: { displayName: '' } };
        res.saParam = res.seasonalAdjustment !== 'not_seasonally_adjusted';
        series.seriesInfo = res;
        series.seriesInfo.displayName = res.title;
        filtered.push(series);
      }
    });
    return filtered
  }

  getDisplaySeries(allSeries, freq: string) {
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
    const filtered = this.filterSeriesResults(displaySeries, freq);
    return filtered.length ? filtered : null;
  }
}
