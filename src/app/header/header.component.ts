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
    this._router.navigate(['/category'], { queryParams: { id: event }, queryParamsHandling: 'merge' });
  }
}
