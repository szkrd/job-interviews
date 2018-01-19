import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {API_URL} from '../app.constants';
import extractGithubHttpHeaders from '../util/extract-github-http-headers';

@Injectable()
export class RepoService {
  constructor(protected httpClient: HttpClient) { }

  public search(q = '', page = 1): Observable<HttpResponse<Object>> {
    const url = `${API_URL}/search/repositories`;
    const itemsPerPage = 10;

    return this.httpClient
      .get<any>(url, {
        params: new HttpParams()
          .set('q', q)
          .set('per_page', String(itemsPerPage))
          .set('page', String(page)),
        observe: 'response'
      });
  }
}
