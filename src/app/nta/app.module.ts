import { BrowserModule, Title } from '@angular/platform-browser';
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
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { SeriesHelperService } from '../series-helper.service';
import { HelperService } from '../helper.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';
import { HelpService } from '../help.service';
import { NtaHelpComponent } from '../nta-help/nta-help.component';
import { NtaLayoutComponent } from './nta-layout/nta-layout.component';
import { MeasurementSelectorComponent } from '../measurement-selector/measurement-selector.component';
import { SeriesPagingComponent } from '../series-paging/series-paging.component';

@NgModule({
  declarations: [
    AppComponent,
    NtaLayoutComponent,
    NtaHelpComponent,
    MeasurementSelectorComponent,
    SeriesPagingComponent
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
  entryComponents: [
    NtaHelpComponent
  ],
  providers: [
    UheroApiService,
    DataPortalSettingsService,
    NtaHelperService,
    SeriesHelperService,
    HelperService,
    GoogleAnalyticsEventsService,
    HelpService,
    Title,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    {
      provide: 'rootCategory',
      useValue: 2487
    },
    {
      provide: 'defaultCategory',
      useValue: 2597
    },
    {
      provide: 'logo',
      useValue: '../../assets/nta-logo.svg'
    },
    {
      provide: 'defaultRange',
      useValue: { start: '2000', end: '2040', range: 40 }
    },
    {
      provide: 'portal',
      useValue: 'nta'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
