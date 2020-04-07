import { AuthActionTypes, AuthActions, IAdmin } from "./types";

export function signInRequest(
  email: string,
  password: string
): AuthActionTypes {
  return {
    type: AuthActions.SING_IN_REQUEST,
    payload: {
      email,
      password
    }
  };
}

export function signInSuccess(user: IAdmin, token: string): AuthActionTypes {
  return {
    type: AuthActions.SING_IN_SUCCESS,
    payload: {
      user,
      token
    }
  };
}

export function signInFailure(): AuthActionTypes {
  return {
    type: AuthActions.SING_IN_FAILURE
  };
}

export function signOut(): AuthActionTypes {
  return {
    type: AuthActions.SIGN_OUT
  };
}
