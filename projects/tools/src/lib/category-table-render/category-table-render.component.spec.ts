import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTableRenderComponent } from './category-table-render.component';

describe('CategoryTableRenderComponent', () => {
  let component: CategoryTableRenderComponent;
  let fixture: ComponentFixture<CategoryTableRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTableRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTableRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
