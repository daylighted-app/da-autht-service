import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { DaTiming } from "../api/daTiming/DaTiming";

type Props = { id: string };

export const DaTimingTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    DaTiming,
    AxiosError,
    [string, string]
  >(["get-/api/da-timings", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/da-timings"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/da-timings"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
