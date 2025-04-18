import { Button, Center, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { Field } from "@components/Field";
import { PasswordInput } from "@components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@store/user";
import { userLogin, UserLogin } from "@types";
import { useForm } from "react-hook-form";

export const Login = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: zodResolver(userLogin),
  });
  const { login } = useUserStore();

  const onSubmit = handleSubmit((data) => {
    login(data).catch(() =>
      setError("username", { message: "Usuario o contraseña incorrectos" })
    );
  });

  return (
    <Center minW="full" flexGrow="1">
      <Flex
        as="form"
        onSubmit={onSubmit}
        direction="column"
        minW={{ base: "5/6", lg: "2/5" }}
        minH="1/2"
        paddingInline="5"
        paddingBlockEnd="8"
        rounded="md"
        shadow="md"
      >
        <Heading textAlign="center" paddingBlock="8" textStyle="3xl">
          Iniciar sesión
        </Heading>
        <Stack gap="2" marginBlockEnd="4">
          <Field error={errors.username}>
            <Input {...register("username")} placeholder="Email" />
          </Field>
          <Field error={errors.password}>
            <PasswordInput {...register("password")} placeholder="Contraseña" />
          </Field>
        </Stack>
        <Button type="submit">Iniciar sesión</Button>
      </Flex>
    </Center>
  );
};

export default Login;
