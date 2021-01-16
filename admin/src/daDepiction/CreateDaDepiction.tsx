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
import { DaDepiction } from "../api/daDepiction/DaDepiction";
import { DaDepictionCreateInput } from "../api/daDepiction/DaDepictionCreateInput";

const INITIAL_VALUES = {} as DaDepictionCreateInput;

export const CreateDaDepiction = (): React.ReactElement => {
  useBreadcrumbs("/da-depictions/new", "Create da-depiction");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    DaDepiction,
    AxiosError,
    DaDepictionCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/da-depictions", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/da-depictions"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: DaDepictionCreateInput) => {
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
            <FormHeader title={"Create da-depiction"}>
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
