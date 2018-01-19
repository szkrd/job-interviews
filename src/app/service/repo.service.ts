import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {API_URL} from '../app.constants';

@Injectable()
export class RepoService {
  constructor(protected httpClient: HttpClient) { }

  public search(q = ''): Subscription {
    const url = `${API_URL}/search/repositories`;

    return this.httpClient
      .get<any>(url, {
        params: new HttpParams().set('q', q),
        observe: 'response'
      })
      .subscribe(
        (data: HttpResponse<any>) => {
          console.log('http client response:', data.headers.get('link'));
        },
        error => {
          console.log(error);
        }
      );

    // TODO: pagination from link
    /*
    Link:<https://api.github.com/search/repositories?q=bootstr&page=2>; rel="next", <https://api.github.com/search/repositories?q=bootstr&page=34>; rel="last"
    */
  }
}
