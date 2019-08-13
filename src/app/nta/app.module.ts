import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { Shared } from '../shared/shared.module';
import { routing } from '../nta.routes';
import { SharedModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { UheroApiService } from '../uhero-api.service';
import { NtaHelperService } from './nta-helper.service';
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { SeriesHelperService } from '../series-helper.service';
import { HelperService } from '../helper.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';
import { TableHelperService } from '../table-helper.service';
import { HelpService } from '../help.service';
import { AnalyzerService } from '../analyzer.service';
import { HighstockHelperService } from '../highstock-helper.service';
import { AppComponent } from '../app.component';
import { NtaHelpComponent } from '../nta-help/nta-help.component';
import { NtaLayoutComponent } from './nta-layout/nta-layout.component';
import { MeasurementSelectorComponent } from '../measurement-selector/measurement-selector.component';
import { ClipboardService } from '../clipboard.service';

@NgModule({
  declarations: [
    NtaLayoutComponent,
    NtaHelpComponent,
    MeasurementSelectorComponent
  ],
  imports: [
    Shared,
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule,
    TableModule,
    SharedModule,
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
    AnalyzerService,
    TableHelperService,
    GoogleAnalyticsEventsService,
    HelpService,
    ClipboardService,
    HighstockHelperService,
    Title,
    {
      provide: 'rootCategory',
      useValue: 2487
    },
    {
      provide: 'logo',
      useValue: {
        altText: 'NTA Data Portal Logo',
        displayImg: true,
        headerText: '',
        imgSrc: '../../assets/nta-logo.svg',
        mobileLogo: true,
      }
    },
    {
      provide: 'defaultRange',
      useValue: { start: '2000', end: '2040', range: 40 }
    },
    {
      provide: 'portal',
      useValue: {
        universe: 'nta',
        title: 'NTA Data Portal',
        favicon: 'nta-logo.png',
        feedback: false,
        categoryTabs: false // Display subcategory navigation tabs in category chart/table view
      }
    },
    {
      provide: 'navigation',
      useValue: {
        subcategories: false
      }
    },
    {
      provide: 'GoogleAnalyticsId',
      useValue: 'UA-18074519-4'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
