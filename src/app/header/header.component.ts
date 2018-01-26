import { Inject, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public headerLogo;

  constructor(@Inject('logo') private logo, private _router: Router) { }

  ngOnInit() {
    this.headerLogo = this.logo;
  }

  onSearch(event) {
    const searchQParams = {
      id: event,
      start: null,
      end: null, 
      analyzerSeries: null,
      chartSeries: null,
      name: null,
      units: null,
      geography: null
    }
    this._router.navigate(['/category'], { queryParams: searchQParams, queryParamsHandling: 'merge' });
  }
}
