import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
} from "@amplication/design-system";

import { DaRepeatableTitle } from "../daRepeatable/DaRepeatableTitle";
import { DaTimingTitle } from "../daTiming/DaTimingTitle";
import { UserTitle } from "../user/UserTitle";
import { Daylight } from "../api/daylight/Daylight";

type Data = Daylight[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "repeatition",
    title: "repeatition",
    sortable: false,
  },
  {
    name: "score",
    title: "Score",
    sortable: false,
  },
  {
    name: "timing",
    title: "Timing",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
  {
    name: "userId",
    title: "UserId",
    sortable: false,
  },
];

export const DaylightList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/daylights",
    async () => {
      const response = await api.get("/api/daylights");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Daylights"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/daylights/new"}>
            <Button>Create Daylight </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Daylight) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/daylights"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <DaRepeatableTitle id={item.repeatition?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.score}</>
                </DataGridCell>
                <DataGridCell>
                  <DaTimingTitle id={item.timing?.id} />
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.userId?.id} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
