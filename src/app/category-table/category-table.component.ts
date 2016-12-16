import { Component, OnInit, ViewChild, ViewChildren, ViewEncapsulation, AfterViewInit, QueryList, AfterViewChecked, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';
import { Frequency } from '../frequency';
import { Geography } from '../geography';
import { FirstDateWrapper } from '../first-date-wrapper';

import { error } from 'util';


@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryTableComponent implements OnInit, AfterViewInit {
  @ViewChildren('tableScroll') private tableEl;

  private selectedCategory;
  private sublist: Array<any> = [];
  private categories;
  private id: number;
  
  // Check if seasonally adjusted data is displayed, default to true
  private saIsActive: boolean = true;
  private yoyIsActive: boolean = false;
  private ytdIsActive: boolean = false;
  private userEvent: boolean = false;
  private errorMessage: string;

  private seriesData = [];
  private categoryData = [];

  // Variables for geo and freq selectors
  private geoHandle: string;
  private freqHandle: string;
  private defaultFreq: string;
  private defaultGeo: string;
  public regions = [];
  public freqs = [];
  public currentGeo: Geography;
  public currentFreq: Frequency;

  constructor(private _uheroAPIService: UheroApiService, private _helper: HelperService, private route: ActivatedRoute, private renderer: Renderer) { }

  ngOnInit() {
    this.currentGeo = {fips: null, name: null, handle: null};
    this.currentFreq = {freq: null, label: null};
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
      if (isNaN(this.id)) {
        this.id = 42;
        this.initContent(42);
        // this.drawSeriesTable(42);
      } else {
        // this.drawSeriesTable(this.id);
        this.initContent(this.id);
      }
    });
  }

  ngAfterViewChecked() {
    // Do not force scroll to the right if mouseover event occurs
    // Prevents scrollbar from resetting to the right afer manually scrolling
    if (!this.userEvent) {
      this.tableScroll();
    }
  }

  // Called on page load
  // Gets data sublists available for a selected category
  initContent(catId: number) {
    let geoArray = [];
    let freqArray = [];

    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if (categories[index]['id'] === catId) {
          this.selectedCategory = categories[index]['name'];
          this.sublist = categories[index]['children'];

          // Get a sublist's default geo/freq if available
          if (categories[index]['defaults']) {
            this.defaultFreq = categories[index]['defaults']['freq'];
            this.defaultGeo  = categories[index]['defaults']['geo'];
          } else {
            this.defaultFreq = '';
            this.defaultGeo = '';
          }

          // this.firstDateWrapper = {firstDate: ''};
          this.sublist.forEach((sub, index) => {
            let firstDateWrapper = {firstDate: ''};
            this.initSettings(this.sublist[index], geoArray, freqArray, firstDateWrapper);
          });
        } else {
          return
        }
      },
      this.seriesData = []);
    });
  }

  // Get regions and frequencies available for a selected category
  initSettings(sublistIndex, regions: Array<any>, freqs: Array<any>, firstDateWrapper: FirstDateWrapper) {
    let dateArray = [];

    this._uheroAPIService.fetchGeographies(sublistIndex['id']).subscribe((geos) => {
      geos.forEach((geo, index) => {
        this._helper.uniqueGeos(geos[index], regions);
      });
      this.regions = regions;

      this.regions.forEach((geo, index) => {
        if (this.defaultGeo === this.regions[index]['handle']) {
          this.currentGeo = this.regions[index];
        } else {
          this.currentGeo = this.regions[0];
        }
      });

      this._uheroAPIService.fetchFrequencies(sublistIndex['id']).subscribe((frequencies) => {
        frequencies.forEach((frequency, index) => {
          this._helper.uniqueFreqs(frequencies[index], freqs);
        });
        this.freqs = freqs;

        // If a default freq. is available, export as current frequency on page load
        this.freqs.forEach((freq, index) => {
          if (this.defaultFreq === this.freqs[index]['label']) {
            this.currentFreq = this.freqs[index];
          } else {
            this.currentFreq = this.freqs[0];
          }
        });

        // Fetch data for current region/frequency settings
        this.sublistData(sublistIndex, this.currentGeo.handle, this.currentFreq.freq, dateArray, firstDateWrapper);
      });
    });
  }

  // Get series for each subcategory
  sublistData(sublistIndex, geoHandle: string, freqFrequency: string, dates: Array<any>, firstDateWrapper: FirstDateWrapper) {
    this._uheroAPIService.fetchSelectedCategory(sublistIndex['id']).subscribe((cat) => {
      this._helper.calculateDateArray(cat['observationStart'], cat['observationEnd'], freqFrequency, dates);
    });

    this._uheroAPIService.fetchMultiChartData(sublistIndex['id'], geoHandle, freqFrequency, dates, firstDateWrapper).subscribe((results) => {
      sublistIndex['date range'] = dates;

      // Get first date wrapper from cached data
      results.forEach((res, index) => {
        let series = results[index];
        series.forEach((serie, index) => {
          if (firstDateWrapper.firstDate === '' || series[index].firstDate < firstDateWrapper.firstDate) {
            firstDateWrapper.firstDate = series[index].firstDate;
          }
        });
      });
      
      this.seriesData.push({'firstDateWrapper':firstDateWrapper, 'sublist': sublistIndex, 'series': results[0]});
      console.log('series data', this.seriesData);
    });
  }

  // Update table data when a new region/frequency is selected
  redrawTableGeo(event) {
    // Reset table scrollbar position to the right when new region is selected
    this.userEvent = false;
    this.geoHandle = event.handle;
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if (categories[index]['id'] === this.id) {
          this.sublist = categories[index]['children'];
          this.sublist.forEach((sub, index) => {
            let dateArray = [];
            let firstDateWrapper = {firstDate: ''};
            this.sublistData(this.sublist[index], this.geoHandle, this.currentFreq.freq, dateArray, firstDateWrapper);
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
    // Reset table scrollbar position to the right when new frequency is selected
    this.userEvent = false;
    this.freqHandle = event.freq;
    this._uheroAPIService.fetchCategories().subscribe((category) => {
      let categories = category;

      categories.forEach((category, index) => {
        if (categories[index]['id'] === this.id) {
          this.sublist = categories[index]['children'];
          this.sublist.forEach((sub, index) => {
            let dateArray = [];
            let firstDateWrapper = {firstDate: ''};
            this.sublistData(this.sublist[index], this.currentGeo.handle, this.freqHandle, dateArray, firstDateWrapper);
          });
        } else {
          return;
        }
      },
      this.seriesData = []);
    },
    error => this.errorMessage = error);
  }

  saActive(e) {
    this.saIsActive = e.target.checked;
  }

  yoyActive(e) {
    this.yoyIsActive = e.target.checked;
  }

  ytdActive(e) {
    this.ytdIsActive = e.target.checked;
  }

  scrollTo(location: string): void {
    console.log(location)
    window.location.hash = location;
  }

  // On load, table scrollbars should start at the right -- showing most recent data
  tableScroll(): void {
    try {
      this.tableEl._results.forEach((el, index) => {
        this.tableEl._results[index].nativeElement.scrollLeft = this.tableEl._results[index].nativeElement.scrollWidth;
      })
    } catch(err) {
      console.log(err) 
    } 
  }

  userMouse(): void {
    this.userEvent = true;
  }
}
