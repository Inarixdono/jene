import { Flex } from "@chakra-ui/react";

import { ReactNode } from "react";

export const Body = ({ children }: { children: ReactNode }) => {
  return (
    <Flex as="section" grow="1" minH={{ base: "auto", md: 0 }}>
      {children}
    </Flex>
  );
};

export default Body;
