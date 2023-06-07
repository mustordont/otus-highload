import { Injectable, Logger } from '@nestjs/common';
import { Expose, plainToClass, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested, validateSync } from 'class-validator';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { ELogLevel } from '../logger';

export class DbConfig {
    @IsString()
    postgres: string;
}

export class AuthConfig {
    @IsString()
    secret: string;
}

@Expose()
export class ConfigFile {
    @IsBoolean()
    enableSwagger: boolean;

    @IsNumber()
    port: number;

    @IsEnum(ELogLevel)
    logLevel: ELogLevel;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => DbConfig)
    db: DbConfig;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AuthConfig)
    auth: AuthConfig;
}

@Injectable()
export class ConfigService extends ConfigFile {
    private static YAML_CONFIG_FILENAME = 'config.yaml';

    constructor() {
        super();
        const config = this._load();
        Object.assign(this, config);
    }

    private _load() {
        try {
            const record = yaml.load(readFileSync(join(process.cwd(), ConfigService.YAML_CONFIG_FILENAME), 'utf8')) as Record<string, any>;

            return this._validate(record);
        } catch (e) {
            throw new Error(`Can't instantiate ConfigService: ${e?.message}`);
        }
    }

    private _validate(config: Record<string, unknown>) {
        const validatedConfig = plainToClass(ConfigFile, config);
        const errors = validateSync(validatedConfig, {
            enableDebugMessages: true,
            skipMissingProperties: false,
            forbidUnknownValues: true,
        });

        if (errors.length > 0) {
            throw new Error(errors.toString());
        }
        return validatedConfig;
    }
}
