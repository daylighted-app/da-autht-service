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
  SelectField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Delight } from "../api/delight/Delight";
import { DelightCreateInput } from "../api/delight/DelightCreateInput";

const INITIAL_VALUES = {} as DelightCreateInput;

export const CreateDelight = (): React.ReactElement => {
  useBreadcrumbs("/delights/new", "Create Delight");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Delight,
    AxiosError,
    DelightCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/delights", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/delights"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: DelightCreateInput) => {
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
            <FormHeader title={"Create Delight"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <SelectField
              label="Is"
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
