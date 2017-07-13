import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
// Temp workaround for build errors
// See: https://github.com/gevgeny/angular2-highcharts/issues/160
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
declare var require: any;
export function highchartsFactory() {
  const highcharts = require('highcharts/js/highstock');
  const exp = require('highcharts/js/modules/exporting');
  const offlineExport = require('highcharts/js/modules/offline-exporting');
  const csv = require('../csv-export');

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
import { Shared } from '../shared/shared.module';
import { routing } from '../nta.routes';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { RecaptchaModule } from 'ng2-recaptcha';
import { AppComponent } from './app.component';
import { UheroApiService } from '../uhero-api.service';
import { NtaHelperService } from './nta-helper.service';
// import { CategoryHelperService } from '../category-helper.service';
import { SeriesHelperService } from '../series-helper.service';
import { HelperService } from '../helper.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';
import { NtaLayoutComponent } from './nta-layout/nta-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NtaLayoutComponent
  ],
  imports: [
    Shared,
    routing,
    BrowserModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule, SharedModule,
    RecaptchaModule.forRoot()
  ],
  providers: [
    UheroApiService,
    // CategoryHelperService,
    NtaHelperService,
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
      provide: 'highchartInfo',
      useValue: { series1Name: 'c5ma', series1Type: 'line' }
    },
    {
      provide: 'highstockInfo',
      useValue: { series0Name: 'c5ma', series0Type: 'line' }
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
