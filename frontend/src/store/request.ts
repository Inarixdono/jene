import { SuccessToast, ErrorToast } from "@utils/toast";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { queryClient } from "../config";
import {
  getRequests,
  createRequest,
  getVehicleRequest,
  updateVehicleRequest,
} from "@services/vehicle";

export const requestsQueryOptions = queryOptions({
  queryKey: ["requests"],
  queryFn: getRequests,
});

export const vehicleRequestQueryOptions = (
  requestId: number,
  vehicleId: number
) =>
  queryOptions({
    queryKey: ["requests", requestId, vehicleId],
    queryFn: () => getVehicleRequest(requestId, vehicleId),
  });

export const useCreateRequest = () => {
  return useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      queryClient.invalidateQueries();
      SuccessToast({
        title: "Solicitud creada",
        description: "La solicitud ha sido creada exitosamente",
      });
    },
    onError: () => {
      ErrorToast({
        title: "Error",
        description: "No se pudo actualizar la solicitud",
      });
    },
  });
};

export const useUpdateVehicleRequest = () => {
  return useMutation({
    mutationFn: updateVehicleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries();
      SuccessToast({
        title: "Solicitud actualizada",
        description: "La solicitud ha sido actualizada exitosamente",
      });
    },
    onError: () => {
      ErrorToast({
        title: "Error",
        description: "No se pudo actualizar la solicitud",
      });
    },
  });
};
