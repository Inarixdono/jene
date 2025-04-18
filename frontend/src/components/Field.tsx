import { Field as ChakraField, Stack, FieldRootProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface FieldProps extends FieldRootProps {
  label?: string;
  endElement?: React.ReactNode;
  error?: FieldError;
}

export const Field = (props: FieldProps) => {
  const { label, endElement, error, children, ...rest } = props;

  return (
    <ChakraField.Root invalid={!!error} {...rest}>
      {label && <ChakraField.Label>{label}</ChakraField.Label>}
      <Stack direction={"row"} w="full" gap={1} flex="1">
        {children}
        {endElement}
      </Stack>
      <ChakraField.ErrorText>{error?.message}</ChakraField.ErrorText>
    </ChakraField.Root>
  );
};
