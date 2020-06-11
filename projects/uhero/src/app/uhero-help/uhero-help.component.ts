import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uhero-help',
  templateUrl: './uhero-help.component.html',
  styleUrls: ['./uhero-help.component.scss']
})
export class UheroHelpComponent {

  constructor(private route: ActivatedRoute) { }

  onContentsLinkClick() {
    this.route.fragment.subscribe((frag) => {
      const element = document.querySelector(`#${frag}`);
      if (element) {
        element.scrollIntoView({block: "end", behavior: "smooth"});
      }
    });
  }

}
