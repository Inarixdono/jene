import { Section } from "@layouts/Section";
import { Article, Aside, Form, Stretch } from "@layouts/Form";
import { DataListItem, DataListRoot } from "@components/DataList";
import {
  EditableInput,
  EditableStatusBadge,
  EditButton,
} from "@components/Editable";
import { StatusBadge } from "@components/StatusBadge";
import { vehicleRequestUpdate, VehicleRequestUpdate } from "@types";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRouteApi } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  useUpdateVehicleRequest,
  vehicleRequestQueryOptions,
} from "@store/request";
import { useRequestStatuses } from "@hooks/use-options";
import { useForm } from "react-hook-form";
import { useDialogStore } from "@store/dialog";

export const RequestView = () => {
  const { requestId, vehicleId } = getRouteApi(
    "/_app/requests/$requestId/$vehicleId"
  ).useParams();
  const { data: request } = useSuspenseQuery(
    vehicleRequestQueryOptions(requestId, vehicleId)
  );
  const { register, handleSubmit } = useForm<VehicleRequestUpdate>({
    values: request,
    resolver: zodResolver(vehicleRequestUpdate),
  });
  const { editing, toggleEditting } = useDialogStore();
  const update = useUpdateVehicleRequest();
  const requestStatuses = useRequestStatuses();

  const onSubmit = handleSubmit((data) => {
    update.mutate(data);
    toggleEditting();
  });

  return (
    <Section title="Solicitud">
      <Form onSubmit={onSubmit}>
        <Article>
          <DataListRoot w="full" orientation="horizontal">
            <DataListItem label="Código del cliente">
              <EditableInput
                inmutable
                value={request.customer.id.toString().padStart(6, "0")}
              />
            </DataListItem>
            <DataListItem label="Nombre">
              <EditableInput inmutable value={request.customer.name} />
            </DataListItem>
            <DataListItem label="Cédula">
              <EditableInput
                inmutable
                value={request.customer.identityNumber}
              />
            </DataListItem>
            <DataListItem label="Teléfono">
              <EditableInput inmutable value={request.customer.phoneNumber} />
            </DataListItem>
          </DataListRoot>
          <DataListRoot w="full" orientation="horizontal">
            <DataListItem label="Chasis">
              <EditableInput inmutable value={request.vehicle.vin} />
            </DataListItem>
            <DataListItem label="Marca">
              <EditableInput inmutable value={request.vehicle.make} />
            </DataListItem>
            <DataListItem label="Modelo">
              <EditableInput inmutable value={request.vehicle.model} />
            </DataListItem>
            <DataListItem label="Estado">
              <StatusBadge size="lg" status={request.vehicle.status} />
            </DataListItem>
          </DataListRoot>
          <EditButton />
        </Article>
        <Stretch mt={5}>
          <DataListRoot w="full" orientation="horizontal">
            <DataListItem label="Placa">
              <EditableStatusBadge
                mr="4"
                defaultValue={[request.plateStatus]}
                collection={requestStatuses}
                {...register("plateStatus")}
              />
            </DataListItem>
            <DataListItem label="Fecha de entrega">
              <EditableInput inmutable />
            </DataListItem>
          </DataListRoot>
          <DataListRoot w="full" orientation="horizontal">
            <DataListItem label="Matrícula">
              <EditableStatusBadge
                defaultValue={[request.registrationStatus]}
                collection={requestStatuses}
                {...register("registrationStatus")}
              />
            </DataListItem>
            <DataListItem label="Fecha de entrega">
              <EditableInput inmutable />
            </DataListItem>
          </DataListRoot>
        </Stretch>
        {editing && <Aside />}
      </Form>
    </Section>
  );
};
