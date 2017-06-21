import { Routes, RouterModule } from '@angular/router';

import { NtaLayoutComponent } from './nta-layout/nta-layout.component';


const routes: Routes = [
  // map / to the landing page
  {
    path: '',
    component: NtaLayoutComponent
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
