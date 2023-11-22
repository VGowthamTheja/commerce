import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email is invalid",
    })
    .max(255, {
      message: "Email must be less than 255 characters",
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(12, {
      message: "Password must be less than 12 characters",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter and one number",
    }),
});
