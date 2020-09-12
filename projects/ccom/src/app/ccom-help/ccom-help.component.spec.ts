import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcomHelpComponent } from './ccom-help.component';

describe('CcomHelpComponent', () => {
  let component: CcomHelpComponent;
  let fixture: ComponentFixture<CcomHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcomHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcomHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
