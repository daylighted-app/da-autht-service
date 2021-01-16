import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DaTimingList } from "./DaTimingList";
import { CreateDaTiming } from "./CreateDaTiming";
import { DaTiming } from "./DaTiming";

export const DaTimingIndex = (): React.ReactElement => {
  useBreadcrumbs("/da-timings/", "da-timing");

  return (
    <Switch>
      <PrivateRoute exact path={"/da-timings/"} component={DaTimingList} />
      <PrivateRoute path={"/da-timings/new"} component={CreateDaTiming} />
      <PrivateRoute path={"/da-timings/:id"} component={DaTiming} />
    </Switch>
  );
};
