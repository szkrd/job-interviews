import axios, { AxiosResponse } from 'axios';
import { queryString } from './queryString';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prefix = (window as any).API_URL ?? 'http://localhost:8080';

export enum ApiCallState {
  Uninitialized,
  Pending,
  Rejected,
  Fulfilled,
}

function get(url: string, queryParams?: Record<string, string | number | boolean>) {
  const qs = queryParams ? queryString.from(queryParams) : '';
  return axios.get(prefix + url + (qs ? `?${qs}` : ''));
}

/** Simple api call helper to be used from components */
function fromComponent<T>(
  callFn: Promise<AxiosResponse<T, unknown>>,
  resultSetter: React.Dispatch<React.SetStateAction<T | null>>,
  callStateSetter: React.Dispatch<React.SetStateAction<ApiCallState>>
) {
  callStateSetter(ApiCallState.Pending);
  return callFn
    .then((response) => {
      callStateSetter(ApiCallState.Fulfilled);
      resultSetter(response.data);
    })
    .catch((error) => {
      console.error(error);
      callStateSetter(ApiCallState.Rejected);
    });
}

export const apiCall = { get, fromComponent };
