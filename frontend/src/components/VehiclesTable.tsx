import { Row, Cell, Table, Header, ColumnHeader, Body } from "@layouts/Table";
import { StatusBadge } from "./StatusBadge";
import { VehicleForCustomer } from "@types";
import { useNavigate } from "@tanstack/react-router";
import { TableRootProps, TableRowProps } from "@chakra-ui/react";

interface VehiclesTableProps extends TableRootProps {
  vehicles?: VehicleForCustomer[];
}

interface VehicleRequestTableProps extends VehiclesTableProps {
  selectedVehicles?: number[];
}

interface VehicleRowProps extends TableRowProps {
  vehicle: VehicleForCustomer;
}

const VehicleRow = (props: VehicleRowProps) => {
  const { vehicle, ...rest } = props;
  return (
    <Row {...rest}>
      <Cell>{vehicle.vin}</Cell>
      <Cell>{vehicle.make}</Cell>
      <Cell>{vehicle.model}</Cell>
      <Cell>{vehicle.year}</Cell>
      <Cell>
        <StatusBadge status={vehicle.status!} />
      </Cell>
    </Row>
  );
};

export const VehiclesTable = (props: VehiclesTableProps) => {
  const { vehicles, ...rest } = props;
  const navigate = useNavigate();
  return (
    <Table {...rest}>
      <Header>
        <ColumnHeader>Chasis</ColumnHeader>
        <ColumnHeader>Marca</ColumnHeader>
        <ColumnHeader>Modelo</ColumnHeader>
        <ColumnHeader>Año</ColumnHeader>
        <ColumnHeader>Estado</ColumnHeader>
      </Header>
      <Body>
        {vehicles?.map((vehicle) => (
          <VehicleRow
            key={vehicle.vin}
            vehicle={vehicle}
            onClick={() => {
              navigate({
                to: "/vehicles/$id",
                params: { id: vehicle.id },
              });
            }}
          />
        ))}
      </Body>
    </Table>
  );
};

export const VehicleRequestTable = (props: VehicleRequestTableProps) => {
  const { vehicles, selectedVehicles, ...rest } = props;
  const vehiclesToShow =
    vehicles?.filter((vehicle) => {
      if (!selectedVehicles) return false;
      return selectedVehicles.includes(vehicle.id);
    }) ?? [];

  return (
    <Table h="full" interactive={false} {...rest}>
      <Header>
        <ColumnHeader>Número</ColumnHeader>
        <ColumnHeader>Chasis</ColumnHeader>
        <ColumnHeader>Marca</ColumnHeader>
        <ColumnHeader>Modelo</ColumnHeader>
        <ColumnHeader>Color</ColumnHeader>
      </Header>
      <Body>
        {vehiclesToShow.map((vehicle, index) => (
          <Row key={vehicle.id}>
            <Cell>{index + 1}</Cell>
            <Cell>{vehicle.vin}</Cell>
            <Cell>{vehicle.make}</Cell>
            <Cell>{vehicle.model}</Cell>
            <Cell>{vehicle.color}</Cell>
          </Row>
        ))}
      </Body>
    </Table>
  );
};
