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

  }

  onChange(newGeo) {
    console.log('ng', newGeo);
    this.selectedGeo = this.regions.find(region => region.handle === newGeo);
    console.log('selected', this.selectedGeo);
    this.selectedGeoChange.emit(this.selectedGeo);
  }
}
