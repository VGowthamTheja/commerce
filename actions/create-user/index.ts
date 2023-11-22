import { createSafeAction } from "@/lib/create-safe-action";
import { createUserSchema } from "./schema";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/prisma";

const handler = async (data: InputType): Promise<OutputType> => {
  const { email, password } = data;
  let user;
  try {
    user = await db.user.create({
      data: {
        email,
        password,
      },
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }

  return {
    result: user,
  };
};

export const createUser = createSafeAction(createUserSchema, handler);
