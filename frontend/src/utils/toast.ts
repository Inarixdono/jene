import { toaster } from "@components/ui/toaster";

interface ToastParams {
  title: string;
  description: string;
}

export const SuccessToast = (params: ToastParams) => {
  toaster.create({
    title: params.title,
    description: params.description,
    action: {
      label: "Cerrar",
      onClick: () => toaster.dismiss(),
    },
    type: "success",
  });
};

export const ErrorToast = (params: ToastParams) => {
  toaster.create({
    title: params.title,
    description: params.description,
    action: {
      label: "Cerrar",
      onClick: () => toaster.dismiss(),
    },
    type: "error",
  });
};
