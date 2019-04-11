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
          const categoryDataLists = cat.children;
          const selectedDataList = dataListId ? this.findSelectedDataList(categoryDataLists, dataListId, '') : this.getCategoryDataLists(categoryDataLists[0], '');
          this.categoryData[cacheId].selectedDataList = selectedDataList.id;
          this.categoryData[cacheId].selectedDataListName = selectedDataList.dataListName;
          if (dataListId === null) {
            this.categoryData[cacheId].defaultDataList = selectedDataList.id;
          }
          this.categoryData[cacheId].selectedCategory = cat.name;
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
      this.categoryData[cacheId].regions = geos;
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
      this.categoryData[cacheId].frequencies = freqs;
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
          this.getData(catId, dataList.id, routeGeo, routeFreq, cacheId, routeGeo, routeFreq);
        }
        if (!routeGeoExists || !routeFreqExists) {
          const defaultFreq = dataList.defaults ? dataList.defaults.freq : '';
          const defaultGeo = dataList.defaults ? dataList.defaults.geo : '';
          this.getData(catId, dataList.id, defaultGeo.handle, defaultFreq.freq, cacheId, routeGeo, routeFreq);
        }
      });
  }

  findSelectedDataList = (dataList, dataListId, dataListName) => {
    for (let i = 0; i < dataList.length; i++) {
      let name = dataListName || '';
      if (dataList[i].id === dataListId) {
        dataList[i].dataListName = `${name} ${dataList[i].name}`;
        return dataList[i];
      } else {
        if (dataList[i].children && Array.isArray(dataList[i].children)) {
          name += `${dataList[i].name} > `;
          const selected = this.findSelectedDataList(dataList[i].children, dataListId, name);
          if (selected) {
            return selected;
          }
        }
      }
    }
  }

  getCategoryDataLists = (category, dataListName) => {
    let name = dataListName || '';
    if (!category.children) {
      category.dataListName = `${name} ${category.name}`;
      return category;
    }
    if (category.children && Array.isArray(category.children)) {
      name += `${category.name} > `;
      return this.getCategoryDataLists(category.children[0], name);
    }
  }

  getData(catId: any, subId: number, geo: string, freq: string, cacheId: string, routeGeo: string, routeFreq: string) {
    this._uheroAPIService.fetchExpanded(subId, geo, freq).subscribe((expandedCategory) => {
      if (expandedCategory) {
        const series = expandedCategory;
        const dates = this.setCategoryDates(series, freq);
        this.categoryData[cacheId].sliderDates = this._helper.getTableDates(dates.categoryDates);
        this.categoryData[cacheId].categoryDateWrapper = dates.categoryDateWrapper;
        this.categoryData[cacheId].categoryDates = dates.categoryDates;
        this.categoryData[cacheId].currentGeo = this.categoryData[cacheId].regions.find(region => region.handle === geo);
        this.categoryData[cacheId].currentFreq = this.categoryData[cacheId].frequencies.find(frequency => frequency.freq === freq);
        this.formatSeriesForDisplay(series, cacheId);
        this.categoryData[cacheId].series = series;
        this.categoryData[cacheId].requestComplete = true;
      }
      if (!expandedCategory) {
        this.categoryData[cacheId].requestComplete = true;
      }
      this.categoryData[cacheId].subcategories.forEach((sub) => {
        this.initContent(catId, sub.id, routeGeo, routeFreq);
      });
    });
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

  formatSeriesForDisplay(series: Array<any>, cacheId) {
    const displaySeries = this.getDisplaySeries(series, this.categoryData[cacheId].currentFreq.freq);
    if (displaySeries) {
      displaySeries.forEach((serie) => {
        serie['categoryDisplay'] = this._helper.dataTransform(serie.seriesInfo.seriesObservations)
      });
      this.categoryData[cacheId].displaySeries = displaySeries;
    }
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
      this.categoryData[cacheId].selectedCategory = 'Search: ' + search;
      this.categoryData[cacheId].regions = results.geos;
      this.categoryData[cacheId].currentGeo = results.geos.find(g => g.handle === geo);
      this.categoryData[cacheId].frequencies = results.freqs;
      this.categoryData[cacheId].currentFreq = results.freqs.find(f => f.freq === freq);
      const displaySeries = this.getDisplaySeries(results.series, freq);
      this.categoryData[cacheId].displaySeries = displaySeries;
      const sublist = {
        id: 'search',
        parentName: 'Search',
        name: search,
        displaySeries: displaySeries,
        requestComplete: false
      };
      const catWrapper = this.getSearchDates(displaySeries);
      const categoryDateArray = [];
      this._helper.createDateArray(catWrapper.firstDate, catWrapper.endDate, freq, categoryDateArray);
      this.formatCategoryData(displaySeries, categoryDateArray, catWrapper);
      this.categoryData[cacheId].subcategories = [sublist];
      this.categoryData[cacheId].categoryDateWrapper = categoryDateWrapper;
      this.categoryData[cacheId].categoryDates = categoryDateArray;
      this.categoryData[cacheId].requestComplete = true;
      sublist.requestComplete = true;
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

  formatCategoryData(displaySeries: Array<any>, dateArray: Array<any>, dateWrapper: DateWrapper) {
    displaySeries.forEach((series) => {
      if (series.seriesInfo !== 'No data available') {
        const decimals = series.decimals ? series.decimals : 1;
      }
    });
  }
}
