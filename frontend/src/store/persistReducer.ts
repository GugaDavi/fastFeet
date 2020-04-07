import { Reducer, CombinedState } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { AuthState, AuthActionTypes } from "./modules/auth/types";

import { PackageState, PackageActionsTypes } from "./modules/packages/types";

import {
  DeliverymanState,
  DeliverymanActionsTypes
} from "./modules/deliverymans/types";

export default (
  reducers: Reducer<
    CombinedState<{
      auth: AuthState;
      packages: PackageState;
      deliveryman: DeliverymanState;
    }>,
    PackageActionsTypes | AuthActionTypes | DeliverymanActionsTypes
  >
) => {
  const persistedReducer = persistReducer(
    {
      key: "fastfeet",
      storage,
      whitelist: ["auth"]
    },
    reducers
  );

  return persistedReducer;
};
