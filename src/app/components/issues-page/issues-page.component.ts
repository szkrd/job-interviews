import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {IssueService} from '../../services/issue.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import extractGithubHttpHeaders from '../../utils/extract-github-http-headers';
import {IssueItem} from '../../models/issue-item';
import {HeaderLink} from '../../models/header-link';
import {autobind} from 'core-decorators';
import {HeaderLinkItem} from '../../models/header-link-item';
import {GithubError} from '../../models/github-error';

@Component({
  selector: 'app-issues-page',
  templateUrl: './issues-page.component.html',
  styleUrls: ['./issues-page.component.scss']
})
export class IssuesPageComponent implements OnInit, OnDestroy {
  queryString = '';
  currentPage = 1;
  noResults: boolean;
  isLoading = false;
  error: GithubError;
  issueItems: IssueItem[] = [];
  searchHeaderLink: HeaderLink;
  rateLimitExceeded = false;
  routeChangeSubscription: Subscription;

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeChangeSubscription = this.route
      .queryParams
      .subscribe(this.onRouteQueryParamChange);
  }

  ngOnDestroy() {
    this.routeChangeSubscription.unsubscribe();
  }

  @autobind
  onRouteQueryParamChange (params) {
    const text = (params['q'] || '').trim();
    const page = Number(params['page']) || 1;

    this.queryString = text;
    this.currentPage = page;
    this.doSearch();
  }

  doSearch () {
    const { queryString } = this;
    if (!queryString) {
      this.issueItems = [];
      this.noResults = null;
      return;
    }
    this.isLoading = true;
    this.issueService
      .search(this.queryString, this.currentPage)
      .subscribe(this.onSearchResultSuccess, this.onSearchResultError);
  }

  onLinkSelect (linkItem: HeaderLinkItem) {
    console.log(linkItem);
    const { q, page } = linkItem;
    this.router.navigate(['issues'], {
      queryParams: {q, page}
    });
  }

  @autobind
  onSearchResultSuccess (response: HttpResponse<any>) {
    this.isLoading = false;
    this.error = null;
    const ghHeader = extractGithubHttpHeaders(response);
    this.rateLimitExceeded = ghHeader.rateLimit.remaining === 0;
    this.searchHeaderLink = ghHeader.link;
    this.noResults = response.body.total_count === 0;
    this.issueItems = response.body.items.map(IssueService.sanitizeItem);
  }

  @autobind
  onSearchResultError (response: HttpErrorResponse) {
    this.isLoading = false;
    this.error = response.error;
    console.error(response);
  }

}
