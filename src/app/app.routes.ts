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

  {
    path: 'category/table/:id',
    component: CategoryTableComponent
  },

  // map /series/:id to the single series graph/table display
  {
    path: 'series/:id',
    component: SingleSeriesComponent,
  }

];

export const routing = RouterModule.forRoot(routes, {useHash: true});
