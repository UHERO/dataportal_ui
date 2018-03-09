import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    @Inject('portal') private portal,
    @Inject('GoogleAnalyticsId') private gaId,
    private titleService: Title,
    public _router: Router
  ) {
    this.appendGATrackingCode(this.gaId);
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

  ngOnInit() {
    if (navigator.userAgent.search('Chrome') === -1) {
      $('.browser').show();
      setTimeout(function () {
        $('.browser').hide();
      }, 5000);
    } else {
      $('.browser').hide();
    }
  }

  private appendGATrackingCode(gaId) {
    try {
      const gTagScript = document.createElement('script');
      gTagScript.async = true;
      gTagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
      document.head.appendChild(gTagScript);
      const script = document.createElement('script');
      script.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      `;
      document.head.appendChild(script);
    } catch (err) {
      console.log('Error adding Google Analytics', err);
    }
  }
}
