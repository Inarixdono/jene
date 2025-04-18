import { Flex, FlexProps } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { DialogRoot } from "@components/ui/dialog";
import { Toaster } from "@components/ui/toaster";
import { useDialogStore } from "@store/dialog";

interface SectionProps extends FlexProps {
  title?: string;
}

export const Section = (props: SectionProps) => {
  const { open, toggleOpen } = useDialogStore();
  const { title, children, ...rest } = props;

  return (
    <Flex
      as="section"
      paddingInline="12"
      paddingBlockStart="5"
      paddingBlockEnd="10"
      direction="column"
      maxW={"full"}
      flex="1"
      gap="6"
      {...rest}
    >
      <DialogRoot
        open={open}
        onOpenChange={() => {
          toggleOpen();
        }}
        size="xl"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        {title && (
          <Heading
            as="h2"
            size="3xl"
            fontFamily="inherit"
            paddingBlock="5"
            fontWeight="bold"
            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
          >
            {title}
          </Heading>
        )}
        {children}
      </DialogRoot>
      <Toaster />
    </Flex>
  );
};
