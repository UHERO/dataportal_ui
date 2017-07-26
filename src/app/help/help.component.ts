import { Component, OnInit, Inject } from '@angular/core';
import { HelpDocService } from '../help-doc.service';
import { HelpOutlet } from '../help-outlet.directive';

class Help {
  title: string;
  html: string;
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  private help: Help;

  constructor(@Inject('portal') private portal, private helpDoc: HelpDocService) { }

  ngOnInit() {
    this.helpDoc.getHelpDoc().subscribe(data => {
      this.help = data;
      console.log(data);
    });
  }

}
