import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { Shared } from './shared/shared.module';
import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { UheroApiService } from './uhero-api.service';
import { CategoryHelperService } from './category-helper.service';
import { DataPortalSettingsService } from './data-portal-settings.service';
import { SeriesHelperService } from './series-helper.service';
import { HelperService } from './helper.service';
import { GoogleAnalyticsEventsService } from './google-analytics-events.service';
import { HelpService } from './help.service';
import { AnalyzerService } from './analyzer.service';
import { TableHelperService } from './table-helper.service';
import { HighstockHelperService } from './highstock-helper.service';
import { UheroHelpComponent } from './uhero-help/uhero-help.component';
import { ClipboardService } from './clipboard.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UheroHelpComponent
  ],
  imports: [
    Shared,
    routing,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  entryComponents: [
    UheroHelpComponent
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
    HighstockHelperService,
    {
      provide: 'rootCategory',
      useValue: 59
    },
    {
      provide: 'logo',
      useValue: {
        altText: 'UHERO Data Portal Logo',
        displayImg: true,
        headerText: '',
        imgSrc: '../../assets/UHEROdata-Logo-color.svg',
        mobileLogo: true
      }
    },
    {
      provide: 'defaultRange',
      useValue: { start: '', end: '', range: 10 }
    },
    {
      provide: 'portal',
      useValue: {
        universe: 'uhero',
        title: 'Data Portal',
        favicon: 'manoa.jpg',
        feedback: true,
        categoryTabs: true // Display subcategory navigation tabs in category chart/table view
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
      useValue: 'UA-18074519-3'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
