import { createFileRoute } from "@tanstack/react-router";
import { customersQueryOptions } from "@store/customer";
import { CustomerList } from "@pages/CustomersList";

export const Route = createFileRoute("/_app/customers/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(customersQueryOptions);
  },
  component: CustomerList,
});
