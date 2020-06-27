import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nta-help',
  templateUrl: './nta-help.component.html',
  styleUrls: ['./nta-help.component.scss']
})
export class NtaHelpComponent {

  constructor(private route: ActivatedRoute) { }

  onContentsLinkClick() {
    this.route.fragment.subscribe((frag) => {
      const element = document.querySelector(`#${frag}`);
      if (element) {
        element.scrollIntoView({block: 'end', behavior: 'smooth'});
      }
    });
  }

}
