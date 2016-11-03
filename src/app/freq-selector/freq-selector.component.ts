import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Frequency } from '../frequency';

@Component({
  selector: 'app-freq-selector',
  templateUrl: './freq-selector.component.html',
  styleUrls: ['./freq-selector.component.scss']
})
export class FreqSelectorComponent implements OnInit {
  @Input() freqs: Array<Frequency>;
  @Input() selectedFreq: Frequency;
  @Output() selectedFreqChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

 onChange(newFreq) {
    console.log('nf', newFreq);
    this.selectedFreq = this.freqs.find(freq => freq.handle === newFreq);
    console.log('selected', this.selectedFreq);
    this.selectedFreqChange.emit(this.selectedFreq);
  }
}
