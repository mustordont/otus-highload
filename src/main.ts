import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { dump } from 'js-yaml';
import { AppModule } from './app.module';
import { name, description, version } from '../package.json';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { B2bGuard, ConfigService, LoggerService, TrendException } from './core';

async function bootstrap() {
    const logger = new LoggerService();
    const app = await NestFactory.create(AppModule, {
        logger,
        cors: true,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            enableDebugMessages: true,
            exceptionFactory: TrendException,
        }),
    );
    app.enableVersioning({ type: VersioningType.URI });
    const config = app.get(ConfigService);

    if (config.enableSwagger) {
        const swaggerConfig = new DocumentBuilder()
            .setTitle(name)
            .setDescription(description)
            .setVersion(version)
            .addBearerAuth({
                type: 'apiKey',
                in: 'query',
                name: B2bGuard.TOKEN_NAME,
            })
            .build();
        const document = SwaggerModule.createDocument(app, swaggerConfig);
        const customOptions: SwaggerCustomOptions = {
            swaggerOptions: {
                persistAuthorization: true,
            },
        };
        writeFileSync(join(process.cwd(), '/src/swagger.yml'), dump(document));
        SwaggerModule.setup('swagger', app, document, customOptions);
    }

    const port = process.env.PORT || config.port;
    await app.listen(port, () => {
        logger.log(`Start listening at http://localhost:${port}`);
    });
}

bootstrap();
