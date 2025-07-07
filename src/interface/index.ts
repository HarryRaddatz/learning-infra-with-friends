import express, { Application } from 'express';
import { injectable, inject } from 'inversify';
import { LoggerModule } from '../infraesctucture';

@injectable()
export class HttpService {
    private app: Application;

    constructor(
        @inject(LoggerModule) private loggerModule: LoggerModule,
    ) {
        this.app = express();
    }

    configure() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    async start() {
        this.configure();
        this.app.listen(3000, () => {
            this.loggerModule.info('Server is running on http://localhost:3000');
        });
    }
}
