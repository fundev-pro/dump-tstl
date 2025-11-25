/** @noSelfInFile */

/**
 * inspect.lua 3.1.0
 * Human-readable representations of tables
 * @see http://github.com/kikito/inspect.lua
 */

/**
 * Process function type for transforming items during inspection
 * @param item - The item being processed
 * @param path - The path to the item in the inspected structure
 */
type ProcessFunction = (this: void, item: any, path: any[]) => any;

/**
 * Options for inspect function
 */
interface InspectOptions {
    /**
     * Maximum depth to inspect nested tables (default: Infinity)
     */
    depth?: number;

    /**
     * String to use for newlines (default: '\n')
     */
    newline?: string;

    /**
     * String to use for indentation (default: '  ')
     */
    indent?: string;

    /**
     * Function to process/transform items during inspection
     */
    process?: ProcessFunction;
}

/**
 * Special marker for keys in the inspection path
 */
declare const _KEY: unique symbol;

/**
 * Special marker for metatables in the inspection path
 */
declare const _METATABLE: unique symbol;

/**
 * Inspects a value and returns a human-readable string representation
 * @param root - The value to inspect
 * @param options - Optional inspection options
 * @returns A formatted string representation of the value
 */
export function inspect(this: void, root: any, options?: InspectOptions): string;

/**
 * Special marker for keys in the inspection path
 */
export const KEY: typeof _KEY;

/**
 * Special marker for metatables in the inspection path
 */
export const METATABLE: typeof _METATABLE;

/**
 * Library version
 */
export const _VERSION: string;

/**
 * Library URL
 */
export const _URL: string;

/**
 * Library description
 */
export const _DESCRIPTION: string;

/**
 * Library license text
 */
export const _LICENSE: string;

/**
 * Options interface (type re-export)
 */
export type { InspectOptions };
