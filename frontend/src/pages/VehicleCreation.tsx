import { Section } from "@layouts/Section";
import { Form, Article, Stretch, Aside } from "@layouts/Form";
import { Field } from "@components/Field";
import { Input, Textarea } from "@chakra-ui/react";
import { Select } from "@components/ui/select";
import { VehicleCreate } from "@types";
import { textTransformProps } from "@utils/format-helper";
import { useVehicleOptions } from "@hooks/use-options";
import { useForm } from "react-hook-form";
import { vehicleCreate } from "@types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateVehicle } from "@store/vehicle";

export const VehicleCreation = () => {
  const { conditions, types } = useVehicleOptions();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<VehicleCreate>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(vehicleCreate),
  });
  const createVehicle = useCreateVehicle();

  const onSubmit = handleSubmit((data) => {
    createVehicle.mutate(data);
    reset();
  });

  return (
    <Section title="Crear vehículo">
      <Form onSubmit={onSubmit}>
        <Article>
          <Field label="Chasis" error={errors.vin}>
            <Input
              {...register("vin")}
              {...textTransformProps()}
              placeholder="Digite el no. de chasis"
            />
          </Field>
          <Field label="Tipo de vehículo" error={errors.vehicleType}>
            <Select
              {...register("vehicleType")}
              placeholder="Seleccione uno"
              collection={types}
            />
          </Field>
          <Field label="Marca" error={errors.make}>
            <Input
              {...register("make")}
              {...textTransformProps()}
              placeholder="Ej: HONDA, TAURO"
            />
          </Field>
          <Field label="Modelo" error={errors.model}>
            <Input
              {...register("model")}
              {...textTransformProps()}
              placeholder="Ej: LEAD 100, JOG"
            />
          </Field>
          <Field label="Año" error={errors.year}>
            <Input
              {...register("year")}
              type="number"
              placeholder="Ej: 2024, 2023"
            />
          </Field>
        </Article>
        <Article>
          <Field label="Color" error={errors.color}>
            <Input
              {...register("color")}
              {...textTransformProps()}
              placeholder="Digite el color del vehículo"
            />
          </Field>
          <Field label="Número de motor" error={errors.engineNumber}>
            <Input
              {...register("engineNumber")}
              {...textTransformProps()}
              placeholder="Digite el no. de máquina"
            />
          </Field>
          <Field label="Precio" error={errors.price}>
            <Input
              {...register("price")}
              type="number"
              placeholder="Digite el precio del vehículo"
            />
          </Field>
          <Field label="Condición" error={errors.isNew}>
            <Select
              {...register("isNew")}
              collection={conditions}
              placeholder="Seleccione uno"
            />
          </Field>
        </Article>
        <Stretch>
          <Field label="Nota">
            <Textarea
              {...register("note")}
              placeholder="Escriba una nota sobre el vehículo"
              flex="1"
              resize="none"
            />
          </Field>
        </Stretch>
        <Aside handleReset={reset} />
      </Form>
    </Section>
  );
};
