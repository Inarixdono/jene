import {
  Table as ChakraTable,
  TableBodyProps,
  TableRootProps,
  TableRowProps,
} from "@chakra-ui/react";

export const Row = ChakraTable.Row;

export const ColumnHeader = ChakraTable.ColumnHeader;

export const Cell = ChakraTable.Cell;

export const Header = (props: TableRowProps) => {
  const { children, ...rest } = props;
  return (
    <ChakraTable.Header>
      <Row bg="teal.100" {...rest}>
        {children}
      </Row>
    </ChakraTable.Header>
  );
};

export const Body = (props: TableBodyProps) => {
  const { children, ...rest } = props;
  return (
    <ChakraTable.Body minH={{ base: "50vh", md: "auto" }} {...rest}>
      {children}
    </ChakraTable.Body>
  );
};

export const Table = (props: TableRootProps) => {
  const { children, ...rest } = props;
  return (
    <ChakraTable.ScrollArea
      as="article"
      borderWidth="1"
      shadow="xs"
      rounded="md"
      overflowY={"auto"}
      scrollbarWidth={"thin"}
      {...rest}
    >
      <ChakraTable.Root stickyHeader interactive _hover={{ cursor: "pointer" }}>
        {children}
      </ChakraTable.Root>
    </ChakraTable.ScrollArea>
  );
};
