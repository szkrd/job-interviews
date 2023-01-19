<script lang="ts" setup>
import { computed, watch, ref, onMounted } from 'vue';

const props = defineProps<{
  percentage?: number;
}>();

const drawCircle = ref<SVGCircleElement>();
const radius = 20;
const dashArray = 2 * Math.PI * radius;
const dashOffset = computed(() => dashArray * ((100 - (props.percentage ?? 0)) / 100));

function updateSvg() {
  const el = drawCircle.value;
  if (!el) return;
  el.style.strokeDasharray = String(dashArray);
  el.style.strokeDashoffset = String(dashOffset.value);
}

watch(dashOffset, updateSvg);
onMounted(updateSvg);
</script>
<!-- ====================================================================== -->
<template>
  <div class="score-circle">
    <svg class="svg" width="50" height="50">
      <circle cx="25" cy="25" :r="radius" />
      <circle cx="25" cy="25" :r="radius" />
      <circle cx="25" cy="25" :r="radius" ref="drawCircle" />
    </svg>
    <p class="display">
      {{ Math.round(percentage ?? 0) }}
    </p>
  </div>
</template>
<!-- ====================================================================== -->
<style lang="scss" scoped>
.score-circle {
  width: 50px;
  height: 50px;
  position: relative;
}

.display {
  font-size: 17px;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  left: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.svg {
  transform: rotate(-90deg);

  circle {
    stroke-width: 10px;
    fill: none;
  }
  circle:nth-child(1) {
    stroke-width: 0;
    fill: #c7d2fe;
  }
  circle:nth-child(2) {
    stroke: #fff;
  }
  circle:nth-child(3) {
    stroke: #a5b4fc;
  }
}
</style>
