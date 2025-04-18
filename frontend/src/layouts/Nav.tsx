import { Stack, StackProps } from "@chakra-ui/react";

export const Nav = (props: StackProps) => {
  const { children, ...rest } = props;
  return (
    <Stack
      as="nav"
      w="64"
      background="blackAlpha.200"
      pl="2"
      hideBelow="xl"
      {...rest}
    >
      {children}
    </Stack>
  );
};
