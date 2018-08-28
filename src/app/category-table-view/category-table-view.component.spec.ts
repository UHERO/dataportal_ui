import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTableViewComponent } from './category-table-view.component';

describe('CategoryTableViewComponent', () => {
  let component: CategoryTableViewComponent;
  let fixture: ComponentFixture<CategoryTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
