import { Routes, RouterModule } from '@angular/router';

import { NtaLayoutComponent } from './nta/nta-layout/nta-layout.component';
import { SingleSeriesComponent } from './single-series/single-series.component';
import { CategoryTableViewComponent } from './category-table-view/category-table-view.component';
import { AnalyzerComponent } from './analyzer/analyzer.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  // map / to the landing page
  {
    path: '',
    component: NtaLayoutComponent
  },
  {
    path: 'category',
    component: NtaLayoutComponent
  },
  {
    path: 'search',
    component: NtaLayoutComponent
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

export const routing = RouterModule.forRoot(routes, { useHash: true, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', scrollOffset: [0, 75] });
