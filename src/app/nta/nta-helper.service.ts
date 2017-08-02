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
      this.getCategory(cacheId, catId);
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
    if (!this.categoryData[cacheId] && typeof catId === 'string') {
      this.getSearch(cacheId, catId);
      return Observable.forkJoin(Observable.of(this.categoryData[cacheId]));
    }
  }

  getCategory(cacheId: string, catId: any, selectedMeasure?: string) {
    this.categoryData[cacheId] = <CategoryData>{};
    console.log(this.categoryData)
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
        this._uheroAPIService.fetchGeographies().subscribe((geos) => {
          this.categoryData[cacheId].geographies = geos;
        },
          (error) => {
            this.errorMessage = error;
          },
          () => {
            this.getSubcategoryData(cacheId, this.categoryData[cacheId], selectedMeasure);
          });
      } else {
        this.categoryData[cacheId].invalid = 'Category does not exist.';
      }
    });
  }

  getSubcategoryData(cacheId: string, category, selectedMeasure?: string) {
    const freqArray = [];
    const measurementsList = [];
    category.sublist.forEach((sub, index) => {
      this._uheroAPIService.fetchCategoryMeasurements(sub.id).subscribe((measures) => {
        sub.measurements = measures;
        // Build list of all measurements for parent category from measurements available to its subcategories
        measures.forEach((m) => {
          const measurementExist = measurementsList.find(measurement => measurement === m.name);
          if (!measurementExist) {
            measurementsList.push({ name: m.name, id: null });
          }
        });
      },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          if (index === category.sublist.length - 1) {
            const selectedMeasurement = selectedMeasure ? selectedMeasure : measurementsList[1];
            console.log(selectedMeasurement)
            category.currentMeasurement = Object.assign({}, selectedMeasurement);
            category.measurements = measurementsList;
            this.getSeriesData(category)
          }
        });
    });
  }

  // Get list of series belonging to each measurement
  getSeriesData(category) {
    const selectedMeasurement = category.currentMeasurement;
    category.sublist.forEach((sub, index) => {
      sub.dateWrapper = { firstDate: '', endDate: '' };
      const measurementId = sub.measurements.find(measurement => measurement.name === selectedMeasurement.name).id;
      this._uheroAPIService.fetchMeasurementSeries(measurementId).subscribe((series) => {
        sub.series = series;
      },
        (error) => {
          this.errorMessage = error;
        },
        () => {
          if (index === category.sublist.length - 1) {
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
    category.sublist.forEach((sub, index) => {
      const sublistDateArray = [];
      const dateWrapper = sub.dateWrapper;
      if (sub.series) {
        sub.displaySeries = this.filterSeries(sub.series, sub);
        sub.dateArray = this._helper.createDateArray(dateWrapper.firstDate, dateWrapper.endDate, 'A', sublistDateArray);
        sub.sliderDates = this._helper.getTableDates(sub.dateArray);
      }
    });
    category.sublist.forEach((sub, i) => {
      if (sub.series) {
        const displaySeries = sub.displaySeries;
        displaySeries.forEach((series) => {
          const catData = this.formatSeriesData(series, sub.dateArray);
          series.categoryTable = catData.catTable;
          series.categoryChart = catData.catChart;
        });
      }
      sub.id = sub.id.toString();
      if (i === category.sublist.length - 1) {
        console.log('complete', category)
        category.requestComplete = true;
      }
    })
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
