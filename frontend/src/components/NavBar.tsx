import { Nav } from "@layouts/Nav";
import { Menu } from "@components/Menu";

export const NavBar = () => {
  return (
    <Nav gap={0} pt="4">
      <Menu />
    </Nav>
  );
};
