/* tslint:disable: no-floating-promises directive-selector */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IssuesPageComponent } from './issues-page.component';
import createSpy = jasmine.createSpy;
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input } from '@angular/core';
// import { IssueItem } from '../../models/issue-item';
// import { HeaderLink } from '../../models/header-link';
import { MockRouterLinkDirective } from '../../../testing/mock-router-link.directive';

class MockRouter {
  navigate = createSpy('navigate');
}

class MockActivatedRoute {
  queryParams = new BehaviorSubject({});
}

class MockIssueService {
  search () {
    console.log('todo');
  }
}

@Component({
  selector: 'app-loader',
  template: '<div id="app-loader"></div>'
})
class MockAppLoaderComponent {}

@Component({
  selector: 'app-issue-item',
  template: '<div class="app-issue-item"></div>'
})
class MockAppIssueItemComponent {
  @Input('item') item;
}

@Component({
  selector: 'app-pagination',
  template: '<div id="app-pagination"></div>'
})
class MockAppPaginationComponent {
  @Input('header-link') headerLink;
}

xdescribe('IssuesPageComponent', () => {
  let component: IssuesPageComponent;
  let fixture: ComponentFixture<IssuesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IssuesPageComponent,
        MockAppLoaderComponent,
        MockAppIssueItemComponent,
        MockAppPaginationComponent,
        MockRouterLinkDirective
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: IssueService, useClass: MockIssueService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
