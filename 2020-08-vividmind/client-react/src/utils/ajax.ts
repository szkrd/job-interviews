import { ajax } from 'rxjs/ajax';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import config from '../config';
import { catchError, map } from 'rxjs/operators';

export function getUrl(pathName: string, queryParams?: Record<string, string>) {
  const qs: string = queryParams ? new URLSearchParams(queryParams).toString() : '';
  return config.API_URL + pathName + (qs ? `?${qs}` : '');
}

interface IAjaxResponseError {
  id: number;
  url: string;
  message: string;
  error: Error;
}

const increaseCallCount = () => call.count$.next(call.count$.getValue() + 1);
const decreaseCallCount = () => call.count$.next(call.count$.getValue() - 1);

export function call(url: string, method = 'GET', body?: any) {
  const headers = { 'Content-Type': 'application/json' };
  increaseCallCount();
  return ajax({ url, method, headers, body }).pipe(
    map(ajaxResponse => {
      decreaseCallCount();
      return ajaxResponse.response;
    }),
    catchError(error => {
      decreaseCallCount();
      const defaultMessage = 'An unknown error occurred. Please try reloading the page.';
      const message = error && typeof error === 'object' && error.message ? error.message : defaultMessage;
      call.error$.next({ id: call.count$.getValue(), url, error, message });
      return of(error);
    })
  );
}

call.error$ = new Subject<IAjaxResponseError>();
call.count$ = new BehaviorSubject<number>(0);
call.get = <T>(url: string): Observable<T> => call(url) as any as Observable<T>;

const ajaxUtils = { getUrl, call };
export default ajaxUtils;
