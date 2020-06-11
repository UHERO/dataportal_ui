import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzerHighstockComponent } from './analyzer-highstock.component';

describe('AnalyzerHighstockComponent', () => {
  let component: AnalyzerHighstockComponent;
  let fixture: ComponentFixture<AnalyzerHighstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerHighstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerHighstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
