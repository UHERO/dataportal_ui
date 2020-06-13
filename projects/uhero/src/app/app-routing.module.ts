import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from 'tools';
import { SingleSeriesComponent } from 'tools';
import { AnalyzerComponent } from 'tools';
import { UheroHelpComponent } from './uhero-help/uhero-help.component';

const routes: Routes = [
  // map / to the landing page
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'category',
    component: LandingPageComponent
  },
  {
    path: 'search',
    component: LandingPageComponent
  },
  {
    path: 'series',
    component: SingleSeriesComponent
  },
  {
    path: 'analyzer',
    component: AnalyzerComponent
  },
  {
    path: 'help',
    component: UheroHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', scrollOffset: [0, 75] })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
