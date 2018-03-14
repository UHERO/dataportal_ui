import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CohHelpComponent } from './coh-help.component';

describe('CohHelpComponent', () => {
  let component: CohHelpComponent;
  let fixture: ComponentFixture<CohHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CohHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CohHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
