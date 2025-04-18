import { z } from "zod";

import { customer, customerForVehicle } from "./customer";
import { vehicle, vehicleForCustomer } from "./vehicle";

export const populatedCustomer = customer.extend({
  vehicles: vehicleForCustomer.array(),
});

export const populatedVehicle = vehicle.extend({
  owner: customerForVehicle.nullable(),
});

export type PopulatedCustomer = z.infer<typeof populatedCustomer>;
export type PopulatedVehicle = z.infer<typeof populatedVehicle>;
