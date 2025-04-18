import { QueryClient } from "@tanstack/react-query";
import { UserStore } from "@store/user";
import { DrawerStore } from "@store/drawer";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

interface RootRouteContext {
  queryClient: QueryClient;
  userStore: UserStore;
  drawerStore: DrawerStore;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
