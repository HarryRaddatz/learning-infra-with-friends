import express, { Application } from 'express';
import { injectable } from 'inversify';

@injectable()
export class HttpService {
    private app: Application;

    constructor() {
        this.app = express();
    }

    configure() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    async start() {
        this.configure();
        this.app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    }
}