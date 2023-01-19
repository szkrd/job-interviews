<script lang="ts" setup>
import { DownOutlined, UserOutlined } from '@ant-design/icons-vue';
import { computed, ref, watch } from 'vue';
import { getRandomItem } from '../../../utils/array';
import { famousMovieTitles } from '../../../data/famousMovieTitles';
import LoginModal from './LoginModal.vue';
import { useRouter } from 'vue-router';
import { ApiCallState } from '../../../utils/apiCall';
import { movieSearchService } from '../../../services/movieSearchService';
import { userService } from '../../../services/userService';
import { RoutePaths } from '../../../routePaths';

const router = useRouter();
const urlQuery = computed(() => String(router.currentRoute.value.query?.query ?? ''));
const searchValue = ref(urlQuery.value ?? '');
const randomMovieName = getRandomItem(famousMovieTitles);
const loginModalVisible = ref(false);
const searchInProgress = movieSearchService.searchState.value === ApiCallState.Pending;
const { loggedInUserName } = userService;

// conditional event binding (ant page header @back is optional)
const atPageBackEventName = computed(() => (urlQuery.value !== '' ? 'back' : ''));

// the query in the url takes precedence over the one in the search field
watch(urlQuery, (inUrlValue) => {
  if (inUrlValue !== searchValue.value) searchValue.value = inUrlValue;
});

function handleSubmit() {
  if (!searchValue.value.trim()) return;
  if (urlQuery.value === searchValue.value) {
    // force search on button click, even if the route is the same
    // (which is a reasonable enough request in this case)
    movieSearchService.search(searchValue.value);
  } else {
    router.push({ path: RoutePaths.Search, query: { query: searchValue.value } });
  }
}

function onBack() {
  router.push({ path: RoutePaths.Landing, query: { query: undefined } });
}

function openLoginModal() {
  loginModalVisible.value = true;
}

// this needs to be a function, an inline expression would not work
// (for passing that down as a function into the child)
function closeLoginModal() {
  loginModalVisible.value = false;
}
</script>
<!-- ====================================================================== -->
<template>
  <a-page-header
    title="Movies"
    @[atPageBackEventName]="onBack"
    subTitle="search for movies using tmdb and wikipedia"
    class="bg-indigo-200 ant-override"
  >
    <!-- storm doesn't understand ant's slots or the slot has not been documented -->
    <template v-slot:extra>
      <div class="flex">
        <!-- storm (probably ant's fault) thinks we have no inline layout type, but it's in the documentation -->
        <a-form layout="inline" @submit.prevent="handleSubmit">
          <a-form-item label="Movie title">
            <!-- ant needs v-model:value, plain v-model will not work -->
            <a-input v-model:value="searchValue" :placeholder="randomMovieName" :disabled="searchInProgress" />
          </a-form-item>
          <a-form-item>
            <!-- ant has a compact input group to group the button and the input, but an inline a-form-input will break that -->
            <a-button type="primary" html-type="submit" :disabled="!searchValue.trim() || searchInProgress"
              >Search</a-button
            >
          </a-form-item>
        </a-form>
        <a-button type="link" @click="openLoginModal" v-if="!loggedInUserName">Login</a-button>
        <a-dropdown v-else>
          <a-button type="link" @click.prevent>
            <UserOutlined />
            {{ loggedInUserName }}
            <DownOutlined />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <router-link to="/watchlist" class="link">watchlist</router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/logout" class="link">logout</router-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </template>
  </a-page-header>
  <LoginModal :visible="loginModalVisible" :onClose="closeLoginModal" />
</template>
<!-- ====================================================================== -->
<style scoped>
.link,
.link:hover {
  color: var(--ant-primary-color);
}

/* the header's subtitle is a bit off' */
.ant-override:deep(.ant-page-header-heading-sub-title) {
  position: relative;
  top: 2px;
}
</style>
