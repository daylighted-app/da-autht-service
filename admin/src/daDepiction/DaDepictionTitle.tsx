import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { DaDepiction } from "../api/daDepiction/DaDepiction";

type Props = { id: string };

export const DaDepictionTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    DaDepiction,
    AxiosError,
    [string, string]
  >(["get-/api/da-depictions", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/da-depictions"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/da-depictions"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
