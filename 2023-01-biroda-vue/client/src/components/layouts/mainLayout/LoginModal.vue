<script lang="ts" setup>
import { ref, watch } from 'vue';
import LoginForm from './LoginForm.vue';
import { userService } from '../../../services/userService';
import { ApiCallState } from '../../../utils/apiCall';

type TNoop = () => void;

const props = defineProps<{
  visible: boolean;
  onClose: () => void;
}>();

const noop: TNoop = () => {};
const triggerFormSubmit = ref(noop);
const triggerFormReset = ref(noop);
const { loginState } = userService;

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

watch(userService.loginState, (callState) => {
  if (callState === ApiCallState.Fulfilled) handleCancel();
});
</script>
<!-- ====================================================================== -->
<template>
  <a-modal
    title="Login"
    :width="480"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    :confirm-loading="loginState === ApiCallState.Pending"
  >
    <LoginForm insideModal :onCreate="onCreate" />
  </a-modal>
</template>
