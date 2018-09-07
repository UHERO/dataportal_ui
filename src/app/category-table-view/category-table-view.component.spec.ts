import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CategoryTableViewComponent } from './category-table-view.component';
import { AnalyzerService } from '../analyzer.service'
import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';

// Create stub for ag-grid component
@Component({selector: 'ag-grid-angular', template: ''})
class agGridStubComponent {
  @Input() rowData;
  @Input() columnDefs;
  @Input() gridAutoHeight;
  @Input() frameworkComponents;
  @Input() enableRtl;
  @Input() gridReady;
}


describe('CategoryTableViewComponent', () => {
  let component: CategoryTableViewComponent;
  let fixture: ComponentFixture<CategoryTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTableViewComponent, agGridStubComponent ],
      providers: [
        { provide: 'defaultRange', useValue: { start: '', end: '', range: 10 } },
        { provide: 'rootCategory', useValue: 59 },
        {
          provide: 'portal',
          useValue: {
            universe: 'uhero',
            title: 'Data Portal',
            favicon: 'manoa.jpg',
            feedback: true,
            backgroundImg: false
          }
        },
        AnalyzerService,
        HelperService,
        UheroApiService
      ],
      imports: [ HttpModule ]
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
