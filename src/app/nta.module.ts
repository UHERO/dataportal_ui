import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
// Temp workaround for build errors
// See: https://github.com/gevgeny/angular2-highcharts/issues/160
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
declare var require: any;
export function highchartsFactory() {
  const highcharts = require('highcharts/highstock');
  const exp = require('highcharts/modules/exporting');
  const offlineExport = require('highcharts/modules/offline-exporting');
  const csv = require('./csv-export');

  exp(highcharts);
  offlineExport(highcharts);
  csv(highcharts);
  highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
  });
  return (highcharts);
}

import { DataTableModule, SharedModule } from 'primeng/primeng';
import { RecaptchaModule } from 'ng2-recaptcha';
import { routing } from './nta.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { UheroApiService } from './uhero-api.service';
import { CategoryHelperService } from './category-helper.service';
import { SeriesHelperService } from './series-helper.service';
import { HelperService } from './helper.service';
import { GoogleAnalyticsEventsService } from './google-analytics-events.service';
import { NtaLayoutComponent } from './nta-layout/nta-layout.component';
import { GeoSelectorComponent } from './geo-selector/geo-selector.component';
import { SingleSeriesComponent } from './single-series/single-series.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { HighchartComponent } from './highchart/highchart.component';
import { FreqSelectorComponent } from './freq-selector/freq-selector.component';
import { HighstockComponent } from './highstock/highstock.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CategoryDatatablesComponent } from './category-datatables/category-datatables.component';
import { CategoryChartsComponent } from './category-charts/category-charts.component';
import { DateSliderComponent } from './date-slider/date-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GeoSelectorComponent,
    SingleSeriesComponent,
    SidebarNavComponent,
    HighchartComponent,
    FreqSelectorComponent,
    HighstockComponent,
    CategoryTableComponent,
    SearchBarComponent,
    FeedbackComponent,
    CategoryDatatablesComponent,
    CategoryChartsComponent,
    DateSliderComponent,
    NtaLayoutComponent,
  ],
  imports: [
    BrowserModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    DataTableModule, SharedModule,
    RecaptchaModule.forRoot()
  ],
  providers: [
    UheroApiService,
    CategoryHelperService,
    SeriesHelperService,
    HelperService,
    GoogleAnalyticsEventsService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    {
      provide: 'rootCategory',
      useValue: 59
    },
    {
      provide: 'logo',
      useValue: '../../assets/nta-logo.svg'
    },
    {
      provide: 'seriesType',
      useValue: 'line'
    }
  ],
  bootstrap: [AppComponent]
})
export class NtaModule { }
