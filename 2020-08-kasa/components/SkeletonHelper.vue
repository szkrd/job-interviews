<template>
  <div class="skeleton-line-component" :class="{ debug }" :style="componentStyle"></div>
</template>
<style lang="scss" scoped>
.skeleton-line-component {
  display: inline-block;
  background: #f0f0f0;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(45, 45, 45, 0.05), #f0f0f0, rgba(45, 45, 45, 0.05));
  background-size: 300%;
  animation: skeleton 30s ease infinite;

  &.debug {
    box-shadow: 0 0 40px inset rgba(255, 0, 255, .2);
  }
}

@keyframes skeleton {
  0% {
    background-position: 0 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0 50%
  }
}
</style>
<script>
module.exports = {
  props: {
    numberOfLines: Number,
    heightPx: Number,
    widthPercent: Number,
    stretch: Boolean,
    debug: { type: Boolean, default: false }
  },
  computed: {
    componentStyle () {
      return {
        width: this.stretch ? '100%' : (this.widthPercent || 50) + '%',
        height: this.stretch ? '100%' : (this.heightPx || 20) + 'px',
        position: this.stretch ? 'absolute' : 'static'
      };
    }
  }
};
</script>
