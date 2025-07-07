import { inject, injectable } from 'inversify'
import { Router } from 'express'
import { LoggerModule } from '../../infraesctucture'
import { LoggerModuleInterface } from '../../infraesctucture/module/interface/LoggerModuleInterface'
import { UserControler } from '../controller/UserController'

@injectable()
export class UserRouter {
    private router: Router
    constructor(
        @inject(LoggerModule) private loggerModule: LoggerModuleInterface,
        @inject(UserControler) private userControler: UserControler,
    ) {
        this.router = Router()
        this.initializeRoutes()
    }

    public getRouter(): Router {
        this.loggerModule.info('UserRouter initialized and ready to use')
        return this.router
    }

    private initializeRoutes() {
        this.router.get('/', async (req, res) => this.userControler.getUsers(req, res))
    }
}

export const path = '/user';
export const classHandler = UserRouter
