/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { Router, RouterStub, RouterLinkStubDirective } from '../../testing/router-stubs';

@Component({selector: 'app-search-bar', template: ''})
class SearchStubComponent {}

let comp: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, SearchStubComponent, RouterLinkStubDirective],
      providers: [
        { provide: Router, useClass: RouterStub },
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

    linkEls = fixture.debugElement.queryAll(By.css('a'));

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
