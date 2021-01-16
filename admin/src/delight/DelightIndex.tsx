import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DelightList } from "./DelightList";
import { CreateDelight } from "./CreateDelight";
import { Delight } from "./Delight";

export const DelightIndex = (): React.ReactElement => {
  useBreadcrumbs("/delights/", "delights");

  return (
    <Switch>
      <PrivateRoute exact path={"/delights/"} component={DelightList} />
      <PrivateRoute path={"/delights/new"} component={CreateDelight} />
      <PrivateRoute path={"/delights/:id"} component={Delight} />
    </Switch>
  );
};
