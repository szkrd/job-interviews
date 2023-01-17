<script lang="ts" setup>
import AppFooter from './AppFooter.vue';
import SearchHeader from './SearchHeader.vue';
import { useRouter } from 'vue-router';
import { computed, ref, watchEffect } from 'vue';
import { apiCall, ApiCallState } from '../utils/apiCall';
import { getMovies, IGetMoviesResponse } from '../api/getMovies';
import CenterSpin from './CenterSpin.vue';
import SearchResultsTable from './SearchResultsTable.vue';
import DetailsModal from './DetailsModal.vue';
import CenterErrorMessage from './CenterErrorMessage.vue';

const router = useRouter();
const urlQuery = computed(() => String(router.currentRoute.value.query?.query ?? ''));
const lastUrlQuery = ref('');
const searchResult = ref<IGetMoviesResponse | undefined>();
const searchState = ref<ApiCallState>(ApiCallState.Uninitialized);
const showResults = computed(
  () => urlQuery.value !== '' && searchResult.value && searchState.value === ApiCallState.Fulfilled
);

function onSearchSubmit(text = '') {
  if (text === urlQuery.value) {
    // force search on button click, even if the route is the same
    // (which is a reasonable enough request in this case)
    doSearch();
  } else {
    router.push({ path: '/', query: { query: text } });
  }
}

function onSearchBack() {
  router.push({ path: '/', query: { query: undefined } });
}

function onMovieTitleClick(id: string) {
  router.push({ query: { query: urlQuery.value, id } });
}

function doSearch() {
  const call = apiCall.fromComponent(getMovies(urlQuery.value), searchResult, searchState);
  lastUrlQuery.value = urlQuery.value;
  return call;
}

watchEffect(async () => {
  // messing with the routing can easily make this trigger-happy
  // (we have two query params, not one, so the "id" would trigger a side effect)
  if (!urlQuery.value || urlQuery.value === lastUrlQuery.value) return;
  return doSearch();
});
</script>
<!-- ====================================================================== -->
<template>
  <a-layout class="h-full">
    <a-layout-header class="m-0-p-0">
      <SearchHeader
        :onSubmit="onSearchSubmit"
        :onBack="onSearchBack"
        :urlQueryValue="urlQuery"
        :searchDisabled="false"
      />
    </a-layout-header>
    <a-layout-content class="h-full overflow-y-auto mt-1">
      <CenterSpin v-if="searchState === ApiCallState.Pending" />
      <SearchResultsTable v-if="showResults" :dataSource="searchResult?.results" :onItemClick="onMovieTitleClick" />
      <CenterErrorMessage v-if="searchState === ApiCallState.Rejected" />
      <DetailsModal />
    </a-layout-content>
    <AppFooter />
  </a-layout>
</template>
