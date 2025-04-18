import { createFileRoute } from "@tanstack/react-router";
import { Navigate } from "@tanstack/react-router";
import { Login } from "@pages/Login";
import { useUserStore } from "@store/user";

const Component = () => {
  const { user } = useUserStore();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Login />;
};

export const Route = createFileRoute("/login")({
  component: Component,
});
