import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-measurement-selector',
  templateUrl: './measurement-selector.component.html',
  styleUrls: ['./measurement-selector.component.scss']
})
export class MeasurementSelectorComponent implements OnInit {
  @Input() measurements;
  @Input() selectedMeasurement;
  @Output() selectedMeasurementChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange(newMeasure) {
    this.selectedMeasurement = this.measurements.find(measurment => measurment.name === newMeasure);
    this.selectedMeasurementChange.emit(this.selectedMeasurement);
  }
}
