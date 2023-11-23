import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJwtToken(token: string) {
  try {
    return jwt.verify(token, process.env.AUTH_SECRET!);
  } catch (error) {
    console.log(error);
    return {error};
  }
}
