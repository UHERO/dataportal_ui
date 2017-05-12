import { Injectable } from '@angular/core';

declare var ga: Function;

@Injectable()
export class GoogleAnalyticsEventsService {
  constructor() { }

  public emitEvent(category: string, action: string, label: string) {
    ga('send', 'event', {
      eventCategory: category,
      eventAction: action,
      eventLabel: label
    });
  }

}
