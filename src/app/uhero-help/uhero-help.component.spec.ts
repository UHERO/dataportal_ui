import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UheroHelpComponent } from './uhero-help.component';

describe('UheroHelpComponent', () => {
  let component: UheroHelpComponent;
  let fixture: ComponentFixture<UheroHelpComponent>;

  beforeEach(async(() => {
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

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
