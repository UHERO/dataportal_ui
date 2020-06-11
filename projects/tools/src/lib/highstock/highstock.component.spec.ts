import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighstockComponent } from './highstock.component';

describe('HighstockComponent', () => {
  let component: HighstockComponent;
  let fixture: ComponentFixture<HighstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
