import { CustomerCreation } from "@pages/CustomerCreation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/customers/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CustomerCreation />;
}
