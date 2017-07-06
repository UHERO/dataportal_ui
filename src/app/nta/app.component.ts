import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public _router: Router) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Send page views to Google Analytics
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    if (navigator.userAgent.search('Chrome') === -1) {
      $('.browser').show();
    } else {
      $('.browser').hide();
    }
  }
}