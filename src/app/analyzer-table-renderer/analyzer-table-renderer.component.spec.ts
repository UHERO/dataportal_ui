import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkStubDirective, ActivatedRouteStub, ActivatedRoute } from '../../testing/router-stubs';
import { HttpModule, Http, XHRBackend, BaseRequestOptions, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyzerTableRendererComponent } from './analyzer-table-renderer.component';
import { TableHelperService } from '../table-helper.service';
import { GoogleAnalyticsEventsService } from '../google-analytics-events.service';

describe('AnalyzerTableRendererComponent', () => {
  let component: AnalyzerTableRendererComponent;
  let fixture: ComponentFixture<AnalyzerTableRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerTableRendererComponent ],
      providers: [
        TableHelperService,
        GoogleAnalyticsEventsService
      ],
      imports: [ HttpModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerTableRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
