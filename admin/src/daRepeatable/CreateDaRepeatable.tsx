import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DaRepeatable } from "../api/daRepeatable/DaRepeatable";
import { DaRepeatableCreateInput } from "../api/daRepeatable/DaRepeatableCreateInput";

const INITIAL_VALUES = {} as DaRepeatableCreateInput;

export const CreateDaRepeatable = (): React.ReactElement => {
  useBreadcrumbs("/da-repeatables/new", "Create da-repeatable");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    DaRepeatable,
    AxiosError,
    DaRepeatableCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/da-repeatables", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/da-repeatables"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: DaRepeatableCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create da-repeatable"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
