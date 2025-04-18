import { Section } from "@layouts/Section";
import { Form, Article, Stretch, Aside } from "@layouts/Form";
import { Input, Textarea } from "@chakra-ui/react";
import { Select } from "@components/ui/select";
import { Field } from "@components/Field";
import { CustomerCreate, customerCreate } from "@types";
import { textTransformProps } from "@utils/format-helper";
import { useForm } from "react-hook-form";
import { useProvinces } from "@hooks/use-options";
import { useCreateCustomer } from "@store/customer";
import { zodResolver } from "@hookform/resolvers/zod";

export const CustomerCreation = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm<CustomerCreate>({ resolver: zodResolver(customerCreate) });
  const [provinces, cities] = useProvinces(watch("state"));
  const createCustomer = useCreateCustomer();

  const onSubmit = handleSubmit((data) => {
    createCustomer.mutate(data);
    reset();
  });

  return (
    <Section title="Crear cliente">
      <Form onSubmit={onSubmit}>
        <Article>
          <Field label="Nombre" error={errors.name}>
            <Input
              {...register("name")}
              {...textTransformProps()}
              placeholder="Nombre del cliente"
              type="text"
            />
          </Field>
          <Field label="Cédula" error={errors.identityNumber}>
            <Input
              {...register("identityNumber")}
              type="number"
              placeholder="000-0000000-0"
            />
          </Field>
          <Field label="Teléfono" error={errors.phoneNumber}>
            <Input
              {...register("phoneNumber")}
              type="number"
              placeholder="809-000-0000"
            />
          </Field>
        </Article>
        <Article>
          <Field label="Dirección" error={errors.street}>
            <Input
              {...register("street")}
              placeholder="No. de calle, no. de casa, sector"
            />
          </Field>
          <Field label="Provincia" error={errors.state}>
            <Select
              {...register("state")}
              placeholder="Seleccione una provincia"
              collection={provinces}
            />
          </Field>
          <Field label="Ciudad" error={errors.city}>
            <Select
              {...register("city")}
              placeholder="Seleccione una ciudad"
              collection={cities}
            />
          </Field>
        </Article>
        <Stretch>
          <Field label="Referencia" error={errors.reference}>
            <Textarea
              flex={1}
              {...register("reference")}
              resize={"none"}
              placeholder="Describa una ubicación que le quede cerca"
            />
          </Field>
        </Stretch>
        <Aside />
      </Form>
    </Section>
  );
};
