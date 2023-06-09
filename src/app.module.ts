import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule, ConfigService } from './core';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
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
        CoreModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
