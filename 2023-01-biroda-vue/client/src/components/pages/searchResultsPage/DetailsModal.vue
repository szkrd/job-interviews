<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getMovieById, IGetMovieByIdResponse } from '../../../api/getMovieById';
import { apiCall, ApiCallState } from '../../../utils/apiCall';
import CenterSpin from '../../common/CenterSpin.vue';
import CenterErrorMessage from '../../common/CenterErrorMessage.vue';
import { RoutePaths } from '../../../routePaths';

const router = useRouter();
const urlQuery = computed(() => String(router.currentRoute.value.query?.query ?? ''));
const urlId = computed(() => String(router.currentRoute.value.query?.id ?? ''));
const visible = computed(() => !!urlId.value);
const selectedId = ref('');
const result = ref<IGetMovieByIdResponse | undefined>();
const callState = ref<ApiCallState>(ApiCallState.Uninitialized);

// reset the modal, since we're not really destroying it
function handleCancel() {
  selectedId.value = '';
  result.value = undefined;
  callState.value = ApiCallState.Uninitialized;
  router.push({ query: { query: urlQuery.value, id: undefined } });
}

// watchEffect would be triggered by the routing, but since I'm fooling
// around on the same route, that would cause a trigger-happy behaviour
watch(
  urlId,
  () => {
    if (!urlId.value || urlId.value === selectedId.value) return;
    apiCall.toRefs(getMovieById(urlId.value), result, callState);
    selectedId.value = urlId.value;
  },
  { immediate: true }
);
</script>
<!-- ====================================================================== -->
<template>
  <a-modal :title="result?.title ?? '\xa0'" :visible="visible" width="800px" @ok="handleCancel" @cancel="handleCancel">
    <template #footer>
      <div class="flex gap-1 justify-end items-center">
        <template v-if="result">
          <a-typography-link :href="result?.wikipediaUrl" v-if="result.wikipediaUrl" target="_blank">
            Wikipedia
          </a-typography-link>
          <a-typography-link :href="result?.imdbUrl" v-if="result.imdbUrl" target="_blank">IMDB</a-typography-link>
        </template>
        <a-button @click="handleCancel" type="primary">Close</a-button>
      </div>
    </template>
    <!-- content -->
    <CenterSpin v-if="callState === ApiCallState.Pending" class="m-h-5" />
    <CenterErrorMessage v-if="callState === ApiCallState.Rejected" />
    <div v-if="callState === ApiCallState.Fulfilled" class="flex gap-2 z-1">
      <img :src="result?.poster" width="150" height="225" alt="Poster" class="poster" v-if="result?.poster" />
      <div>
        <a-typography-paragraph>
          <a-typography-text>{{ result?.overview || 'Details are not available for this movie.' }}</a-typography-text>
          <br />
          <a-typography-text type="secondary">({{ result?.overviewSource }})</a-typography-text>
        </a-typography-paragraph>
        <ul class="reset flex gap-1 items-center">
          <li>
            <a-button>Add to watchlist</a-button>
          </li>
          <li>
            <router-link :to="`${RoutePaths.MovieDetails}?id=${result?.id}`">open details</router-link>
          </li>
        </ul>
      </div>
    </div>
  </a-modal>
</template>
<!-- ====================================================================== -->
<style scoped>
.poster {
  border-radius: 5px;
  box-shadow: 0 2px 4px #aaa;
  border: 1px solid #fff;
}
</style>
