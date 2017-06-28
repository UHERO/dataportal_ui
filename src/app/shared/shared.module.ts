import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { RecaptchaModule } from 'ng2-recaptcha';
import { HeaderComponent } from '../header/header.component';
import { SingleSeriesComponent } from '../single-series/single-series.component';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';
import { HighchartComponent } from '../highchart/highchart.component';
import { FreqSelectorComponent } from '../freq-selector/freq-selector.component';
import { GeoSelectorComponent } from '../geo-selector/geo-selector.component'
import { HighstockComponent } from '../highstock/highstock.component';
import { CategoryTableComponent } from '../category-table/category-table.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { CategoryDatatablesComponent } from '../category-datatables/category-datatables.component';
import { CategoryChartsComponent } from '../category-charts/category-charts.component';
import { DateSliderComponent } from '../date-slider/date-slider.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SingleSeriesComponent,
    SidebarNavComponent,
    HighchartComponent,
    FreqSelectorComponent,
    HighstockComponent,
    CategoryTableComponent,
    SearchBarComponent,
    FeedbackComponent,
    CategoryDatatablesComponent,
    CategoryChartsComponent,
    DateSliderComponent,
    GeoSelectorComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    DataTableModule, SharedModule,
    RecaptchaModule.forRoot()
  ],
  exports: [
    FormsModule,
    CommonModule,
    HeaderComponent,
    SingleSeriesComponent,
    SidebarNavComponent,
    HighchartComponent,
    FreqSelectorComponent,
    HighstockComponent,
    CategoryTableComponent,
    SearchBarComponent,
    FeedbackComponent,
    CategoryDatatablesComponent,
    CategoryChartsComponent,
    DateSliderComponent,
    GeoSelectorComponent
  ]
})
export class Shared { }
