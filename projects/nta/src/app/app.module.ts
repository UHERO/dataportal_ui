import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { ToolsModule } from 'tools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NtaHelpComponent } from './nta-help/nta-help.component';

@NgModule({
  declarations: [
    AppComponent,
    NtaHelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolsModule
  ],
  providers: [
    {
      provide: 'environment',
      useValue: environment
    },
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
        feedback: false,
        categoryTabs: false // Display subcategory navigation tabs in category chart/table view
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
