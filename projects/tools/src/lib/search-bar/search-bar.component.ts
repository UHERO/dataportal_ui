import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() onSearch = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  search(searchTerm: HTMLInputElement): void {
    if (searchTerm.value) {
      this.onSearch.emit(searchTerm.value);
      searchTerm.value = '';
    }
    if (!searchTerm.value) {
      return;
    }
  }
}
