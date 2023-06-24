import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommandModule } from './commands/command.module';
import { CoreModule, ConfigService } from './core';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users';
import { AuthModule } from './auth';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            imports: [CoreModule],
            useFactory: async (configService: ConfigService) => ({
                ...configService.db.postgres,
                type: 'postgres',
                // entities: [],
                synchronize: true,
                autoLoadEntities: true,
            }),
        }),
        CommandModule,
        CoreModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
