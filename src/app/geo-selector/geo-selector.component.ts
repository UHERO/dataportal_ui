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
    console.log('geo component', this.regions)
     /* this._uheroAPIService.fetchGeographies()
         .subscribe(
            (geos) => {
            this.geos = geos = geos.geographies;
            this.selectedGeo = geos[0];
            console.log(this.selectedGeo);
         },
            error => console.log('Error fetching geographies')); */
  }

  onChange(newGeo) {
    console.log('ng', newGeo);
    this.selectedGeo = this.regions.find(region => region.handle == newGeo);
    console.log('selected', this.selectedGeo);
    this.selectedGeoChange.emit(this.selectedGeo);
  }
}
