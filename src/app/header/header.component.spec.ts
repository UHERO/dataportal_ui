/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { RouterLinkStubDirective } from '../../testing/router-stubs';

let comp: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        RouterLinkStubDirective
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      comp = fixture.componentInstance;
    });
  }));
  tests();
});

function tests() {
  let links: RouterLinkStubDirective[];
  let linkEls: DebugElement[];

  beforeEach(() => {
    fixture.detectChanges();

    linkEls = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));

    links = linkEls.map(el => el.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('should create an instance', () => {
    expect(comp).toBeTruthy();
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(1, 'should have 1 link');
    expect(links[0].linkParams).toBe('/', '1st link should load landing component');
  });
}
