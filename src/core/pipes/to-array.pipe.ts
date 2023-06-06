import { Transform } from 'class-transformer';
import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';

// for class-validator Transform decorator
export function toArray({ value }: TransformFnParams): any[] {
    if (!Array.isArray(value)) {
        return [value];
    }
    return value;
}

export const ToArray = () => Transform(value => toArray(value));
