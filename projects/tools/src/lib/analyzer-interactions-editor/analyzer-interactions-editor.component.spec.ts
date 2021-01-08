import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnalyzerInteractionsEditorComponent } from './analyzer-interactions-editor.component';

describe('AnalyzerInteractionsEditorComponent', () => {
  let component: AnalyzerInteractionsEditorComponent;
  let fixture: ComponentFixture<AnalyzerInteractionsEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerInteractionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerInteractionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
