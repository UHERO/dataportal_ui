import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzerStatsRendererComponent } from './analyzer-stats-renderer.component';

describe('AnalyzerStatsRendererComponent', () => {
  let component: AnalyzerStatsRendererComponent;
  let fixture: ComponentFixture<AnalyzerStatsRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerStatsRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerStatsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
