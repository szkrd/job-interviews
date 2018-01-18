import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {StorageCacheService} from '../service/storage-cache.service';

@Injectable()
export class HttpGetCacheInterceptor implements HttpInterceptor {
  private cache: StorageCacheService;

  constructor() {
    this.cache = new StorageCacheService();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.urlWithParams);
    if (cachedResponse) {
      return Observable.of(new HttpResponse(cachedResponse)); // oh god, I typecasted first, but we DO need the creator
    }

    return next.handle(req).do(event => {
      if (event instanceof HttpResponse) {
        this.cache.set(req.urlWithParams, event); // do we need event.clone()?
      }
    });
  }
}
