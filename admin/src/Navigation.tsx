import React from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, EnumPanelStyle } from "@amplication/design-system";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <NavigationItem name="da-feelings" to="/da-feelings" />
      <NavigationItem name="da-depictions" to="/da-depictions" />
      <NavigationItem name="Users" to="/users" />
      <NavigationItem name="da-timing" to="/da-timings" />
      <NavigationItem name="Daylights" to="/daylights" />
      <NavigationItem name="da-repeatables" to="/da-repeatables" />
      <NavigationItem name="delights" to="/delights" />
    </>
  );
};

export default Navigation;

const NavigationItem = ({
  to,
  name,
}: {
  to: string;
  name: string;
}): React.ReactElement => (
  <Link to={to}>
    <Panel panelStyle={EnumPanelStyle.Bordered}>
      <PanelHeader>{name}</PanelHeader>
      Create, update, search and delete {name}
    </Panel>
  </Link>
);
