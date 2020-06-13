import { Component, OnInit, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as $ from "jquery";

declare var gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private isBrowser;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('portal') public portal,
    @Inject('GoogleAnalyticsId') private gaId,
    private titleService: Title,
    public _router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      // Set title
      this.titleService.setTitle(this.portal.title);
      // Set favicon
      $('#favicon').attr('href', this.portal.favicon);

      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          gtag('config', this.gaId, { 'page_path': event.urlAfterRedirects });
        }
      });
    }
  }

  ngOnInit() {
    if (this.isBrowser) {
      if (navigator.userAgent.search('Chrome') === -1) {
        $('.browser').show();
        setTimeout(function () {
          $('.browser').hide();
        }, 5000);
      } else {
        $('.browser').hide();
      }
    }
  }
}
