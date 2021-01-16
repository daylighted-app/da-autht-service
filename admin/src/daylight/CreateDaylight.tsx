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
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DaRepeatableSelect } from "../daRepeatable/DaRepeatableSelect";
import { DaTimingSelect } from "../daTiming/DaTimingSelect";
import { UserSelect } from "../user/UserSelect";
import { Daylight } from "../api/daylight/Daylight";
import { DaylightCreateInput } from "../api/daylight/DaylightCreateInput";

const INITIAL_VALUES = {} as DaylightCreateInput;

export const CreateDaylight = (): React.ReactElement => {
  useBreadcrumbs("/daylights/new", "Create Daylight");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Daylight,
    AxiosError,
    DaylightCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/daylights", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/daylights"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: DaylightCreateInput) => {
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
            <FormHeader title={"Create Daylight"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
