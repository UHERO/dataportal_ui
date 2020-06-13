import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzerTableComponent } from './analyzer-table.component';

describe('AnalyzerTableComponent', () => {
  let component: AnalyzerTableComponent;
  let fixture: ComponentFixture<AnalyzerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
