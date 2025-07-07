import { Container } from 'inversify'
import { Main } from '../../'
import { HttpService } from '../../interface'
import { LoggerModule } from '../module';

export class SystemContainer extends Container {
    constructor() {
        super()
        this.loadBinds();
    }

    private loadBinds() {
        this.bind(Main).to(Main).inSingletonScope();
        this.bind(HttpService).to(HttpService).inSingletonScope();
        this.bind(LoggerModule).to(LoggerModule).inSingletonScope();
    }
}