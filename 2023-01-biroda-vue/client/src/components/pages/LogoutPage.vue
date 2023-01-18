<script lang="ts" setup>
import { onMounted } from 'vue';
import { userService } from '../../services/userService';
import { useRouter } from 'vue-router';

const TIMEOUT = 2000;
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    userService.logout();
    router.replace('/');
  }, TIMEOUT);
});
</script>
<!-- ====================================================================== -->
<template>
  <div class="flex flex-col h-full place-content-center">
    <a-typography-paragraph>Logging out...</a-typography-paragraph>
    <a-spin />
  </div>
</template>
