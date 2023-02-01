/* eslint-disable @typescript-eslint/no-explicit-any */

import { Ref } from 'vue';
import { request } from '../fetch/request';

export enum ApiCallState {
  Uninitialized,
  Pending,
  Rejected,
  Fulfilled,
}

export type TQueryParams = Record<string, string | number | boolean>;

function get(url: string, queryParams?: TQueryParams) {
  return request(url, { query: queryParams });
}

function post(url: string, serializableData: any, queryParams?: TQueryParams) {
  if (!serializableData) throw new Error('Missing payload.');
  return request(url, { method: 'POST', data: serializableData, query: queryParams });
}

/**
 * Simple api call helper that saves the call state
 * and the response to the given vue refs.
 */
function toRefs<T>(
  callFn: Promise<T>,
  resultRef: Ref<T> | null | ((response: T) => void),
  callStateRef: Ref<ApiCallState>
) {
  callStateRef.value = ApiCallState.Pending;
  return callFn
    .then((response) => {
      callStateRef.value = ApiCallState.Fulfilled;
      if (resultRef && 'value' in resultRef) resultRef.value = response;
      if (resultRef && typeof resultRef === 'function') resultRef(response);
    })
    .catch(() => {
      // we log the error in the fetch wrapper already
      callStateRef.value = ApiCallState.Rejected;
    });
}

export const apiCall = { get, post, toRefs };
