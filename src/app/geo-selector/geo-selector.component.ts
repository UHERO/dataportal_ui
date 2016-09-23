import { Component, OnInit } from '@angular/core';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-geo-selector',
  templateUrl: './geo-selector.component.html',
  styleUrls: ['./geo-selector.component.scss']
})
export class GeoSelectorComponent implements OnInit {
  geos;
  selectedGeo;

  constructor(private _uheroAPIService: UheroApiService) { }

  ngOnInit() {
     this._uheroAPIService.fetchGeographies()
         .subscribe(
            (geos) => {
            this.geos = geos = geos.geographies;
            this.selectedGeo = geos[0];
            console.log(this.selectedGeo);
         },
            error => console.log('Error fetching geographies'));
  }

  onChangeGeo(newGeo) {
   console.log(newGeo);
   this.selectedGeo = newGeo;
  }

}
