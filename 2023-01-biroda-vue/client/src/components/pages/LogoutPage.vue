<script lang="ts" setup>
import { onMounted } from 'vue';
import { userService } from '../../services/userService';
import { useRouter } from 'vue-router';
import { RoutePaths } from '../../routePaths';

const TIMEOUT = 2000;
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    userService.logout();
    router.replace(RoutePaths.Landing);
  }, TIMEOUT);
});
</script>
<!-- ====================================================================== -->
<template>
  <div class="flex-col h-full place-content-center">
    <a-typography-paragraph>Logging out...</a-typography-paragraph>
    <a-spin />
  </div>
</template>
