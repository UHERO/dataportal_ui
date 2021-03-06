import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolsComponent } from './tools.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { PrimengMenuNavComponent } from './primeng-menu-nav/primeng-menu-nav.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CalendarModule } from 'primeng/calendar';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CategoryChartsComponent } from './category-charts/category-charts.component';
import { CategoryTableViewComponent } from './category-table-view/category-table-view.component';
import { DateSliderComponent } from './date-slider/date-slider.component';
import { FreqSelectorComponent } from './freq-selector/freq-selector.component';
import { GeoSelectorComponent } from './geo-selector/geo-selector.component';
import { HighchartComponent } from './highchart/highchart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AgGridModule } from 'ag-grid-angular';
import { CategoryTableRenderComponent } from './category-table-render/category-table-render.component';
import { SingleSeriesComponent } from './single-series/single-series.component';
import { HighstockComponent } from './highstock/highstock.component';
import { ShareLinkComponent } from './share-link/share-link.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AnalyzerComponent } from './analyzer/analyzer.component';
import { AnalyzerHighstockComponent } from './analyzer-highstock/analyzer-highstock.component';
import { AnalyzerTableComponent } from './analyzer-table/analyzer-table.component';
import { AnalyzerInteractionsEditorComponent } from './analyzer-interactions-editor/analyzer-interactions-editor.component';
import { AnalyzerInteractionsRendererComponent } from './analyzer-interactions-renderer/analyzer-interactions-renderer.component';
import { AnalyzerStatsRendererComponent } from './analyzer-stats-renderer/analyzer-stats-renderer.component';
import { AnalyzerTableRendererComponent } from './analyzer-table-renderer/analyzer-table-renderer.component';
import { MeasurementLandingPageComponent } from './measurement-landing-page/measurement-landing-page.component';
import { MeasurementSelectorComponent } from './measurement-selector/measurement-selector.component';
import { EmbedGraphComponent } from './embed-graph/embed-graph.component';

@NgModule({
  declarations: [
    ToolsComponent,
    HeaderComponent,
    PrimengMenuNavComponent,
    LandingPageComponent,
    CategoryChartsComponent,
    CategoryTableViewComponent,
    DateSliderComponent,
    FreqSelectorComponent,
    GeoSelectorComponent,
    HighchartComponent,
    CategoryTableRenderComponent,
    SingleSeriesComponent,
    HighstockComponent,
    ShareLinkComponent,
    SearchBarComponent,
    AnalyzerComponent,
    AnalyzerHighstockComponent,
    AnalyzerTableComponent,
    AnalyzerInteractionsEditorComponent,
    AnalyzerInteractionsRendererComponent,
    AnalyzerStatsRendererComponent,
    AnalyzerTableRendererComponent,
    MeasurementLandingPageComponent,
    MeasurementSelectorComponent,
    EmbedGraphComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    SliderModule,
    PanelMenuModule,
    CalendarModule,
    HighchartsChartModule,
    AgGridModule.withComponents([
      CategoryTableRenderComponent,
      AnalyzerTableRendererComponent,
      AnalyzerStatsRendererComponent,
      AnalyzerInteractionsEditorComponent,
      AnalyzerInteractionsRendererComponent
    ])
  ],
  exports: [
    ToolsComponent,
    HeaderComponent,
    PrimengMenuNavComponent,
    LandingPageComponent,
    CategoryChartsComponent,
    CategoryTableViewComponent,
    FreqSelectorComponent,
    GeoSelectorComponent,
    HighchartComponent,
    SingleSeriesComponent,
    HighstockComponent,
    ShareLinkComponent,
    SearchBarComponent,
    AnalyzerComponent,
    AnalyzerHighstockComponent,
    AnalyzerTableComponent,
    AnalyzerInteractionsEditorComponent,
    AnalyzerInteractionsRendererComponent,
    AnalyzerStatsRendererComponent,
    AnalyzerTableRendererComponent,
    MeasurementLandingPageComponent,
    MeasurementSelectorComponent
  ]
})
export class ToolsModule { }
