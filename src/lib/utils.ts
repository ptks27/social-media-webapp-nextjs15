import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDate, formatDistanceToNowStrict} from "date-fns"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatRelativeData(from: Date) {
  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() <24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, {addSuffix: true})
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "d MMM");
    } else {
      return formatDate(from, "d MMM yyyy");
    }
  }
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat("th-TH", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}


export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}