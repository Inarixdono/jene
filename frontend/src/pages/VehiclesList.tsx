import { Section } from "@layouts/Section";
import { Article } from "@layouts/Form";
import { Field } from "@components/Field";
import { Button, Input } from "@chakra-ui/react";
import { Select } from "@components/ui/select";
import { VehiclesTable } from "@components/VehiclesTable";
import { vehiclesQueryOptions } from "@store/vehicle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useVehicleFilter } from "@hooks/use-vehicle-filter";
import { useVehicleOptions } from "@hooks/use-options";

export const VehiclesList = () => {
  const { data: vehicles } = useSuspenseQuery(vehiclesQueryOptions);
  const { filteredVehicles, clearFilters, register } =
    useVehicleFilter(vehicles);
  const { status } = useVehicleOptions();

  return (
    <Section title="Vehículos">
      <Article asForm>
        <Field label="Chasis">
          <Input {...register("vin")} placeholder="Digite el no. de chasis" />
        </Field>
        <Field label="Marca">
          <Input {...register("make")} placeholder="Ej: HONDA, TAURO" />
        </Field>
        <Field label="Modelo">
          <Input {...register("model")} placeholder="Ej: LEAD 100, JOG" />
        </Field>
        <Field label="Estado">
          <Select
            {...register("status")}
            multiple
            placeholder="Seleccione uno o más"
            collection={status}
          />
        </Field>
        <Button
          alignSelf="end"
          variant="outline"
          rounded="full"
          onClick={clearFilters}
        >
          Limpiar filtros
        </Button>
      </Article>
      <VehiclesTable vehicles={filteredVehicles} />
    </Section>
  );
};
