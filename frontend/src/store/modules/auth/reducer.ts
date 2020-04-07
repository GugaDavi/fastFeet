import produce from "immer";

import { AuthState, AuthActionTypes, AuthActions } from "./types";

const INIT_STATE: AuthState = {
  user: null,
  token: null,
  signed: false,
  loading: false,
  time: null
};

const reducer = (state = INIT_STATE, action: AuthActionTypes) => {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActions.SING_IN_REQUEST:
        draft.loading = true;
        break;
      case AuthActions.SING_IN_SUCCESS:
        draft.user = action.payload.user;
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        draft.time = new Date();
        break;
      case AuthActions.SING_IN_FAILURE:
        draft.loading = false;
        break;
      case AuthActions.SIGN_OUT:
        draft.signed = false;
        draft.time = null;
        draft.token = null;
        draft.user = null;
        break;
      default:
        break;
    }
  });
};

export default reducer;
