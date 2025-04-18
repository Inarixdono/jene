import { z } from "zod";

export const userBase = z.object({
  name: z
    .string()
    .min(5, "El nombre debe tener al menos 5 caracteres.")
    .max(128, "El nombre debe tener como máximo 128 caracteres.")
    .toUpperCase(),
  email: z.string().email("El correo electrónico no es válido.").toLowerCase(),
  role: z.enum(["SUPERUSER", "ADMIN", "USER", "GUEST"], {
    message: "El rol del usuario es requerido.",
  }),
  department: z.enum(
    [
      "DEVELOPMENT",
      "ADMINISTRATION",
      "ACCOUNTING",
      "SALES",
      "RECEIVABLES",
      "BILLING",
      "CUSTOMER SERVICE",
    ],
    {
      message: "El departamento del usuario es requerido.",
    }
  ),
});

export const userCreate = userBase.extend({
  identityNumber: z
    .string()
    .min(8, "El número de identidad debe tener al menos 8 caracteres.")
    .max(14, "El número de identidad debe tener como máximo 14 caracteres."),
  branchId: z.number().int().positive().default(1),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

export const user = userBase.extend({
  id: z.number().int().positive(),
  branchId: z.number().int().positive(),
});

export const userUpdate = user
  .extend({
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres."),
  })
  .partial();

export const userLogin = z.object({
  username: z.string().email("El correo electrónico no es válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export const tokenData = z.object({
  accessToken: z.string(),
  user: user,
});

export type UserCreate = z.infer<typeof userCreate>;
export type User = z.infer<typeof user>;
export type UserUpdate = z.infer<typeof userUpdate>;
export type UserLogin = z.infer<typeof userLogin>;
export type TokenData = z.infer<typeof tokenData>;
