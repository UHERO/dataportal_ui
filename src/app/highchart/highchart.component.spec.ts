/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Component } from '@angular/core';

import { HighchartComponent } from './highchart.component';

let comp: HighchartComponent;
let fixture: ComponentFixture<HighchartComponent>;

describe('HighchartComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighchartComponent ],
      imports: [ ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HighchartComponent);
      comp = fixture.componentInstance;
    });
  }));
  // broken in travis CI
  // tests();
});

function tests() {
  it('should create the component', () => {
    expect(comp).toBeTruthy();
  });
}
