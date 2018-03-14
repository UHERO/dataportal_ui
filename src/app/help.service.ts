import { Injectable } from '@angular/core';
import { NtaHelpComponent } from './nta-help/nta-help.component';
import { UheroHelpComponent } from './uhero-help/uhero-help.component';
import { HelpItem } from './help-item';
import { CohHelpComponent } from './coh-help/coh-help.component';

@Injectable()
export class HelpService {
  public helpDocs = {
    nta: new HelpItem(NtaHelpComponent),
    uhero: new HelpItem(UheroHelpComponent),
    coh: new HelpItem(CohHelpComponent)
  };

}
