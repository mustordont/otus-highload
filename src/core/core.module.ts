import { HttpModule } from '@nestjs/axios';
import { Global, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from './config';
import { LoggerMiddleware, LoggerService } from './logger';

@Global()
@Module({
    imports: [HttpModule],
    providers: [ConfigService, LoggerService, LoggerMiddleware],
    exports: [HttpModule, ConfigService, LoggerService],
})
export class CoreModule implements NestModule {
    constructor(config: ConfigService) {
        Logger.overrideLogger([config.logLevel]);
    }

    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(LoggerMiddleware).forRoutes('/');
    }
}
