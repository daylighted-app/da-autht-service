import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DaRepeatableSelect } from "../daRepeatable/DaRepeatableSelect";
import { DaTimingSelect } from "../daTiming/DaTimingSelect";
import { UserSelect } from "../user/UserSelect";
import { Daylight as TDaylight } from "../api/daylight/Daylight";
import { DaylightUpdateInput } from "../api/daylight/DaylightUpdateInput";

export const Daylight = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/daylights/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TDaylight,
    AxiosError,
    [string, string]
  >(["get-/api/daylights", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/daylights"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TDaylight, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/daylights"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//daylights");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TDaylight, AxiosError, DaylightUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/daylights"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: DaylightUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.id);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["repeatition", "score", "timing", "userId"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Daylight"} ${
                  data?.id && data?.id.length ? data.id : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <DaRepeatableSelect label="repeatition" name="repeatition.id" />
            </div>
            <div>
              <TextField type="number" step={1} label="Score" name="score" />
            </div>
            <div>
              <DaTimingSelect label="Timing" name="timing.id" />
            </div>
            <div>
              <UserSelect label="UserId" name="userId.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
