<script setup>
import AppFooter from './AppFooter.vue';
import SearchHeader from './SearchHeader.vue';
import { useRouter } from 'vue-router';
import { computed, ref, watch, watchEffect } from 'vue';
import { apiCall, ApiCallState } from '../utils/apiCall.ts';
import { getMovies } from '../api/getMovies.ts';
import CenterSpin from './CenterSpin.vue';
import SearchResultsTable from './SearchResultsTable.vue';

const router = useRouter();
const urlQuery = computed(() => String(router.currentRoute.value.query?.query ?? ''));
const searchResult = ref([]);
const searchState = ref(ApiCallState.Uninitialized);
const showResults = computed(
  () =>
    urlQuery.value !== '' && // storm won't catch the missing `.value`
    searchResult.value !== null &&
    searchState.value === ApiCallState.Fulfilled
);

function onSearchSubmit(text = '') {
  router.push({ query: { query: text } });
}

function onSearchBack() {
  router.push({ query: { query: undefined } });
}

watchEffect(async () => {
  if (!urlQuery.value) return;
  return apiCall.fromComponent(getMovies(urlQuery.value), searchResult, searchState);
});
</script>
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
      <SearchResultsTable v-if="showResults" :dataSource="searchResult.results" />
    </a-layout-content>
    <AppFooter />
  </a-layout>
</template>
