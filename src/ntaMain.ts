import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { NtaModule } from './app/nta.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(NtaModule);
