import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, {
      message: "Title must be at least 1 characters long",
    })
    .max(64, {
      message: "Title must be at most 64 characters long",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .max(1024, {
      message: "Description must be at most 1024 characters long",
    }),
  date: z.string().datetime().optional(),
});

// TODO: Crear el resto de schemas.
