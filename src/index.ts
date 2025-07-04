import { injectable, inject } from 'inversify'
import { SystemContainer } from '../src/infraesctucture/config'
import { HttpService } from './interface';

@injectable()
export class Main {
    constructor(
        @inject(HttpService) private httpService: HttpService,
    ) { }
    public async initialize() {
        console.log('System initialized with container');
        this.httpService.start();
    }
}


(async () => {
    const container = new SystemContainer();
    const main = await container.getAsync(Main);
    await main.initialize();
})()