import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss']
})
export class ShareLinkComponent {
  @Input() startDate;
  @Input() endDate;
  // View -- 'analyzer' or 'series'
  @Input() view;

  // Series in the analyzer and series drawn in the analyzer chart
  @Input() analyzerSeries;

  // Tooltip options in the analyzer view
  @Input() name;
  @Input() units;
  @Input() geography;
  @Input() yoy;
  @Input() ytd;
  @Input() c5ma;
  @Input() y0;
  @Input() y1;
  @Input() shareLink: string;
  @Input() embedCode: string;

  constructor() { }

  copyLink(inputValue) {
    $('.share-link').attr('title', 'Copied');
    inputValue.select();
    document.execCommand('copy');
    inputValue.setSelectionRange(0, 0);
    setTimeout(() => {
      // Reset share link title
      $('.share-link').attr('title', 'Copy');
    }, 3000);
  }
}
