import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';

import { error } from 'util';


@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryTableComponent implements OnInit {
  private selectedCategory;
  private sublist;
  private categories;
  private id: number;
  private errorMessage: string;

  private seriesData = [];
  private categoryData = [];
  private dateRange = ["1995-01-01", "2015-01-01"]
  // private dateArray = [];

  // Variables for geo and freq selectors
  private geoHandle: string;
  private freqHandle: string;
  private defaultFreq: string;
  private defaultGeo: string;
  public regions = [];
  public freqs = [];
  public currentGeo: Geography;
  public currentFreq: Frequency;

  constructor(private _uheroAPIService: UheroApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentGeo = {fips: null, name: null, handle: null};
    this.currentFreq = {freq: null, label: null};
  }

  ngAfterViewInit() {
    //this.calculateDateArray(this.dateRange, this.dateArray)
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
      if (isNaN(this.id)) {
        this.id = 42;
        this.drawSeriesTable(42);
      } else {
        this.drawSeriesTable(this.id);
      }
    });
  }

  calculateDateArray(dateStart, dateEnd, dateArray) {
    let start = +dateStart.substring(0,4);
    let end = +dateEnd.substring(0,4);
    let append = dateStart.substring(5,10);

    while (start < end) {
      dateArray.push(start.toString() + '-' + append);
      start+=1;
    }
    // console.log('date array', this.dateArray)
  }

  drawSeriesTable(catId: number) {
    let geoArray = [];
    let freqArray = [];

    // this.currentFreq = this.freqs[0];
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        // Look for selected category in list of available categories
        if (categories[index]['id'] === catId) {
          this.selectedCategory = categories[index]['name'];
          this.sublist = categories[index]['children'];

          // Get a category's default geo and freq if available
          if (categories[index]['defaults']) {
            this.defaultFreq = categories[index]['defaults']['freq'];
            this.defaultGeo = categories[index]['defaults']['geo'];
          } else {
            this.defaultFreq = '';
            this.defaultGeo = '';
          }

          //let sublistItemsProcessed = 0;

          this.sublist.forEach((sub, index) => {
            console.log('sublist', this.sublist[index])

            let dateArray = [];
            this.calculateDateArray(this.sublist[index]['observationStart'], this.sublist[index]['observationEnd'], dateArray);
            console.log('sublist dates', dateArray)
            //sublistItemsProcessed++;
            this._uheroAPIService.fetchGeographies(this.sublist[index]['id']).subscribe((geos) => {
              geos.forEach((geo, index) => {
                this.uniqueGeos(geos[index], geoArray);
              });
              this.regions = geoArray;

              // If a default geo is available, export as current geography on page load
              this.regions.forEach((geo, index) => {
                if (this.defaultGeo === this.regions[index]['handle']) {
                  this.currentGeo = this.regions[index];
                } else {
                  this.currentGeo = this.regions[0];
                }
              })

              this._uheroAPIService.fetchFrequencies(this.sublist[index]['id']).subscribe((frequencies) => {
                frequencies.forEach((frequency, index) => {
                  this.uniqueFreqs(frequencies[index], freqArray);
                });
                this.freqs = freqArray;

                // If a default freq. is available, export as current frequency on page load
                this.freqs.forEach((freq, index) => {
                  if (this.defaultFreq === this.freqs[index]['label']) {
                    this.currentFreq = this.freqs[index];
                  } else {
                    this.currentFreq = this.freqs[0];
                  }
                });

                this._uheroAPIService.fetchMultiChartData(this.sublist[index]['id'], this.currentGeo.handle, this.currentFreq.freq).subscribe((results) => {
                  this.sublist[index]['date range'] = dateArray;
                  this.seriesData.push({'sublist': this.sublist[index], 'series': results[0]});
                  console.log('series data', this.seriesData)

                  /* if (sublistItemsProcessed === this.seriesData.length) {
                    console.log(sublistItemsProcessed)
                    this.findDateRange(this.seriesData);
                  } */
                });
              });
            });
          });
        } else {
          return;
        }
      },
      this.seriesData = []);
    },
    error => this.errorMessage = error);
    // callback(this.seriesData)
  }

  findDateRange(seriesData) {
    console.log('data callback', seriesData);
    console.log('start date', this.dateRange[0])
    
    for (let i = 0; i < seriesData.length; i++) {
      console.log('sublist', seriesData[i]);
      let dateArray = [];
      let startDates = [];
      let endDates = [];
      let append;
      let series = seriesData[i]['sublist']['series'];
      console.log('sublist series', series)

      for (let j = 0; j < series.length; j++) {
        let start = series[j]['observations']['start'];
        let end = series[j]['observations']['end'];
        console.log('start', start);
        // console.log('end', end);
      }

    }
    /* for (let i = 0; i < this.seriesData.length; i++) {
      let dateArray = [];
      let startDates = [];
      let endDates = [];
      let append;
      let series$ = this.seriesData[i]['sublist']['series']
      console.log('sublist index', i)

      for (let j = 0; j < series$.length; j++) {
        let start = series$[j]['observations']['start'];
        let end = series$[j]['observations']['end'];
        let minYear = +start.substring(0, 4);
        let maxYear = +end.substring(0, 4);
        append = start.substring(5);
        startDates.push(minYear);
        endDates.push(maxYear);
        console.log('sublist', this.sublist[index])
        console.log('start', startDates);
        console.log('end', endDates)
      }
      if (startDates.length !== 0 && endDates.length !== 0) {
        let startYear = Math.min(...startDates);
        let endYear = Math.max(...endDates);
        while (startYear <= endYear) {
          dateArray.push(startYear.toString() + '-' + append)
          startYear+=1 ;
        }
        // this.sublist[index]['date range'] = dateArray;
        // this.categoryData.push(this.sublist[index]);
        // console.log(this.categoryData)
        } else {
          return
        }
          console.log('date range', dateArray)
        } */
    return seriesData;
  }

  // Update table data when a new region/frequency is selected
  redrawTableGeo(event) {
    this.geoHandle = event.handle;
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if (categories[index]['id'] === this.id) {
          this.sublist = categories[index]['children'];
          this.sublist.forEach((sub, index) => {
              this._uheroAPIService.fetchMultiChartData(this.sublist[index]['id'], event.handle, this.currentFreq.freq).subscribe((results) => {
                this.seriesData.push({'sublist': this.sublist[index], 'series': results[0]});
              });
          });
        } else {
          return;
        }
      },
      this.seriesData = []);
    },
    error => this.errorMessage = error);
  }

  redrawTableFreq(event) {
    this.freqHandle = event.freq;
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if (categories[index]['id'] === this.id) {
          this.sublist = categories[index]['children'];
          this.sublist.forEach((sub, index) => {
              this._uheroAPIService.fetchMultiChartData(this.sublist[index]['id'], this.currentGeo.handle, event.freq).subscribe((results) => {
                this.seriesData.push({'sublist': this.sublist[index], 'series': results[0]});
              });
          });
        } else {
          return;
        }
      },
      this.seriesData = []);
    },
    error => this.errorMessage = error);
  }

  // Get a unique array of available regions for a category
  uniqueGeos(geo, geoList) {
    let exist = false;
    for (let i in geoList) {
      if (geo.name === geoList[i].name) {
        exist = true;
      }
    }

    if (!exist) {
      geoList.push(geo);
    }
  }

  // Get a unique array of available frequencies for a category
  uniqueFreqs(freq, freqList) {
    let exist = false;
    for (let i in freqList) {
      if (freq.label === freqList[i].label) {
        exist = true;
      }
    }

    if (!exist && (freq.freq === 'A' || freq.freq === 'M' || freq.freq === 'Q')) {
      freqList.push(freq);
    }
  }


  scrollTo(location: string): void {
    window.location.hash = location;
  }


}
