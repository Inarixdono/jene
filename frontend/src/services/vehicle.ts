import {
  vehicle,
  request,
  vehicleRequest,
  populatedVehicle,
  populatedRequest,
  populatedVehicleRequestWithCustomer,
  VehicleCreate,
  Vehicle,
  VehicleUpdate,
  PopulatedVehicle,
  RequestCreate,
  PopulatedVehicleRequest,
  VehicleRequestUpdate,
} from "@types";
import Request from "./request";
import { flattenRequestDetails } from "@utils/dimension-reducer";

export const getVehicle = async (id: number) => {
  const service = new Request("vehicles");
  const data = await service.getOne<PopulatedVehicle>(id);
  return populatedVehicle.parse(data);
};

export const getVehicles = async () => {
  const service = new Request("vehicles");
  const data = await service.get<Vehicle>();
  return vehicle.array().parse(data);
};

export const createVehicle = async (vehicle: VehicleCreate) => {
  const service = new Request("vehicles");
  await service.post<VehicleCreate, Vehicle>(vehicle);
};

export const updateVehicle = async (vehicle: VehicleUpdate) => {
  const service = new Request("vehicles");
  const response = await service.update<VehicleUpdate>(vehicle);
  return populatedVehicle.parse(response);
};

export const getRequests = async () => {
  const service = new Request("vehicles/requests");
  const response = await service.get<Vehicle>();
  const data = populatedRequest.array().parse(response);
  return flattenRequestDetails(data);
};

export const createRequest = async (requestCreate: RequestCreate) => {
  const service = new Request("vehicles/requests");
  const response = await service.post(requestCreate);
  return request.parse(response);
};

export const getVehicleRequest = async (
  requestId: number,
  vehicleId: number
) => {
  const service = new Request(`vehicles/requests/${requestId}`);
  const response = await service.getOne<PopulatedVehicleRequest>(vehicleId);
  return populatedVehicleRequestWithCustomer.parse(response);
};

export const updateVehicleRequest = async (
  vehicleRequestUpdate: VehicleRequestUpdate
) => {
  const { requestId, vehicleId } = vehicleRequestUpdate;
  const service = new Request(`vehicles/requests/${requestId}/${vehicleId}`);
  const response =
    await service.update<VehicleRequestUpdate>(vehicleRequestUpdate);
  return vehicleRequest.parse(response);
};
