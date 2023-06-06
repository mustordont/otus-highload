import { ConsoleLogger, LogLevel } from '@nestjs/common';
import * as util from 'util';

export class LoggerService extends ConsoleLogger {
    protected printMessages(messages: unknown[], context = '', logLevel: LogLevel = 'log') {
        process.stdout.write(
            JSON.stringify({
                level: logLevel,
                ...(context ? { context } : {}),
                message: util.format(...messages),
                timestamp: new Date().toISOString(),
            }) + '\n',
        );
    }
}
