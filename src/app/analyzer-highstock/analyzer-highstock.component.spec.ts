import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { HttpModule, Http, XHRBackend, BaseRequestOptions, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { AnalyzerHighstockComponent } from './analyzer-highstock.component';
import { AnalyzerService } from '../analyzer.service';
import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';

// Create stub for chart component
@Component({selector: 'chart', template: ''})
class ChartStubComponent {
  @Input() options;
}

// Create stub for xAxis component
@Component({selector: 'xAxis', template: ''})
class XAxisStubComponent {}

describe('AnalyzerHighstockComponent', () => {
  let component: AnalyzerHighstockComponent;
  let fixture: ComponentFixture<AnalyzerHighstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerHighstockComponent, XAxisStubComponent, ChartStubComponent ],
      providers: [
        AnalyzerService,
        UheroApiService,
        HelperService,
        { provide: 'rootCategory', useValue: 59 },
        { provide: 'portal', useValue: 'uhero' }
      ],
      imports: [ HttpModule ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerHighstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
