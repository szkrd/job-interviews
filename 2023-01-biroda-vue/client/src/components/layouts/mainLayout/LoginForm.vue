<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { getFormSubmitFromRef } from '../../../utils/dom';
import { FormInstance } from 'ant-design-vue';
import { userService } from '../../../services/userService';
import { ApiCallState } from '../../../utils/apiCall';
import CenterErrorMessage from '../../common/CenterErrorMessage.vue';

type TCallback = () => void;

const props = defineProps<{
  insideModal: boolean;
  onCreate: (submitFn: TCallback, resetFn: TCallback) => void;
}>();
const formRef = ref<FormInstance>();

const formState = reactive({
  username: '',
  password: '',
  remember: true,
});

const locator = ref(null);

function onSubmit() {
  if (formState.username && formState.password) {
    userService.login(formState.username, formState.password);
  }
}

// on mount we expose the form submit and reset triggers, so that
// a parent component can trigger them manually
onMounted(() => {
  // refs on ant elements are not working (but they do on raw elements)
  // and ant form submit does NOT use the dom submit of the form element
  const submitButton = getFormSubmitFromRef(locator);
  if (typeof props.onCreate === 'function' && submitButton) {
    // submit (as a dom event) works okay _under the hood_
    const submitFn = () => submitButton.click();
    // but reset dealing with reactive fields, does not
    const resetFn = () => {
      formRef.value?.resetFields();
      userService.loginState.value = ApiCallState.Uninitialized;
    };
    props.onCreate(submitFn, resetFn);
  }
});
</script>
<!-- ====================================================================== -->
<template>
  <a-form
    ref="formRef"
    id="login-form"
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @submit="onSubmit"
  >
    <div ref="locator"></div>
    <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }" :class="{ 'mb-0': insideModal }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }" v-show="!insideModal">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>

    <div v-if="userService.loginState.value === ApiCallState.Rejected" class="mt-2" :class="{ 'pull-up': insideModal }">
      <CenterErrorMessage>Invalid username or password.</CenterErrorMessage>
    </div>
  </a-form>
</template>
<!-- ====================================================================== -->
<style scoped>
.pull-up {
  margin-bottom: -10px;
}
</style>
