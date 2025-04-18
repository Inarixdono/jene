import {
  Flex,
  Avatar,
  Float,
  Circle,
  IconButton,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";
import { DrawerTrigger } from "@components/ui/drawer";
import { GiHamburgerMenu } from "react-icons/gi";
import { useUserStore } from "@store/user";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";

export const Header = () => {
  const { user, logout } = useUserStore();
  const router = useRouter();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    router.invalidate().finally(() => {
      navigate({ to: "/login" });
    });
  };

  return (
    <Flex
      as="header"
      background="teal.700"
      paddingInline="6"
      paddingBlock="2"
      justify={"space-between"}
      align={"center"}
      direction={"row-reverse"}
    >
      <MenuRoot positioning={{ placement: "bottom-start" }}>
        <MenuTrigger asChild>
          <Avatar.Root
            colorPalette={"orange"}
            _hover={{ cursor: "pointer", opacity: 0.8, transition: "all 0.2s" }}
            _focus={{ boxShadow: "none" }}
          >
            <Avatar.Fallback name={user!.name} />
            <Float placement="bottom-end" offsetX="1" offsetY="1">
              <Circle
                bg="green.500"
                size="8px"
                outline="0.2em solid"
                outlineColor="bg"
              />
            </Float>
          </Avatar.Root>
        </MenuTrigger>
        <MenuContent position={"absolute"} top={"16"}>
          <MenuItem asChild value="profile">
            <Link to="/users/me">Perfil</Link>
          </MenuItem>
          <MenuItem value="logout" onClick={handleLogout}>
            Cerrar sesión
          </MenuItem>
        </MenuContent>
      </MenuRoot>
      <DrawerTrigger asChild>
        <IconButton hideFrom="xl" rounded={"full"} variant={"ghost"}>
          <GiHamburgerMenu />
        </IconButton>
      </DrawerTrigger>
    </Flex>
  );
};
