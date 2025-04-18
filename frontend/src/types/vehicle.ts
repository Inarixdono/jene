import { z } from "zod";

export const vehicleStatusSchema = z.enum([
  "AVAILABLE",
  "SOLD",
  "SETTLED",
  "SEIZED",
  "STOLEN",
]);

export const vehicleBase = z.object({
  vin: z
    .string()
    .min(11, "El número de chasis debe tener al menos 11 caracteres.")
    .max(32, "El número de chasis debe tener como máximo 32 caracteres.")
    .toUpperCase(),
  vehicleType: z.enum(["MOTORCYCLE", "SCOOTER", "FOUR WHEELER"]),
  make: z
    .string()
    .min(3, "La marca debe tener al menos 3 caracteres.")
    .max(32, "La marca debe tener como máximo 32 caracteres.")
    .toUpperCase(),
  model: z
    .string()
    .min(2, "El modelo debe tener al menos 3 caracteres.")
    .max(32, "El modelo debe tener como máximo 32 caracteres.")
    .toUpperCase(),
  year: z.coerce.number().min(1900, "El año debe ser mayor a 1900."),
  color: z
    .string()
    .min(4, "El color debe tener al menos 3 caracteres.")
    .max(32, "El color debe tener como máximo 32 caracteres.")
    .toUpperCase(),
  engineNumber: z
    .string()
    .max(32, "El número de motor debe tener como máximo 32 caracteres.")
    .toUpperCase()
    .nullable(),
});

export const vehicleCreate = vehicleBase.extend({
  price: z.coerce
    .number()
    .positive({ message: "El precio debe ser mayor a 0." }),
  isNew: z.preprocess((val) => {
    if (val === "true") return true;
    if (val === "false") return false;
    return val;
  }, z.boolean()),
  note: z
    .string()
    .max(255, "La nota debe tener como máximo 255 caracteres.")
    .nullable(),
});

export const vehicle = vehicleCreate.extend({
  id: z.number().int().positive().readonly(),
  licensePlate: z
    .string()
    .length(8, "La placa debe tener 8 caracteres.")
    .toUpperCase()
    .nullable(),
  registrationNumber: z
    .number()
    .max(8, "El número de matrícula debe tener como máximo 8 caracteres.")
    .nullable(),
  status: vehicleStatusSchema,
  ownerId: z.coerce
    .number()
    .int()
    .positive({
      message: "El propietario debe ser un número positivo.",
    })
    .nullable(),
});

export const vehicleUpdate = vehicle.partial().extend({
  id: z.number().int().positive().readonly(),
});

export const vehicleForCustomer = vehicleBase.extend({
  id: z.number().int().positive().readonly(),
  status: vehicleStatusSchema,
});

export const vehicleFilter = vehicle
  .pick({
    vin: true,
    make: true,
    model: true,
    status: true,
  })
  .extend({
    vin: z.string().nullable(),
    make: z.string().nullable(),
    model: z.string().nullable(),
    status: vehicleStatusSchema.array().nullable(),
  });

export type VehicleBase = z.infer<typeof vehicleBase>;
export type VehicleCreate = z.infer<typeof vehicleCreate>;
export type Vehicle = z.infer<typeof vehicle>;
export type VehicleUpdate = z.infer<typeof vehicleUpdate>;
export type VehicleForCustomer = z.infer<typeof vehicleForCustomer>;
export type VehicleFilter = z.infer<typeof vehicleFilter>;
