import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines tailwind CSS classes into a single string, correctly merging conflicts.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
