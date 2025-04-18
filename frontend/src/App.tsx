import { QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useUserStore } from "@store/user.ts";
import { useDrawerStore } from "@store/drawer.ts";
import { system, queryClient } from "./config.ts";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    userStore: undefined!,
    drawerStore: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const userStore = useUserStore();
  const drawerStore = useDrawerStore();

  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ userStore, drawerStore }} />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
