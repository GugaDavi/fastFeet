import { all } from "redux-saga/effects";

import auth from "./auth/saga";
import pacakages from "./packages/saga";
import deliverymen from "./deliverymans/saga";

function* rootSagas() {
  return yield all([auth, pacakages, deliverymen]);
}

export default rootSagas;
