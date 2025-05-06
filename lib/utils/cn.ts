<<<<<<< HEAD
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
=======
import clsx, { ClassValue } from 'clsx';
import { ClassNameValue, twMerge } from 'tailwind-merge';

export const cn = (...classValues: ClassNameValue[]) => {
  return clsx(twMerge(...classValues));
};
>>>>>>> 22f74281f4efbc32b528d8d5a0e495cc18412196
