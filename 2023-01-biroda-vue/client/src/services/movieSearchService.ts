import { ref } from 'vue';
import { getMovies, IGetMoviesResponse } from '../api/getMovies';
import { apiCall, ApiCallState } from '../utils/apiCall';

const searchResult = ref<IGetMoviesResponse | undefined>();
const searchState = ref<ApiCallState>(ApiCallState.Uninitialized);

function search(query = '') {
  return apiCall.toRefs(getMovies(query), searchResult, searchState);
}

export const movieSearchService = {
  searchState,
  searchResult,
  search,
};
