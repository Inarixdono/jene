import { Dialog as ChakraDialog, IconButton, Stack } from "@chakra-ui/react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogCloseTrigger,
  DialogBody as ChakraDialogBody,
  DialogTrigger as ChakraTrigger,
} from "@components/ui/dialog";
import { MdEdit } from "react-icons/md";
import { useDialogStore } from "@store/dialog";
import { Aside } from "./Form";

interface DialogProps {
  title: string;
  child: React.ReactNode;
}

interface DialogBodyProps extends ChakraDialog.BodyProps {
  handleReset: () => void;
  offStack?: React.ReactNode;
}

export const Dialog = ({ title, child }: DialogProps) => {
  return (
    <DialogContent>
      <DialogHeader as="header">
        <DialogTitle>{title}</DialogTitle>
        <DialogCloseTrigger />
      </DialogHeader>
      {child}
    </DialogContent>
  );
};

export const DialogBody = (props: DialogBodyProps) => {
  const { editing, toggleEditting } = useDialogStore();
  const { children, offStack, handleReset, ...rest } = props;
  return (
    <ChakraDialogBody {...rest}>
      <Stack gap={10}>
        <Stack direction="row" w="full" justify="space-between">
          <Stack direction={{ base: "column", lg: "row" }} w="full" gap="10">
            {children}
          </Stack>
          <IconButton
            size="sm"
            variant="outline"
            onClick={() => toggleEditting()}
          >
            <MdEdit />
          </IconButton>
        </Stack>
        {offStack}
        {editing && (
          <Aside
            submitLabel="Actualizar"
            handleReset={() => {
              toggleEditting();
              handleReset();
            }}
          />
        )}
      </Stack>
    </ChakraDialogBody>
  );
};

export const DialogTrigger = ChakraTrigger;
