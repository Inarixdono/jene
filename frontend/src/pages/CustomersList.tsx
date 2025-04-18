import { Section } from "@layouts/Section";
import { Article } from "@layouts/Form";
import { Button, Input } from "@chakra-ui/react";
import { Field } from "@components/Field";
import { Table, Header, Body, ColumnHeader, Row, Cell } from "@layouts/Table";
import { StatusBadge } from "@components/StatusBadge";
import { customersQueryOptions } from "@store/customer";
import { useCustomerFilter } from "@hooks/use-customer-filter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const CustomerList = () => {
  const { data: customers } = useSuspenseQuery(customersQueryOptions);
  const navigate = useNavigate();
  const { filteredCustomers, clearFilters, register } =
    useCustomerFilter(customers);

  return (
    <Section title="Clientes">
      <Article asForm>
        <Field label="Código">
          <Input
            {...register("id")}
            type="number"
            placeholder="Código del cliente"
          />
        </Field>
        <Field label="Nombre">
          <Input {...register("name")} placeholder="Nombre del cliente" />
        </Field>
        <Field label="Cédula">
          <Input {...register("identityNumber")} placeholder="000-0000000-0" />
        </Field>
        <Button
          onClick={clearFilters}
          alignSelf="end"
          variant="outline"
          rounded="full"
        >
          Limpiar filtros
        </Button>
      </Article>

      <Table>
        <Header>
          <ColumnHeader>Código</ColumnHeader>
          <ColumnHeader>Nombre</ColumnHeader>
          <ColumnHeader>Cédula</ColumnHeader>
          <ColumnHeader>Teléfono</ColumnHeader>
          <ColumnHeader>Estado</ColumnHeader>
        </Header>
        <Body>
          {filteredCustomers.map((customer) => (
            <Row
              key={customer.id}
              onClick={() =>
                navigate({
                  to: "/customers/$id",
                  params: { id: customer.id },
                })
              }
            >
              <Cell>{customer.id.toString().padStart(6, "0")}</Cell>
              <Cell>{customer.name}</Cell>
              <Cell>{customer.identityNumber}</Cell>
              <Cell>
                {customer.phoneNumber.replace(
                  /(\d{3})(\d{3})(\d{4})/,
                  "$1-$2-$3"
                )}
              </Cell>
              <Cell textAlign="center">
                <StatusBadge status={customer.status} />
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Section>
  );
};
