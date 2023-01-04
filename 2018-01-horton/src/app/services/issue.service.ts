import { Injectable } from '@angular/core';
import { API_URL, ISSUE_ITEMS_PER_PAGE } from '../app.constants';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IssueService {
  constructor (protected httpClient: HttpClient) { }

  search (
    q = '',
    page = 1
  ): Observable<HttpResponse<Object>> {
    const url = `${API_URL}/repos/${q}/issues`;

    return this.httpClient
      .get<any>(url, {
        params: new HttpParams()
          .set('page', String(page))
          .set('per_page', String(ISSUE_ITEMS_PER_PAGE))
          .set('state', 'open')
          .set('sort', 'created')
          .set('order', 'desc'),
        observe: 'response'
      });
  }
}
