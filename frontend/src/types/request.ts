import { z } from "zod";
import { customerForVehicle } from "./customer";
import { vehicleForCustomer } from "./vehicle";
import { date } from "./util";

export const documentStatus = z.enum([
  "UNKNOWN",
  "PENDING",
  "IN PROGRESS",
  "AVAILABLE",
  "DELIVERED",
]);

export const vehicleRequestBase = z.object({
  plateStatus: documentStatus,
  registrationStatus: documentStatus,
  plateReceivedAt: date,
  plateDeliveredAt: date,
  registrationReceivedAt: date,
  registrationDeliveredAt: date,
});

export const vehicleRequestCreate = z.object({
  requestId: z.number().int().positive().optional(),
  vehicleId: z.number().int().positive(),
});

export const vehicleRequest = vehicleRequestCreate
  .merge(vehicleRequestBase)
  .extend({
    requestId: z.number().int().positive(),
  });

export const vehicleRequestUpdate = vehicleRequest.extend({
  requestId: z.number().int().positive().readonly(),
  vehicleId: z.number().int().positive().readonly(),
});

export const populatedVehicleRequest = vehicleRequest.extend({
  vehicle: vehicleForCustomer,
});

export const populatedVehicleRequestWithCustomer =
  populatedVehicleRequest.extend({
    customer: customerForVehicle,
  });

export const requestBase = z.object({
  customerId: z.coerce.number().int().positive({
    message: "El cliente es requerido",
  }),
  status: z.enum(["PENDING", "IN PROGRESS", "PAID", "COMPLETED"]),
  completionDate: z.string().nullable(),
});

export const requestCreate = requestBase.pick({ customerId: true }).extend({
  detail: vehicleRequestCreate.array().refine((arr) => arr.length > 0, {
    message: "Debe seleccionar al menos un vehículo",
  }),
});

export const request = requestBase.extend({
  id: z.number().int().positive().readonly(),
});

export const requestUpdate = request.partial();

export const populatedRequest = request.extend({
  customer: customerForVehicle,
  detail: populatedVehicleRequest.array(),
});

export const flattenRequest = vehicleRequest.extend({
  vehicle: vehicleForCustomer,
  customer: customerForVehicle,
});

export type VehicleRequestCreate = z.infer<typeof vehicleRequestCreate>;
export type VehicleRequest = z.infer<typeof vehicleRequest>;
export type VehicleRequestUpdate = z.infer<typeof vehicleRequestUpdate>;
export type RequestCreate = z.infer<typeof requestCreate>;
export type Request = z.infer<typeof request>;
export type FlattenRequest = z.infer<typeof flattenRequest>;
export type RequestUpdate = z.infer<typeof requestUpdate>;
export type PopulatedRequest = z.infer<typeof populatedRequest>;
export type PopulatedVehicleRequest = z.infer<typeof populatedVehicleRequest>;
