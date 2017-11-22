import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss']
})
export class ShareLinkComponent implements OnInit, OnChanges {
  @Input() startDate;
  @Input() endDate;
  private id;
  private geo;
  private freq;
  private sa;
  private baseUrl;

  constructor(private route: ActivatedRoute, private _router: Router) {
    this.baseUrl = environment['portalUrl'];
  }

  ngOnInit() {
    console.log('base url', this.baseUrl);
    console.log('url', this._router.url)
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.id = params['id'];
      this.geo = params['geo'] ? params['geo'] : null;
      this.freq = params['freq'] ? params['freq'] : null;
      this.sa = params['sa'] ? params['sa'] : null;
    });
  }

  ngOnChanges() {
    const start = this.startDate ? '&start=' + this.startDate : '';
    const end = this.endDate ? '&end=' + this.endDate : '';
    console.log('share url', this.baseUrl + this._router.url + start + end);

  }

}
