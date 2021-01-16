import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DaRepeatableList } from "./DaRepeatableList";
import { CreateDaRepeatable } from "./CreateDaRepeatable";
import { DaRepeatable } from "./DaRepeatable";

export const DaRepeatableIndex = (): React.ReactElement => {
  useBreadcrumbs("/da-repeatables/", "da-repeatables");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/da-repeatables/"}
        component={DaRepeatableList}
      />
      <PrivateRoute
        path={"/da-repeatables/new"}
        component={CreateDaRepeatable}
      />
      <PrivateRoute path={"/da-repeatables/:id"} component={DaRepeatable} />
    </Switch>
  );
};
