import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { AnalyzerHighstockComponent } from './analyzer-highstock.component';

// Create stub for chart component
@Component({selector: 'chart', template: ''})
class ChartStubComponent {
  @Input() options;
}

// Create stub for xAxis component
@Component({selector: 'xAxis', template: ''})
class XAxisStubComponent {}

describe('AnalyzerHighstockComponent', () => {
  let component: AnalyzerHighstockComponent;
  let fixture: ComponentFixture<AnalyzerHighstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerHighstockComponent, XAxisStubComponent, ChartStubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerHighstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
