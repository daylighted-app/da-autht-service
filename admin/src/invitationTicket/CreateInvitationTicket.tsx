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
import { InvitationTicket } from "../api/invitationTicket/InvitationTicket";
import { InvitationTicketCreateInput } from "../api/invitationTicket/InvitationTicketCreateInput";

const INITIAL_VALUES = {} as InvitationTicketCreateInput;

export const CreateInvitationTicket = (): React.ReactElement => {
  useBreadcrumbs("/invitation-tickets/new", "Create InvitationTicket");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    InvitationTicket,
    AxiosError,
    InvitationTicketCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/invitation-tickets", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/invitation-tickets"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: InvitationTicketCreateInput) => {
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
            <FormHeader title={"Create InvitationTicket"}>
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
