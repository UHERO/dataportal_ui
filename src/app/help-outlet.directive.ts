import { Component, Directive, NgModule, Input, ViewContainerRef, Compiler } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: 'help-outlet'
})
export class HelpOutletDirective {
  @Input() html: string;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) { }

  ngOnChanges() {
    const html = this.html;
    if (!html) return;

    @Component({
      selector: 'dynamic-comp',
      templateUrl: html
    })
    class DynamicHtmlComponent {};

    @NgModule({
      imports: [CommonModule],
      declarations: [DynamicHtmlComponent]
    })
    class DynamicHtmlModule {}

    this.compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
      .then(factory => {
        const compFactory = factory.componentFactories.find(x => x.componentType === DynamicHtmlComponent);
        const cmpRef = this.vcRef.createComponent(compFactory, 0);
      });
  }
}
