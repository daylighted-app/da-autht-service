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
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { InvitationTicket as TInvitationTicket } from "../api/invitationTicket/InvitationTicket";
import { InvitationTicketUpdateInput } from "../api/invitationTicket/InvitationTicketUpdateInput";

export const InvitationTicket = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/invitation-tickets/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TInvitationTicket,
    AxiosError,
    [string, string]
  >(["get-/api/invitation-tickets", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/invitation-tickets"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TInvitationTicket, AxiosError>(
    async (data) => {
      const response = await api.delete(
        `${"/api/invitation-tickets"}/${id}`,
        data
      );
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//invitation-tickets");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TInvitationTicket, AxiosError, InvitationTicketUpdateInput>(
    async (data) => {
      const response = await api.patch(
        `${"/api/invitation-tickets"}/${id}`,
        data
      );
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: InvitationTicketUpdateInput) => {
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

  const initialValues = React.useMemo(() => pick(data, []), [data]);

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
                title={`${"InvitationTicket"} ${
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
          ></Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
