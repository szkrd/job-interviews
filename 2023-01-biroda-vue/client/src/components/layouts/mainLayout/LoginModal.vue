<script lang="ts" setup>
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';

type TNoop = () => void;

const props = defineProps<{
  visible: boolean;
  onClose: () => void;
}>();

const noop: TNoop = () => {};
const triggerFormSubmit = ref(noop);
const triggerFormReset = ref(noop);

function handleOk() {
  triggerFormSubmit.value();
}

function handleCancel() {
  triggerFormReset.value();
  props.onClose?.();
}

function onCreate(triggerSubmitCallback: TNoop, triggerResetCallback: TNoop) {
  triggerFormSubmit.value = triggerSubmitCallback;
  triggerFormReset.value = triggerResetCallback;
}
</script>
<!-- ====================================================================== -->
<template>
  <a-modal title="Login" :width="480" :visible="visible" @ok="handleOk" @cancel="handleCancel">
    <LoginForm insideModal :onCreate="onCreate" />
  </a-modal>
</template>
