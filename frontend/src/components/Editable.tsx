import { Input } from "@chakra-ui/react";
import { Field } from "./Field";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { Select as ChakraSelect } from "@chakra-ui/react";
import { Select } from "./ui/select";
import { StatusBadge } from "./StatusBadge";
import { MdEdit } from "react-icons/md";
import { useDialogStore } from "@store/dialog";
import React from "react";
import { FieldError } from "react-hook-form";

interface EditableInputProps extends React.ComponentProps<typeof Input> {
  inmutable?: boolean;
  error?: FieldError;
}

type EditableSelectProps = ChakraSelect.RootProps & {
  inmutable?: boolean;
  placeholder?: string;
};

export const EditableInput = React.forwardRef<
  HTMLInputElement,
  EditableInputProps
>((props, ref) => {
  const { inmutable, error, ...rest } = props;
  const { editing } = useDialogStore();
  return (
    <Field error={error}>
      <Input
        {...rest}
        ref={ref}
        size="sm"
        variant={inmutable || !editing ? "subtle" : "outline"}
        disabled={inmutable ?? !editing}
        readOnly={!editing}
      />
    </Field>
  );
});

export const EditableSelect = React.forwardRef<
  HTMLDivElement,
  EditableSelectProps
>((props, ref) => {
  const { editing } = useDialogStore();
  return <Select ref={ref} disabled={!editing} {...props} />;
});

export const EditableStatusBadge = React.forwardRef<
  HTMLInputElement,
  EditableSelectProps
>((props, ref) => {
  const { value, ...rest } = props;
  const status = value ?? props.defaultValue;
  const { editing } = useDialogStore();
  if (!editing) {
    return <StatusBadge status={status![0]} size="lg" paddingBlock="2" />;
  }
  return <Select ref={ref} value={value} {...rest} />;
});

export const EditButton = (props: IconButtonProps) => {
  const { toggleEditting } = useDialogStore();
  return (
    <IconButton
      size="sm"
      variant="outline"
      onClick={() => {
        toggleEditting();
      }}
      {...props}
    >
      <MdEdit />
    </IconButton>
  );
};
