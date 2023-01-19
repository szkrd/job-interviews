<script lang="ts" setup>
import { formatDate } from '../../../utils/date';
import { getTableColumns } from '../../../utils/ant';
import { IMovieSearchResultItem } from '../../../api/getMovies';

const props = defineProps<{
  dataSource: IMovieSearchResultItem[];
  onItemClick: (id: number) => void;
  /** Comma delimited list of column names (affects the column order) */
  fields: string;
}>();

function getScoreTextType(score: number) {
  if (score > 80) return 'success';
  if (score < 20) return 'danger';
}

const columns = getTableColumns(props.dataSource, props.fields);
</script>
<!-- ====================================================================== -->
<template>
  <a-table :columns="columns" :dataSource="dataSource" rowKey="id" class="table m-1" v-if="dataSource">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'poster'">
        <img :src="record.poster" class="poster" v-if="record.poster" :alt="record.title" />
        <span class="poster" v-else></span>
      </template>
      <template v-if="column.key === 'title'">
        <a-button type="link" @click.prevent="onItemClick(record.id)" v-if="onItemClick">{{ record.title }}</a-button>
        <a-typography-text v-else>{{ record.title }}</a-typography-text>
      </template>
      <template v-if="column.key === 'score'">
        <a-typography-text :type="getScoreTextType(record.score)">{{ record.score }}</a-typography-text>
      </template>
      <template v-if="column.key === 'releaseDate'">
        <a-typography-text>{{ formatDate(record.releaseDate) }}</a-typography-text>
      </template>
      <template v-if="column.key === 'genres'">
        <a-tag v-for="genre in record.genres" :key="genre.id" :color="genre.color">{{ genre.name }}</a-tag>
      </template>
    </template>
  </a-table>
</template>
<!-- ====================================================================== -->
<style scoped>
.poster {
  width: 45px;
  height: 68px;
  background-color: #eee;
  border-radius: 2px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 2px #eee;
  display: block;
}
/* since we need to pass the ant component boundary, we need the deep helper */
.table :deep(th) {
  text-transform: capitalize;
}
</style>
