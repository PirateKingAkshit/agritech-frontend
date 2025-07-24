import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const JSONStringify = (data) => {
  return JSON.stringify(data)
}

export const JSONParse = (data) => {
  return JSON.parse(data)
}
