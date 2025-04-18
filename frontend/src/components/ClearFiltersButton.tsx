import { Button, ButtonProps } from "@chakra-ui/react";

export const ClearFiltersButton = (props: ButtonProps) => {
  return (
    <Button alignSelf="end" variant="outline" rounded="full" {...props}>
      Limpiar filtros
    </Button>
  );
};
