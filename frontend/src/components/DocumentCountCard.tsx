import { DataList, DataListRootProps, Heading } from "@chakra-ui/react";

interface MyCardProps extends DataListRootProps {
  itemLabel: string;
  itemValue: string;
}

export const DocumentCountCard = (props: MyCardProps) => {
  const { itemLabel, itemValue, ...rest } = props;

  return (
    <DataList.Root
      rounded="sm"
      w="36"
      paddingInline="4"
      paddingBlock="10"
      variant="bold"
      size="lg"
      gap={2}
      transition="all"
      transitionDuration="fast"
      _hover={{ shadow: "sm", cursor: "pointer", bg: "blackAlpha.50" }}
      {...rest}
    >
      <DataList.ItemValue>
        <Heading size="5xl" fontWeight="bold" color="teal.600">
          {itemValue}
        </Heading>
      </DataList.ItemValue>
      <DataList.ItemLabel>{itemLabel}</DataList.ItemLabel>
    </DataList.Root>
  );
};
