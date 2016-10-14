/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Component } from '@angular/core';

import { HighchartComponent } from './highchart.component';
import { ChartModule } from 'angular2-highcharts';

let comp: HighchartComponent;
let fixture: ComponentFixture<HighchartComponent>;

describe('HighchartComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighchartComponent ],
      imports: [ ChartModule ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HighchartComponent);
      comp = fixture.componentInstance;
    });
  }));
  tests();
});

function tests() {
  it('should create the component', () => {
    expect(comp).toBeTruthy();
  });
}
