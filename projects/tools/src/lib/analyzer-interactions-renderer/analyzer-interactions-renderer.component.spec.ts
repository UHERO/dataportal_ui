import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnalyzerInteractionsRendererComponent } from './analyzer-interactions-renderer.component';

describe('AnalyzerInteractionsRendererComponent', () => {
  let component: AnalyzerInteractionsRendererComponent;
  let fixture: ComponentFixture<AnalyzerInteractionsRendererComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerInteractionsRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerInteractionsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
