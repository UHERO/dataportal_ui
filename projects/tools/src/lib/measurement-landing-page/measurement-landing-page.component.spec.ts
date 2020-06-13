import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementLandingPageComponent } from './measurement-landing-page.component';

describe('MeasurementLandingPageComponent', () => {
  let component: MeasurementLandingPageComponent;
  let fixture: ComponentFixture<MeasurementLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
