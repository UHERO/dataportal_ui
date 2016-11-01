import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-geo-selector',
  templateUrl: './geo-selector.component.html',
  styleUrls: ['./geo-selector.component.scss']
})
export class GeoSelectorComponent implements OnInit {
  @Input() regions;
  public seriesData = [];
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

  /* onChangeGeo(newGeo) {
    this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      console.log(id);
      this.regions.forEach((region, index) => {
        this._uheroAPIService.fetchMultiChartData(id, this.regions[index]['handle']).subscribe((results) => {
          console.log(this.regions[index]['handle']);
        })
      })
    });
  } */
}
