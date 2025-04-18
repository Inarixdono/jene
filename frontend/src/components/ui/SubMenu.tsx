import { Button, ButtonProps, Menu as ChakraMenu } from "@chakra-ui/react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { RiAddLine } from "react-icons/ri";

interface MenuItemProps extends ChakraMenu.ItemProps {
  href: string;
  icon?: React.ReactNode;
}

interface SubMenuProps extends ButtonProps {
  href: string;
  icon?: React.ReactNode;
}

interface CreateButtonProps extends ButtonProps {
  isSuperuser: boolean;
  customersIcon: React.ReactNode;
  vehiclesIcon: React.ReactNode;
  requestsIcon: React.ReactNode;
  usersIcon: React.ReactNode;
}

export const MenuButton = (props: ButtonProps) => {
  const { children, ...rest } = props;

  return (
    <Button
      variant="ghost"
      padding="4"
      gap="4"
      justifyContent="flex-start"
      color="inherit"
      transition="background-color 0.2s"
      fontSize="lg"
      _hover={{ bg: "blackAlpha.100" }}
      {...rest}
    >
      {children}
    </Button>
  );
};

const MenuItem = (props: MenuItemProps) => {
  const { href, icon, value, ...rest } = props;

  return (
    <ChakraMenu.Item
      key={href}
      value={value}
      cursor="pointer"
      fontSize="md"
      py="2"
      gap={3}
      asChild
      {...rest}
    >
      <Link to={href}>
        {icon && icon}
        {value}
      </Link>
    </ChakraMenu.Item>
  );
};

export const SubMenu = (props: SubMenuProps) => {
  const { href, icon, value, ...rest } = props;
  const route = useMatchRoute();

  const isActive = !!route({ to: href, fuzzy: false });

  return (
    <MenuButton
      asChild
      roundedBottomRight="none"
      roundedTopRight="none"
      bg={isActive ? "blackAlpha.100" : "transparent"}
      borderInlineEnd={isActive ? "4px solid" : "0"}
      borderInlineEndColor={"teal.700"}
      py="6"
      {...rest}
    >
      <Link to={href}>
        {icon && icon}
        {value}
      </Link>
    </MenuButton>
  );
};

export const CreateButton = (props: CreateButtonProps) => {
  const {
    isSuperuser,
    customersIcon,
    vehiclesIcon,
    requestsIcon,
    usersIcon,
    ...rest
  } = props;
  return (
    <ChakraMenu.Root positioning={{ placement: "bottom-end" }}>
      <ChakraMenu.Trigger asChild>
        <MenuButton rounded="full" mr="2" shadow="md" {...rest}>
          <RiAddLine />
          Crear
        </MenuButton>
      </ChakraMenu.Trigger>
      <ChakraMenu.Positioner zIndex={9999}>
        <ChakraMenu.Content w="60">
          <MenuItem
            href="/customers/create"
            value="Nuevo cliente"
            icon={customersIcon}
          />
          <MenuItem
            href="/vehicles/create"
            value="Nuevo vehículo"
            icon={vehiclesIcon}
          />
          <MenuItem
            href="/requests/create"
            value="Nueva solicitud"
            icon={requestsIcon}
          />
          {isSuperuser && (
            <MenuItem
              href="/users/create"
              value="Nuevo usuario"
              icon={usersIcon}
            />
          )}
        </ChakraMenu.Content>
      </ChakraMenu.Positioner>
    </ChakraMenu.Root>
  );
};
