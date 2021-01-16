import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DaylightList } from "./DaylightList";
import { CreateDaylight } from "./CreateDaylight";
import { Daylight } from "./Daylight";

export const DaylightIndex = (): React.ReactElement => {
  useBreadcrumbs("/daylights/", "Daylights");

  return (
    <Switch>
      <PrivateRoute exact path={"/daylights/"} component={DaylightList} />
      <PrivateRoute path={"/daylights/new"} component={CreateDaylight} />
      <PrivateRoute path={"/daylights/:id"} component={Daylight} />
    </Switch>
  );
};
