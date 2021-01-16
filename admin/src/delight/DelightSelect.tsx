import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Delight } from "../api/delight/Delight";

type Data = Delight[];

type Props = Omit<SelectFieldProps, "options">;

export const DelightSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/delights",
    async () => {
      const response = await api.get("/api/delights");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.id && item.id.length ? item.id : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
