import { Field } from "./Field";
import { Stack, Heading, Input } from "@chakra-ui/react";
import { CustomerForVehicle } from "@types";

export const CustomerInfo = ({
  customer,
}: {
  customer?: CustomerForVehicle;
}) => {
  if (!customer) return null;
  return (
    <Stack>
      <Heading size="md" fontWeight="bold">
        Información del propietario
      </Heading>
      <Stack direction="row" paddingBlockStart={4}>
        <Field label="Nombre">
          <Input value={customer.name} disabled />
        </Field>
        <Field label="Cédula">
          <Input value={customer.identityNumber} disabled />
        </Field>
      </Stack>
    </Stack>
  );
};
