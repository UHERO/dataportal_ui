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
    path: 'category/:id',
    component: LandingPageComponent
  },

  // map multi chart display to selected region/frequency
  {
    path: 'category/:id/:geo/:freq',
    component: LandingPageComponent
  },

  // map multi chart display to search term
  {
    path: 'category/search/:search',
    component: LandingPageComponent
  },

  // map multi chart display to search term and selected region/frequency
  {
    path: 'category/search/:search/:geo/:freq',
    component: LandingPageComponent
  },

  // map /:id to the table view
  {
    path: 'category/table/:id',
    component: CategoryTableComponent
  },

  // map table display to selected region/frequency
  {
    path: 'category/table/:id/:geo/:freq',
    component: CategoryTableComponent
  },

  // map table display to search term
  {
    path: 'category/table/search/:search',
    component: CategoryTableComponent
  },

  // map table display to search term and selected region/frequency
  {
    path: 'category/table/search/:search/:geo/:freq',
    component: CategoryTableComponent
  },
  
  // map /series/:id to the single series graph/table display
  {
    path: 'series/:id',
    component: SingleSeriesComponent,
  }

];

export const routing = RouterModule.forRoot(routes, {useHash: true});
