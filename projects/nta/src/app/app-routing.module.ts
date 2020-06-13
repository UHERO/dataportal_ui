import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeasurementLandingPageComponent } from 'tools';
import { SingleSeriesComponent } from 'tools';
import { AnalyzerComponent } from 'tools';
import { NtaHelpComponent } from './nta-help/nta-help.component';

const routes: Routes = [
  // map / to the landing page
  {
    path: '',
    component: MeasurementLandingPageComponent,
  },
  {
    path: 'category',
    component: MeasurementLandingPageComponent,
  },
  {
    path: 'search',
    component: MeasurementLandingPageComponent,
  },
  {
    path: 'series',
    component: SingleSeriesComponent,
  },
  {
    path: 'analyzer',
    component: AnalyzerComponent,
  },
  {
    path: 'help',
    component: NtaHelpComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 75],
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
