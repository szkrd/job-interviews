import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {RepoService} from '../service/repo.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import extractGithubHttpHeaders from '../util/extract-github-http-headers';
import sanitizeRepoItem from '../util/sanitize-repo-item';
import {RepoItem} from '../model/repo-item';
import {HeaderLink} from '../model/header-link';
import {autobind} from 'core-decorators';
import {HeaderLinkItem} from '../model/header-link-item';

@Component({
  selector: 'app-repos-page',
  templateUrl: './repos-page.component.html',
  styleUrls: ['./repos-page.component.scss']
})
export class ReposPageComponent implements OnInit, OnDestroy {
  queryString = '';
  currentPage = 1;
  noResults: boolean;
  repoItems: RepoItem[] = [];
  searchHeaderLink: HeaderLink;
  rateLimitExceeded = false;
  routeChangeSubscription: Subscription;

  constructor(
    private repoService: RepoService,
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

  onSearchFormChange(text: string) {
    if (this.queryString === text) {
      return;
    }

    if (!text) {
      this.router.navigate(['repos']);
    }

    const q = this.queryString = text;
    const page = this.currentPage = 1;

    this.router.navigate(['repos'], {
      queryParams: {q, page}
    });
  }

  doSearch () {
    const { queryString } = this;
    if (!queryString) {
      this.repoItems = [];
      this.noResults = null;
      return;
    }
    this.repoService
      .search(this.queryString, this.currentPage)
      .subscribe(this.onSearchResultSuccess, this.onSearchResultError);
  }

  onLinkSelect (linkItem: HeaderLinkItem) {
    const { q, page } = linkItem;
    this.router.navigate(['repos'], {
      queryParams: {q, page}
    });
  }

  @autobind
  onSearchResultSuccess (response: HttpResponse<any>) {
    const ghHeader = extractGithubHttpHeaders(response);
    this.rateLimitExceeded = ghHeader.rateLimit.remaining === 0;
    this.searchHeaderLink = ghHeader.link;
    this.noResults = response.body.total_count === 0;
    this.repoItems = response.body.items.map(sanitizeRepoItem);
  }

  @autobind
  onSearchResultError (error: HttpErrorResponse) {
    console.error(error);
  }

}
