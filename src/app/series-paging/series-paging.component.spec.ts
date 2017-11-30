import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SeriesPagingComponent } from './series-paging.component';

@Component({
  selector: 'test-cmp',
  template: '<app-series-paging [data]="mockScrollSeries"></app-series-paging>',
})
class TestCmpWrapperComponent {
  mockScrollSeries = [
    [{
      categoryChart: {},
      categoryTable: {},
      chartData: [],
      end: '',
      seriesInfo: {},
      start: '',
      tableData: [],
    }, {
      categoryChart: {},
      categoryTable: {},
      chartData: [],
      end: '',
      seriesInfo: {},
      start: '',
      tableData: [],
    }]
  ];
}

describe('SeriesPagingComponent', () => {
  let component: SeriesPagingComponent;
  let fixture: ComponentFixture<TestCmpWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesPagingComponent, TestCmpWrapperComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestCmpWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
