/**
 * ============================================================================
 * @file src/lib/utils.ts
 * ============================================================================
 * 
 * WHY:
 * Tailwind CSS utility classes often encounter conflicts when merged dynamically
 * (e.g., `px-4` vs `px-6`). A consistent class name composer ensures standard
 * precedence rules apply without manual string concatenation bugs.
 * 
 * WHAT:
 * Provides the canonical `cn()` helper function combining `clsx` (for conditional
 * class toggling) and `tailwind-merge` (for resolving Tailwind class specificity).
 * 
 * RESPONSIBILITY:
 * - Deterministically merge Tailwind CSS class strings and conditionals.
 * 
 * DEPENDENCIES:
 * - clsx: ClassValue[] parsing
 * - tailwind-merge: Tailwind class deduplication
 * ============================================================================
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
