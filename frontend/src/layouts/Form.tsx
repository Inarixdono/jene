import { Button, Flex, FlexProps } from "@chakra-ui/react";

interface AsideProps extends FlexProps {
  submitLabel?: string;
  resetLabel?: string;
  handleReset?: () => void;
  roundedButtons?: boolean;
}

export const Form = (props: FlexProps) => {
  const { children, ...rest } = props;
  return (
    <Flex
      as="form"
      direction="inherit"
      gap="inherit"
      flex="inherit"
      minH="0"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export const Article = (props: FlexProps & { asForm?: boolean }) => {
  const { children, asForm, ...rest } = props;
  return (
    <Flex
      as={!asForm ? "article" : "form"}
      direction={{ base: "column", md: "row" }}
      gap="4"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export const Stretch = (props: FlexProps) => {
  const { children, ...rest } = props;
  return (
    <Flex as="article" minH={{ base: "30vh" }} flex="1" {...rest}>
      {children}
    </Flex>
  );
};

export const Aside = (props: AsideProps) => {
  const { submitLabel, resetLabel, handleReset, roundedButtons, ...rest } =
    props;

  return (
    <Flex as="aside" direction="row-reverse" gap="2" {...rest}>
      <Button
        type="submit"
        colorPalette="teal"
        rounded={roundedButtons ? "full" : "sm"}
      >
        {submitLabel ?? "Guardar"}
      </Button>
      <Button
        type={handleReset ? "button" : "reset"}
        variant="outline"
        colorPalette="red"
        onClick={handleReset}
        rounded={roundedButtons ? "full" : "sm"}
      >
        {resetLabel ?? "Cancelar"}
      </Button>
    </Flex>
  );
};
