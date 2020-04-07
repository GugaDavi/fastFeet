/**
 * Data Types
 */

export interface IAdmin {
  id: number;
  name: string;
  email: string;
}

/**
 * State Types
 */

export interface AuthState {
  user: IAdmin | null;
  token: string | null;
  signed: boolean;
  loading: boolean;
  time: Date | null;
}

/**
 * Actions Types
 */

export enum AuthActions {
  SING_IN_REQUEST = "@singIn/SING_IN_REQUEST",
  SING_IN_SUCCESS = "@singIn/SING_IN_SUCCESS",
  SING_IN_FAILURE = "@singIn/SING_IN_FAILURE",
  SIGN_OUT = "@singIn/SIGN_OUT"
}

export interface SignInRequest {
  type: AuthActions.SING_IN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

export interface SignInSuccess {
  type: AuthActions.SING_IN_SUCCESS;
  payload: {
    user: IAdmin;
    token: string;
  };
}

export interface SignInFailure {
  type: AuthActions.SING_IN_FAILURE;
}

export interface SignOut {
  type: AuthActions.SIGN_OUT;
}

export type AuthActionTypes =
  | SignInRequest
  | SignInSuccess
  | SignInFailure
  | SignOut;
