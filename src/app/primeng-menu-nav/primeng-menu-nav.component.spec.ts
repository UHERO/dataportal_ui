import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Router, RouterStub, ActivatedRouteStub, ActivatedRoute } from '../../testing/router-stubs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { PrimengMenuNavComponent } from './primeng-menu-nav.component';
import { UheroApiService } from '../uhero-api.service';
import { MockApiService } from '../../testing/mockapi-service';
import { HelperService } from '../helper.service';
import { AnalyzerService } from '../analyzer.service';

// Create stub for header component
@Component({selector: 'app-search-bar', template: ''})
class SearchStubComponent {}

// Create stub for header component
@Component({selector: 'p-panelMenu', template: ''})
class PanelMenuStubComponent {
  @Input() model;
}

let activatedRoute: ActivatedRouteStub;

describe('PrimengMenuNavComponent', () => {
  let component: PrimengMenuNavComponent;
  let fixture: ComponentFixture<PrimengMenuNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimengMenuNavComponent, SearchStubComponent, PanelMenuStubComponent ],
      providers: [
        AnalyzerService,
        HelperService,
        // UheroApiService,
        { provide: 'logo', useValue: {logo: 'logo.svg'} },
        { provide: 'rootCategory', useValue: 59 },
        { provide: UheroApiService, useClass: MockApiService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useClass: RouterStub },
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

  /* beforeEach(() => {
    fixture = TestBed.createComponent(PrimengMenuNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
