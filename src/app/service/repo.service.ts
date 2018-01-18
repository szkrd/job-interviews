import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class RepoService {
  url = 'https://wizzair.dev:3110/wizz/proxy/asset/timeout';

  constructor(protected httpClient: HttpClient) { }

  public search(q = ''): Subscription {
    return this.httpClient
      .get<any>(this.url)
      .subscribe(
        data => {
          console.log('http client response:', data);
        },
        error => {
          console.log(error);
        }
      );

    // queryparam example:
    /*
    return this.httpClient.get<Hero>(this.URL, {
      params: new HttpParams().set("id", id)
    });
     */
  }
}
