import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

/**
 * Merges and normalizes Tailwind CSS classes using clsx and tailwind-merge
 *
 * This utility function combines multiple class values into a single string,
 * removes duplicates, and handles Tailwind CSS class conflicts appropriately.
 *
 * @param inputs - Array of class values that can be strings, objects, arrays, or falsy values
 * @returns A merged and normalized string of class names
 *
 * @example
 * cn('px-2 bg-red', 'py-1 bg-blue') // Returns 'px-2 py-1 bg-blue'
 * cn({'text-red': true, 'text-blue': false}) // Returns 'text-red'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
