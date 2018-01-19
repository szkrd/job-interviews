import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {API_URL} from '../app.constants';
import extractGithubHttpHeaders from '../util/extract-github-http-headers';
import {HeaderLinkItem} from '../model/header-link-item';
import {deprecated} from 'core-decorators';

const ITEMS_PER_PAGE = 10;

@Injectable()
export class RepoService {
  constructor(protected httpClient: HttpClient) { }

  search(
    q = '',
    page = 1
  ): Observable<HttpResponse<Object>> {
    const url = `${API_URL}/search/repositories`;
    const itemsPerPage = 10;

    return this.httpClient
      .get<any>(url, {
        params: new HttpParams()
          .set('q', q)
          .set('per_page', String(ITEMS_PER_PAGE))
          .set('page', String(page)),
        observe: 'response'
      });
  }

  @deprecated
  searchWithLink (link: HeaderLinkItem): Observable<HttpResponse<Object>> {
    return this.search(
      link.q,
      Number(link.page)
    );
  }
}
