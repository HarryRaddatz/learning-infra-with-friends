import { Container } from 'inversify'
import { Main } from '../../'
import { HttpService } from '../../interface'
import { LoggerModule } from '../module';
import { UserRouter } from '../../interface/router/UserRouter';
import { UserControler } from '../../interface/controller/UserController';
import { GetUsersUseCase } from '../../application/use-case/GetUsersUseCase';


export class SystemContainer extends Container {
    constructor() {
        super()
        this.loadBinds();
        this.loadUseCases();
    }

    private loadBinds() {
        this.bind(Main).to(Main).inSingletonScope();
        this.bind(HttpService).to(HttpService).inSingletonScope();
        this.bind(LoggerModule).to(LoggerModule).inSingletonScope();
        this.bind(UserRouter).to(UserRouter).inSingletonScope();
        this.bind(UserControler).to(UserControler).inSingletonScope();
    }

    private loadUseCases() {
        this.bind(GetUsersUseCase).to(GetUsersUseCase);
    }

}