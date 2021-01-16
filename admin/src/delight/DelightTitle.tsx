import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Delight } from "../api/delight/Delight";

type Props = { id: string };

export const DelightTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Delight,
    AxiosError,
    [string, string]
  >(["get-/api/delights", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/delights"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/delights"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
