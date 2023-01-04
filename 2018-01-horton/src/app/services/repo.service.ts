import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_URL, REPO_ITEMS_PER_PAGE } from '../app.constants';

@Injectable()
export class RepoService {
  constructor (protected httpClient: HttpClient) { }

  search (
    q = '',
    page = 1
  ): Observable<HttpResponse<Object>> {
    const url = `${API_URL}/search/repositories`;

    return this.httpClient
      .get<any>(url, {
        params: new HttpParams()
          .set('q', q)
          .set('per_page', String(REPO_ITEMS_PER_PAGE))
          .set('page', String(page)),
        observe: 'response'
      });
  }
}
