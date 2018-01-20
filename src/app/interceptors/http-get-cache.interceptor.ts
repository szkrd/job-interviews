import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { StorageCacheService } from '../services/storage-cache.service';

@Injectable()
export class HttpGetCacheInterceptor implements HttpInterceptor {
  private cache: StorageCacheService;

  constructor () {
    this.cache = new StorageCacheService();
  }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.urlWithParams);
    if (cachedResponse) {
      cachedResponse.headers = new HttpHeaders(cachedResponse.headers);
      const fakeResponse = new HttpResponse(cachedResponse);
      return Observable.of(fakeResponse);
    }

    return next.handle(req).do(event => {
      if (event instanceof HttpResponse) {
        // header internals are all private
        // so we have to extract the headers one by one
        const headerKeys = event.headers.keys();
        const headers = headerKeys.reduce((acc, name) => {
          acc[name] = event.headers.get(name);
          return acc;
        }, {});
        const rateLimit = Number(event.headers.get('x-ratelimit-remaining'));
        if (rateLimit > 0) {
          const dumbedEvent = Object.assign({}, event, { headers });
          this.cache.set(req.urlWithParams, dumbedEvent);
        }
      }
    });
  }
}
