import { Injectable } from '@angular/core';

declare var gtag: Function;

@Injectable()
export class GoogleAnalyticsEventsService {
  constructor() { }

  public emitEvent(category: string, action: string, label: string) {
    gtag('event', action, {
      eventCategory: category,
      eventLabel: label
    });
  }

}
