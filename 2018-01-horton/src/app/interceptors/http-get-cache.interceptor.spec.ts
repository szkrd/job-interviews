import { StorageCacheServiceInterface } from '../services/storage-cache.service';
import createSpy = jasmine.createSpy;
import { HttpGetCacheInterceptor } from './http-get-cache.interceptor';
import { HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

class MockStorageCacheService implements StorageCacheServiceInterface {
  rawHttpResponse = {
    body: '{"foo":{"bar":"baz"}}',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'x-ratelimit-remaining': 42
    },
    status: 200,
    statusText: 'OK',
    url: 'http://foo.bar/'
  };
  set = createSpy('set');
  get (id) { return createSpy('get').and.callFake(() => this.rawHttpResponse)(id); }
}

class MockHttpHandler implements HttpHandler {
  handle = createSpy('handle');
}

describe('HttpGetCacheInterceptor', () => {
  let mockStorageService;
  let interceptor;
  let handler;
  let getReq;

  beforeEach(() => {
    mockStorageService = new MockStorageCacheService();
    interceptor = new HttpGetCacheInterceptor(mockStorageService);
    handler = new MockHttpHandler();
    getReq = new HttpRequest('GET', 'http://foo.bar/');
  });

  it('should not touch non-GET requests', () => {
    const deleReq = new HttpRequest('DELETE', 'http://foo.bar/');

    interceptor.intercept(deleReq, handler);
    expect(handler.handle).toHaveBeenCalledWith(deleReq);
  });

  it('should inject values from the cache', () => {
    const result = interceptor.intercept(getReq, handler);
    expect(result instanceof Observable).toBeTruthy();
    expect(result.value.body).toBe('{"foo":{"bar":"baz"}}');
  });

  it('should write new values to the cache (converted to plain javascript object)', () => {
    const properHttpResponse = new HttpResponse({
      body: '{"baz":{"qux":"corge"}}',
      headers: new HttpHeaders(
        'Content-Type: application/json; charset=utf-8\n' +
        'X-RateLimit-Remaining: 42'
      ),
      status: 200,
      statusText: 'OK',
      url: 'http://baz.qux/'
    });

    class MockHttpHandlerNext implements HttpHandler {
      handle = createSpy('handle').and.callFake(() => ({
        do: (cb) => cb(properHttpResponse)
      }));
    }

    // the cache returns null, so we assume that this is a new value
    mockStorageService.get = () => null;
    handler = new MockHttpHandlerNext();

    const newGetReq = new HttpRequest('GET', 'http://baz.qux/');
    interceptor.intercept(newGetReq, handler);

    // we expect that the new result shall end up in the cache via its setter
    expect(mockStorageService.set).toHaveBeenCalledWith(
      'http://baz.qux/',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-RateLimit-Remaining': '42'
        },
        status: 200,
        statusText: 'OK',
        url: 'http://baz.qux/',
        ok: true,
        type: 4,
        body: '{"baz":{"qux":"corge"}}'
      }
    );
  });
});
