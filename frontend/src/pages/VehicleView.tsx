import { Section } from "@layouts/Section";
import { Article, Form, Aside } from "@layouts/Form";
import { EditButton } from "@components/Editable";
import { DataListItem, DataListRoot } from "@components/DataList";
import { EditableInput, EditableStatusBadge } from "@components/Editable";
import { Button } from "@chakra-ui/react";
import { CustomerInfo } from "@components/CustomerInfo";
import { CustomerForVehicle, VehicleUpdate, vehicleUpdate } from "@types";
import { textTransformProps } from "@utils/format-helper";
import { useUpdateVehicle, vehicleQueryOptions } from "@store/vehicle";
import { getCustomer } from "@store/customer";
import { useDialogStore } from "@store/dialog";
import { useVehicleOptions } from "@hooks/use-options";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";

export const VehicleView = () => {
  const { editing, toggleEditting } = useDialogStore();
  const vehicleId = getRouteApi("/_app/vehicles/$id").useParams().id;
  const { data: vehicle } = useSuspenseQuery(vehicleQueryOptions(vehicleId));
  const [customer, setCustomer] = useState<CustomerForVehicle>(vehicle.owner!);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<VehicleUpdate>({
    values: vehicle,
    resolver: zodResolver(vehicleUpdate),
  });
  const { status } = useVehicleOptions();
  const updateVehicle = useUpdateVehicle(vehicleId);

  const searchCustomer = () => {
    const id = getValues("ownerId");
    if (id) {
      getCustomer(id).then((customer) => {
        setCustomer(customer!);
      });
    }
  };

  return (
    <Section title="Vehículo">
      <Form
        onSubmit={handleSubmit((formData) => {
          updateVehicle.mutateAsync(formData).then((updatedVehicle) => {
            reset(updatedVehicle);
          });
          toggleEditting();
        })}
      >
        <Article>
          <DataListRoot w={"full"} orientation={"horizontal"}>
            <DataListItem label="Chasis">
              <EditableInput
                {...register("vin")}
                {...textTransformProps()}
                error={errors.vin}
              />
            </DataListItem>
            <DataListItem label="Marca">
              <EditableInput
                {...register("make")}
                {...textTransformProps()}
                error={errors.make}
              />
            </DataListItem>
            <DataListItem label="Modelo">
              <EditableInput
                {...register("model")}
                {...textTransformProps()}
                error={errors.model}
              />
            </DataListItem>
            <DataListItem label="Año">
              <EditableInput
                {...register("year")}
                {...textTransformProps()}
                type="number"
                error={errors.year}
              />
            </DataListItem>
            <DataListItem label="Color">
              <EditableInput
                {...register("color")}
                {...textTransformProps()}
                error={errors.color}
              />
            </DataListItem>
            <DataListItem label="Propietario">
              <EditableInput
                type="number"
                {...register("ownerId")}
                error={errors.ownerId}
              />
              {editing && (
                <Button
                  marginInlineStart={2}
                  rounded="full"
                  variant={"outline"}
                  size={"sm"}
                  onClick={searchCustomer}
                >
                  Buscar
                </Button>
              )}
            </DataListItem>
          </DataListRoot>
          <DataListRoot w={"full"} orientation={"horizontal"}>
            <DataListItem label="Motor">
              <EditableInput
                {...register("engineNumber")}
                {...textTransformProps()}
                error={errors.engineNumber}
              />
            </DataListItem>
            <DataListItem label="Placa">
              <EditableInput
                {...register("licensePlate")}
                {...textTransformProps()}
                error={errors.licensePlate}
              />
            </DataListItem>
            <DataListItem label="Matrícula">
              <EditableInput
                {...register("registrationNumber")}
                error={errors.registrationNumber}
              />
            </DataListItem>
            <DataListItem label="Estado">
              <EditableStatusBadge
                {...register("status")}
                defaultValue={[vehicle.status!]}
                collection={status}
              />
            </DataListItem>
            <DataListItem label="Precio">
              <EditableInput
                type="number"
                {...register("price")}
                error={errors.price}
              />
            </DataListItem>
          </DataListRoot>
          <EditButton />
        </Article>
        <CustomerInfo customer={customer} />
        {editing && (
          <Aside
            handleReset={() => {
              reset(vehicle);
            }}
          />
        )}
      </Form>
    </Section>
  );
};
