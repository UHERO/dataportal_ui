import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { RecaptchaModule } from 'ng2-recaptcha';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { UheroApiService } from './uhero-api.service';
import { CategoryHelperService } from './category-helper.service';
import { SeriesHelperService } from './series-helper.service';
import { HelperService } from './helper.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GeoSelectorComponent } from './geo-selector/geo-selector.component';
import { SingleSeriesComponent } from './single-series/single-series.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { HighchartComponent } from './highchart/highchart.component';
import { FreqSelectorComponent } from './freq-selector/freq-selector.component';
import { HighstockComponent } from './highstock/highstock.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FeedbackComponent } from './feedback/feedback.component';

// Testing
import { RouterLinkStubDirective, QueryParamsStubDirective, RouterOutletStubComponent } from '../testing/router-stubs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    GeoSelectorComponent,
    SingleSeriesComponent,
    SidebarNavComponent,
    HighchartComponent,
    FreqSelectorComponent,
    HighstockComponent,
    CategoryTableComponent,
    SearchBarComponent,
    FeedbackComponent,
    RouterLinkStubDirective,
    QueryParamsStubDirective,
    RouterOutletStubComponent
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
  providers: [UheroApiService, CategoryHelperService, SeriesHelperService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
