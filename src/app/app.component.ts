import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title, public _router: Router) {
    // Set title
    this.titleService.setTitle('Dataportal');
    // Set favicon
    $('#favicon').attr('href', 'manoa.jpg');

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
