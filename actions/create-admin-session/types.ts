import { z } from "zod";
import { UserProfile } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { createAdminSessionSchema } from "./schema";

export type InputType = z.infer<typeof createAdminSessionSchema>;
export type OutputType = ActionState<InputType, UserProfile>;
