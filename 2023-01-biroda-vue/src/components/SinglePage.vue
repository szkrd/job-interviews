<script setup>
import AppFooter from './AppFooter.vue';
import SearchHeader from './SearchHeader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function onSearchSubmit(text = '') {
  console.log('>>> TODO submit', text);
  router.push({ query: { query: text } });
}
</script>
<template>
  <a-layout class="single-page">
    <a-layout-header class="m0p0"><SearchHeader :onSubmit="onSearchSubmit" /></a-layout-header>
    <a-layout-content class="hFull overflowYAuto mt1"> content area </a-layout-content>
    <AppFooter />
  </a-layout>
</template>

<style scoped>
.single-page {
  height: 100%;
}
</style>
