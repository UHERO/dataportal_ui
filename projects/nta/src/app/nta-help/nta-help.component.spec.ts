import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NtaHelpComponent } from './nta-help.component';

describe('NtaHelpComponent', () => {
  let component: NtaHelpComponent;
  let fixture: ComponentFixture<NtaHelpComponent>;

  beforeEach(waitForAsync(() => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
