import { injectable } from 'inversify'
import { createLogger, format, transports } from 'winston'
import { LoggerModuleInterface } from './interface/LoggerModuleInterface';

@injectable()
export class LoggerModule implements LoggerModuleInterface {
    private logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp(),
            format.json()
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'combined.log' })
        ],
    });


    warn(message: string, context?: unknown): void {
        this.logger.log({
            level: 'warn',
            message: `${message}`,
            context
        });
    }

    info(message: string, context?: unknown): void {
        this.logger.info({
            level: 'info',
            message: `${message}`,
            context
        });
    }

    error(err: Error, context?: unknown): void {
        this.logger.error({
            level: 'error',
            message: err.message,
            stack: err.stack,
            context: context
        });
    }
}