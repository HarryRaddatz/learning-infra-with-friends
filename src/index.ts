import { injectable, inject } from 'inversify'
import { SystemContainer } from '../src/infraesctucture/config'
import { HttpService } from './interface';
import { LoggerModule } from './infraesctucture';

@injectable()
export class Main {
    constructor(
        @inject(HttpService) private httpService: HttpService,
        @inject(LoggerModule) private loggerModule: LoggerModule,
    ) { }
    public async initialize() {
        this.loggerModule.info('System initialized with container');
        this.httpService.start();
        this.loggerModule.info('HTTP Service started');
    }
}


(async () => {
    const container = new SystemContainer();
    const main = await container.getAsync(Main);
    await main.initialize();
})()