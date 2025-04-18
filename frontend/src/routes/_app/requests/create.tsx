import { RequestCreation } from "@pages/RequestCreation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/requests/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RequestCreation />;
}
