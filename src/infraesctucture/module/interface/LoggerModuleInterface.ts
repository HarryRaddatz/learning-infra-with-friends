export interface LoggerModuleInterface {
    warn(message: string, context?: unknown): void;
    info(message: string, context?: unknown): void;
    error(err: Error, context?: unknown): void;
}