import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { AnalyzerService } from '../analyzer.service'; 
import { DataPortalSettingsService } from '../data-portal-settings.service';
import { AnalyzerComponent } from './analyzer.component';
import { HelperService } from '../helper.service';

// Create stub for analyzer-highstock
@Component({selector: 'app-analyzer-highstock', template: ''})
class AnalyzerHighstockStubComponent {
  @Input() portalSettings;
  @Input() series;
  @Input() alertMessage;
  @Input() allDates;
}

// Create stub for analyzer-table
@Component({selector: 'app-analyzer-table', template: ''})
class AnalyzerTableStubComponent {
  @Input() minDate;
  @Input() maxDate;
  @Input() chartSeries;
  @Input() series;
  @Input() allTableDates;
}

describe('AnalyzerComponent', () => {
  let component: AnalyzerComponent;
  let fixture: ComponentFixture<AnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerComponent, AnalyzerHighstockStubComponent, AnalyzerTableStubComponent ],
      providers: [
        AnalyzerService,
        DataPortalSettingsService,
        HelperService,
        { provide: 'portal', useValue: 'test' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
