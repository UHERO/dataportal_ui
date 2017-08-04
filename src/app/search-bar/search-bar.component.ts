import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() onSearch = new EventEmitter();

  constructor(private googleAES: GoogleAnalyticsEventsService) { }

  ngOnInit() {
  }

  search(searchTerm: HTMLInputElement): void {
    if (searchTerm.value) {
      this.onSearch.emit(searchTerm.value);
      this.submitGAEvent(searchTerm.value);
      searchTerm.value = '';
    }
    if (!searchTerm.value) {
      return;
    }
  }

  // Google Analytics: Track search event
  submitGAEvent(searchTerm) {
    this.googleAES.emitEvent('Search', 'search', searchTerm);
  }

}
