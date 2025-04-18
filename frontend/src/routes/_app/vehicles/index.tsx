import { createFileRoute } from "@tanstack/react-router";
import { vehiclesQueryOptions } from "@store/vehicle";
import { VehiclesList } from "@pages/VehiclesList";

export const Route = createFileRoute("/_app/vehicles/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(vehiclesQueryOptions);
  },
  component: VehiclesList,
});
