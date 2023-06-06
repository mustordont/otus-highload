import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

function errorDesc(error: ValidationError, parent: string = ''): Record<string, any> {
    const path = parent ? parent + '.' : '';
    const errors: Record<string, any> = error.constraints
        ? { [path + error.property]: Object.keys(error.constraints).map(i => error.constraints[i]) }
        : {};
    return {
        ...errors,
        ...error.children
            .map(i => errorDesc(i, path + error.property))
            .reduce(
                (acc, cur) => ({
                    ...acc,
                    ...cur,
                }),
                {},
            ),
    };
}

export function TrendException(errors: ValidationError[]) {
    const message: Record<string, any> = {
        ...errors
            .map(i => errorDesc(i))
            .reduce(
                (acc, cur) => ({
                    ...acc,
                    ...cur,
                }),
                {},
            ),
    };

    return new BadRequestException({ statusCode: 400, error: 'Bad Request', message });
}
