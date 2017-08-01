import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHelp]'
})
export class HelpDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
