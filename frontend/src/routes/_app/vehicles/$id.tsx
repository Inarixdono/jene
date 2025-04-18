import { createFileRoute } from "@tanstack/react-router";
import { VehicleView } from "@pages/VehicleView";
import { vehicleQueryOptions } from "@store/vehicle";

export const Route = createFileRoute("/_app/vehicles/$id")({
  params: {
    parse: (params) => ({
      id: Number(params.id),
    }),
  },
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(vehicleQueryOptions(id)),
  component: VehicleView,
});
