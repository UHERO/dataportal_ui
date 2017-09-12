import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChartsScrollingComponent } from './category-charts-scrolling.component';

describe('CategoryChartsScrollingComponent', () => {
  let component: CategoryChartsScrollingComponent;
  let fixture: ComponentFixture<CategoryChartsScrollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryChartsScrollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryChartsScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
