/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { UheroApiService } from '../uhero-api.service';
import { LandingPageComponent } from './landing-page.component';
import { RouterLinkStubDirective } from '../../testing/router-stubs';

let comp: LandingPageComponent;
let fixture: ComponentFixture<LandingPageComponent>;

class MockAPIService {
  fetchCategories(id: number) {
    let response = ['Test 1', 'Test 2', 'Test 3'];
    return Observable.of(response);
  }
}

describe('LandingPageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingPageComponent,
        RouterLinkStubDirective
      ],
      providers: [ 
        {provide: UheroApiService, useClass: MockAPIService},
        RouterLinkStubDirective
       ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(LandingPageComponent);
      comp = fixture.componentInstance;
    });
  }));
  // tests();
});

/* function tests() {
  let links: RouterLinkStubDirective[];
  let linkEls: DebugElement[];
  let uheroApiService: UheroApiService;

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
} */

/* describe('Component: LandingPage', () => {
  it('should create an instance', () => {
    let component = new LandingPageComponent();
    expect(component).toBeTruthy();
  });
}); */
