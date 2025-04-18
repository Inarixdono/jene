import { UserCreateForm } from "@pages/UserCreation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/users/create")({
  component: UserCreateForm,
});
