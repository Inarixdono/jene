import { DataList as ChakraDataList } from "@chakra-ui/react";
import React from "react";

export const DataListRoot = ChakraDataList.Root;

interface ItemProps extends ChakraDataList.ItemProps {
  label: string;
}

export const DataListItem = React.forwardRef<HTMLDivElement, ItemProps>(
  (props, ref) => {
    const { label, children, ...rest } = props;
    return (
      <ChakraDataList.Item {...rest} ref={ref}>
        <ChakraDataList.ItemLabel>{label}</ChakraDataList.ItemLabel>
        <ChakraDataList.ItemValue>{children}</ChakraDataList.ItemValue>
      </ChakraDataList.Item>
    );
  }
);
