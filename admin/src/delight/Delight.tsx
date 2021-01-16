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
  SelectField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Delight as TDelight } from "../api/delight/Delight";
import { DelightUpdateInput } from "../api/delight/DelightUpdateInput";

export const Delight = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/delights/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TDelight,
    AxiosError,
    [string, string]
  >(["get-/api/delights", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/delights"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TDelight, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/delights"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//delights");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TDelight, AxiosError, DelightUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/delights"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: DelightUpdateInput) => {
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

  const initialValues = React.useMemo(() => pick(data, ["is"]), [data]);

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
                title={`${"Delight"} ${
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
              <SelectField
                label="is"
                name="is"
                options={[
                  { label: "repeatable", value: "Repeatable" },
                  { label: "timable", value: "Timable" },
                  { label: "evaluatable", value: "Evaluatable" },
                  { label: "schedulable", value: "Schedulable" },
                ]}
                isMulti
              />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
