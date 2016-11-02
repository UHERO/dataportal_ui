import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-geo-selector',
  templateUrl: './geo-selector.component.html',
  styleUrls: ['./geo-selector.component.scss']
})
export class GeoSelectorComponent implements OnInit {
  @Input() regions;
  @Input() selectedGeo;
  @Output() selectedGeoChange = new EventEmitter();
  constructor(private _uheroAPIService: UheroApiService, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  onChange(newGeo) {
    console.log('ng', newGeo);
    this.selectedGeo = this.regions.find(region => region.handle === newGeo);
    console.log('selected', this.selectedGeo);
    this.selectedGeoChange.emit(this.selectedGeo);
  }
}
