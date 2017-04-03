// Set up data used in category chart and table displays
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UheroApiService } from './uhero-api.service';
import { HelperService } from './helper.service';
import { CategoryDataArray } from './category-data-array';
import { CategoryData } from './category-data';
import { Frequency } from './frequency';
import { Geography } from './geography';
import { dateWrapper } from './date-wrapper';

@Injectable()
export class CategoryHelperService {
  private errorMessage: string;
  private seriesData = [];
  // Variables for geo and freq selectors
  private defaults;
  private defaultFreq: string;
  private defaultGeo: string;
  private categoryData: CategoryDataArray = [];
  private categoryDates = [];
  private seriesDates = [];
  private series = [];

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService) { }

  // Called on page load
  // Gets data sublists available for a selected category
  initContent(catId: number, routeGeo?: string, routeFreq?: string): Observable<any> {
    if (this.categoryData[catId]) {
      return Observable.of([this.categoryData[catId + routeGeo + routeFreq]]);
    } else {
      this.categoryData[catId + routeGeo + routeFreq] = <CategoryData>{};
      this._uheroAPIService.fetchCategories().subscribe((category) => {
        let categories = category;
        this.seriesData = [];
        let cat = categories.find(cat => cat.id === catId);
        if (cat) {
          let selectedCategory = cat.name;
          let sublist = cat.children;
          if (cat.defaults) {
            this.defaultFreq = cat.defaults['freq'];
            this.defaultGeo = cat.defaults['geo'];
          } else {
            this.defaultFreq = '';
            this.defaultGeo = '';
          }
          this.categoryData[catId + routeGeo + routeFreq].selectedCategory = selectedCategory;
          this.categoryData[catId + routeGeo + routeFreq].sublist = sublist;
          this.categoryData[catId + routeGeo + routeFreq].seriesData = this.seriesData;
          this.getSubcategoryData(catId, sublist, routeGeo, routeFreq);
        } else {
          this.categoryData[catId + routeGeo + routeFreq].invalid = 'Category does not exist.';
        }
      });
      return Observable.forkJoin(Observable.of(this.categoryData[catId + routeGeo + routeFreq]));
    }
  }

  getSubcategoryData(catId: number, sublist: Array<any>, routeGeo?: string, routeFreq?: string) {
    let geoArray = [];
    let freqArray = [];
    let i = 0;
    sublist.forEach((sub, index) => {
      // Get all regions available in a given category
      this._uheroAPIService.fetchSelectedCategory(sublist[index]['id']).subscribe((category) => {
        let catInfo = category;
        let freqGeos, geoFreqs;
        freqGeos = catInfo.freq_geos;
        geoFreqs = catInfo.geo_freqs;
        geoFreqs.forEach((geo, indx) => {
          this._helper.uniqueGeos(geo, geoArray);
        });
        freqGeos.forEach((freq, indx) => {
          this._helper.uniqueFreqs(freq, freqArray);
        });
        i += 1;
      },
        (error) => {
          error = this.errorMessage = error;
        },
        () => {
          if (i === sublist.length) {
            sublist.forEach((subcat, indx) => {
              let dateWrapper = { firstDate: '', endDate: '' };
              let selectedFreq = routeFreq ? routeFreq : this.defaultFreq ? this.defaultFreq : freqArray[0].freq;
              let selectedGeo = routeGeo ? routeGeo : this.defaultGeo ? this.defaultGeo : geoArray[0].handle;
              let freqs, regions, currentGeo, currentFreq;
              // Get frequencies available for a selected region
              freqs = geoArray.find(geo => geo.handle === selectedGeo).freqs;
              regions = freqArray.find(freq => freq.freq === selectedFreq).geos;
              currentGeo = regions.find(region => region.handle === selectedGeo);
              currentFreq = freqs.find(freq => freq.freq === selectedFreq);
              this.categoryData[catId + routeGeo + routeFreq].regions = regions;
              this.categoryData[catId + routeGeo + routeFreq].frequencies = freqs;
              this.categoryData[catId + routeGeo + routeFreq].currentGeo = currentGeo;
              this.categoryData[catId + routeGeo + routeFreq].currentFreq = currentFreq;
              this.getSeriesData(subcat, geoArray, currentGeo, freqArray, currentFreq, dateWrapper, routeGeo, routeFreq);
            });
          }
        });
    });
  }

  // Get regions and frequencies available for a selected category
  getSeriesData(sublistIndex, regions: Array<any>, currentGeo: Geography, freqs: Array<any>, currentFreq: Frequency, dateWrapper: dateWrapper, routeGeo?: string, routeFreq?: string) {
    let dateArray = [];
    this._uheroAPIService.fetchSelectedCategory(sublistIndex['id']).subscribe((cat) => {
      dateArray = this._helper.categoryDateArray(cat['observationStart'], cat['observationEnd'], currentFreq.freq, dateArray);
    },
      (error) => {
        error = this.errorMessage = error;
      },
      () => {
        // Fetch data for current region/frequency settings
        let expandedResults;
        this._uheroAPIService.fetchExpanded(sublistIndex['id'], currentGeo.handle, currentFreq.freq).subscribe((expanded) => {
          expandedResults = expanded;
        },
          (error) => {
            error = this.errorMessage = error;
          },
          () => {
            if (expandedResults) {
              // Array of all series belonging to each category
              let categorySeries = []
              expandedResults.forEach((result, index) => {
                let seriesDates = [], series;
                let seriesObsStart = result.seriesObservations.observationStart;
                let seriesObsEnd = result.seriesObservations.observationEnd;
                let levelData = result.seriesObservations.transformationResults[0].observations;
                if (levelData) {
                  seriesDates = this._helper.seriesDateArray(seriesObsStart, seriesObsEnd, currentFreq.freq, seriesDates);
                  series = this._helper.dataTransform(result.seriesObservations, seriesDates);
                  series['seriesInfo'] = result;
                  series.seriesInfo.tooltipInfo = series.seriesInfo.title;
                  // Format information for category table tooltips: Display series title and source description/link if available 
                  series.seriesInfo.tooltipInfo = this.setTooltipInfo(series.seriesInfo);
                  categorySeries.push(series);
                }
              });

              // Check if (non-annual) category has seasonally adjusted data
              // Returns true for annual data
              let hasSeasonallyAdjusted = this.checkSA(categorySeries);

              // Category chart and table displays (landing-page and category-table components) should only show seasonally adjusted series
              // If a category does not have any SA data (i.e. hasSeasonallyAdjusted === false), display the series in the category
              let displaySeries = [];
              this.seriesToDisplay(categorySeries, hasSeasonallyAdjusted, displaySeries);

              // Set date wrapper based on starting and ending dates of displaySeries;
              // Format data for category-table display
              this._helper.setDateWrapper(displaySeries, dateWrapper);
              let catTable = this.formatCatTableData(displaySeries, dateArray, dateWrapper);
              sublistIndex.dateRange = catTable.tableDates;
              sublistIndex.datatables = catTable.datatables;
              this.seriesData.push({ dateWrapper: dateWrapper, sublist: sublistIndex, displaySeries: displaySeries, allSeries: categorySeries, hasSeasonallyAdjusted: hasSeasonallyAdjusted });
            } else {
              // No series exist for a subcateogry
              let series = [{ seriesInfo: 'No data available' }];
              this.seriesData.push({ sublist: sublistIndex, series: series });
            }
          });
      });
  }

  // Set up search results
  initSearch(search: string, routeGeo?: string, routeFreq?: string): Observable<any> {
    if (this.categoryData[search + routeGeo + routeFreq]) {
      return Observable.of([this.categoryData[search + routeGeo + routeFreq]]);
    } else {
      let obsEnd, obsStart, freqGeos, geoFreqs;
      this.categoryData[search + routeGeo + routeFreq] = <CategoryData>{};
      this.seriesData = [];
      this._uheroAPIService.fetchSearchFilters(search).subscribe((filters) => {
        let searchFilters = filters;
        this.defaults = searchFilters.defaults;
        freqGeos = searchFilters.freq_geos;
        geoFreqs = searchFilters.geo_freqs;
        obsEnd = searchFilters.observationEnd;
        obsStart = searchFilters.observationStart;
      },
        (error) => {
          error = this.errorMessage = error;
        },
        () => {
          if (obsEnd && obsStart) {
            let dateWrapper = { firstDate: '', endDate: '' };
            this.searchSettings(search, dateWrapper, geoFreqs, freqGeos, routeGeo, routeFreq);
            this.categoryData[search + routeGeo + routeFreq].selectedCategory = 'Search: ' + search;
            this.categoryData[search + routeGeo + routeFreq].seriesData = this.seriesData;
          } else {
            this.categoryData[search + routeGeo + routeFreq].invalid = search;
          }
        });
      return Observable.forkJoin(Observable.of(this.categoryData[search + routeGeo + routeFreq]));
    }
  }

  searchSettings(search: string, dateWrapper: dateWrapper, geoFreqs, freqGeos, routeGeo?: string, routeFreq?: string) {
    let dateArray = [];
    let selectedFreq = routeFreq ? routeFreq : this.defaults.freq.freq;
    let selectedGeo = routeGeo ? routeGeo : this.defaults.geo.handle;
    let freqs, regions, currentFreq, currentGeo;
    freqs = geoFreqs.find(geo => geo.handle === selectedGeo).freqs;
    regions = freqGeos.find(freq => freq.freq === selectedFreq).geos;

    if (selectedGeo) {
      currentGeo = regions.find(region => region.handle === selectedGeo);
    } else {
      currentGeo = regions[0];
    }

    if (selectedFreq) {
      currentFreq = freqs.find(freq => freq.freq === selectedFreq);
    } else {
      currentFreq = freqs[0];
    }
    this.categoryData[search + routeGeo + routeFreq].regions = regions;
    this.categoryData[search + routeGeo + routeFreq].currentGeo = currentGeo;
    this.categoryData[search + routeGeo + routeFreq].frequencies = freqs;
    this.categoryData[search + routeGeo + routeFreq].currentFreq = currentFreq;
    this.getSearchData(search, currentGeo.handle, currentFreq.freq, dateArray, dateWrapper, routeGeo, routeFreq);
  }

  getSearchData(search: string, geo: string, freq: string, dateArray: Array<any>, dateWrapper: dateWrapper, routeGeo?: string, routeFreq?: string) {
    let searchResults;
    // Get expanded search results for a selected region & frequency
    this._uheroAPIService.fetchSearchSeriesExpand(search, geo, freq).subscribe((searchRes) => {
      searchResults = searchRes;
    },
      (error) => {
        error = this.errorMessage = error;
      },
      () => {
        if (searchResults) {
          // Get all series available from search results
          let searchSeries = [];
          searchResults.forEach((res, index) => {
            let seriesDates = [], series;
            let seriesObsStart = res.seriesObservations.observationStart;
            let seriesObsEnd = res.seriesObservations.observationEnd;
            let levelData = res.seriesObservations.transformationResults[0].observations;
            // Get array of dates for each series
            seriesDates = this._helper.seriesDateArray(seriesObsStart, seriesObsEnd, freq, seriesDates);
            if (seriesDates) {
              series = this._helper.dataTransform(res.seriesObservations, seriesDates);
              let sa = searchResults[index].seasonallyAdjusted;
              let freq = searchResults[index].frequencyShort;
              series['seriesInfo'] = searchResults[index];
              // Format information for category table tooltips: Display series title and source description/link if available
              series.seriesInfo.tooltipInfo = this.setTooltipInfo(series.seriesInfo);
              searchSeries.push(series);
            }
          });

          // Check if (non-annual) category has seasonally adjusted data
          // Returns true for annual data
          let hasSeasonallyAdjusted = this.checkSA(searchSeries);

          // Category chart and table displays (landing-page and category-table components) should only show seasonally adjusted series
          // If a category does not have any SA data (i.e. hasSeasonallyAdjusted === false), display the series in the category
          let displaySeries = [];
          this.seriesToDisplay(searchSeries, hasSeasonallyAdjusted, displaySeries);

          // Set date wrapper based on starting and ending dates of displaySeries;
          // Format data for category-table display
          this._helper.setDateWrapper(displaySeries, dateWrapper);

          // Get array of dates for entire subcategory, used for table view
          // Format data for category table display
          this._helper.categoryDateArray(dateWrapper.firstDate, dateWrapper.endDate, freq, dateArray);
          let catTable = this.formatCatTableData(displaySeries, dateArray, dateWrapper);
          let sublist = { name: search, dateRange: catTable.tableDates, datatables: catTable.datatables };
          this.categoryData[search + routeGeo + routeFreq].sublist = [sublist];
          this.seriesData.push({ dateWrapper: dateWrapper, sublist: sublist, displaySeries: displaySeries, allSeries: searchSeries, seasonallyAdjusted: hasSeasonallyAdjusted });
        };
      });
  }

  setTooltipInfo(seriesDetails) {
    let tooltip = '<b>' + seriesDetails.title + '</b>';
    if (seriesDetails.sourceDescription) {
      tooltip += '<br>' + seriesDetails.sourceDescription;
    }
    if (seriesDetails.sourceLink) {
      tooltip += '<br>' + seriesDetails.sourceLink;
    }
    if (seriesDetails.sourceDetails) {
      tooltip += '<br>' + seriesDetails.sourceDetails;
    }
    return tooltip;
  }

  checkSA(seriesArray) {
    let hasSeasonallyAdjusted, falseCount = 0;
    seriesArray.forEach((serie, index) => {
      if (serie.seriesInfo.seasonallyAdjusted === false) {
        hasSeasonallyAdjusted = false;
        falseCount += 1;
      }
    });
    if (falseCount === seriesArray.length) {
      return false;
    }
    return true;
  }

  seriesToDisplay(seriesList: Array<any>, hasSa: boolean, display: Array<any>) {
    seriesList.forEach((series) => {
      if (series.seriesInfo.seasonallyAdjusted !== false || hasSa === false) {
        display.push(series);
      }
    });
    return display;
  }

  formatCatTableData(displaySeries: Array<any>, dateArray: Array<any>, dateWrapper: dateWrapper) {
    displaySeries.forEach((series) => {
      series['categoryTable'] = this._helper.catTable(series.tableData, dateArray, dateWrapper);
    });
    let tableHeaderDates = [];
    let dateStart = dateWrapper.firstDate;
    let dateEnd = dateWrapper.endDate;
    dateArray.forEach((date) => {
      if (date.date >= dateStart && date.date <= dateEnd) {
        tableHeaderDates.push(date.tableDate);
      }
    });
    // Using datatables library for exporting functionality
    let datatables = this._helper.sublistTable(displaySeries, dateWrapper, tableHeaderDates);
    return { tableDates: tableHeaderDates, datatables: datatables };
  }
}
