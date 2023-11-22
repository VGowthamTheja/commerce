import { createSafeAction } from "@/lib/create-safe-action";
import { createLoginSessionSchema } from "./schema";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/prisma";
import { omit } from "lodash";

const handler = async (data: InputType): Promise<OutputType> => {
  const { email, password } = data;
  let user;
  try {
    user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid password");
    }

    user = omit(user, ["password"]);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }

  return {
    result: user,
  };
};

export const createLoginSession = createSafeAction(createLoginSessionSchema, handler);
