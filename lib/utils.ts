import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJwt(token: string) {
  if (!token) return null;
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}


export function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let backgroundColor = '#';
  for (let i = 0; i < 6; i++) {
    backgroundColor += letters[Math.floor(Math.random() * 16)];
  }

  const textColor = getContrastingTextColor(backgroundColor);

  return { backgroundColor, textColor };
}

function getContrastingTextColor(backgroundColor: string) {
  // Calculate the brightness of the background color
  const brightness = calculateBrightness(backgroundColor);

  // Determine the appropriate text color based on the brightness
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

function calculateBrightness(color: string) {
  // Convert the color to RGB values
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate the brightness using the formula (0.299 * R + 0.587 * G + 0.114 * B)
  return (0.299 * r + 0.587 * g + 0.114 * b);
}