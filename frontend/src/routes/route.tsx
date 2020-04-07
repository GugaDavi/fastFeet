import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

import AuthLayout from "../pages/_layout/auth";
import DefaultLayout from "../pages/_layout/default";

import * as Routes from "./constants_routes";
import { ApplicationState } from "~/store";

interface IRoutesProps {
  component: React.FC<IComponet>;
  isPrivate?: boolean;
  path: string;
  exact?: boolean;
}

interface IComponet {
  props: RouteComponentProps;
}

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  exact = false
}: IRoutesProps) {
  const signed = useSelector<ApplicationState, boolean>(
    state => state.auth.signed
  );

  if (!signed && isPrivate) {
    return <Redirect to={Routes.singIn} />;
  }

  if (signed && !isPrivate) {
    return <Redirect to={Routes.packages} />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      exact
      render={props => (
        <Layout>
          <Component props={props} />
        </Layout>
      )}
    />
  );
}
