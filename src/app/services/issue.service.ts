import { Injectable } from '@angular/core';
import {API_URL, ISSUE_ITEMS_PER_PAGE} from '../app.constants';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IssueItem} from '../models/issue-item';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class IssueService {
  static sanitizeItem (rawItem: any): IssueItem {
    return {
      id: rawItem.id,
      createdAt: new Date(rawItem.created_at),
      userName: rawItem.user.login,
      labels: rawItem.labels.map(label => Object.assign({}, {
        name: label.name,
        color: label.color
      })),
      body: rawItem.body
    };
  }

  constructor(protected httpClient: HttpClient) { }

  search(
    q = '',
    page = 1
  ): Observable<HttpResponse<Object>> {
    const url = `${API_URL}/search/issues`;

    return this.httpClient
      .get<any>(url, {
        params: new HttpParams()
          .set('q', q)
          .set('page', String(page))
          .set('per_page', String(ISSUE_ITEMS_PER_PAGE))
          .set('status', 'open')
          .set('sort', 'created')
          .set('order', 'asc'),
        observe: 'response'
      });
  }
}
