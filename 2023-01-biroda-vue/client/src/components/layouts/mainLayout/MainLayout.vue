<script lang="ts" setup>
import AppFooter from './AppFooter.vue';
import AppHeader from './AppHeader.vue';
</script>
<!-- ====================================================================== -->
<template>
  <a-layout class="h-full">
    <a-layout-header class="m-0-p-0">
      <AppHeader />
    </a-layout-header>
    <a-layout-content class="h-full overflow-y-auto mt-1">
      <router-view></router-view>
    </a-layout-content>
    <AppFooter />
  </a-layout>
</template>
