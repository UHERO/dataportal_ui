/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { UheroApiService } from '../uhero-api.service';
import { SidebarNavComponent } from './sidebar-nav.component';
import { RouterLinkStubDirective } from '../../testing/router-stubs';

let comp: SidebarNavComponent;
let fixture: ComponentFixture<SidebarNavComponent>;

class MockAPIService {
  fetchCategories(id: number) {
    let response = ['Test 1', 'Test 2', 'Test 3'];
    return Observable.of(response);
  }
}

describe('SidebarNavComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarNavComponent,
        RouterLinkStubDirective
      ],
      providers: [ {provide: UheroApiService, useClass: MockAPIService} ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(SidebarNavComponent);
      comp = fixture.componentInstance;
    });
  }));
  tests();
});

function tests() {
  let links: RouterLinkStubDirective[];
  let linkEls: DebugElement[];
  let spy: jasmine.Spy;
  let deEl: DebugElement;
  let el: HTMLElement;
  let uheroApiService: UheroApiService;
  let testCategories = ['Test 1', 'Test 2', 'Test 3'];

  beforeEach(() => {
    fixture.detectChanges();

    linkEls = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkEls.map(linkEl => linkEl.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    // API service injected into the component
    uheroApiService = fixture.debugElement.injector.get(UheroApiService);

    // Setup spy on fetchCategories method
    // spy = spyOn(uheroApiService, 'fetchCategories').and.returnValue(Observable.of(testCategories));
  });

  it('should create an instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('after get categories', () => {
    beforeEach(async(() => {

      // runs OnInit -> fetchCategories
      fixture.detectChanges();
      fixture.whenStable().then(() => fixture.detectChanges());
    }));

    it('should have categories', () => {
      const categories = fixture.debugElement.queryAll(By.css('.list-item'));
      expect(categories.length).toBeGreaterThan(0, 'should have categories listed');
    });
  });
}
