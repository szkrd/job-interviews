import { postLogin } from '../api/postLogin';
import { ref } from 'vue';
import { apiCall, ApiCallState } from '../utils/apiCall';
import { parseJwt } from '../utils/token';

const parsedToken: any = parseJwt(sessionStorage.getItem('token'));
const userInit: string = (parsedToken || {}).username ?? '';

const loggedInUserName = ref(userInit);
const loginState = ref<ApiCallState>(ApiCallState.Uninitialized);

function login(username: string, password: string) {
  return apiCall.toRefs(
    postLogin({ username, password }),
    (response) => {
      sessionStorage.setItem('token', response.token);
      loggedInUserName.value = username;
    },
    loginState
  );
}

function logout() {
  loggedInUserName.value = '';
  loginState.value = ApiCallState.Uninitialized;
  sessionStorage.removeItem('token');
}

export const userService = {
  loggedInUserName,
  login,
  loginState,
  logout,
};
