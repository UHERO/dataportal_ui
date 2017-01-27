import { Routes, RouterModule } from '@angular/router';

import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SingleSeriesComponent} from "./single-series/single-series.component";
import {CategoryTableComponent} from "./category-table/category-table.component";


const routes: Routes = [
  // map / to the landing page
  {
    path: '',
    component: LandingPageComponent

  },

  // map /:id to the multi chart display
  {
    path: 'category',
    component: LandingPageComponent
  },

  {
    path: 'category/search',
    component: LandingPageComponent
  },

  {
    path: 'category/table',
    component: CategoryTableComponent
  },

  {
    path: 'category/table/search',
    component: CategoryTableComponent
  },

  {
    path: 'series',
    component: SingleSeriesComponent
  },

  // map /series/:id to the single series graph/table display
  {
    path: 'series/:id',
    component: SingleSeriesComponent
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
