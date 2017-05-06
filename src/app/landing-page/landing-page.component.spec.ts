/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, inject, tick, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { UheroApiService } from '../uhero-api.service';
import { LandingPageComponent } from './landing-page.component';
import { MockApiService } from '../../testing/mockapi-service';
import { RouterLinkStubDirective, ActivatedRouteStub, ActivatedRoute } from '../../testing/router-stubs';

let comp: LandingPageComponent;
let fixture: ComponentFixture<LandingPageComponent>;
let activatedRoute: ActivatedRouteStub;

// Create stub for header component
@Component({selector: 'app-highchart', template: ''})
class HighchartComponent {}

describe('LandingPageComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ HighchartComponent ],
      providers: [
        { provide: UheroApiService, useClass: MockApiService },
        { provide: ActivatedRoute, useValue: activatedRoute}
      ]
    })
    .compileComponents();
  }));

  describe('when navigating to a category, it should display series charts', () => {
    const selectedCategory = [{ 'children': { 'id': 8, 'name': 'Test Subcategory', 'parentId': 4 }, 'id': 4, 'name': 'Test Category' }];

    beforeEach(async(() => {
      activatedRoute.testParams = { id: selectedCategory['children']['id'] };
      createComponent();
    }));
  });
});

function createComponent() {
  fixture = TestBed.createComponent(LandingPageComponent);
  comp = fixture.componentInstance;

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
  });
}
