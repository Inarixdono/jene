import { z } from "zod";

export const date = z
  .string()
  .nullable()
  .transform((date) => {
    if (!date) return null;
    return new Date(date).toISOString();
  });
