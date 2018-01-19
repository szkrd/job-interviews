import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_URL, REPO_ITEMS_PER_PAGE } from '../app.constants';
import { RepoItem } from '../models/repo-item';

@Injectable()
export class RepoService {
  static sanitizeItem (rawItem: any): RepoItem {
    return {
      id: rawItem.id,
      url: rawItem.html_url,
      homepage: rawItem.html_url || '',
      name: rawItem.name,
      fullName: rawItem.full_name,
      description: rawItem.description || '',
      forks: rawItem.forks,
      stargazersCount: rawItem.stargazers_count,
      openIssuesCount: rawItem.open_issues_count,
      watchers: rawItem.watchers
    };
  }

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
