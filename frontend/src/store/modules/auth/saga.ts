import { all, put, call, takeLatest } from "redux-saga/effects";
import { isAfter, subHours, parseISO } from "date-fns";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import api from "~/services/api";
import history from "~/services/history";
import * as Routes from "~/routes/constants_routes";

import { SignInRequest, AuthActions, AuthState } from "./types";
import { signInSuccess, signInFailure } from "./actions";

function* signIn({ payload }: SignInRequest) {
  const { email, password } = payload;

  try {
    const resp: AxiosResponse<AuthState> = yield call(api.post, "/sessions", {
      email,
      password
    });

    const { user, token } = resp.data;

    if (user && token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      yield put(signInSuccess(user, token));

      return history.push(Routes.packages);
    }
  } catch (c) {
    toast.error("Erro na autenticação");
    yield put(signInFailure());
  }
}

function setToken({ payload }: any) {
  if (!payload) return;

  const { token, time } = payload.auth;

  if (time) {
    const validToken = isAfter(parseISO(time), subHours(new Date(), 24));

    if (!validToken) {
      return history.push(Routes.singIn);
    }
  }

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

function singOut() {
  history.push("/");
}

export default all([
  takeLatest(AuthActions.SING_IN_REQUEST, signIn),
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest(AuthActions.SIGN_OUT, singOut)
]);
