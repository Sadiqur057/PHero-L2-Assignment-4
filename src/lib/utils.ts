import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getReadableDate(date: string | Date) {
  const parsedDate = new Date(date);
  return format(parsedDate, 'MMM d, yyyy');
}
