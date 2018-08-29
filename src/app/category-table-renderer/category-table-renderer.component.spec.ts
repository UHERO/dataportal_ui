import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTableRendererComponent } from './category-table-renderer.component';

describe('CategoryTableRendererComponent', () => {
  let component: CategoryTableRendererComponent;
  let fixture: ComponentFixture<CategoryTableRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTableRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTableRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
