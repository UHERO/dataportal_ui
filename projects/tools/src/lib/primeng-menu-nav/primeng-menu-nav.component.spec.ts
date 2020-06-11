import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengMenuNavComponent } from './primeng-menu-nav.component';

describe('PrimengMenuNavComponent', () => {
  let component: PrimengMenuNavComponent;
  let fixture: ComponentFixture<PrimengMenuNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimengMenuNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimengMenuNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
