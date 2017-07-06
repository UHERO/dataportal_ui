import { Routes, RouterModule } from '@angular/router';

import { NtaLayoutComponent } from './nta/nta-layout/nta-layout.component';
import { SingleSeriesComponent } from './single-series/single-series.component';
import { CategoryTableComponent } from './category-table/category-table.component';


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
    path: 'series',
    component: SingleSeriesComponent
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
