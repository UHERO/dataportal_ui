import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { UheroApiService } from './uhero-api.service';
import { SeriesMultiplesComponent } from './series-multiples/series-multiples.component';
import { CategoryTreeComponent } from './category-tree/category-tree.component';
import { MultiSeriesChartComponent } from './multi-series-chart/multi-series-chart.component';
import { GeoSelectorComponent } from './geo-selector/geo-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SeriesMultiplesComponent,
    CategoryTreeComponent,
    MultiSeriesChartComponent,
    GeoSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [UheroApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
