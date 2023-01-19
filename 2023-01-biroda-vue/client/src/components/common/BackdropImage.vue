<script lang="ts" setup>
defineProps<{
  src: string;
}>();
</script>
<!-- ====================================================================== -->
<template>
  <div v-if="src" class="backdrop">
    <img alt="" :src="src" aria-hidden="true" />
    <div class="blur"></div>
  </div>
</template>
<!-- ====================================================================== -->
<style lang="scss" scoped>
.backdrop {
  position: absolute;
  filter: grayscale(1);
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 50px 20px inset #fff;
  pointer-events: none;

  img {
    opacity: 0.2;
    width: 100%;
  }

  .blur {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 0 50px 50px inset #f0f2f5;
  }
}
</style>
