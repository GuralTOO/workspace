// utils.ts

/**
 * Conditionally joins classNames together.
 *
 * @param {...any} args - classNames to join together.
 * @returns {string} - Joined classNames.
 */
export function cn(...args: any[]): string {
    return args.filter(Boolean).join(' ');
}
  