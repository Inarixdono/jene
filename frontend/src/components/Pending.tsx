import { Section } from "@layouts/Section";
import { Skeleton, Stack, Spinner, Text } from "@chakra-ui/react";

export const Pending = () => {
  return (
    <Section>
      <Skeleton h="38px" my="5" />
      <Stack
        flex="1"
        justifyContent="center"
        alignItems="center"
        gap="3"
        colorPalette="teal"
      >
        <Spinner
          size="xl"
          color="colorPalette.800"
          borderWidth="3px"
          animationDuration="0.9s"
        />
        <Text color="colorPalette.800" fontWeight="bold" fontSize="sm">
          Cargando
        </Text>
      </Stack>
    </Section>
  );
};
