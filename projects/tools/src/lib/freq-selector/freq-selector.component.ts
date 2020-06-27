import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Frequency } from '../tools.models';

@Component({
  selector: 'lib-freq-selector',
  templateUrl: './freq-selector.component.html',
  styleUrls: ['./freq-selector.component.scss']
})
export class FreqSelectorComponent {
  @Input() freqs: Array<Frequency>;
  @Input() selectedFreq: Frequency;
  @Output() selectedFreqChange = new EventEmitter();

  constructor() { }

  onChange(newFreq: string) {
    this.selectedFreq = this.freqs.find(freq => freq.freq === newFreq);
    this.selectedFreqChange.emit(this.selectedFreq);
  }
}
