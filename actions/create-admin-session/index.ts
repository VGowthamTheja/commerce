import { createSafeAction } from "@/lib/create-safe-action";
import { createAdminSessionSchema } from "./schema";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/prisma";
import { UserProfile } from "@prisma/client";

const handler = async (data: InputType): Promise<OutputType> => {
  const { adminKey, userId } = data;
  let profile;
  try {
    profile = await db.userProfile.findUnique({
      where: {
        userId,
        adminKey,
      },
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }

  return {
    result: profile as UserProfile,
  };
};

export const createAdminSession = createSafeAction(createAdminSessionSchema, handler);
