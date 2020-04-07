import produce from "immer";

import { PackageActionsTypes, PackageActions, PackageState } from "./types";

const INITAL_STATE: PackageState = {
  packages: [],
  loading: false,
  page: 1,
  filter: ""
};

const reducer = (state = INITAL_STATE, action: PackageActionsTypes) => {
  return produce(state, draft => {
    switch (action.type) {
      case PackageActions.GET_PACKAGES_REQUEST:
        draft.loading = true;
        break;
      case PackageActions.GET_PACKAGES_SUCCESS:
        draft.packages = action.payload.packages;
        draft.loading = false;
        draft.page = action.payload.page;
        draft.filter = action.payload.filter;
        break;
      case PackageActions.GET_PACKAGES_FAILURE:
        draft.loading = false;
        break;
      default:
        break;
    }
  });
};

export default reducer;
