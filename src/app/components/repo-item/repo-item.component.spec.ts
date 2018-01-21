/* tslint:disable: no-floating-promises directive-selector */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoItemComponent } from './repo-item.component';
import { RepoItem } from '../../models/repo-item';
import { getTextWithSelector } from '../../../test/utils';
import { DebugElement, Directive, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

const repoItem = new RepoItem({
  id: 1,
  html_url: 'http://github.com/foo/',
  homepage: 'http://foo.com/',
  name: 'Foo',
  full_name: 'Foo Bar',
  description: 'foo bar baz',
  forks: 222222,
  stargazers_count: 333333,
  open_issues_count: 444444,
  watchers: 555555
});

@Directive({
  selector: '[routerLink], [queryParams]'
})
export class MockRouterLinkDirective {
  @Input('routerLink') routerLink: any;
  @Input('queryParams') queryParams: any;
}

describe('RepoItemComponent', () => {
  let component: RepoItemComponent;
  let fixture: ComponentFixture<RepoItemComponent>;
  let el: DebugElement;
  let mockRouterComponents: MockRouterLinkDirective[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoItemComponent, MockRouterLinkDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;
    component.item = repoItem;
    el = fixture.debugElement;

    fixture.detectChanges();

    // get the directive instance without @viewchild accessor
    // (we have only one in this view, but it's safer to fetch all)
    const mockEl = el.queryAll(By.directive(MockRouterLinkDirective));
    mockRouterComponents = mockEl.map(mEl => mEl.injector.get(MockRouterLinkDirective));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the data of a repo item', () => {
    const getText = selector => getTextWithSelector(el, selector);
    expect(getText('.description')).toBe('foo bar baz');
    expect(getText('.repo-url')).toBe('Foo Bar');
    expect(getText('.fork-count')).toBe('222,222');
    expect(getText('.stargazer-count')).toBe('333,333');
    expect(getText('.issue-count')).toBe('444,444');
    expect(getText('.watcher-count')).toBe('555,555');
    expect(el.query(By.css('.repo-url')).nativeElement.href).toBe('http://github.com/foo/');

    const routerDir = mockRouterComponents[0];
    expect(routerDir.routerLink).toEqual([ '/issues' ]);
    expect(routerDir.queryParams).toEqual({ q: 'Foo Bar' });
  });

  it('should not show a link for the issues if the repo item has no isses at all', () => {
    expect(el.query(By.css('.issue-link'))).toBeTruthy();
    component.item.openIssuesCount = 0;
    fixture.detectChanges();
    expect(el.query(By.css('.issue-link'))).toBeFalsy();
  });
});
