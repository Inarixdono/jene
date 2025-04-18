import { useMutation, queryOptions } from "@tanstack/react-query";
import { queryClient } from "../config";
import {
  getVehicle,
  getVehicles,
  createVehicle,
  updateVehicle,
} from "@services/vehicle";
import { SuccessToast, ErrorToast } from "@utils/toast";

export const vehicleQueryOptions = (vehicleId: number) =>
  queryOptions({
    queryKey: ["vehicles", vehicleId],
    queryFn: () => getVehicle(vehicleId),
  });

export const vehiclesQueryOptions = queryOptions({
  queryKey: ["vehicles"],
  queryFn: getVehicles,
});

export const useCreateVehicle = () => {
  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries();
      SuccessToast({
        title: "Vehículo creado",
        description: "El vehículo ha sido creado exitosamente",
      });
    },
    onError: () => {
      ErrorToast({
        title: "No se pudo crear el vehículo",
        description: "Número de chasis o número de motor ya existe.",
      });
    },
  });
};

export const useUpdateVehicle = (vehicleId: number) => {
  return useMutation({
    mutationKey: ["vehicles", vehicleId],
    mutationFn: updateVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries();
      SuccessToast({
        title: "Vehículo actualizado",
        description: "El vehículo ha sido actualizado exitosamente",
      });
    },
    onError: () => {
      ErrorToast({
        title: "No se pudo actualizar el vehículo",
        description: "Número de chasis o número de motor ya existe.",
      });
    },
  });
};
