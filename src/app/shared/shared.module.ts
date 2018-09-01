import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { AgGridModule } from 'ag-grid-angular';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppComponent } from '../app.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { HeaderComponent } from '../header/header.component';
import { SingleSeriesComponent } from '../single-series/single-series.component';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';
import { HighchartComponent } from '../highchart/highchart.component';
import { FreqSelectorComponent } from '../freq-selector/freq-selector.component';
import { GeoSelectorComponent } from '../geo-selector/geo-selector.component';
import { HighstockComponent } from '../highstock/highstock.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { CategoryDatatablesComponent } from '../category-datatables/category-datatables.component';
import { CategoryChartsComponent } from '../category-charts/category-charts.component';
import { DateSliderComponent } from '../date-slider/date-slider.component';
import { AnalyzerComponent } from '../analyzer/analyzer.component';
import { AnalyzerTableComponent } from '../analyzer-table/analyzer-table.component';
import { AnalyzerHighstockComponent } from '../analyzer-highstock/analyzer-highstock.component';
import { HelpComponent } from '../help/help.component';
import { HelpDirective } from '../help.directive';
import { ShareLinkComponent } from '../share-link/share-link.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CategoryTableViewComponent } from '../category-table-view/category-table-view.component';
import { CategoryTableRendererComponent } from '../category-table-renderer/category-table-renderer.component';
import { AnalyzerTableRendererComponent } from '../analyzer-table-renderer/analyzer-table-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    SingleSeriesComponent,
    SidebarNavComponent,
    HighchartComponent,
    FreqSelectorComponent,
    HighstockComponent,
    SearchBarComponent,
    FeedbackComponent,
    CategoryDatatablesComponent,
    CategoryChartsComponent,
    DateSliderComponent,
    GeoSelectorComponent,
    AnalyzerComponent,
    AnalyzerHighstockComponent,
    AnalyzerTableComponent,
    HelpComponent,
    HelpDirective,
    ShareLinkComponent,
    CategoryTableViewComponent,
    CategoryTableRendererComponent,
    AnalyzerTableRendererComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    DataTableModule, SharedModule,
    TableModule,
    RecaptchaModule.forRoot(),
    AgGridModule.withComponents([CategoryTableRendererComponent, AnalyzerTableRendererComponent
    ])
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
    SearchBarComponent,
    FeedbackComponent,
    CategoryDatatablesComponent,
    CategoryChartsComponent,
    DateSliderComponent,
    GeoSelectorComponent,
    CategoryTableViewComponent,
    CategoryTableRendererComponent,
    AnalyzerTableRendererComponent
  ]
})
export class Shared { }
