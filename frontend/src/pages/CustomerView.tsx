import { Section } from "@layouts/Section";
import { Article, Form, Aside } from "@layouts/Form";
import { DataListRoot, DataListItem } from "@components/DataList";
import {
  EditableInput,
  EditableStatusBadge,
  EditableSelect,
} from "@components/Editable";
import { EditButton } from "@components/Editable";
import { VehiclesTable } from "@components/VehiclesTable";
import { CustomerUpdate, customerUpdate } from "@types";
import { customerQueryOptions } from "@store/customer";
import { textTransformProps } from "@utils/format-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRouteApi } from "@tanstack/react-router";
import { useUpdateCustomer } from "@store/customer";
import { useForm } from "react-hook-form";
import { useCustomerStatuses, useProvinces } from "@hooks/use-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useDialogStore } from "@store/dialog";

export const CustomerView = () => {
  const customerId = getRouteApi("/_app/customers/$id").useParams().id;
  const { data: customer } = useSuspenseQuery(customerQueryOptions(customerId));
  const { editing } = useDialogStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CustomerUpdate>({
    values: customer,
    resolver: zodResolver(customerUpdate),
  });
  const [provinces, cities] = useProvinces(watch("state") ?? null);
  const updateCustomer = useUpdateCustomer(customerId);
  const status = useCustomerStatuses();

  const onSubmit = handleSubmit((data) => {
    updateCustomer.mutate(data);
  });

  return (
    <Section title="Cliente">
      <Form
        justifyContent={editing ? "" : "justify-between"}
        onSubmit={onSubmit}
      >
        <Article>
          <DataListRoot w="full" orientation="horizontal">
            <DataListItem label="Código">
              <EditableInput {...register("id")} inmutable />
            </DataListItem>
            <DataListItem label="Nombre">
              <EditableInput
                {...register("name")}
                {...textTransformProps()}
                error={errors.name}
              />
            </DataListItem>
            <DataListItem label="Cédula">
              <EditableInput
                {...register("identityNumber")}
                error={errors.identityNumber}
              />
            </DataListItem>
            <DataListItem label="Teléfono">
              <EditableInput
                {...register("phoneNumber")}
                error={errors.phoneNumber}
              />
            </DataListItem>
            <DataListItem label="Estado">
              <EditableStatusBadge
                {...register("status")}
                defaultValue={[customer.status!]}
                collection={status}
                placeholder="Seleccione un estado"
              />
            </DataListItem>
          </DataListRoot>
          <DataListRoot w="full" orientation="horizontal">
            <DataListItem label="Dirección">
              <EditableInput {...register("street")} error={errors.street} />
            </DataListItem>
            <DataListItem label="Provincia">
              <EditableSelect
                {...register("state")}
                collection={provinces}
                defaultValue={[customer.state!]}
                placeholder="Seleccione una provincia"
              />
            </DataListItem>
            <DataListItem label="Ciudad">
              <EditableSelect
                {...register("city")}
                collection={cities}
                defaultValue={[customer.city!]}
                placeholder="Seleccione una ciudad"
              />
            </DataListItem>
            <DataListItem label="Referencia">
              <EditableInput
                {...register("reference")}
                error={errors.reference}
              />
            </DataListItem>
          </DataListRoot>
          <EditButton />
        </Article>
        <VehiclesTable vehicles={customer.vehicles!} />
        {editing && (
          <Aside
            handleReset={() => {
              reset(customer);
            }}
          />
        )}
      </Form>
    </Section>
  );
};
