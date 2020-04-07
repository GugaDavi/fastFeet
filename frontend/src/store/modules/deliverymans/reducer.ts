import produce from "immer";

import {
  DeliverymanState,
  DeliverymanActionsTypes,
  DeliverymanActions,
} from "./types";

const INITIAL_STATE: DeliverymanState = {
  deliverymen: [],
  page: 1,
  filter: "",
};

const reducer = (state = INITIAL_STATE, action: DeliverymanActionsTypes) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case DeliverymanActions.GET_DELIVERYMEN_SUCCESS:
        const { payload } = action;
        draft.deliverymen = payload.deliverymen;
        draft.page = payload.page;
        draft.filter = payload.filter;
        break;
      default:
        break;
    }
  });
};

export default reducer;
