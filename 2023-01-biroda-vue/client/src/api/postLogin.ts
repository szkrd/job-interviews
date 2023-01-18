import { apiCall } from "../utils/apiCall";

interface IPostLogin {
  username: string;
  password: string;
}

interface IPostLoginResponse {
  token: string;
}

export function postLogin(userData: IPostLogin): Promise<IPostLoginResponse> {
  return apiCall.post('/login', userData);
}
