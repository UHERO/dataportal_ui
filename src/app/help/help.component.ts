// HelpComponent dynamically loads a specified data portal's help page
// See: https://angular.io/guide/dynamic-component-loader
import { Component, Inject, AfterViewInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { HelpDirective } from '../help.directive';
import { HelpItem } from '../help-item';
import { HelpService } from '../help.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements AfterViewInit {
  @ViewChild(HelpDirective) appHelp: HelpDirective;

  constructor(@Inject('portal') private portal, private componentFactoryResolver: ComponentFactoryResolver, private _help: HelpService) { }

  ngAfterViewInit() {
    this.loadComponent();
  }

  loadComponent() {
    // Get content for the help page based on which data portal is built/loaded
    const helpItem: HelpItem = this._help.helpDocs[this.portal.universe];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(helpItem.component);
    const viewContainerRef = this.appHelp.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
