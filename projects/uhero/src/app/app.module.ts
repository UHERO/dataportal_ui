import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { ToolsModule } from 'tools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UheroHelpComponent } from './uhero-help/uhero-help.component';

@NgModule({
  declarations: [
    AppComponent,
    UheroHelpComponent,
  ],
  imports: [
    BrowserModule,
    ToolsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: 'environment',
      useValue: environment
    },
    {
      provide: 'rootCategory',
      useValue: 59
    },
    {
      provide: 'defaultRange',
      useValue: { start: '', end: '', range: 10 }
    },
    {
      provide: 'portal',
      useValue: {
        universe: 'uhero',
        feedback: true,
        categoryTabs: true // Display subcategory navigation tabs in category chart/table view
      }
    },
    {
      provide: 'logo',
      useValue: {
        altText: 'UHERO Data Portal Logo',
        analyticsLogoSrc: 'assets/Analytics_Logo.svg',
        displayImg: true,
        headerText: '',
        imgSrc: 'assets/UHEROdata-Logo-color.svg',
        mobileLogo: true
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
