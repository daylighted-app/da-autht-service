import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { DaRepeatable } from "../api/daRepeatable/DaRepeatable";

type Props = { id: string };

export const DaRepeatableTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    DaRepeatable,
    AxiosError,
    [string, string]
  >(["get-/api/da-repeatables", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/da-repeatables"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/da-repeatables"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
