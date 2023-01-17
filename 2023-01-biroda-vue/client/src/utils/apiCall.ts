import { Ref } from 'vue';
import { request } from './request';

export enum ApiCallState {
  Uninitialized,
  Pending,
  Rejected,
  Fulfilled,
}

function get(url: string, queryParams?: Record<string, string | number | boolean>) {
  return request(url, { query: queryParams });
}

/** Simple api call helper to be used from components */
function toRefs<T>(callFn: Promise<T>, resultRef: Ref<T>, callStateRef: Ref<ApiCallState>) {
  callStateRef.value = ApiCallState.Pending;
  return callFn
    .then((response) => {
      callStateRef.value = ApiCallState.Fulfilled;
      resultRef.value = response;
    })
    .catch(() => {
      // we log the error in the fetch wrapper already
      callStateRef.value = ApiCallState.Rejected;
    });
}

export const apiCall = { get, toRefs };
