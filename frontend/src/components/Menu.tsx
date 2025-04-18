import { useUserStore } from "@store/user";
import { CreateButton, SubMenu } from "./ui/SubMenu";
import {
  HomeIcon,
  CustomersIcon,
  VehiclesIcon,
  RequestsIcon,
  UsersIcon,
} from "./ui/icon";

export const Menu = () => {
  const { isSuperuser } = useUserStore();

  return (
    <>
      <CreateButton
        mb={5}
        isSuperuser={isSuperuser()}
        customersIcon={<CustomersIcon />}
        vehiclesIcon={<VehiclesIcon />}
        requestsIcon={<RequestsIcon />}
        usersIcon={<UsersIcon />}
      />
      <SubMenu href="/" value="Inicio" icon={<HomeIcon />} />
      <SubMenu href="/customers" value="Clientes" icon={<CustomersIcon />} />
      <SubMenu href="/vehicles" value="Vehículos" icon={<VehiclesIcon />} />
      <SubMenu href="/requests" value="Solicitudes" icon={<RequestsIcon />} />
      {isSuperuser() && (
        <SubMenu href="/users" value="Usuarios" icon={<UsersIcon />} />
      )}
    </>
  );
};
