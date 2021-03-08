import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { InvitationTicket } from "../api/invitationTicket/InvitationTicket";

type Props = { id: string };

export const InvitationTicketTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    InvitationTicket,
    AxiosError,
    [string, string]
  >(["get-/api/invitation-tickets", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/invitation-tickets"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/invitation-tickets"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
