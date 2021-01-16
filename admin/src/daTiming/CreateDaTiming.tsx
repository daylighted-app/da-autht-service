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
import { DaTiming } from "../api/daTiming/DaTiming";
import { DaTimingCreateInput } from "../api/daTiming/DaTimingCreateInput";

const INITIAL_VALUES = {} as DaTimingCreateInput;

export const CreateDaTiming = (): React.ReactElement => {
  useBreadcrumbs("/da-timings/new", "Create da-timable");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    DaTiming,
    AxiosError,
    DaTimingCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/da-timings", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/da-timings"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: DaTimingCreateInput) => {
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
            <FormHeader title={"Create da-timable"}>
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
