import { postLogin } from '../api/postLogin';
import { ref } from "vue";
import { apiCall, ApiCallState } from "../utils/apiCall";

const loggedInUserName = ref('');
const loginState = ref<ApiCallState>(ApiCallState.Uninitialized);

function login(username: string, password: string) {
  return apiCall.toRefs(postLogin({ username, password }), (response) => {
    console.log("TODO >>> use token:", response.token);
    loggedInUserName.value = username;
  }, loginState);
}

export const userService = {
  loggedInUserName,
  login,
};
