import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { UheroApiService } from './uhero-api.service';
import { CategoryTreeComponent } from './category-tree/category-tree.component';
import { MultiSeriesChartComponent } from './multi-series-chart/multi-series-chart.component';
import { GeoSelectorComponent } from './geo-selector/geo-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryTreeComponent,
    MultiSeriesChartComponent,
    GeoSelectorComponent,
  ],
  imports: [
    BrowserModule,
    ChartModule,
    FormsModule,
    HttpModule
  ],
  providers: [UheroApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
