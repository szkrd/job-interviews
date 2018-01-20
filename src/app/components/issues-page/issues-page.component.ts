import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IssueService } from '../../services/issue.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IssueItem } from '../../models/issue-item';
import { HeaderLink } from '../../models/header-link';
import { autobind } from 'core-decorators';
import { HeaderLinkItem } from '../../models/header-link-item';
import { GithubError } from '../../models/github-error';
import { GithubExtractedHeader } from '../../models/github-extracted-header';

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

  constructor (
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit () {
    this.routeChangeSubscription = this.route
      .queryParams
      .subscribe(this.onRouteQueryParamChange);
  }

  ngOnDestroy () {
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
    const { page } = linkItem;
    const q = this.queryString;
    this.router.navigate(['issues'], {
      queryParams: {
        q,
        page
      }
    });
  }

  @autobind
  onSearchResultSuccess (response: HttpResponse<any>) {
    this.isLoading = false;
    this.error = null;
    const ghHeader = new GithubExtractedHeader(response.headers);
    this.rateLimitExceeded = ghHeader.rateLimit.remaining === 0;
    this.searchHeaderLink = ghHeader.link;
    this.noResults = response.body.length === 0;
    this.issueItems = response.body.map(item => new IssueItem(item));
  }

  @autobind
  onSearchResultError (response: HttpErrorResponse) {
    this.isLoading = false;
    this.error = response.error;
    console.error(response);
  }

}
