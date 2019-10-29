import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-coh-help',
  templateUrl: './coh-help.component.html',
  styleUrls: ['./coh-help.component.scss']
})
export class CohHelpComponent implements OnInit {

  constructor( private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  onContentsLinkClick() {
    this.route.fragment.subscribe((frag) => {
      const element = document.querySelector(`#${frag}`);
      if (element) {
        element.scrollIntoView({block: "end", behavior: "smooth"});
      }
    });
  }

}
