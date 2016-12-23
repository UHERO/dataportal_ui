import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Geography } from '../geography';

@Component({
  selector: 'app-geo-selector',
  templateUrl: './geo-selector.component.html',
  styleUrls: ['./geo-selector.component.scss']
})
export class GeoSelectorComponent implements OnInit {
  @Input() regions: Array<Geography>;
  @Input() selectedGeo: Geography;
  @Output() selectedGeoChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('selector current geo', this.selectedGeo);
  }

  onChange(newGeo) {
    console.log('selector change', newGeo);
    this.selectedGeo = this.regions.find(region => region.handle === newGeo);
    this.selectedGeoChange.emit(this.selectedGeo);
    console.log('selected geo', this.selectedGeo);
  }
}
