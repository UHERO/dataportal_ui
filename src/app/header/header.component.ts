import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public headerLogo

  constructor(private _router: Router, private configService: ConfigService) { }

  ngOnInit() {
    this.headerLogo = this.configService.getConfigurataion().uheroPortal.logo;
  }

  onSearch(event) {
    this._router.navigate(['/category'], { queryParams: { id: event }, queryParamsHandling: 'merge' });
  }
}
