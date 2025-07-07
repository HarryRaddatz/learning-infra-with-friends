import express, { Application, Router } from 'express';
import { injectable, inject } from 'inversify';
import { LoggerModule } from '../infraesctucture';
import { readdirSync } from 'fs'
import morgan from 'morgan'
import { SystemContainer } from '../infraesctucture/config';
import { LoggerModuleInterface } from '../infraesctucture/module/interface/LoggerModuleInterface';
@injectable()
export class HttpService {
    private app: Application;
    private container = new SystemContainer()


    constructor(
        @inject(LoggerModule) private loggerModule: LoggerModuleInterface,
    ) {
        this.app = express();
    }

    private getRoutes() {
        const path = `${__dirname}/router`;
        this.loggerModule.info(`Loading routes from path: ${path}`);
        const files = readdirSync(path).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
        files.forEach(async (file) => {
            const routersPath = `${path}/${file}`
            const { path: pathRoute, classHandler } = await import(routersPath);
            this.loggerModule.info(`Loading route from file: ${file}`, {
                pathRoute,
                classHandler
            });
            const handler = await this.container.getAsync<{ getRouter: () => Router }>(classHandler);
            const router = handler.getRouter();

            this.app.use(pathRoute, router);
            this.loggerModule.info(`Route ${file} loaded successfully`, {
                pathRoute
            });
        });
    }


    configure() {
        this.app.use(express.json());
        this.app.use(morgan('short', {
            stream: {
                write: (message: string) => this.loggerModule.info(message)
            }
        }));
        this.app.use(express.urlencoded({ extended: true }));
        this.getRoutes();
    }

    async start() {
        this.configure();
        this.app.listen(3000, () => {
            this.loggerModule.info('Server is running on http://localhost:3000');
        });
    }
}
