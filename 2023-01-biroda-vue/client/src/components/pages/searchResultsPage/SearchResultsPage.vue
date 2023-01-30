<script lang="ts" setup>
import CenterSpin from '../../common/CenterSpin.vue';
import SearchResultsTable from './SearchResultsTable.vue';
import DetailsModal from './DetailsModal.vue';
import CenterErrorMessage from '../../common/CenterErrorMessage.vue';
import { movieSearchService } from '../../../services/movieSearchService';
import { ApiCallState } from '../../../utils/apiCall';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import SearchResultsGrid from './SearchResultsGrid.vue';

const { searchState, searchResult, search } = movieSearchService;

const router = useRouter();
const lastUrlQuery = ref<null | string>(null);
const urlQuery = computed(() => String(router.currentRoute.value.query?.query ?? ''));

const showResults = computed(() => searchResult.value && searchState.value === ApiCallState.Fulfilled);

function onMovieTitleClick(id: number) {
  router.push({ query: { query: urlQuery.value, id } });
}

watchEffect(async () => {
  // messing with the routing can easily make this trigger-happy
  // (we have two query params, not one, so the "id" would trigger a side effect)
  if (urlQuery.value === lastUrlQuery.value) return;
  lastUrlQuery.value = urlQuery.value;
  return search(urlQuery.value);
});
</script>
<!-- ====================================================================== -->
<template>
  <CenterSpin v-if="searchState === ApiCallState.Pending" />
  <SearchResultsTable
    v-if="showResults && searchResult?.results && urlQuery !== ''"
    :dataSource="searchResult?.results"
    :onItemClick="onMovieTitleClick"
    fields="poster,title,score,releaseDate,genres"
  />
  <div v-if="showResults && searchResult?.results && urlQuery === ''" class="m-1">
    <a-typography-title :level="2">Popular movies</a-typography-title>
    <a-typography-paragraph> Millions of movies, TV shows and people to discover. Explore now. </a-typography-paragraph>
    <SearchResultsGrid :dataSource="searchResult?.results" :onItemClick="onMovieTitleClick" />
  </div>
  <CenterErrorMessage v-if="searchState === ApiCallState.Rejected" />
  <DetailsModal />
</template>
