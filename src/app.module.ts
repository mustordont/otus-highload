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
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'example',
                database: 'postgres',
                // entities: [],
                synchronize: true,
                autoLoadEntities: true
            }),
        }),
        CoreModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
