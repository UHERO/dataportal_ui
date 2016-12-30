/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SidebarNavComponent } from './sidebar-nav.component';
import { UheroApiService } from '../uhero-api.service';
import { MockApiService } from '../../testing/mockapi-service';
import { ActivatedRoute, ActivatedRouteStub, Router, RouterStub, RouterLinkStubDirective } from '../../testing/router-stubs';
import { addMatchers, newEvent } from '../../testing/helpers';
import { Observable } from 'rxjs/Observable';

let comp: SidebarNavComponent;
let fixture: ComponentFixture<SidebarNavComponent>;
// TODO: Rewrite unit test for sidebar component
// let page: Page;

/* describe('SidebarNavComponent', () => {
  beforeEach(async(() => {
    addMatchers();
    TestBed.configureTestingModule({
      declarations: [ SidebarNavComponent, RouterLinkStubDirective ],
      providers: [
        { provide: UheroApiService, useClass: MockApiService },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: { params: Observable.of({id: 1}) }}
      ]
    })
    .compileComponents()
    .then(createComponent);
  }));

  it('should display categories', () => {
    expect(page.categoryRows.length).toBeGreaterThan(0);
  });

  it('1st category should match 1st test category', () => {
    const expectedCategory = page.categoryRows[0].textContent;
    expect(expectedCategory).toContain('Test Category', 'category name');
  });

  it('should expand the category on click', fakeAsync(() => {
    const li = page.categoryRows[0];
    li.dispatchEvent(newEvent('click'));
    tick();
    expect(comp.expand).toEqual('Test Category');
  }));
  
});

function createComponent() {
  fixture = TestBed.createComponent(SidebarNavComponent);
  comp = fixture.componentInstance;

  // triggers ngOnInit
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  categoryRows: HTMLLIElement[];
  navSpy: jasmine.Spy;

  constructor() {
    this.categoryRows = fixture.debugElement.queryAll(By.css('li')).map(de => de.nativeElement);
    const router = fixture.debugElement.injector.get(Router);
    this.navSpy = spyOn(router, 'navigate');
  }
} */
