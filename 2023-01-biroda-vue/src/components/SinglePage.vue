<script setup>
import AppFooter from './AppFooter.vue';
import SearchHeader from './SearchHeader.vue';
import { useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
import {apiCall, ApiCallState} from "../utils/apiCall.ts";
import {getMovies} from "../api/getMovies.ts";
import CenterSpin from "./CenterSpin.vue";

const router = useRouter();
const urlQuery = computed(() => String(router.currentRoute.value.query?.query ?? ''));
const searchResult = ref([]);
const searchState = ref(ApiCallState.Uninitialized);
// const searchFor = ref('');

function onSearchSubmit(text = '') {
  router.push({ query: { query: text } });
}

function onSearchBack() {
  router.push({ query: { query: undefined } });
}

watch(urlQuery, (searchFor) => {
  if (!searchFor) return;
  apiCall.fromComponent(getMovies(searchFor), searchResult, searchState);
})

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
    </a-layout-content>
    <AppFooter />
  </a-layout>
</template>

