import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { ToolsModule } from 'tools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CohHelpComponent } from './coh-help/coh-help.component';

@NgModule({
  declarations: [
    AppComponent,
    CohHelpComponent
  ],
  imports: [
    BrowserModule,
    ToolsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: 'environment',
      useValue: environment
    },
    {
      provide: 'rootCategory',
      useValue: 4429
    },
    {
      provide: 'defaultRange',
      useValue: { start: '', end: '', range: 10 }
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
