<script setup>
import { famousQuotes } from '../data/famousQuotes';
import { getRandomItem } from '../utils/array.ts';

// we won't even need a ref here, it's just static text
const quote = getRandomItem(famousQuotes);
</script>
<template>
  <a-layout-footer class="italic textRight bgIndigo200">
    <a-typography-text>{{ quote.text }}</a-typography-text>
    {{ ' ' }}
    <a-typography-text type="secondary">{{ quote.author }}</a-typography-text>
  </a-layout-footer>
</template>
