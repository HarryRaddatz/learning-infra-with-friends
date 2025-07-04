import { Container } from 'inversify'
import { Main } from '../../'
import { HttpService } from '../../interface'

export class SystemContainer extends Container {
    constructor() {
        super()
        this.loadBinds();
    }

    private loadBinds() {
        this.bind(Main).to(Main).inSingletonScope();
        this.bind(HttpService).to(HttpService).inSingletonScope();
    }
}