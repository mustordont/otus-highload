import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const error = {
            ...exception,
            stack: exception.stack,
            message: exception.message,
            path: request.url,
        };
        Logger.error(error);
        response.status(exception.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}
