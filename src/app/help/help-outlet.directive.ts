import {
  Component,
  Directive,
  NgModule,
  Input,
  ViewContainerRef,
  Compiler,
  ComponentFactory,
  ModuleWithComponentFactories,
  ComponentRef,
  ReflectiveInjector
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Shared } from '../shared/shared.module';

export function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {
  const cmpClass = class DynamicComponent {};
  const decoratedCmp = Component(metadata)(cmpClass);

  @NgModule({ imports: [CommonModule, RouterModule, Shared], declarations: [decoratedCmp] })
  class DynamicHtmlModule {}

  return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
    .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
      return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
    });
}

@Directive({ selector: 'help-outlet '})
export class HelpOutlet {
  @Input() html: string;
  cmpRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {}

  ngOnChanges() {
    const html = this.html;
    if (!html) return;
    console.log(this.html)

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    const compMetadata = new Component({
      selector: 'dynamic-html',
      templateUrl: this.html,
    });

    createComponentFactory(this.compiler, compMetadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
      })
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}

/* @Directive({
  selector: 'help-outlet' 
})
export class HelpOutlet {
  @Input() html: string;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {}

  ngOnChanges() {
    const html = this.html;
    if (!html) return;

    @Component({
      selector: 'dynamic-comp',
      templateUrl: html
    })
    class DynamicHtmlComponent  { };

    @NgModule({
      imports: [CommonModule, Shared, RouterModule],
      declarations: [DynamicHtmlComponent]
    })
    class DynamicHtmlModule {}

    this.compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
      .then(factory => {
        const compFactory = factory.componentFactories.find(x => x.componentType === DynamicHtmlComponent);
        const cmpRef = this.vcRef.createComponent(compFactory, 0);
      });
  }
} */
