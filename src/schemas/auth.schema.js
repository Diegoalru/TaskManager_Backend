import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(5, {
      message: "Username must be at least 5 characters long",
    })
    .max(32, {
      message: "Username must be at most 32 characters long",
    }),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    })
    .min(6, {
      message: "Email must be at least 6 characters long",
    })
    .max(64, {
      message: "Email must be at most 64 characters long",
    }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(32, {
      message: "Password must be at most 32 characters long",
    }),
});

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(5, {
      message: "Username must be at least 5 characters long",
    })
    .max(32, {
      message: "Username must be at most 32 characters long",
    }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(32, {
      message: "Password must be at most 32 characters long",
    }),
});
