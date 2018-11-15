import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkStubDirective, ActivatedRouteStub, ActivatedRoute } from '../../testing/router-stubs';
import { XHRBackend, BaseRequestOptions, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryTableRendererComponent } from './category-table-renderer.component';
import { TableHelperService } from '../table-helper.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';
import { AnalyzerService } from '../analyzer.service';
import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';

describe('CategoryTableRendererComponent', () => {
  let component: CategoryTableRendererComponent;
  let fixture: ComponentFixture<CategoryTableRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTableRendererComponent ],
      providers: [
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
        TableHelperService,
        GoogleAnalyticsEventsService,
        AnalyzerService,
        UheroApiService,
        HelperService
      ],
      imports: [ HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTableRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
