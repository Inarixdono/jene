import { Section } from "@layouts/Section";
import { DocumentCountCard } from "@components/DocumentCountCard";
import { Stack } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Section title="Seguimiento de solicitudes">
      <Stack direction="row" justify={"center"} paddingBlockStart="10" gap="16">
        <DocumentCountCard itemLabel="Desconocido" itemValue="153" />
        <DocumentCountCard itemLabel="Pendiente" itemValue="256" />
        <DocumentCountCard itemLabel="Disponible" itemValue="356" />
        <DocumentCountCard itemLabel="Entregado" itemValue="655" />
      </Stack>
    </Section>
  );
};

export default Home;
