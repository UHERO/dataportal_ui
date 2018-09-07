import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkStubDirective, ActivatedRouteStub, ActivatedRoute } from '../../testing/router-stubs';
import { HttpModule, Http, XHRBackend, BaseRequestOptions, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyzerStatsRendererComponent } from './analyzer-stats-renderer.component';
import { TableHelperService } from '../table-helper.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';

describe('AnalyzerStatsRendererComponent', () => {
  let component: AnalyzerStatsRendererComponent;
  let fixture: ComponentFixture<AnalyzerStatsRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerStatsRendererComponent ],
      providers: [
        TableHelperService,
        GoogleAnalyticsEventsService
      ],
      imports: [ HttpModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerStatsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
