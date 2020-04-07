import React from "react";
import { Switch } from "react-router-dom";

import * as ConstRoutes from "./constants_routes";

import SignIn from "../pages/SignIn";
import Packages from "../pages/Packages";
import Deliverymans from "../pages/Deliverymans";
import Recipients from "../pages/Recipients";
import Reports from "../pages/Reports";

import Route from "./route";

export default function Routes() {
  return (
    <Switch>
      <Route path={ConstRoutes.singIn} exact component={SignIn} />

      <Route path={ConstRoutes.packages} component={Packages} isPrivate />
      <Route
        path={ConstRoutes.deliverymans}
        component={Deliverymans}
        isPrivate
      />
      <Route path={ConstRoutes.recipients} component={Recipients} isPrivate />
      <Route path={ConstRoutes.reports} component={Reports} isPrivate />
    </Switch>
  );
}
