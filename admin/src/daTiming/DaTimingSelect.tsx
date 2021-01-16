import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { DaTiming } from "../api/daTiming/DaTiming";

type Data = DaTiming[];

type Props = Omit<SelectFieldProps, "options">;

export const DaTimingSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/da-timings",
    async () => {
      const response = await api.get("/api/da-timings");
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
