import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyzerService } from '../analyzer.service';
import { HelperService } from '../helper.service';
import { SeriesHelperService } from '../series-helper.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';
import { TableHelperService } from '../table-helper.service';
import { UheroApiService } from '../uhero-api.service';
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { AnalyzerTableComponent } from './analyzer-table.component';

// Create stub for ag-grid component
@Component({selector: 'ag-grid-angular', template: ''})
class agGridStubComponent {
  @Input() rowData;
  @Input() columnDefs;
  @Input() gridAutoHeight;
  @Input() frameworkComponents;
  @Input() enableRtl;
  @Input() gridReady;
  @Input() gridOptions;
  @Input() suppressDragLeaveHidesColumns;
  @Input() singleClickEdit;
}

describe('AnalyzerTableComponent', () => {
  let component: AnalyzerTableComponent;
  let fixture: ComponentFixture<AnalyzerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerTableComponent, agGridStubComponent ],
      providers: [
        AnalyzerService,
        DataPortalSettingsService,
        GoogleAnalyticsEventsService,
        HelperService,
        SeriesHelperService,
        TableHelperService,
        UheroApiService,
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
        }
      ],
      imports: [ RouterTestingModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
