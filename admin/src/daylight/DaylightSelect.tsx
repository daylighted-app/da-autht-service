import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Daylight } from "../api/daylight/Daylight";

type Data = Daylight[];

type Props = Omit<SelectFieldProps, "options">;

export const DaylightSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/daylights",
    async () => {
      const response = await api.get("/api/daylights");
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
