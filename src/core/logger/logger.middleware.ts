import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        Logger.log(`${req.method} ${req.url} ${req.headers['user-agent']} content-type: ${req.headers['content-type']} body: `, req.body);
        next();
    }
}
