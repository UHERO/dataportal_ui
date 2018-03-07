/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

// Create stub for header component
@Component({selector: 'app-header', template: ''})
class HeaderStubComponent {}

// Create stub for sidebar-nav component
@Component({selector: 'app-sidebar-nav', template: ''})
class SidebarNavStubComponent {}

@Component({selector: 'app-feedback', template: ''})
class FeedbackStubComponent {}

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderStubComponent, SidebarNavStubComponent, FeedbackStubComponent
      ],
      imports: [ RouterTestingModule ],
      providers: [
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
        { provide: 'GoogleAnalyticsId', useValue: 'gaId' }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
    });
  }));
  tests();
});

function tests() {
  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });
}
