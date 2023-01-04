import { DependencyList, useEffect } from 'react';
import { Observable, Subscription } from 'rxjs';

type ObservableFactoryFn<T> = () => Observable<T>;
type SetterFn<T> = (val: T) => void;

export default function useObservable<T>(obs: Observable<T> | ObservableFactoryFn<T>, setterFn: SetterFn<T> | SetterFn<T>[], deps: DependencyList = []) {
  // if we pass an array of functions, then it's going to be "next", "error", "complete"
  let setterFns: SetterFn<T>[];
  if (!Array.isArray(setterFn)) {
    setterFns = [setterFn];
  }
  useEffect(() => {
    let sub: Subscription;
    if (typeof obs === 'function') {
      // first param was a factory function (that will return an observable);
      // useful for ajax "starters", where we want to defer the observable creation
      sub = obs().subscribe(...setterFns);
    } else {
      // first param was a "proper" observable
      sub = obs.subscribe(...setterFns);
    }
    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || []);
}
