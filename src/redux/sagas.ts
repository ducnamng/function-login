import { call, fork, put, take } from "redux-saga/effects";
import { LOGIN, LOGOUT, LOGIN_FAILED, LOGIN_SUCCESS, User } from "./actions";
import getAuth from "../apis/getAuth";

function* handleLogin(payload: User, navigate: any) {
  try {
    const session_url = `/${payload.username}/${payload.password}`;
    const status: number = yield call(getAuth, session_url);
    if (status === 200) {
      localStorage.setItem("isLogin", "fake_login");
      const user = {
        id: 1,
        username: payload.username,
      };
      yield put({ type: LOGIN_SUCCESS, payload: user });
      navigate("/");
    }
  } catch (error) {
    yield put({
      type: LOGIN_FAILED,
      error,
    });
  }
}

function* handleLogout(navigate: any) {
  localStorage.removeItem("isLogin");
  navigate("/login");
}

function* watchLoginFlow() {
  while (true) {
    const isLogin = Boolean(localStorage.getItem("isLogin"));
    if (!isLogin) {
      const { payload, navigate } = yield take(LOGIN);
      yield fork(handleLogin, payload, navigate);
    }
    const { navigate } = yield take(LOGOUT);
    yield call(handleLogout, navigate);
  }
}

export default function* mySaga() {
  yield fork(watchLoginFlow);
}
