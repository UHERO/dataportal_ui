import { Routes, RouterModule } from '@angular/router';

import {LandingPageComponent} from './landing-page/landing-page.component';
import {SingleSeriesComponent} from './single-series/single-series.component';
import {CategoryTableComponent} from './category-table/category-table.component';


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
    path: 'series',
    component: SingleSeriesComponent
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
