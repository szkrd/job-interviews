<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { computed, ref, watchEffect } from 'vue';
import { apiCall, ApiCallState } from '../../utils/apiCall';
import { getMovieByIdDetailed, IGetMovieByIdDetailedResponse } from '../../api/getMovieById';
import CenterSpin from '../common/CenterSpin.vue';
import CenterErrorMessage from '../common/CenterErrorMessage.vue';

const router = useRouter();
const urlId = computed(() => String(router.currentRoute.value.query?.id ?? ''));
const result = ref<IGetMovieByIdDetailedResponse | undefined>();
const callState = ref<ApiCallState>(ApiCallState.Uninitialized);

watchEffect(() => {
  if (!urlId.value) return;
  apiCall.toRefs(getMovieByIdDetailed(urlId.value), result, callState);
});
</script>
<template>
  <CenterSpin v-if="callState === ApiCallState.Pending" />
  <CenterErrorMessage v-if="callState === ApiCallState.Rejected" />
  <div v-if="callState === ApiCallState.Fulfilled" class="content">
    <div></div>
    <div class="flex gap-2">
      <div class="poster">
        <img :src="result?.poster" width="300" height="450" alt="Poster" class="poster-image" v-if="result?.poster" />
      </div>
      <div class="details">
        <p>{{ result?.adult }}</p>
        <p>{{ result?.budget }}</p>
        <p>{{ result?.revenue }}</p>
        <p>{{ result?.genres }}</p>
        <p>{{ result?.homepage }}</p>
        <p>{{ result?.runTime }}</p>
        <p>{{ result?.status }}</p>
        <p>{{ result?.tagLine }}</p>
        <p>{{ result?.video }}</p>
        <p>{{ result?.score }}</p>
        <p>{{ result?.productionCompanies }}</p>
        <p>{{ result?.id }}</p>
        <p>{{ result?.title }}</p>
        <p>{{ result?.releaseDate }}</p>
        <p>{{ result?.poster }}</p>
        <p>{{ result?.backdrop }}</p>
        <p>{{ result?.overview }}</p>
        <p>{{ result?.overviewSource }}</p>
        <p>{{ result?.wikipediaUrl }}</p>
        <p>{{ result?.imdbUrl }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  padding: 20px;
  max-width: 1000px;
  position: relative;
  margin: 0 auto;
}

.poster-image {
  border-radius: 5px;
  border: 3px solid #eee;
  box-shadow: 0 0 0 2px #555, 0 0 0 4px #eee, 0 0 0 6px #555;
}
</style>
