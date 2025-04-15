
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string | Date, locale: string = 'hu-HU'): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (time: string, includeSeconds: boolean = false): string => {
  if (!time) return '';
  
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}${includeSeconds ? ':00' : ''}`;
};
