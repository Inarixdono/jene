import { Section } from "@layouts/Section";
import { Article } from "@layouts/Form";
import { Field } from "@components/Field";
import { Input } from "@chakra-ui/react";
import { Select } from "@components/ui/select";
import { ClearFiltersButton } from "@components/ClearFiltersButton";
import { Table, Header, Body, ColumnHeader, Row, Cell } from "@layouts/Table";
import { textTransformProps } from "@utils/format-helper";
import { requestsQueryOptions } from "@store/request";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRequestStatuses } from "@hooks/use-options";
import { StatusBadge } from "@components/StatusBadge";
import { useNavigate } from "@tanstack/react-router";

export const RequestsList = () => {
  const { data: requests } = useSuspenseQuery(requestsQueryOptions);
  const navigate = useNavigate();
  const requestStatuses = useRequestStatuses();

  return (
    <Section title="Solicitudes">
      <Article asForm>
        <Field label="Código">
          <Input type="number" placeholder="Código del cliente" />
        </Field>
        <Field label="Nombre">
          <Input placeholder="Código del cliente" {...textTransformProps()} />
        </Field>
        <Field label="Chasis">
          <Input placeholder="Número de chasis" {...textTransformProps()} />
        </Field>
        <Field label="Estado">
          <Select placeholder="Seleccione uno" collection={requestStatuses} />
        </Field>
        <ClearFiltersButton />
      </Article>
      <Table>
        <Header>
          <ColumnHeader>Código</ColumnHeader>
          <ColumnHeader>Nombre</ColumnHeader>
          <ColumnHeader>Chasis</ColumnHeader>
          <ColumnHeader>Estado de placa</ColumnHeader>
          <ColumnHeader>Estado de matrícula</ColumnHeader>
        </Header>
        <Body>
          {requests.map((request) => (
            <Row
              key={`${request.requestId}-${request.vehicleId}`}
              onClick={() => {
                navigate({
                  to: "/requests/$requestId/$vehicleId",
                  params: {
                    requestId: request.requestId,
                    vehicleId: request.vehicleId,
                  },
                });
              }}
            >
              <Cell>{request.customer.id}</Cell>
              <Cell>{request.customer.name}</Cell>
              <Cell>{request.vehicle.vin}</Cell>
              <Cell>
                <StatusBadge status={request.plateStatus} />
              </Cell>
              <Cell>
                <StatusBadge status={request.registrationStatus} />
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Section>
  );
};
