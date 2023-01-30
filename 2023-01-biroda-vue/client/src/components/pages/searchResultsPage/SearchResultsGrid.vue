<script lang="ts" setup>
import { IMovieSearchResultItem } from '../../../api/getMovies';
import { formatDate } from '../../../utils/date';

const props = defineProps<{
  dataSource: IMovieSearchResultItem[];
  onItemClick: (id: number) => void;
}>();
</script>
<!-- ====================================================================== -->
<template>
  <ul class="movieGrid">
    <li v-for="movie in dataSource" :key="movie.id">
      <button class="clickable" :data-id="movie.id" @click.prevent="onItemClick(movie.id)">
        <img :src="movie.posterHigh" :alt="movie.title" class="poster" />
        <span class="details">
          <a-typography-paragraph class="title">{{ movie.title }}</a-typography-paragraph>
          <a-typography-paragraph type="secondary" class="metaData">{{
            formatDate(movie.releaseDate)
          }}</a-typography-paragraph>
        </span>
      </button>
    </li>
  </ul>
</template>
<!-- ====================================================================== -->
<style lang="scss" scoped>
// ant's grid is not flexible enough and I don't want to hack their table either
.movieGrid {
  list-style: none;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
  grid-template-columns: repeat(5, 1fr);
  display: grid;
  gap: 40px;
  grid-auto-rows: minmax(20px, auto);
  height: 100%;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 600px;
    gap: 20px;
  }

  & > li {
    margin: 0;
    padding: 0;
    border-radius: 5px;
    width: 175px;
    display: flex;
    flex-direction: column;
    height: 100%;

    .clickable {
      height: 100%;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      border-radius: 5px;
      transition: all 0.3s;
      text-align: center;
      border: 1px solid var(--ant-primary-3);

      &:hover {
        border-color: var(--ant-primary-color);
      }
    }

    .details {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      margin: 0 5px 5px;
      width: calc(100% - 10px);
    }

    .poster {
      padding: 0;
      margin: 5px 0 5px;
      border-radius: 5px 5px 0 0;
      width: 100%;
    }

    .title {
      margin: 0 0 5px;
      padding: 0;
      font-size: 14px;
      font-weight: normal;
      flex-grow: 1;
    }

    .metaData {
      font-size: 10px;
      margin: 0;
    }
  }
}
</style>
