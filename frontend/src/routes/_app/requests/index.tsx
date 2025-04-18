import { createFileRoute } from "@tanstack/react-router";
import { requestsQueryOptions } from "@store/request";
import { RequestsList } from "@pages/RequestsList";

export const Route = createFileRoute("/_app/requests/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(requestsQueryOptions);
  },
  component: RequestsList,
});
