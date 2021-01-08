import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleSeriesComponent } from './single-series.component';

describe('SingleSeriesComponent', () => {
  let component: SingleSeriesComponent;
  let fixture: ComponentFixture<SingleSeriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
