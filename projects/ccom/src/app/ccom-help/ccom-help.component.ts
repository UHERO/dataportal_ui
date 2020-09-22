import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ccom-help',
  templateUrl: './ccom-help.component.html',
  styleUrls: ['./ccom-help.component.scss']
})
export class CcomHelpComponent {

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
