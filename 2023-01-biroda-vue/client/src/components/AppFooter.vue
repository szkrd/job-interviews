<script lang="ts" setup>
import { famousQuotes } from '../data/famousQuotes';
import { getRandomItem } from '../utils/array';
const quote = getRandomItem(famousQuotes);
</script>
<!-- ====================================================================== -->
<template>
  <a-layout-footer class="italic text-right bg-indigo-200">
    <a-typography-text>{{ quote.text }}</a-typography-text>
    {{ ' ' }}
    <a-typography-text type="secondary">{{ quote.author }}</a-typography-text>
  </a-layout-footer>
</template>
