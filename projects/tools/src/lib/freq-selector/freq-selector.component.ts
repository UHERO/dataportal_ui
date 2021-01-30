import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Frequency } from '../tools.models';
import { HelperService } from '../helper.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'lib-freq-selector',
  templateUrl: './freq-selector.component.html',
  styleUrls: ['./freq-selector.component.scss']
})
export class FreqSelectorComponent implements OnDestroy {
  @Input() freqs: Array<Frequency>;
  selectedFreq: Frequency;
  @Output() selectedFreqChange = new EventEmitter();
  freqSubscription: Subscription;
  geoSub;
  selectedGeo;
  queryParams: any = {};
  sub;
  id;
  dataListId;

  constructor(private helperService: HelperService, private activatedRoute: ActivatedRoute, private router: Router
    ) {
    //console.log('data', this.dataFreq)
    //console.log('freqs', this.freqs)
    //this.helperService.getDefaultFreq(this.dataFreq);
    this.freqSubscription = helperService.currentFreq.subscribe((freq) => {
      console.log('freq', freq)
      this.selectedFreq = freq;
    });
    this.geoSub = helperService.currentGeo.subscribe((geo) => {
      this.selectedGeo = geo;
    });
    this.sub = this.activatedRoute.queryParams.subscribe((params) => {
      this.id = this.getIdParam(params[`id`]);
      this.dataListId = this.getIdParam(params[`data_list_id`]);
    });
  }

  ngOnDestroy() {
    this.freqSubscription.unsubscribe();
  }

  onChange(newFreq: string) {
    this.selectedFreq = this.freqs.find(freq => freq.freq === newFreq);
    this.selectedFreqChange.emit(this.selectedFreq);
    this.helperService.updateCurrentFrequency(this.selectedFreq);
    //this.queryParams.geo = this.selectedGeo.handle;
    //this.queryParams.freq = this.selectedFreq.freq;
    //this.updateRoute();
}

  updateRoute() {
    //this.queryParams.id = this.queryParams.id ? this.queryParams.id : this.id;
    //this.queryParams.data_list_id = this.queryParams.data_list_id ? this.queryParams.data_list_id : this.dataListId;
    //const urlPath = typeof this.queryParams.id === 'string' ? '/search' : '/category';
    //this.router.navigate([urlPath], { queryParams: this.queryParams, queryParamsHandling: 'merge' });
    //this.loading = false;
    //this.displaySeries = true;
  }

  getIdParam(id) {
    if (id === undefined) {
      return null;
    }
    if (id && isNaN(+id)) {
      // id param is a string, display search results
      return id;
    }
    if (id && +id) {
      // id of category selected in sidebar
      return +id;
    }
  }

}
