import { Inject, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public headerLogo;
  public logoText;
  uheroLogo: boolean;

  constructor(@Inject('logo') private logo, private router: Router) { }

  ngOnInit() {
    this.headerLogo = this.logo;
    this.uheroLogo = this.logo.altText.includes('UHERO');
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
    };
    this.router.navigate(['/search'], { queryParams: searchQParams, queryParamsHandling: 'merge' });
  }
}
