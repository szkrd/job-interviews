/* tslint:disable: no-floating-promises directive-selector */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IssuesPageComponent } from './issues-page.component';
import createSpy = jasmine.createSpy;
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, DebugElement, Input } from '@angular/core';
import { MockRouterLinkDirective } from '../../../testing/mock-router-link.directive';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { getTextWithSelector } from '../../../testing/utils';
import { By } from '@angular/platform-browser';

class MockRouter {
  navigate = createSpy('navigate');
}

class MockActivatedRoute {
  queryParams = new BehaviorSubject({});
}

class MockIssueService {
  httpSuccessResponse;
  httpErrorResponse;
  search (q = '', page = 1) {
    return this.httpSuccessResponse ?
      Observable.of(this.httpSuccessResponse) :
      Observable.throw(this.httpErrorResponse);
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

// test begins here
// ============================================================================

describe('IssuesPageComponent', () => {
  let component: IssuesPageComponent;
  let fixture: ComponentFixture<IssuesPageComponent>;
  let el: DebugElement;
  let headers: HttpHeaders;

  let mockRouter: MockRouter;
  let mockActivatedRoute: MockActivatedRoute;
  let mockIssueService: MockIssueService;

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    mockActivatedRoute = new MockActivatedRoute();
    mockIssueService = new MockIssueService();

    TestBed.configureTestingModule({
      declarations: [
        IssuesPageComponent,
        MockAppLoaderComponent,
        MockAppIssueItemComponent,
        MockAppPaginationComponent,
        MockRouterLinkDirective
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: IssueService, useValue: mockIssueService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesPageComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    headers = new HttpHeaders(
      'Content-Type: application/json; charset=utf-8\n' +
      'X-RateLimit-Remaining: 42\n' +
      `Link: <https://api.foo.com/bar?page=2>; rel="next", <https://api.foo.com/bar?page=5>; rel="last"`
    );

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // fetch items success and failure
  // --------------------------------------------------------------------------

  it('should search for new items on route change', () => {
    mockIssueService.httpSuccessResponse = new HttpResponse({
      body: [
        {
          id: 42,
          title: 'Foo',
          created_at: 1516534249264,
          user: { login: 'Waldo' },
          labels: [
            { name: 'bar', color: 'ffff00' },
            { name: 'baz', color: 'ff00ff' },
            { name: 'qux', color: '00ffff' }
          ],
          body: '# Corge.'
        }
      ],
      headers,
      status: 200,
      statusText: 'OK',
      url: 'http://baz.qux/'
    });

    component.rateLimitExceeded = true;

    // let's wake the component with the router
    mockActivatedRoute.queryParams.next({ q: 'foo' });

    expect(component.noResults).toBe(false);
    expect(component.rateLimitExceeded).toBe(false);
    expect(component.searchHeaderLink).toEqual({
      next: { page: '2', rel: 'next', url: 'https://api.foo.com/bar?page=2' },
      last: { page: '5', rel: 'last', url: 'https://api.foo.com/bar?page=5' }
    });

    fixture.detectChanges();
    expect(el.query(By.css('#app-pagination'))).toBeTruthy();
    expect(el.queryAll(By.css('.app-issue-item')).length).toBe(1); // we added one item only
  });

  it('should detect no results', () => {
    // we check for the ui element later below
    mockIssueService.httpSuccessResponse = new HttpResponse({ body: [], headers });
    mockActivatedRoute.queryParams.next({ q: 'foo' });
    expect(component.noResults).toBe(true);
  });

  it('should handle critical search errors', () => {
    mockIssueService.httpErrorResponse = new HttpErrorResponse({
      error: { message: 'Server error.' },
      status: 500
    });

    mockActivatedRoute.queryParams.next({ q: 'foo' });
    fixture.detectChanges();
    expect(el.query(By.css('#app-loader'))).toBeFalsy();
    expect(getTextWithSelector(el, '.error-message')).toBe('(Server error.)');
  });

  // click coming up from the pager
  // --------------------------------------------------------------------------

  it('should make the router to navigate to a new page', () => {
    component.queryString = 'foo';
    component.onLinkSelect({ page: '9' });
    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['issues'], { queryParams: { q: 'foo', page: '9' } }
    );
  });

  // simple ui related components (warnings, messages, loaders)
  // --------------------------------------------------------------------------

  it('should show the loader when the component is loading', () => {
    expect(el.query(By.css('#app-loader'))).toBeFalsy();
    component.isLoading = true;
    fixture.detectChanges();
    expect(el.query(By.css('#app-loader'))).toBeTruthy();
  });

  it('should show a message if the rate limit has been exceeded', () => {
    expect(el.query(By.css('.rate-limit-exceeded'))).toBeFalsy();
    component.rateLimitExceeded = true;
    fixture.detectChanges();
    expect(el.query(By.css('.rate-limit-exceeded'))).toBeTruthy();
  });

  it('should show a message if no results have been found', () => {
    expect(el.query(By.css('.no-results'))).toBeFalsy();
    component.noResults = true;
    fixture.detectChanges();
    expect(el.query(By.css('.no-results'))).toBeTruthy();
  });

  it('should show a rudimentary back link in the title', () => {
    const link = el.query(By.css('.go-back'));
    const dir = link.injector.get(MockRouterLinkDirective);
    component.queryString = 'waldo';
    fixture.detectChanges();

    // the result is an instance, so let's look at the props
    expect(dir.routerLink).toEqual([ '/repos' ]);
    expect(dir.queryParams).toEqual({ q: 'waldo' });
  });
});
