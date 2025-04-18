import { Drawer } from "@layouts/Drawer";
import { Header } from "@layouts/header";
import { NavBar } from "@components/NavBar";
import { Body } from "@layouts/Body";
import { Outlet, redirect } from "@tanstack/react-router";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  beforeLoad: ({ context, location }) => {
    if (!context.userStore.checkToken()) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    if (context.drawerStore.isOpen) {
      context.drawerStore.toggleOpen();
    }
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <>
      <Drawer>
        <Header />
        <Body>
          <NavBar />
          <Outlet />
        </Body>
      </Drawer>
    </>
  );
}
