import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AnalyzerHighstockComponent } from './analyzer-highstock.component';
import { AnalyzerService } from '../analyzer.service';
import { UheroApiService } from '../uhero-api.service';
import { HelperService } from '../helper.service';
import { HighstockHelperService } from '../highstock-helper.service';

// Create stub for chart component
@Component({selector: 'highcharts-chart', template: ''})
class ChartStubComponent {
  @Input() Highcharts;
  @Input() constructorType;
  @Input() options;
  @Input() update;
  @Input() navigator;
  @Input() callbackFunction;
}

describe('AnalyzerHighstockComponent', () => {
  let component: AnalyzerHighstockComponent;
  let fixture: ComponentFixture<AnalyzerHighstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerHighstockComponent, ChartStubComponent ],
      providers: [
        AnalyzerService,
        UheroApiService,
        HelperService,
        HighstockHelperService,
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
      imports: [ HttpClientModule ]
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
