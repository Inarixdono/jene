import { Section } from "@layouts/Section";
import { Form, Article, Stretch, Aside } from "@layouts/Form";
import { Field } from "@components/Field";
import { Select } from "@components/ui/select";
import { Input, Textarea } from "@chakra-ui/react";
import { PasswordInput } from "@components/ui/password-input";
import { UserCreate, userCreate } from "@types";
import { zodResolver } from "@hookform/resolvers/zod";
import { textTransformProps } from "@utils/format-helper";
import { useUserOptions } from "@hooks/use-options";
import { useForm } from "react-hook-form";
import { useCreateUser } from "@store/user";

export const UserCreateForm = () => {
  const { roles, departments } = useUserOptions();
  const createUser = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCreate>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(userCreate),
  });

  return (
    <Section title="Crear usuario">
      <Form
        onSubmit={handleSubmit((data) => {
          createUser(data);
          reset();
        })}
      >
        <Article>
          <Field label="Nombre" error={errors.name}>
            <Input
              {...register("name")}
              {...textTransformProps()}
              placeholder="Ingrese el nombre del usuario"
            />
          </Field>
          <Field label="Cédula" error={errors.identityNumber}>
            <Input
              {...register("identityNumber", {})}
              type="number"
              placeholder="Número de cédula sin guiones"
            />
          </Field>
          <Field label="Correo electrónico" error={errors.email}>
            <Input
              {...register("email")}
              {...textTransformProps("lowercase")}
              type="email"
              placeholder="ejemplo@dominio.com"
            />
          </Field>
        </Article>
        <Article>
          <Field label="Rol" error={errors.role}>
            <Select
              {...register("role")}
              placeholder="Seleccione uno"
              collection={roles}
            />
          </Field>
          <Field label="Departamento" error={errors.department}>
            <Select
              {...register("department")}
              placeholder="Seleccione uno"
              collection={departments}
            />
          </Field>
          <Field label="Contraseña" error={errors.password}>
            <PasswordInput
              {...register("password")}
              placeholder="Ingrese la contraseña del usuario"
            />
          </Field>
        </Article>
        <Stretch>
          <Field label="Nota">
            <Textarea
              flex="1"
              placeholder="Información adicional"
              resize="none"
            />
          </Field>
        </Stretch>
        <Aside handleReset={reset} />
      </Form>
    </Section>
  );
};
