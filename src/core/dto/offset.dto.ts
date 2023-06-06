import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class Offset {
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    count?: number = 20;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    offset?: number = 0;
}
