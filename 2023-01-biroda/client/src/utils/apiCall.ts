import axios, { AxiosResponse } from 'axios';
import { AbortablePromise } from '../api/apiModels';
import { queryString } from './queryString';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prefix = (window as any).API_URL ?? 'http://localhost:8080';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAxiosResponse = AbortablePromise<AxiosResponse<any, any>>;

export enum ApiCallState {
  Uninitialized,
  Pending,
  Rejected,
  Fulfilled,
}

function isAxiosCancellation(error: Error) {
  return error.constructor.name.toLowerCase() === 'cancel' || error.message === 'canceled';
}

function get(url: string, queryParams?: Record<string, string | number | boolean>) {
  const controller = new AbortController();
  const qs = queryParams ? queryString.from(queryParams) : '';
  const axProm = axios.get(prefix + url + (qs ? `?${qs}` : ''), { signal: controller.signal });
  Object.assign(axProm, { abort: controller.abort.bind(controller) });
  return axProm as TAxiosResponse;
}

/** Simple api call helper to be used from components */
function fromComponent<T>(
  callFn: TAxiosResponse,
  resultSetter: React.Dispatch<React.SetStateAction<T | null>>,
  callStateSetter: React.Dispatch<React.SetStateAction<ApiCallState>>
) {
  callStateSetter(ApiCallState.Pending);
  return {
    abort: () => {
      if (typeof callFn.abort === 'function') callFn.abort();
    },
    promise: callFn
      .then((response) => {
        callStateSetter(ApiCallState.Fulfilled);
        resultSetter(response.data);
      })
      .catch((error) => {
        if (!isAxiosCancellation(error)) console.error(error);
        callStateSetter(ApiCallState.Rejected);
      }),
  };
}

export const apiCall = { get, fromComponent };
