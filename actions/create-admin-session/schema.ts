import { z } from "zod";

export const createAdminSessionSchema = z.object({
  adminKey: z.string({
    required_error: "Admin key is required",
    invalid_type_error: "Admin key must be a string",
  }),
  userId: z.string({
    required_error: "User ID is required",
    invalid_type_error: "User ID must be a string",
  }),
});
