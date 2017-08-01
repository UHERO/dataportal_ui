import { Injectable } from '@angular/core';
import { NtaHelpComponent } from './nta-help/nta-help.component';
import { UheroHelpComponent } from './uhero-help/uhero-help.component';
import { HelpItem } from './help-item';

@Injectable()
export class HelpService {
  public helpDocs = {
    nta: new HelpItem(NtaHelpComponent),
    uhero: new HelpItem(UheroHelpComponent)
  };

}
