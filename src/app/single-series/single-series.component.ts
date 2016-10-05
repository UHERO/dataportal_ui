import { Component, OnInit } from '@angular/core';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-single-series',
  inputs: ['categoryTree'],
  templateUrl: './single-series.component.html',
  styleUrls: ['./single-series.component.scss']
})
export class SingleSeriesComponent implements OnInit {

  constructor(private _uheroAPIService: UheroApiService) { }

  ngOnInit() {
  }

}
