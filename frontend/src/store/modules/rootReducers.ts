import { combineReducers } from "redux";

import auth from "./auth/reducer";
import packages from "./packages/reducer";
import deliveryman from "./deliverymans/reducer";

const rootReducer = combineReducers({ auth, packages, deliveryman });

export default rootReducer;
