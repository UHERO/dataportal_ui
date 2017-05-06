/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, inject, tick, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { UheroApiService } from '../uhero-api.service';
import { MockApiService } from '../../testing/mockapi-service';
import { RouterLinkStubDirective, ActivatedRouteStub, ActivatedRoute } from '../../testing/router-stubs';
import { SingleSeriesComponent } from './single-series.component';

let comp: SingleSeriesComponent;
let fixture: ComponentFixture<SingleSeriesComponent>;
let activatedRoute: ActivatedRouteStub;

describe('SingleSeriesComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      providers: [
        { provide: UheroApiService, useClass: MockApiService },
        { provide: ActivatedRoute, useValue: activatedRoute}
      ]
    })
    .compileComponents();
  }));

  describe('when navigating to a series, it should display single series component', () => {
    const selectedSeries = [{
      'id': 140000,
      'name': 'T@ES.T',
      'title': 'Test Series Title',
      'frequency': 'year',
      'unitsLabel': '',
      'unitsLabelShort': '%'
    }];

    beforeEach(async(() => {
      activatedRoute.testParams = { id: selectedSeries['id'] };
      createComponent();
      expect(comp).toBeTruthy();
    }));
  });
});

function createComponent() {
  fixture = TestBed.createComponent(SingleSeriesComponent);
  comp = fixture.componentInstance;

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
  });
}
