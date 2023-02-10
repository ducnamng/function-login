export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";

export interface User {
  id?: number;
  username: string;
  password?: string;
}
export const login = (payload: User, navigate: any) => ({
  type: LOGIN,
  payload,
  navigate,
});
export const loginSuccess = (payload: User) => ({
  type: LOGIN_SUCCESS,
  payload,
});
export const loginFailed = (payload: string) => ({
  type: LOGIN_FAILED,
  payload,
});
export const logout = (navigate: any) => ({
  type: LOGOUT,
  navigate,
});
