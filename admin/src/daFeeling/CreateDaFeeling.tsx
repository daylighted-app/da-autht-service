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
import { DaFeeling } from "../api/daFeeling/DaFeeling";
import { DaFeelingCreateInput } from "../api/daFeeling/DaFeelingCreateInput";

const INITIAL_VALUES = {} as DaFeelingCreateInput;

export const CreateDaFeeling = (): React.ReactElement => {
  useBreadcrumbs("/da-feelings/new", "Create da-feeling");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    DaFeeling,
    AxiosError,
    DaFeelingCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/da-feelings", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/da-feelings"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: DaFeelingCreateInput) => {
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
            <FormHeader title={"Create da-feeling"}>
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
