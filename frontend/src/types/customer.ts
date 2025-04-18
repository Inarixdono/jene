import { z } from "zod";

const customerBase = z.object({
  name: z
    .string()
    .min(5, "El nombre debe tener al menos 5 caracteres.")
    .max(128, "El nombre debe tener como máximo 128 caracteres.")
    .toUpperCase(),
  identityNumber: z
    .string()
    .min(8, "El número de identidad debe tener al menos 8 caracteres.")
    .max(14, "El número de identidad debe tener como máximo 14 caracteres."),
  phoneNumber: z
    .string()
    .length(10, "El número de teléfono debe tener 10 caracteres."),
});

export const customerCreate = customerBase.extend({
  street: z
    .string()
    .max(128, "La calle debe tener como máximo 128 caracteres.")
    .nullable(),
  city: z
    .string()
    .max(128, "La ciudad debe tener como máximo 128 caracteres.")
    .nullable(),
  state: z
    .string()
    .max(128, "El estado debe tener como máximo 128 caracteres.")
    .nullable(),
  reference: z
    .string()
    .max(128, "La referencia debe tener como máximo 128 caracteres.")
    .nullable(),
});

export const customer = customerCreate.extend({
  id: z.number().int().positive(),
  status: z.enum(["ACTIVE", "INACTIVE", "BLACKLISTED"]),
});

export const customerUpdate = customer.partial().extend({
  id: z.number().int().positive(),
});

export const customerForVehicle = customerBase.extend({
  id: z.number().int().positive(),
});

export const customerFilter = customer
  .pick({
    id: true,
    name: true,
    identityNumber: true,
  })
  .extend({
    id: z.number().int().positive().nullable(),
    name: z.string().nullable(),
    identityNumber: z.string().nullable(),
  });

export type CustomerCreate = z.infer<typeof customerCreate>;
export type Customer = z.infer<typeof customer>;
export type CustomerUpdate = z.infer<typeof customerUpdate>;
export type CustomerForVehicle = z.infer<typeof customerForVehicle>;
export type CustomerFilter = z.infer<typeof customerFilter>;
