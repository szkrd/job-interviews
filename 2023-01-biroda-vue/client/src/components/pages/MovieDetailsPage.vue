<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { CalendarOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons-vue';
import { computed, ref, watchEffect } from 'vue';
import { apiCall, ApiCallState } from '../../utils/apiCall';
import { getMovieByIdDetailed, IGetMovieByIdDetailedResponse, MovieStatus } from '../../api/getMovieById';
import CenterSpin from '../common/CenterSpin.vue';
import CenterErrorMessage from '../common/CenterErrorMessage.vue';
import { formatDuration, formatMoney } from '../../utils/number';
import ScoreCircle from '../common/ScoreCircle.vue';
import BackdropImage from '../common/BackdropImage.vue';
import { formatDate } from '../../utils/date';

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
      <div class="details relative">
        <BackdropImage v-if="result?.backdrop" :src="result?.backdrop" />

        <!-- title and score -->
        <div class="relative">
          <div class="flex items-center">
            <ScoreCircle :percentage="result?.score" class="mr-1 score-pull-up" />
            <div>
              <a-typography-title>{{ result?.title }}</a-typography-title>
              <a-typography-title :level="2" v-if="result?.tagLine" class="tag-line" type="secondary">{{
                result?.tagLine
              }}</a-typography-title>
            </div>
          </div>

          <!-- genre list (TODO: add colors, need backend) -->
          <a-typography-paragraph>
            <a-tag v-for="genre in result?.genres" :key="genre.id">{{ genre.name }}</a-tag>
          </a-typography-paragraph>

          <!-- release and length -->
          <a-typography-paragraph class="flex gap-1 items-center">
            <template v-if="result?.status === MovieStatus.Released && result?.releaseDate">
              <a-typography-text class="icon-cut">
                <CalendarOutlined />
              </a-typography-text>
              Released at: {{ formatDate(result?.releaseDate) }}
            </template>
            <a-typography-text class="icon-cut">
              <ClockCircleOutlined />
            </a-typography-text>
            Runtime: {{ formatDuration(result?.runTime) }}
          </a-typography-paragraph>

          <!-- budget and revenue -->
          <a-typography-paragraph class="flex gap-1 items-center" v-if="result?.budget && result?.revenue">
            <template v-if="result?.budget">
              <a-typography-text type="success" class="icon-cut">
                <DollarOutlined />
              </a-typography-text>
              Budget: {{ formatMoney(result?.budget) }}
            </template>
            <template v-if="result?.revenue">
              <a-typography-text type="danger" class="icon-cut">
                <DollarOutlined />
              </a-typography-text>
              Revenue: {{ formatMoney(result?.revenue) }}
            </template>
          </a-typography-paragraph>

          <!-- TODO: add i18n for enum translation -->
          <a-typography-paragraph v-if="result?.video">This movie has a video release only.</a-typography-paragraph>
          <p v-if="result?.status !== MovieStatus.Released">Status: {{ result?.status }}</p>

          <hr />

          <!-- overview and footer links -->
          <a-typography-paragraph>{{ result?.overview }}</a-typography-paragraph>
          <a-typography-paragraph type="secondary"
            >(overview source: {{ result?.overviewSource }})
          </a-typography-paragraph>
          <ul v-if="result?.wikipediaUrl || result?.imdbUrl">
            <li v-if="result?.wikipediaUrl">
              wikipedia:
              <a-typography-link :href="result?.wikipediaUrl">{{ result?.wikipediaUrl }}</a-typography-link>
            </li>
            <li v-if="result?.imdbUrl">
              imdb:
              <a-typography-link :href="result?.imdbUrl">{{ result?.imdbUrl }}</a-typography-link>
            </li>
          </ul>
        </div>
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

h2.tag-line {
  font-size: 16px;
  margin: -19px 0 19px 0;
  font-style: italic;
}

.score-pull-up {
  margin-top: -5px;
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
