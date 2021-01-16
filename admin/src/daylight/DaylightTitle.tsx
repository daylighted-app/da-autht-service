import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Daylight } from "../api/daylight/Daylight";

type Props = { id: string };

export const DaylightTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Daylight,
    AxiosError,
    [string, string]
  >(["get-/api/daylights", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/daylights"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/daylights"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
