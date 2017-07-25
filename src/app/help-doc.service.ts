import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HelpDocService {

  constructor(@Inject('portal') private portal, private http: Http) { }
  getHelpDoc() {
    return this.http.get('./assets/help.json')
      .map(data => data.json());
  }
}
