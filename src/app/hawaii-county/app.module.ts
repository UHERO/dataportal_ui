import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { routing } from '../app.routes';
import { UheroApiService } from '../uhero-api.service';
import { CategoryHelperService } from '../category-helper.service';
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { SeriesHelperService } from '../series-helper.service';
import { HelperService } from '../helper.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';
import { HelpService } from '../help.service';
import { AnalyzerService } from '../analyzer.service';
import { TableHelperService } from '../table-helper.service';
import { AppComponent } from '../app.component';
import { CohHelpComponent } from '../coh-help/coh-help.component';
import { ClipboardService } from '../clipboard.service';

@NgModule({
  declarations: [
    CohHelpComponent
  ],
  imports: [
    Shared,
    routing,
    BrowserModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  entryComponents: [
    CohHelpComponent
  ],
  providers: [
    UheroApiService,
    DataPortalSettingsService,
    CategoryHelperService,
    SeriesHelperService,
    HelperService,
    HelpService,
    TableHelperService,
    GoogleAnalyticsEventsService,
    AnalyzerService,
    Title,
    ClipboardService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    {
      provide: 'rootCategory',
      useValue: 4429
    },
    {
      provide: 'logo',
      useValue: {
        altText: 'County of Hawaii Data Portal Logo',
        displayImg: true,
        headerText: 'County of Hawaii Data Portal',
        imgSrc: '../../assets/hawaii-county-logo-bw.svg',
        mobileLogo: false
      }
    },
    {
      provide: 'defaultRange',
      useValue: { start: '2007', end: '2017', range: 10 }
    },
    {
      provide: 'portal',
      useValue: {
        universe: 'coh',
        title: 'County of Hawaii Data Portal',
        favicon: 'hawaii-county-seal.png',
        feedback: false,
        categoryTabs: false // Display subcategory navigation tabs in category chart/table view
      }
    },
    {
      provide: 'GoogleAnalyticsId',
      useValue: 'UA-18074519-5'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
