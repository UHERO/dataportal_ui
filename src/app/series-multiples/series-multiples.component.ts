import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UheroApiService } from '../uhero-api.service';

@Component({
  selector: 'app-series-multiples',
  templateUrl: './series-multiples.component.html',
  styleUrls: ['./series-multiples.component.sass']
})
export class SeriesMultiplesComponent implements OnInit {
  categories;
  dataMap;
  categoryTree;

  constructor(private _uheroAPIService: UheroApiService) {}

  ngOnInit() {
     this._uheroAPIService.fetchCategories()
         .subscribe(
            categories => this.categories = categories.categories,
            error => console.log('Error fetching categories'));
  }

}
