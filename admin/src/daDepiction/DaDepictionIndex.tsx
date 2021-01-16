import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DaDepictionList } from "./DaDepictionList";
import { CreateDaDepiction } from "./CreateDaDepiction";
import { DaDepiction } from "./DaDepiction";

export const DaDepictionIndex = (): React.ReactElement => {
  useBreadcrumbs("/da-depictions/", "da-depictions");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/da-depictions/"}
        component={DaDepictionList}
      />
      <PrivateRoute path={"/da-depictions/new"} component={CreateDaDepiction} />
      <PrivateRoute path={"/da-depictions/:id"} component={DaDepiction} />
    </Switch>
  );
};
