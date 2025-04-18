import { Section } from "@layouts/Section";
import { Avatar, Box, Stack } from "@chakra-ui/react";
import {
  EditableInput,
  EditableSelect,
  EditButton,
} from "@components/Editable";
import { Aside, Form } from "@layouts/Form";
import { Field } from "@components/Field";
import { User } from "@types";
import { useUserStore } from "@store/user";
import { useForm } from "react-hook-form";
import { useUserOptions } from "@hooks/use-options";
import { useDialogStore } from "@store/dialog";
import { useEffect } from "react";

export const UserProfile = () => {
  const { user, isSuperuser } = useUserStore();
  const { register, reset, handleSubmit } = useForm<User>({
    defaultValues: user!,
  });
  const { roles, departments } = useUserOptions();
  const { editing, toggleEditting } = useDialogStore();

  const onSubmit = handleSubmit((data) => {
    alert(`${data.name} actualizado!`);
    toggleEditting();
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  if (!user) return null;

  return (
    <Section>
      <Stack
        as="article"
        direction="row"
        justify="space-between"
        paddingBlock={4}
        paddingInline={4}
        borderWidth="1px"
        rounded="md"
        shadow="sm"
      >
        <Stack
          direction="row"
          w="full"
          paddingInline="12"
          paddingBlock="6"
          align="center"
        >
          <Box as="picture" w="238px" h="238px">
            <Avatar.Root fontSize="52px" size="full" colorPalette="fg">
              <Avatar.Fallback name={user.name} />
            </Avatar.Root>
          </Box>
          <Form
            flex="1"
            onSubmit={onSubmit}
            direction="column"
            paddingInlineStart="8"
          >
            <Field label="Nombre">
              <EditableInput {...register("name")} />
            </Field>
            <Field label="Correo electrónico">
              <EditableInput {...register("email")} />
            </Field>
            <Field label="Rol">
              <EditableSelect
                {...register("role")}
                collection={roles}
                readOnly={!isSuperuser()}
                defaultValue={[user.role]}
              />
            </Field>
            <Field label="Departamento">
              <EditableSelect
                {...register("department")}
                collection={departments}
                readOnly={!isSuperuser()}
                defaultValue={[user.department]}
              />
            </Field>
            {editing && (
              <Aside
                submitLabel="Guardar cambios"
                roundedButtons
                marginBlockStart="4"
              />
            )}
          </Form>
        </Stack>
        <EditButton rounded="full" />
      </Stack>
    </Section>
  );
};
