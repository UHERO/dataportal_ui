import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementSelectorComponent } from './measurement-selector.component';

/* describe('MeasurementSelectorComponent', () => {
  let component: MeasurementSelectorComponent;
  let fixture: ComponentFixture<MeasurementSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
}); */

describe('Component: MeasurementSelector', () => {
  it('should create an instance', () => {
    const component = new MeasurementSelectorComponent();
    expect(component).toBeTruthy();
  });
});

