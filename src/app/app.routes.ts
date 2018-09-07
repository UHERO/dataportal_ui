import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleSeriesComponent } from './single-series/single-series.component';
import { CategoryTableViewComponent } from './category-table-view/category-table-view.component';
import { AnalyzerComponent } from './analyzer/analyzer.component';
import { HelpComponent } from './help/help.component';

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
    component: HelpComponent
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
