import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DaFeelingList } from "./DaFeelingList";
import { CreateDaFeeling } from "./CreateDaFeeling";
import { DaFeeling } from "./DaFeeling";

export const DaFeelingIndex = (): React.ReactElement => {
  useBreadcrumbs("/da-feelings/", "da-feelings");

  return (
    <Switch>
      <PrivateRoute exact path={"/da-feelings/"} component={DaFeelingList} />
      <PrivateRoute path={"/da-feelings/new"} component={CreateDaFeeling} />
      <PrivateRoute path={"/da-feelings/:id"} component={DaFeeling} />
    </Switch>
  );
};
