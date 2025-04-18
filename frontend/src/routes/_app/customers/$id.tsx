import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Pending } from "@components/Pending";
import { CustomerView } from "@pages/CustomerView";
import { customerQueryOptions } from "@store/customer";

export const Route = createFileRoute("/_app/customers/$id")({
  params: {
    parse: (params) => ({
      id: Number(params.id),
    }),
  },
  loader: ({ context: { queryClient }, params: { id } }) => {
    queryClient.ensureQueryData(customerQueryOptions(id));
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<Pending />}>
      <CustomerView />
    </Suspense>
  );
}
