<script setup>
import { computed, onBeforeUpdate, ref } from 'vue';
import { getRandomItem } from '../utils/array.ts';
import { famousMovieTitles } from '../data/famousMovieTitles.ts';

const props = defineProps({
  urlQueryValue: String,
  searchDisabled: Boolean,
  onSubmit: Function,
  onBack: Function,
});

const searchValue = ref(props.urlQueryValue ?? '');
const randomMovieName = getRandomItem(famousMovieTitles);

// conditional event binding (ant page header @back is optional)
const atPageBackEventName = computed(() => (props.urlQueryValue !== '' ? 'back' : undefined));

onBeforeUpdate(() => {
  // allow parent to send the value "down" (for example because the user modified the url manually)
  if (props.urlQueryValue !== searchValue.value) searchValue.value = props.urlQueryValue;
});

function handleSubmit() {
  if (searchValue && props.onSubmit) props.onSubmit(searchValue.value);
}
</script>
<!-- ====================================================================== -->
<template>
  <a-page-header
    title="Movies"
    @[atPageBackEventName]="onBack"
    subTitle="search for movies using tmdb and wikipedia"
    class="bg-indigo-200"
  >
    <!-- storm doesn't understand ant's slots or the slot has not been documented -->
    <template v-slot:extra>
      <!-- storm (probably ant's fault) thinks we have no inline layout type, but it's in the documentation -->
      <a-form layout="inline" @submit.prevent="handleSubmit">
        <a-form-item label="Movie title">
          <!-- ant needs v-model:value, plain v-model will not work -->
          <a-input v-model:value="searchValue" :placeholder="randomMovieName" :disabled="searchDisabled" />
        </a-form-item>
        <a-form-item>
          <!-- ant has a compact input group to group the button and the input, but an inline a-form-input will break that -->
          <a-button type="primary" html-type="submit" :disabled="!searchValue || searchDisabled">Search</a-button>
        </a-form-item>
      </a-form>
    </template>
  </a-page-header>
</template>
