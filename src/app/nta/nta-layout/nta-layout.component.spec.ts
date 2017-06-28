import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NtaLayoutComponent } from './nta-layout.component';

describe('NtaLayoutComponent', () => {
  let component: NtaLayoutComponent;
  let fixture: ComponentFixture<NtaLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NtaLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NtaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
