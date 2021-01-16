import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { DaFeeling } from "../api/daFeeling/DaFeeling";

type Props = { id: string };

export const DaFeelingTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    DaFeeling,
    AxiosError,
    [string, string]
  >(["get-/api/da-feelings", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/da-feelings"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/da-feelings"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
