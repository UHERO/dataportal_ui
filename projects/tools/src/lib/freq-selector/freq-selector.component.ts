import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Frequency } from '../tools.models';

@Component({
  selector: 'lib-freq-selector',
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

 onChange(newFreq: Object) {
    this.selectedFreq = this.freqs.find(freq => freq.freq === newFreq);
    this.selectedFreqChange.emit(this.selectedFreq);
  }
}
