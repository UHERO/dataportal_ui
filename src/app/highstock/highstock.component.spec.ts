/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Component } from '@angular/core';

import { HighstockComponent } from './highstock.component';
import { ChartModule } from 'angular2-highcharts';

let comp: HighstockComponent;
let fixture: ComponentFixture<HighstockComponent>;

describe('HighstockComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighstockComponent ],
      imports: [ ChartModule ],
      providers: [
        { provide: 'seriesType', useValue: 'line' }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HighstockComponent);
      comp = fixture.componentInstance;
    });
  }));

  /* describe('Component: Highstock', () => {
    it('should create an instance', () => {
      const component = new HighstockComponent('seriesType');
      expect(component).toBeTruthy();
    });
  }); */
});