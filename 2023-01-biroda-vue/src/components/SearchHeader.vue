<script setup>
import { ref } from 'vue';
import { getRandomItem } from '../utils/array.ts';
import { famousMovieTitles } from '../data/famousMovieTitles.ts';

const props = defineProps({
  value: String,
  hasBackButton: Boolean,
  searchDisabled: Boolean,
  onSubmit: Function,
});

const searchValue = ref('');
const randomMovieName = getRandomItem(famousMovieTitles);

function handleSubmit() {
  if (searchValue && props.onSubmit) props.onSubmit(searchValue);
}
</script>
<template>
  <a-page-header
    title="Movies"
    subTitle="search for movies using tmdb and wikipedia"
    class="bgIndigo200"
  >
    <!-- storm doesn't understand ant's slots or the slot has not been documented -->
    <template v-slot:extra>
      <!-- storm (probably ant's fault) thinks we have no inline layout type, but it's in the documentation -->
      <a-form layout="inline" @submit.prevent="handleSubmit">
        <a-form-item label="Movie title">
          <!-- ant needs v-model:value, plain v-model will not work -->
          <a-input
            v-model:value.trim="searchValue"
            :placeholder="randomMovieName"
            :disabled="searchDisabled"
          />
        </a-form-item>
        <a-form-item>
          <!-- ant has a compact input group to group the button and the input, but an inline a-form-input will break that -->
          <a-button type="primary" html-type="submit" :disabled="!searchValue">Search</a-button>
        </a-form-item>
      </a-form>
    </template>
  </a-page-header>
</template>
