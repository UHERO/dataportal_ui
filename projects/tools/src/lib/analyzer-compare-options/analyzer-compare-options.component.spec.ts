import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzerCompareOptionsComponent } from './analyzer-compare-options.component';

describe('AnalyzerCompareOptionsComponent', () => {
  let component: AnalyzerCompareOptionsComponent;
  let fixture: ComponentFixture<AnalyzerCompareOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyzerCompareOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerCompareOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
