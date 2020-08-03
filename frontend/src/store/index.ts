import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";

import rootReducer from "./modules/rootReducers";
import rootSaga from "./modules/rootSagas";
import perisistedStore from "./persistReducer";

import { AuthState } from "./modules/auth/types";
import { PackageState } from "./modules/packages/types";
import { DeliverymanState } from "./modules/deliverymans/types";
import { RecipientsState } from "./modules/recipients/types";

const sagaMiddleware = createSagaMiddleware();

export interface ApplicationState {
  auth: AuthState;
  packages: PackageState;
  deliveryman: DeliverymanState;
  recipients: RecipientsState;
}

const store: Store<ApplicationState> = createStore(
  perisistedStore(rootReducer),
  applyMiddleware(sagaMiddleware)
);

const persist = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persist };
