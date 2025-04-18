import { createFileRoute } from "@tanstack/react-router";
import { vehicleRequestQueryOptions } from "@store/request";
import { Suspense } from "react";
import { Pending } from "@components/Pending";
import { RequestView } from "@pages/RequestView";

export const Route = createFileRoute("/_app/requests/$requestId/$vehicleId")({
  params: {
    parse: (params) => ({
      requestId: Number(params.requestId),
      vehicleId: Number(params.vehicleId),
    }),
  },
  loader: ({ context: { queryClient }, params: { requestId, vehicleId } }) => {
    queryClient.ensureQueryData(
      vehicleRequestQueryOptions(requestId, vehicleId)
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<Pending />}>
      <RequestView />
    </Suspense>
  );
}
