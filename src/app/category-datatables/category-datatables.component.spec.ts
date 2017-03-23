import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDatatablesComponent } from './category-datatables.component';

describe('CategoryDatatablesComponent', () => {
  let component: CategoryDatatablesComponent;
  let fixture: ComponentFixture<CategoryDatatablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDatatablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDatatablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
