import { VehicleCreation } from "@pages/VehicleCreation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/vehicles/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <VehicleCreation />;
}
