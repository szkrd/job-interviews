/* tslint:disable: no-floating-promises */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { MockPaginationComponent } from '../../../testing/mock-pagination.component';
import { MockRouterLinkDirective } from '../../../testing/mock-router-link.directive';
import { MockLoaderComponent } from '../../../testing/mock-loader.component';
import { MockRepoItemComponent } from '../../../testing/mock-repo-item.component';
import { MockSearchFormComponent } from '../../../testing/mock-search-form.component';
import { RepoService } from '../../services/repo.service';
import { getTextWithSelector } from '../../../testing/utils';
import { ReposPageComponent } from './repos-page.component';
import createSpy = jasmine.createSpy;

class MockRouter {
  navigate = createSpy('navigate');
}

class MockActivatedRoute {
  queryParams = new BehaviorSubject({});
}

class MockRepoService {
  httpSuccessResponse;
  httpErrorResponse;
  search (q = '', page = 1) {
    return this.httpSuccessResponse ?
      Observable.of(this.httpSuccessResponse) :
      Observable.throw(this.httpErrorResponse);
  }
}

// ============================================================================

describe('ReposPageComponent', () => {
  let component: ReposPageComponent;
  let fixture: ComponentFixture<ReposPageComponent>;
  let el: DebugElement;
  let headers: HttpHeaders;

  let mockRouter: MockRouter;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRepoService: MockRepoService;

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    mockActivatedRoute = new MockActivatedRoute();
    mockRepoService = new MockRepoService();

    TestBed.configureTestingModule({
      declarations: [
        ReposPageComponent,
        MockLoaderComponent,
        MockRepoItemComponent,
        MockSearchFormComponent,
        MockPaginationComponent,
        MockRouterLinkDirective
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RepoService, useValue: mockRepoService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposPageComponent);
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
    mockRepoService.httpSuccessResponse = new HttpResponse({
      body: {
        total_count: 1,
        items: [
          {
            id: 1,
            html_url: 'http://github.com/foo/',
            homepage: 'http://foo.com/',
            name: 'Foo',
            full_name: 'Foo Bar',
            description: 'foo bar baz',
            forks: 2,
            stargazers_count: 3,
            open_issues_count: 4,
            watchers: 5
          }
        ]
      },
      headers,
      status: 200,
      statusText: 'OK',
      url: 'http://baz.qux/'
    });

    expect(component.noResults).toBeNull();
    component.rateLimitExceeded = true;

    mockActivatedRoute.queryParams.next({ q: 'foo' });

    expect(component.noResults).toBe(false);
    expect(component.rateLimitExceeded).toBe(false);
    expect(component.searchHeaderLink).toEqual({
      next: { page: '2', rel: 'next', url: 'https://api.foo.com/bar?page=2' },
      last: { page: '5', rel: 'last', url: 'https://api.foo.com/bar?page=5' }
    });

    fixture.detectChanges();
    expect(el.query(By.css('#app-pagination'))).toBeTruthy();
    expect(el.queryAll(By.css('.app-repo-item')).length).toBe(1);
  });

  it('should detect no results', () => {
    mockRepoService.httpSuccessResponse = new HttpResponse({
      body: {
        total_count: 0,
        items: []
      },
      headers
    });
    mockActivatedRoute.queryParams.next({ q: 'bar' });
    expect(component.noResults).toBe(true);
  });

  it('should handle critical search errors', () => {
    mockRepoService.httpErrorResponse = new HttpErrorResponse({
      error: { message: 'Server error.' },
      status: 500
    });

    mockActivatedRoute.queryParams.next({ q: 'bar' });
    fixture.detectChanges();
    expect(el.query(By.css('#app-loader'))).toBeFalsy();
    expect(getTextWithSelector(el, '.error-message')).toBe('(Server error.)');
  });

  // click coming up from the pager
  // --------------------------------------------------------------------------

  it('should make the router to navigate to a new page', () => {
    component.onLinkSelect({ q: 'qux', page: '42' });
    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['repos'], { queryParams: { q: 'qux', page: '42' } }
    );
  });

  // simple ui related components (warnings, messages, loaders)
  // --------------------------------------------------------------------------

  it('should show the search form component', () => {
    expect(el.query(By.css('.app-search-form'))).toBeTruthy();
  });

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
});
