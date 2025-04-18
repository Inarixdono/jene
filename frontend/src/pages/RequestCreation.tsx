import { Section } from "@layouts/Section";
import { Article, Aside, Form } from "@layouts/Form";
import { Field } from "@components/Field";
import { Select } from "@components/ui/select";
import { IconButton, Input } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { VehicleRequestTable } from "@components/VehiclesTable";
import { ValueChangeDetails } from "@zag-js/select";
import { requestCreate, RequestCreate, PopulatedCustomer } from "@types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomerVehicles } from "@hooks/use-options";
import { useCreateRequest } from "@store/request";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getCustomer } from "@store/customer";

export const RequestCreation = () => {
  const {
    register,
    watch,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestCreate>({
    defaultValues: {
      detail: [],
    },
    resolver: zodResolver(requestCreate),
  });
  const [customer, setCustomer] = useState<PopulatedCustomer>();
  const vehicles = useCustomerVehicles(customer?.vehicles ?? []);
  const createRequest = useCreateRequest();

  const handleSearch = () => {
    const id = getValues("customerId");
    getCustomer(id).then((customer) => {
      setCustomer(customer);
    });
  };

  const onSubmit = handleSubmit((data) => {
    createRequest.mutate(data);
    reset();
    setCustomer(undefined);
  });

  const handleSelectChange = (detail: ValueChangeDetails) => {
    setValue(
      "detail",
      detail.value.map((val) => ({ vehicleId: Number(val) }))
    );
  };

  const selectedVehicles = watch("detail")?.map((detail) => detail.vehicleId);

  return (
    <Section title="Crear solicitud">
      <Form onSubmit={onSubmit}>
        <Article>
          <Field
            label="Código"
            error={errors.customerId}
            endElement={
              <IconButton
                variant="solid"
                colorPalette="green"
                onClick={handleSearch}
              >
                <LuSearch />
              </IconButton>
            }
          >
            <Input
              {...register("customerId")}
              type="number"
              placeholder="Digite el código del cliente"
            />
          </Field>
          <Field label="Nombre">
            <Input
              type="text"
              value={customer?.name ?? ""}
              readOnly
              placeholder="Nombre del cliente"
            />
          </Field>
          <Field label="Vehículo" error={errors.detail}>
            <Select
              name="detail"
              placeholder="Seleccione un vehículo"
              multiple
              collection={vehicles}
              onValueChange={handleSelectChange}
            />
          </Field>
        </Article>
        <VehicleRequestTable
          vehicles={customer?.vehicles}
          selectedVehicles={selectedVehicles ?? []}
        />
        <Aside
          handleReset={() => {
            setCustomer(undefined);
            reset();
          }}
        />
      </Form>
    </Section>
  );
};
