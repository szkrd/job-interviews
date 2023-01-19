<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { DollarOutlined, ClockCircleOutlined } from '@ant-design/icons-vue';
import { computed, ref, watchEffect } from 'vue';
import { apiCall, ApiCallState } from '../../utils/apiCall';
import { getMovieByIdDetailed, IGetMovieByIdDetailedResponse } from '../../api/getMovieById';
import CenterSpin from '../common/CenterSpin.vue';
import CenterErrorMessage from '../common/CenterErrorMessage.vue';
import { formatDuration, formatMoney } from '../../utils/number';

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
        <a-typography-title>{{ result?.title }}</a-typography-title>
        <a-typography-paragraph>
          <span class="icon-inline"><ClockCircleOutlined /></span>
          Runtime: {{ formatDuration(result?.runTime) }}
        </a-typography-paragraph>
        <a-typography-paragraph class="flex gap-1 items-center">
          <a-typography-text type="success" class="icon-cut"><DollarOutlined /></a-typography-text>
          Budget: {{ formatMoney(result?.budget) }}
          <a-typography-text type="danger" class="icon-cut"><DollarOutlined /></a-typography-text>
          Revenue: {{ formatMoney(result?.revenue) }}
        </a-typography-paragraph>
        <p>genres: {{ result?.genres }}</p>
        <p>status: {{ result?.status }}</p>
        <p>tagLine: {{ result?.tagLine }}</p>
        <p>video: {{ result?.video }}</p>
        <p>score: {{ result?.score }}</p>
        <p>productionCompanies: {{ result?.productionCompanies }}</p>
        <p>id: {{ result?.id }}</p>
        <p>releaseDate: {{ result?.releaseDate }}</p>
        <p>backdrop: {{ result?.backdrop }}</p>
        <p>overview: {{ result?.overview }}</p>
        <p>overviewSource: {{ result?.overviewSource }}</p>
        <p>wikipediaUrl: {{ result?.wikipediaUrl }}</p>
        <p>imdbUrl: {{ result?.imdbUrl }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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

.icon-cut {
  height: 16px;
  display: block;

  span {
    display: block;
    margin-top: 1px;
  }
}

.icon-inline {
  display: inline-block;
  width: 16px;
  height: 16px;

  span {
    display: inline-block;
    margin-top: 12px;
    position: relative;
  }
}
</style>
