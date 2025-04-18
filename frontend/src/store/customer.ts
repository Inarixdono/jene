import { useMutation, queryOptions } from "@tanstack/react-query";
import { queryClient } from "../config";
import {
  getCustomer as fetchCustomer,
  getCustomers,
  createCustomer,
  updateCustomer,
} from "@services/customer";
import { SuccessToast, ErrorToast } from "@utils/toast";

export const customerQueryOptions = (customerId: number) =>
  queryOptions({
    queryKey: ["customers", customerId],
    queryFn: () => fetchCustomer(customerId),
  });

export const customersQueryOptions = queryOptions({
  queryKey: ["customers"],
  queryFn: getCustomers,
});

export const getCustomer = async (id: number) => {
  try {
    return await fetchCustomer(id);
  } catch {
    ErrorToast({
      title: "No se pudo encontrar el cliente",
      description: "El cliente no existe o no se pudo conectar al servidor.",
    });
    throw new Error("Customer not found");
  }
};

export const useCreateCustomer = () => {
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      SuccessToast({
        title: "Cliente creado",
        description: "El cliente ha sido creado exitosamente.",
      });
    },
    onError: () => {
      ErrorToast({
        title: "No se pudo crear el cliente",
        description: "Número de teléfono o número de identificación ya existe.",
      });
    },
  });
};

export const useUpdateCustomer = (customerId: number) => {
  return useMutation({
    mutationKey: ["customers", customerId],
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries();
      SuccessToast({
        title: "Cliente actualizado",
        description: "El cliente ha sido actualizado exitosamente.",
      });
    },
    onError: () => {
      ErrorToast({
        title: "No se pudo actualizar el cliente",
        description: "Número de teléfono o número de identificación ya existe.",
      });
    },
  });
};
