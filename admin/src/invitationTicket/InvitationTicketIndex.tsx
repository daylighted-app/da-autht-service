import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { InvitationTicketList } from "./InvitationTicketList";
import { CreateInvitationTicket } from "./CreateInvitationTicket";
import { InvitationTicket } from "./InvitationTicket";

export const InvitationTicketIndex = (): React.ReactElement => {
  useBreadcrumbs("/invitation-tickets/", "InvitationTickets");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/invitation-tickets/"}
        component={InvitationTicketList}
      />
      <PrivateRoute
        path={"/invitation-tickets/new"}
        component={CreateInvitationTicket}
      />
      <PrivateRoute
        path={"/invitation-tickets/:id"}
        component={InvitationTicket}
      />
    </Switch>
  );
};
