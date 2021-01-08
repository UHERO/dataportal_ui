import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UheroHelpComponent } from './uhero-help.component';

describe('UheroHelpComponent', () => {
  let component: UheroHelpComponent;
  let fixture: ComponentFixture<UheroHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UheroHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UheroHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
