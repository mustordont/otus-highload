import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

const booleanMapper = new Map([
    ['true', true],
    ['false', false],
]);

export const ParseBoolean = () =>
    Transform(({ value, key }) => {
        const result: boolean = booleanMapper.get(value);
        if (typeof result === 'boolean') {
            return result;
        } else {
            throw new BadRequestException(`Invalid boolean '${value}' at ${key}`);
        }
    });
