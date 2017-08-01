import { ViewContainerRef } from '@angular/core';
import { HelpDirective } from './help.directive';

describe('HelpDirective', () => {
  it('should create an instance', () => {
    let viewContainerRef: ViewContainerRef;
    const directive = new HelpDirective(viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
