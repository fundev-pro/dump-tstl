import { METATABLE, inspect } from './inspect';

export function dump<T>(value: T, depth = 1): string {
    const removeAllMetatables = function (item: unknown, path: string[]): unknown {
        if (path[path.length - 1] != <T>METATABLE) return item;
    };
    return inspect(value, { depth: depth, process: removeAllMetatables });
}
