<script setup>
import { famousQuotes } from '../data/famousQuotes';
import { random } from '../utils/number';

// we won't even need a ref here, it's just static text
const quote = famousQuotes[random(famousQuotes.length - 1)];
</script>
<template>
  <a-layout-footer class="italic textRight bgIndigo200">
    <a-typography-text>{{ quote.text }}</a-typography-text>
    {{ ' ' }}
    <a-typography-text type="secondary">{{ quote.author }}</a-typography-text>
  </a-layout-footer>
</template>
