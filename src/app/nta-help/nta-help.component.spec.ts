import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NtaHelpComponent } from './nta-help.component';

describe('NtaHelpComponent', () => {
  let component: NtaHelpComponent;
  let fixture: ComponentFixture<NtaHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NtaHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NtaHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
