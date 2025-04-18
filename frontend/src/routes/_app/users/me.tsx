import { UserProfile } from "@pages/UserProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/users/me")({
  component: UserProfile,
});
